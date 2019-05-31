// components/book/normal/book-normal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pet: Object,
    showLike: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: String,
    author: String,
    hotKeys: [],
    img: String
  },
  attached: function () {
    var hot = ['编辑', '下架','分享']
    // keyModel.getHot((data)=>{
    this.setData({
      hotKeys: hot
    })
    // })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (event) {
      this.triggerEvent('pettap', {
        bid: this.properties.pet.id
      }, {})
      wx.navigateTo({
        url: '../../pages/detail/detail?bid=' + this.properties.pet.id,
      })
    }
  }
})
