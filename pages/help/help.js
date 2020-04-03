Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '帮助与反馈',
    message: '若您遇到任何问题，请联系下方在线客服，我们竭诚为您服务。',
    action: 'help',//help:从帮助页面进入；confirm:点击初审通过后进入；myapp:点击我的申请中审核通过的详情进入
    text: {
      'help': {
        title: '帮助与反馈',
        message: '若您遇到任何问题，请联系下方在线客服，我们竭诚为您服务。',
      },
      'confirm': {
        title: '请联系客服完成后续操作',
        message: '客服将联系您和申请领养人，并协调后续领养流程，感谢您对爪盟星的信任和支持！',
      },
      'myapp': {
        title: '恭喜，初审通过，请联系客服',
        message: '客服将联系您和领养人，并协调后续领养流程，感谢您对爪盟星的信任和支持！',
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var action = options.action
    var text = this.data.text;
    var title = this.data.title;
    var message = this.data.message;
    if (action == undefined || action == null || action == '') {
      action = 'help';
    }
    var item = text[action];
    title = item.title;
    message = item.message

    if (action == 'confirm') {
      
    } else if (action == 'myapp') {
      
    }
    this.setData({
      action: action,
      title: title,
      message: message
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
    var action = this.data.action;
    if (action == 'confirm') {
      wx.navigateBack({
        delta: 1
      })
    }
    
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