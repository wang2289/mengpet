import {
  Config
} from '../../utils/config.js'
import { random } from '../../utils/util.js'
// let petsModel = new PetsModel()
let app = getApp();
import {
  requestsend,
  requesttoken
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: true,
    searchPanel: false,
    pets: Object,
    more: false,
    imgUrls: [
      {
        id: 0,
        url: '/images/Group 20.png'
      },
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      }
    ],
    indicatorDots: false,
    autoplay:true,
    interval: 5000,
    hasUserInfo: true,
    duration: 1000
  },
  onReachBottom: function (event) {
    this.setData({
      more: random(16)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hasGottenUserInfo()
  },
  onShow: function (options) {
    
    
  },
  onActivateSearch: function (event) {
    this.setData({
      searchPanel: true
    })
  },
  onCitySearch:function(){
    wx.navigateTo({
      url: '/pages/searchcity/searchcity'
    })
  },
  hasGottenUserInfo: function () {
    var that = this;
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                isshow: true
              })
              
              var userInfo = data.userInfo;
              wx.login({
                success(res) {
                  if (res.code) {
                    userInfo.code = res.code
                    console.log(userInfo);

                    that.userLogin(data.userInfo);
                  }
                }
              })
              
            }
          })
        } else {
          this.setData({
            isshow: false
          })
          // console.log("getUserInfo false")
        }
      }
    })
  },
  onGetUserInfo: function (event) {
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        isshow: true
      })
    }
  },
  onPetSearch:function(){
    wx.navigateTo({
      url: '/pages/searchpet/searchpet'
    })
  },
  onCancel: function (event) {
    this.setData({
      searchPanel: false
    })
  },

  onShareAppMessage() {

  },

  getRecommendList: function() {
    var that = this;
    requesttoken('pets/getPetsInfosFilterMitTips', "GET",
      { "page": 1, "size": 4 }, function (res) {
        if (res.success) {
          var pets = res.data.list;
          var petData = {};
          console.log(pets);
          for (var i = 0; i < pets.length; i++) {
            var temp = {};
            temp.id = pets[i].id;
            temp.image = Config.imgPath + "/" + pets[i].photosId;
            temp.name = pets[i].nameCn;
            temp.sex = pets[i].sex;
            temp.age = pets[i].age;
            var colors = pets[i].color;
            var colorList = colors.split(" ");
            var colorStr = "";
            if (colorList.length <= 2) {
              colorStr = colors;
            } else {
              colorStr = colorList[0] + "" + colorList[1];
            }
            temp.color = colorStr;
            var features = pets[i].feature;
            var featureList = features.split(" ");
            var featureStr = "";
            if (featureList.length <= 1) {
              featureStr = features;
            } else {
              featureStr = featureList[0];
            }
            temp.feature = featureStr;
            temp.city = 'city';
            temp.area = pets[i].area;
            temp.view = pets[i].view;
            petData[i] = temp;
          }
          that.setData({
            pets: petData
          })

        }
      })
  },

  userLogin: function (userInfo) {
    var that = this;
    requestsend('/wechat/login', "GET",
      userInfo, function (res) {
        if (res.success) {
          app.globalData.token = res.data.token;
          app.globalData.userId = res.data.userId;
          console.log(app.globalData.token);
          console.log(app.globalData.userId);
          that.getRecommendList();
        }
      });
  },

})