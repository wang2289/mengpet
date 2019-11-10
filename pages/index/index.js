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
    hidden: false,
    pages: 1,
    page: 1,
    size: 4,
    isshow: true,
    searchPanel: false,
    pets: [],
    more: false,
    imgUrls: [],
    indicatorDots: false,
    autoplay:true,
    interval: 5000,
    hasUserInfo: true,
    duration: 1000
  },
  onReachBottom: function (event) {
    var page = this.data.page + 1;
    var pages = this.data.pages;
    var size = this.data.size;
    this.setData({
      page: page
    })
    if (page <= pages) {
      this.getRecommendList(page, size, false);
    } else {
      
    }
    
  },
  //下拉刷新
  onPullDownRefresh: function() {
    var size = this.data.size;
    this.setData({
      page: 1
    })
    this.getRecommendList(1, size, true);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hasGottenUserInfo()
    this.getPositions();
  },
  onShow: function (options) {
    
    
  },
  getPositions: function() {
    var that = this;
    requesttoken('util/getPositions', "GET",
      { }, function (res) {
        if (res.success) {
          var list = res.data;
          var temp = [];
          for (let i in list) {
            var posData = {}
            posData.id = i;
            posData.pid = list[i].id;
            posData.url = list[i].image;
            temp.push(posData);
          }
          console.log(temp);
          that.setData({
            imgUrls: temp
          })
        }

      })
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

  getRecommendList: function(page, size, reload) {
    this.setData({
      hidden: true
    })
    var that = this;
    requesttoken('pets/getPetsInfosFilterMitTips', "GET",
      { "page": page, "size": size}, function (res) {
        if (res.success) {
          that.setData({
            pages: res.data.pages
          })
          var pets = res.data.list;
          var petData = [];
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
            temp.type = pets[i].type;
            petData[i] = temp;
          }
          if (!reload) {
            var data = that.data.pets;
            console.log(data);
            console.log(petData);
            petData = data.concat(petData);
            console.log(petData);
          }
          that.setData({
            pets: petData,
            hidden: true
          })

        }
      })
  },

  userLogin: function (userInfo) {
    var that = this;
    var size = this.data.size;
    requestsend('/wechat/login', "GET",
      userInfo, function (res) {
        if (res.success) {
          app.globalData.token = res.data.token;
          app.globalData.userId = res.data.userId;
          that.getRecommendList(1, size, true);
        }
      });
  },

  //事件处理函数
  bindViewTap: function(event) {    
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../webview/webview?id=' + id
    })
  },

})