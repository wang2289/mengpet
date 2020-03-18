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
    pages: 1,//总页数
    page: 1,//当前页码
    pagesConfirm: 1,//总页数
    pageConfirm: 1,//当前页码
    pagesCancel: 1,//总页数
    pageCancel: 1,//当前页码
    size: 5,//每页显示个数
    index: 0,
    active: 0,
    appStatus: 1,
    appAnswers: [],
    appAnswersConfirm: [],
    appAnswersCancel: [],
    reload: false
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
    var page = 1;
    var size = this.data.size;
    this.refreshApps(page, size, 1, true);
    this.refreshApps(page, size, 2, true);
    this.refreshApps(page, size, 3, true);    
  },

  refreshApps: function(page, size, status, reload) {
    var that = this;
    that.showLoading();
    var param = {
      status: status,
      page: page, 
      size: size
    };

    requesttoken('/app/getAppList', 'GET',
      param, function (res) {
        if (res.success) {
          console.log(res.data)
          var tempAppAnswers = [];
          var tempData = res.data.appSimpleList;
          var pageInfo = res.data.pageInfo;
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

            
            tempAppAnswers.push(temp);
          }
             
          switch(status) {
            case 1: 
              var data = that.data.appAnswers;
              if (!reload) {
                tempAppAnswers = data.concat(tempAppAnswers)
              }
              that.setData({
                appAnswers: tempAppAnswers,
                pages: pageInfo.pages,
                page: pageInfo.pageNum
              });
              break;
            case 2:
              var data = that.data.appAnswersConfirm;
              if (!reload) {
                tempAppAnswers = data.concat(tempAppAnswers)
              }
              that.setData({
                appAnswersConfirm: tempAppAnswers,
                pagesConfirm: pageInfo.pages,
                pageConfirm: pageInfo.pageNum
              }); 
              break;
            case 3:
              var data = that.data.appAnswersCancel;
              if (!reload) {
                tempAppAnswers = data.concat(tempAppAnswers)
              }
              that.setData({
                appAnswersCancel: tempAppAnswers,
                pagesCancel: pageInfo.pages,
                pageCancel: pageInfo.pageNum
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
  onReachBottom: function (event) {
    var that = this;
    var status = that.data.appStatus;
    var size = that.data.size;
    switch (status) {
      case 1:
        var page = that.data.page + 1;
        var pages = that.data.pages;
        that.setData({
          page: page
        })
        if (page <= pages) {
          that.refreshApps(page, size, 1, false);
        }
        break;
      case 2:
        var pageConfirm = that.data.pageConfirm + 1;
        var pagesConfirm = that.data.pagesConfirm;
        that.setData({
          pageConfirm: pageConfirm
        })
        if (pageConfirm <= pagesConfirm) {
          that.refreshApps(pageConfirm, size, 2, false);
        }
        break;
      case 3:
        var pageCancel = that.data.pageCancel + 1;
        var pagesCancel = that.data.pagesCancel;
        that.setData({
          pageCancel: pageCancel
        })
        if (pageCancel <= pagesCancel) {
          that.refreshApps(pageCancel, size, 3, false);
        }
        break;
    }

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