
// import { PetsModel } from '../../models/pets.js'
import { random } from '../../utils/util.js'
// let petsModel = new PetsModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPanel: false,
    pets: Object,
    more: false,
    imgUrls: [
      '/img/ling/Group 20.png',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay:true,
    interval: 5000,
    duration: 1000
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
    // petsModel.getHotList((data) => {
      var data =[
        {
          id:'0',
          image:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          name:'毛球球球球球球球球…',
          age:'1岁1个月',
          newname:'狸花',
          tips:'亲人',
          city:'上海',
          area:'普陀',
          view:'20'
        },
        {
          id: '1',
          image: '/images/icon/search.png',
          name: '毛球球球球球球球球球球球wwwwww球球…',
          age: '1岁1个月',
          newname: '狸花',
          tips: '亲人',
          city: '上海',
          area: '普陀',
          view: '20'
        }
      ]
      this.setData({
        pets: data
      })
    // })
  },

  onActivateSearch: function (event) {
    this.setData({
      searchPanel: true
    })
  },
  onCitySearch:function(){
    wx.navigateTo({
      url: '/pages/searchcity/searchcity'
    })
  },
  onPetSearch:function(){
    wx.navigateTo({
      url: '/pages/searchpet/searchpet'
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