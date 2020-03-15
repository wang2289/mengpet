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

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      sex: 0,
      userId: '',
      userPhoto: '',
      userName: '',
      profession: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    requesttoken('/user/getMyInfo', 'GET',
      {}, function (res) {
        console.log(res);
        if (res.success) {
          that.setData({
            sex: res.data.sex,
            area: res.data.area,
            profession: res.data.profession
          })

        }
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})