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
    loading: false,
    index: 0,
    active: 0,
    appStatus: 1,
    pets: [],
    petsConfirm: [],
    petsCancel: [],
    
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

  onChange(event) {
    let index = event.detail.index;
    var tempStatus = index + 1;
    this.setData({
      index: event.detail.index,
      active: event.detail.index,
      appStatus: tempStatus
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refreshPets(1);
    this.refreshPets(2);
    this.refreshPets(3);    
  },

  refreshPets: function(status) {
    var that = this;
    that.showLoading();
    requesttoken('/app/getAppList', 'GET',
      { "status": status }, function (res) {
        if (res.success) {
          console.log(res.data)
          
          var appAnswers = [];
          var tempData = res.data;
          for (let i in tempData) {
            var temp = {};
            temp.areaAns = tempData[i].areaAns;
            temp.expAns = tempData[i].expAns;
            temp.jobAns = tempData[i].jobAns;
            temp.loverAns = tempData[i].loverAns;
            temp.marryAns = tempData[i].marryAns;
            
            temp.petNameCn = tempData[i].petNameCn;
            temp.petSex = tempData[i].petSex;

            var phCreateDate = tempData[i].phCreateTime.substring(0, 10);
            temp.image = Config.imgPath + "/" + phCreateDate + "/min_" + tempData[i].path;
            
            temp.appId = tempData[i].appId;
            temp.appCreateTime = tempData[i].appCreateTime.substring(0, 10);

            temp.userNickName = tempData[i].userNickName;
            temp.userSex = tempData[i].userSex;
            var temparea = tempData[i].userArea;
            if (temparea.length > 10) {
              temparea = temparea.substring(0,10) + '...'
            }
            temp.userArea = temparea; 
            // var tempAge = tempData[i].age;
            // switch (tempAge) {
            //   case 0:
            //     tempAge = '60后';
            //     break;
            //   case 1:
            //     tempAge = '70后';
            //     break;
            //   case 2:
            //     tempAge = '80后';
            //     break;
            //   case 3:
            //     tempAge = '90后';
            //     break;
            //   case 4:
            //     tempAge = '00后';
            //     break;
            // }
            // temp.applyage = tempAge;

            
            appAnswers.push(temp);
          }
          switch(status) {
            case 1: 
              that.setData({
                appAnswers: appAnswers
              });
              break;
            case 2:
              that.setData({
                appAnswersConfirm: appAnswers
              }); 
              break;
            case 3:
              that.setData({
                appAnswersCancel: appAnswers
              }); 
              break;
          }
          that.hideLoading();
        }
      })
  },

  onDetail: function (event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/appDetails/appDetails?id=' + id + '&appStatus=' + that.data.appStatus,
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

  },

  showLoading: function () {
    this.setData({
      loading: true
    })
  },

  hideLoading: function () {
    this.setData({
      loading: false
    })
  }
})