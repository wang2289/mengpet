import Dialog from 'vant-weapp/dialog/dialog'
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
    size: 8,//每页显示个数
    index: 0,
    active: 0,
    appStatus: 1,
    app: [],
    appConfirm: [],
    appCancel: [],
    reload: false
  },

  onChange(event) {
    this.setData({
      index: event.detail.index,
      active: event.detail.index
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
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
    var page = 1;
    var size = this.data.size;
    this.refreshApps(page, size, 1, true);
    this.refreshApps(page, size, 2, true);  
    this.refreshApps(page, size, 3, true);  
  },

  refreshApps: function (page, size, status, reload) {
    var that = this;
    that.showLoading();
    var param = {
      status: status,
      page: page,
      size: size
    };

    requesttoken('/app/getMyAppList', 'GET',
      param, function (res) {
        if (res.success) {
          console.log(res.data)          
          var page = res.data.pageNum;
          var pages = res.data.pages;

          var tempApp = [];
          var tempData = res.data.list;
          for (let i in tempData) {
            var temp = {};
            temp.petId = tempData[i].petId;
            temp.petName = tempData[i].nameCn;
            temp.petSex = tempData[i].sex;
            temp.petAge = tempData[i].age;
            temp.color = tempData[i].color;
            temp.feature = tempData[i].feature;
            
            var petCreateDate = tempData[i].petCreateTime.substring(0, 10);
            temp.petImage = Config.imgPath + "/" + petCreateDate + "/min_" + tempData[i].petImage;

            temp.appId = tempData[i].id;
            temp.appCreateTime = tempData[i].createTime.substring(0, 10);
            temp.appStatus = tempData[i].status;

            tempApp.push(temp);
          }

          switch (status) {
            case 1:
              var data = that.data.app;
              if (!reload) {
                tempApp = data.concat(tempApp)
              }
              that.setData({
                app: tempApp,
                pages: pages,
                page: page
              });
              break;
            case 2:
              var data = that.data.appConfirm;
              if (!reload) {
                tempApp = data.concat(tempApp)
              }
              that.setData({
                appConfirm: tempApp,
                pagesConfirm: pages,
                pageConfirm: page
              });
              break;
            case 3:
              var data = that.data.appCancel;
              if (!reload) {
                tempApp = data.concat(tempApp)
              }
              that.setData({
                appCancel: tempApp,
                pagesCancel: pages,
                pageCancel: page
              });
              break;
          }
          that.hideLoading();
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

  onDetail: function() {
    var index = this.data.index;
    if (index == 1) {
      wx.navigateTo({
        url: '/pages/help/help?action=myapp',
      })
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