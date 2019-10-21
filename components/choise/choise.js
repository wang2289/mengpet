// components/choise/choise.js
var param = {

}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    islist:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: false,
    isshowpet:true,
    isshowpet2: true,
    isshowchoise:true,
    isActive:0,
    isActive2: 0,
    isshow2: false,
    onActive:false,
    onActive2: false,
    onActive3: false,
    textActive:'综合排序',
    nlistUrl: '/images/appstore-o-anticon2.png',
    listUrl: '/images/appstore-o-anticon.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (event) {
      this.setData({
        list: !this.data.list,
      })
      let item = { list: this.data.list }
      this.triggerEvent('addInfo', item)
      // this.properties.islist = this.data.list
      // var myEventDetail = { list: this.data.list} // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('tap', myEventDetail, myEventOption)

    },
    Onclose: function () {
      this.setData({
        isshowpet: true,
        isshowpet2: true,
        onActive:false,
        onActive2: false
      })
    },
    onChange:function(){
      this.setData({
        isshowpet: !this.data.isshowpet,
        onActive: !this.data.onActive
      })
    },
    onChange2: function () {
      this.setData({
        isshowpet2: !this.data.isshowpet2,
        onActive2: !this.data.onActive2
      })
    },
    onChoise: function () {
      this.setData({
        isshowchoise: !this.data.isshowchoise,
        onActive3: !this.data.onActive3
      })
    },
    onActive:function(e){
      var index = e.currentTarget.dataset.tab;//获取当前点击的元素下标
      var text = e.currentTarget.dataset.text;
      console.log(e.currentTarget);
      this.setData({
        isActive: index,
        textActive: text,
        onActive: !this.data.onActive,
        isshowpet: !this.data.isshowpet
      })
    },
    onActive2: function (e) {
      var index = e.currentTarget.dataset.tab;//获取当前点击的元素下标
      console.log(e.currentTarget);
      this.setData({
        isActive2: index,
        onActive2: !this.data.onActive2,
        isshowpet2: !this.data.isshowpet2
      })
    }
  }
})
