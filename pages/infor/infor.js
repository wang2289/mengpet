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
    radio1: "1",
    radio2: false,
    radio3: false,
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onSave: function () {
    var parms = {
      trueName: this.data.name,
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
    if (!parms.trueName) {
      wx.showToast({
        title: `请填写姓名！`,
        icon: "none"
      })
      return;
    }
    if (!parms.wechat) {
      wx.showToast({
        title: `请填写微信号！`,
        icon: "none"
      })
      return;
    }
    // if (!parms.phoneNumber) {
    //   wx.showToast({
    //     title: `请填写手机号！`,
    //     icon: "none"
    //   })
    //   return;
    // }
    if (!parms.area) {
      wx.showToast({
        title: `请填写地区！`,
        icon: "none"
      })
      return;
    }
    if (!parms.profession) {
      wx.showToast({
        title: `请填写职业！`,
        icon: "none"
      })
      return;
    } 
    requesttoken('/user/updateUserInfo', "GET",
      parms, function (res) {
        console.log(res);
        if (res.success) {
          wx.showToast({
            title: `保存成功！`,
            icon: "none",
            mask: true,
            duration: 1000
          })

          var pages = getCurrentPages();
          //   var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            approveStatus:1
          })
          wx.navigateBack({
            delta: 1
          })
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
              name: res.data.trueName,
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