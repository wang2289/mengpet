
// import { PetsModel } from '../../models/pets.js'
import { random } from '../../utils/util.js'
// let petsModel = new PetsModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: false,
    searchPanel: false,
    pets: Object,
    more: false,
    imgUrls: [
      {
        id: 0,
        url: '/img/ling/Group 20.png'
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
    // petsModel.getHotList((data) => {
      
      var data =[
        {
          id:'0',
          image:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          name:'毛球球球球球球球球…',
          age:'2岁1个月',
          newname:'狸花',
          tips:'亲人',
          city:'上海',
          area:'普陀',
          view:'20'
        },
        {
          id: '1',
          image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          name: '毛球球球球球球球球球球球wwwwww球球…',
          age: '1岁1个月',
          newname: '狸花',
          tips: '亲人',
          city: '上海',
          area: '普陀',
          view: '20'
        }
      ]
      this.setData({
        pets: data
      })
      // })
  },
  onShow: function (options) {
    this.hasGottenUserInfo()
  },
  onGetUserInfo: function (event) {
    debugger
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        isshow: true
      })
    }
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
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                isshow: true
              })
            }
          })
        } else {
          this.setData({
            isshow: false
          })
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