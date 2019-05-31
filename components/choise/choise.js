// components/choise/choise.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: false,
    nlistUrl: '/img/ling/appstore-o - anticon2.png',
    listUrl: '/img/ling/appstore-o - anticon.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (event) {
      this.setData({
        list: !this.data.list,
      })
    }
  }
})
