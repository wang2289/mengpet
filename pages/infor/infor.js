import {
  Config
} from '../../utils/config.js'
// pages/book/book.js
import {BookModel} from '../../models/book.js'
import {random} from '../../utils/util.js'
// let bookModel = new BookModel()
let app = getApp();
import {
  requestsend,
  requesttoken
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modify: false,
    searchPanel:false,
    books:Object,
    radio1: "0",
    radio2: true,
    radio3: true,
    radio4: "0",
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
      nickName: this.data.name,
      sex: this.data.radio1,
      wechat: this.data.weixing,
      phoneNumber: this.data.shouji,
      age: this.data.radio4,
      area: this.data.diqu,
      profession: this.data.zhiye,
      wechatP: this.data.radio2 ? 1 : 0,
      phoneNumberP: this.data.radio3 ? 1 : 0,
      areaP: this.data.radio5 ? 1 : 0,
      professionP: this.data.radio6 ? 1 : 0,
    };
    console.log(parms);

    requesttoken('/user/updateUserInfo', "GET",
      parms, function (res) {
        console.log(res);
        if (res.success) {

        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let type = options.type;
    if(type == 'show') {
      this.setData({
        modify: true
      });
      requesttoken('/user/getMyInfo', "GET",
        {}, function (res) {
          console.log(res);
          if (res.success) {
            that.setData({
              radio1: res.data.sex + '',
              radio2: res.data.wechatP == 1 ? true : false,
              radio3: res.data.phoneNumberP == 1 ? true : false,
              radio4: res.data.age + '',
              radio5: res.data.areaP == 1 ? true : false,
              radio6: res.data.professionP == 1 ? true : false,
              name: res.data.nickName,
              weixing: res.data.wechat,
              shouji: res.data.phoneNumber,
              diqu: res.data.area,
              zhiye: res.data.profession
            })
          }
        })
    }
    
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