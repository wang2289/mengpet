// pages/mysong/mysong.js
let app = getApp();
import {
  Config
} from '../../utils/config.js'
import {
  requestsend,
  requesttoken
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pets: Object,
    tihsi: Object,
    showif: false,
    isActive: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    requesttoken('/app/getAppList', 'GET',
      { "status": 1 }, function (res) {
        console.log(res);
        if (res.success) {
          var pets = [];
          var tempData = res.data;
          for (let i in tempData) {
            var temp = {};
            temp.id = tempData[i].id;
            temp.petId = tempData[i].petId;
            temp.type = tempData[i].type;
            temp.sex = tempData[i].sex;
            var petCreateDate = tempData[i].petCreateTime.substring(0, 10);
            temp.image = Config.imgPath + "/" + petCreateDate + "/" + tempData[i].image;
            temp.name = tempData[i].petName;
            temp.appId = tempData[i].appId;
            temp.applyName = tempData[i].nickName;
            temp.applyarea = tempData[i].area;
            temp.applyage = tempData[i].age;
            temp.applydate = tempData[i].createTime.substring(0, 10);
            pets.push(temp);
          }
          that.setData({
            pets: pets
          })
        }
      })
    
  },

  onDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/appDetails/appDetails?id=' + id,
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