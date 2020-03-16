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
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
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
    // shouji: '',
    encryptedData: '',
    iv: '',
    diqu: '',
    auth: false,
  },

  getPhoneNumber (e) {
    var that = this;
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    if (encryptedData == undefined && iv == undefined) {
      wx.showToast({
        title: `授权失败！`,
        icon: "none",
        mask: true,
        duration: 1000
      })
      return;
    }
    var parms = {
      encryptedData: encryptedData,
      iv: iv
    };
    that.showLoading();loading
    requesttoken('/user/updateUserPhoneNumber', "GET",
      parms, function (res) {
        if (res.success) {
          that.hideLoading();
          that.setData({
            encryptedData: encryptedData,
            iv: iv,
            auth: true
          });
          wx.showToast({
            title: `授权成功！`,
            icon: "none",
            mask: true,
            duration: 1000
          })

        }
      })

    
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
  // onChangeshou(event) {
  //   this.setData({
  //     shouji: event.detail
  //   });
  // },
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
    var that = this;
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
      professionP: this.data.radio6 ? 1 : 0
    };
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
    that.showLoading();
    requesttoken('/user/updateUserInfo', "GET",
      parms, function (res) {
        if (res.success) {
          that.hideLoading();
          wx.showToast({
            title: `保存成功！`,
            icon: "none",
            mask: true,
            duration: 1000,
            complete: function () {
              setTimeout(function () {                
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
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
    }
    that.showLoading();
    requesttoken('/user/getMyInfo', "GET",
      {}, function (res) {
        if (res.success) {
          that.hideLoading();
          that.setData({
            radio1: res.data.sex + '',
            radio2: res.data.wechatP == 1 ? true : false,
            radio3: res.data.phoneNumberP == 1 ? true : false,
            radio4: res.data.age + '',
            radio5: res.data.areaP == 1 ? true : false,
            radio6: res.data.professionP == 1 ? true : false,
            name: res.data.trueName,
            weixing: res.data.wechat,
            // shouji: res.data.phoneNumber,
            diqu: res.data.area,
            zhiye: res.data.profession
          })
          if (res.data.phoneNumber != "" && res.data.phoneNumber != null) {              
            that.setData({
              auth: true
            })
          }
          if (res.data.area == "" || res.data.area == null) {
            that.getSetting();
          }            
        }
      })

    
  },

  getSetting:function() {
    var that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined
          && res.authSetting['scope.userLocation'] != true) {
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success: function(res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权',
                    icon:'none',
                    duration: 1000
                  })
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function(res) {
                      if (res.authSetting['scope.userLocation'] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        that.getAddress();
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              },
              fail: function() {
                wx.showToast({
                  title: '授权失败',
                  icon: 'none',
                  duration: 1000
                })
              }
            })
          } else {
            that.getAddress();
          }
      }
    })
  },

  getAddress: function() {
    qqmapsdk = new QQMapWX({
      key: 'S22BZ-ZE3CX-SPU4S-TXHT2-DKDMK-TSBKI'
    });

    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
          //根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析,前面已引入SDK
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (addressRes) {
              const result = addressRes.result;
              that.setData({
                diqu: result.address,
              })
            }            
          })

      },
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

  },

  showLoading: function () {
    this.setData({
      loading: true
    })
  },

  hideLoading: function () {
    this.setData({
      loading: false
    })
  }
})