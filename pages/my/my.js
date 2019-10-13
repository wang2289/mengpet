// pages/book/book.js
import {
  random
} from '../../utils/util.js'
let app = getApp();
import {
  requestsend,
  requestsendtoken
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
      userId: 123456,
      userPhoto: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      userName: '白熊'
    }
  },


  viewPersonalPages: function viewPersonalPages(e) {
    wx.navigateTo({
      url: '../myPages/myPages?id=' + this.data.user.userId
    });
  }

})