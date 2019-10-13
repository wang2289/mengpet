
// import { PetsModel } from '../../models/pets.js'
import { random } from '../../utils/util.js'
// let petsModel = new PetsModel()
let app = getApp();
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
    var that = this;
    wx.request({
      url: app.globalData.remoteUrl + '/pets/getPetsInfosFilter',
      data: { "page": 1, "size": 4},
      method: "GET",
      success: function (res) {
        if (res.data.success) {
          var pets = res.data.data.list;
          var petData = {};
          console.log(pets);
          for (var i = 0; i < pets.length; i++) {
            var temp = {};
            temp.id = pets[i].id;
            temp.image = pets[i].photosId;
            temp.name = pets[i].nameCn;
            temp.age = pets[i].age;
            temp.newname = pets[i].color;
            temp.tips = pets[i].feature;
            temp.city = 'city';
            temp.area = pets[i].area;
            temp.view = pets[i].view;
            petData[i] = temp;
          }
          that.setData({
            pets: petData
          })

        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })
      // var data =[
      //   {
      //     id:'0',
      //     image:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      //     name:'毛球球球球球球球球…',
      //     age:'2岁1个月',
      //     newname:'狸花',
      //     tips:'亲人',
      //     city:'上海',
      //     area:'普陀',
      //     view:'20'
      //   },
      //   {
      //     id: '1',
      //     image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      //     name: '毛球球球球球球球球球球球wwwwww球球…',
      //     age: '1岁1个月',
      //     newname: '狸花',
      //     tips: '亲人',
      //     city: '上海',
      //     area: '普陀',
      //     view: '20'
      //   }
      // ]
      // this.setData({
      //   pets: data
      // })
  },
  onShow: function (options) {
    this.hasGottenUserInfo()
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

  userLogin: function(userInfo) {
    wx.request({
      url: app.globalData.remoteUrl + '/wechat/login',
      data: userInfo,
      method: "GET",
      success: function (res) {
        if (res.data.success) {
          app.globalData.token = res.data;
        }
        // console.log(app.globalData.token);
      },
      fail: function () {
        
      },
      complete: function () {
        
      }
    })
  },

  upload: function() {
    wx.request({
      url: 'localhost://',//上线的话必须是https，没有appId的本地请求貌似不受影响
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data.result)
        that.setData({
          Industry: res.data.result
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }

})