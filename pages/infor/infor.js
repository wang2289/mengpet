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
    radio1:"1",
    radio2: true,
    radio3: true,
    radio4: "1",
    radio5: true,
    radio6: true,
    more:false,
    name:'',
    weixing: '',
    shouji: '',
    diqu: '',
  },
  onChangename(event) {
    this.setData({
      name: event.detail
    });
  },
  onChangewei(event) {
    this.setData({
      weixing: event.detail
    });
  },
  onChangeshou(event) {
    this.setData({
      shouji: event.detail
    });
  },
  onChangedi(event) {
    this.setData({
      diqu: event.detail
    });
  },
  onChangezhi(event) {
    this.setData({
      zhiye: event.detail
    });
  },
  onReachBottom: function (event) {
    this.setData({
      more:random(16)
    })
  },
  onChange2: function(event) {
    this.setData({
      radio2: event.detail
    });
  },
  onChange3: function (event) {
    this.setData({
      radio3: event.detail
    });
  },
  onChange5: function (event) {
    this.setData({
      radio5: event.detail
    });
  },
  onChange6: function (event) {
    this.setData({
      radio6: event.detail
    });
  },
  onChange4: function (event) {
    this.setData({
      radio4: event.detail
    });
  },
  onChange1: function (event) {
    this.setData({
      radio1: event.detail
    });
  },
  onSave: function () {
    var parms = {
      name: this.data.name,
      sex: this.data.radio1,
      weixing: this.data.weixing,
      shouji: this.data.shouji,
      diqu: this.data.diqu,
      zhiye: this.data.zhiye,
      weigong: this.data.radio2,
      phonegong: this.data.radio3,
      ages: this.data.radio4,
      diqugong: this.data.radio5,
      zhiyegong: this.data.radio6,
    };
    console.log(parms);
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