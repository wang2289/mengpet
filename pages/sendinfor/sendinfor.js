// pages/book/book.js
import { BookModel } from '../../models/book.js'
import { random } from '../../utils/util.js'
let bookModel = new BookModel()
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPanel: false,
    books: Object,
    items: [
      { name: '1', value: '弟弟' },
      { name: '0', value: '妹妹', checked: 'true' },
    ],
    quchong: [
      { name: '0', value: '未驱虫' },
      { name: '1', value: '已驱虫' },
    ],
    yimiao: [
      { name: '0', value: '未疫苗' },
      { name: '2', value: '疫苗中' },
      { name: '1', value: '已疫苗' },
    ],
    jueyu: [
      { name: '0', value: '未绝育' },
      { name: '1', value: '已绝育' },
    ],
    items2: [
      { name: '0', value: '60后', checked: 'true' },
      { name: '1', value: '70后' },
      { name: '2', value: '80后' },
      { name: '3', value: '90后' },
      { name: '4', value: '00后' },
    ],
    catColor: [],
    dogColor: [],
    catFeature: [],
    dogFeature: [],

    more: false
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
    bookModel.getHotList((data) => {
      this.setData({
        books: data
      })
    }),
    console.log(app);
    wx.request({
      url: app.globalData.remoteUrl + '/util/getPickerPetUpload',
      data: {},
      method: "GET",
      success: function(res) {
        that.setData({
          catColor: res.data.data.catColor,
          dogColor: res.data.data.dogColor,
          catFeature: res.data.data.catFeature,
          dogFeature: res.data.data.dogFeature
        })
      },
      fail: function() {

      },
      complete: function() {

      }
    })
  },

  onActivateSearch: function (event) {
    this.setData({
      searchPanel: true
    })
  },

  onCancel: function (event) {
    this.setData({
      searchPanel: false
    })
  },

  onShareAppMessage() {

  }
})