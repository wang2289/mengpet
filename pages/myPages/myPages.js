Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      userId: 123456,
      userPhoto: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      userName: '白熊',
      isActive: false
    },
    catsList: [
      {
        id: '0',
        image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        name: '毛球球球球球球球',
        age: '1岁1个月',
        newname: '狸花',
        tips: '亲人',
        city: '上海',
        area: '普陀',
        view: '20'
      },
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        name: '毛球球球球球球球球球球球wwwwww球',
        age: '1岁1个月',
        newname: '狸花',
        tips: '亲人',
        city: '上海',
        area: '普陀',
        view: '20'
      }
    ]
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