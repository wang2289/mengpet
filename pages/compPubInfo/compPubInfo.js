import AreaList from '../../static/js/area.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      userId: 123456,
      userPhoto: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      username: '白熊',
      gender: 1,
      weixin: 'abc1234',
      weixinPub: false,
      phone: '13888888888',
      phonePub: false,
      age: 28,
      regionData: '',
      jobData: '',
      areaCode: 110101
    },
    areaShow: false,
    jobShow: false,
    areaList: AreaList,
    jobList: ['设计师', '工程师', '公务员', '自由职业']
  },

  onAreaShow: function() {
    this.setData({
      areaShow: true
    })
  },

  onAreaCancel: function onAreaCancel() {
    this.setData({
      areaShow: false
    })
  },
  onAreaConfirm: function onAreaConfirm(e) {
    var obj = e.detail;
    // 得到索引
    // let index = obj.index
    // // 得到值
    var val = obj.values;
    this.setData({
      areaShow: false,
      areaCode: val[2].code,
      'user.regionData': val[0].name + '  ' + val[1].name + '  ' + val[2].name
    })
  },

  onJobShow: function () {
    this.setData({
      jobShow: true
    })
  },
  onJobCancel: function onJobCancel() {
    this.setData( {
      jobShow: false
    })
  },
  onJobConfirm: function onJobConfirm(e) {
    var obj = e.detail;
    // 得到索引
    // let index = obj.index
    // 得到值
    var val = obj.value;
    this.setData({
      'user.jobData': val,
      jobShow: false
    })
  },
  onChangeGender: function onChangeGender(e) {
    this.setData({
      'user.gender': e.detail ,
    })
  },
  onChangeWeixinPub: function onChangeWeixinPub(e) {
    this.setData({
      'user.weixinPub': e.detail ,
    })
  },
  onChangePhonePub: function onChangePhonePub(e) {
    this.setData({
      'user.phonePub': e.detail ,
    })
  },
  onChangeAge: function onChangeAge(e) {
    this.setData({
      'user.age': e.detail ,
    })
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