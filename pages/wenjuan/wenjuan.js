// pages/wenjuan/wenjuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        desc: '养宠经验'
      },
      {
        desc: '居住环境'
      },
      {
        desc: '个人情况'
      }
    ],
    active:0,
    pics1: [], //图片
    pics2: [], //图片
    pics3: [], //图片
    index:0,
    showpic1: '/images/add_a_photo-material.png',
    showpic2: '/images/add_a_photo-material.png',
    showpic3: '/images/add_a_photo-material.png',
    result1: '',
    result2: '',
    result3: '',
    result4: '',
    result5: [],
    result6: '',
    result7: [],
    result8: '',
    result9: [],
    result10: [],
    result11: [],
    result12: '',
    result13: '',
    result14: '',
    result15: '',
    result16: '',
    result17: '',
  },
  Nexttap(event) {
    console.log(event)
    var index = event.target.dataset.index;
    console.log(index)
    this.setData({
      index: index,
      active: index
    });
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  Oninput1 (e) {
    this.setData({
      value1: e.detail.value
    });
  },
  Oninput2(e) {
    this.setData({
      value2: e.detail.value
    });
  },
  Oninput3(e) {
    this.setData({
      value3: e.detail.value
    });
  },
  onChange1(event) {
    this.setData({
      result1: event.detail
    });
  },
  onChange2(event) {
    this.setData({
      result2: event.detail
    });
  },
  onChange3(event) {
    this.setData({
      result3: event.detail
    });
  },
  onChange4(event) {
    this.setData({
      result4: event.detail
    });
  },
  onChange5(event) {
    this.setData({
      result5: event.detail
    });
  },
  onChange6(event) {
    this.setData({
      result6: event.detail
    });
  },
  onChange7(event) {
    this.setData({
      result7: event.detail
    });
  },
  onChange8(event) {
    this.setData({
      result8: event.detail
    });
  },
  onChange9(event) {
    this.setData({
      result9: event.detail
    });
  },
  onChange10(event) {
    this.setData({
      result10: event.detail
    });
  },
  onChange11(event) {
    this.setData({
      result11: event.detail
    });
  },
  onChange12(event) {
    this.setData({
      result12: event.detail
    });
  },
  onChange13(event) {
    this.setData({
      result13: event.detail
    });
  },
  onChange14(event) {
    this.setData({
      result14: event.detail
    });
  },
  onChange15(event) {
    this.setData({
      result15: event.detail
    });
  },
  onChange16(event) {
    this.setData({
      result16: event.detail
    });
  },
  onChange17(event) {
    this.setData({
      result17: event.detail
    });
  },
  Submit(event){
    var param={
      result1: this.data.result1,
      result2: this.data.result2,
      result3: this.data.result3,
      result4: this.data.result4,
      result5: this.data.result5,
      result6: this.data.result6,
      result7: this.data.result7,
      result8: this.data.result8,
      result9: this.data.result9,
      result10: this.data.result10,
      result11: this.data.result11,
      result12: this.data.result12,
      result13: this.data.result13,
      result14: this.data.result14,
      result15: this.data.result15,
      result16: this.data.result16,
      result17: this.data.result17,
      value1: this.data.value1,
      value2: this.data.value2,
      value3: this.data.value3,
    }
    console.log(param)
  },
  //上传图片开始
  chooseImg1: function (e) {
    var that = this,
      pics = this.data.pics1;
    console.log(pics);
    if (pics.length < 3) {
      wx.chooseImage({
        count: 3, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          // wx.showToast({
          //   title: '正在上传...',
          //   icon: 'loading',
          //   mask: true,
          //   duration: 10000
          // });
          for (var i = 0; i < tempFilePaths.length; i++) {
            pics.push(tempFilePaths[i]);
          }
          var num = tempFilePaths.length - 1
          if (tempFilePaths.length > 0) {
            that.setData({
              showon: true,
              showpic: tempFilePaths[num]
            })
          } else {
            that.setData({
              showon: false,
              showpic: '/images/add_a_photo-material.png'
            })
          }

          console.log(pics);
          that.setData({
            pics: pics
          })
        },
      });
    } else {
      wx.showToast({
        title: '最多上传3张图片',
        icon: 'none',
        duration: 3000
      });
    }
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