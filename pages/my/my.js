// pages/book/book.js
import {
  random
} from '../../utils/util.js'
let app = getApp();
import {
  requestsend,
  requesttoken
} from '../../utils/util.js'
import {
  Config
} from '../../utils/config'
import {
  Token
} from '../../utils/token.js'
Page({

  data: {
    user: {
      sex: 0,
      userId: '',
      userPhoto: '',
      userName: ''
    }
  },

  onLoad: function() {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          userPhoto: res.userInfo.avatarUrl,
          userName: res.userInfo.nickName
        })
      }
    })
  },

  onShow: function(option) {
    var that = this;
    requesttoken('/user/getMyInfo', 'GET',
      {}, function (res) {
        console.log(res);
        if (res.success) {
          that.setData({
            userSex: res.data.sex
          })
          
        }
      })
  },

  viewMyCard: function() {
    wx.navigateTo({
      url: '/pages/myCard/myCard',
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: '爪盟星',
      path: '/pages/index/index',
      imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'
    }
  }
})