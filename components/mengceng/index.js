// components/mengceng/mengceng.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    isshow: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '',
    isshow:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancle: function (event) {
      this.setData({
        isshow: !this.data.isshow,
      })
      var myEventDetail = { isshow: this.data.isshow } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('cancle', myEventDetail, myEventOption)
    },
    onSubmit: function (event) {
      this.setData({
        isshow: !this.data.isshow,
      })
      var myEventDetail = { isshow: this.data.isshow } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('submit', myEventDetail, myEventOption)
    },
  }
})
