import Dialog from 'vant-weapp/dialog/dialog'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    active: 0,
    applyIngList: [{
      id: '0',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '栗子',
      applyName: '海华',
      applyarea: '上海',
      applyage: '90后',
      applydate: '2019.07.02',
      cancleReason: '该宠物已下架'
    }, {
      id: '1',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '栗子',
      applyName: '格式',
      applyarea: '上海',
      applyage: '90后',
      applydate: '2019.07.02',
      cancleReason: '该宠物已确认送养'
    }, {
      id: '1',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '栗子…',
      applyName: '设个人',
      applyarea: '上海',
      applyage: '90后',
      applydate: '2019.07.02',
      cancleReason: '该宠物已确认送养'
    }, {
      id: '1',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '栗子…',
      applyName: '推介会让',
      applyarea: '上海',
      applyage: '90后',
      applydate: '2019.07.02',
      cancleReason: '已拒绝该申请'
    }],

    applyedList: [{
      id: '0',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '栗子',
      lingyangName: '小娃',
      phone: 13888888888,
      weixin: 'asffsgf',
      date: '2019.03.02'
    }, {
      id: '1',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '花化',
      lingyangName: '小娃',
      phone: 13888888888,
      weixin: 'asffsgf',
      date: '2019.03.02'
    }, {
      id: '1',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '小狸狸狸狸狸狸狸狸狸狸狸狸狸',
      lingyangName: '小娃',
      phone: 13888888888,
      weixin: 'asffsgf',
      date: '2019.03.02'
    }],
    // applyIng: true,
    // cancleApply: false
    operateType: true
  },

  onChange(event) {
    this.setData({
      index: event.detail.index,
      active: event.detail.index
    });
  },

  onConfirm() {
    let message = '是否确定接受该申请，该宠物的其他申请将自动拒绝。'
    // eslint-disable-next-line no-undef
    Dialog.confirm({
      message: message
    }).then(() => {
      // on confirm
      console.log('提交')
    }).catch(() => {
      // on cancel
      console.log('取消')
    })
  },

  onRefuse() {
    let message = '是否确定拒绝该申请，该操作无法撤销。'

    // eslint-disable-next-line no-undef
    Dialog.confirm({
      message: message
    }).then(() => {
      // on confirm
      console.log('提交')
    }).catch(() => {
      // on cancel
      console.log('取消')
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