// pages/book/book.js
import {BookModel} from '../../models/book.js'
import {random} from '../../utils/util.js'
let bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPanel:false,
    books:Object,
    items: [
      { name: '0', value: '先生' },
      { name: '1', value: '女士', checked: 'true' },
    ],
    items2: [
      { name: '0', value: '60后', checked: 'true' },
      { name: '1', value: '70后' },
      { name: '2', value: '80后' },
      { name: '3', value: '90后' },
      { name: '4', value: '00后' },
    ],
    more:false
  },

  onReachBottom: function (event) {
    this.setData({
      more:random(16)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList((data)=>{
      this.setData({
        books:data
      })
    })
  },

  onActivateSearch:function(event){
    this.setData({
      searchPanel:true
    })
  },

  onCancel:function(event){
    this.setData({
      searchPanel:false
    })
  },

  onShareAppMessage() {

  }
})