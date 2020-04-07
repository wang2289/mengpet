// pages/book/book.js
import areajs from '../../static/js/area.js'
import {
  random
} from '../../utils/util.js'
let app = getApp();
import {
  requestsend,
  requesttoken,
  requestpic
} from '../../utils/util.js'
import {
  Config
} from '../../utils/config'
import {
  Token
} from '../../utils/token.js'
import Dialog from 'vant-weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    scrollHeight: 1000,
    searchPanel: false,
    books: Object,
    radio0: '0',
    radio1: '1',
    radio2: '0',
    radio3: '0',
    radio4: '0',
    color: [],    
    colorids: [],
    colorselectid: [],
    colorchoice: [],
    feature: [],
    featureids: [],
    featureselectid: [],
    featurechoice: [],
    pics: [], //图片
    showpic: '/images/add_a_photo-material.png',
    more: false,
    photoIds: [],
    crop: false,
    showAge: false,
    ageColumns: [
        {
          values: ['未满1岁', '1岁', '2岁', '3岁', '4岁', '5岁', '6岁', '7岁', '8岁', '9岁', '10岁', '11岁', '12岁', '13岁', '14岁', '15岁', '16岁']
        },
        {
          values: ['1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '10个月', '11个月', '12个月']
        }
    ],
  },

  onReachBottom: function(event) {},
  onTap1(event) {
    // console.log(event);
    var index = event.target.dataset.index;
    var value = event.currentTarget.dataset.value;
    var colorch = this.data.colorchoice;
    var colselid = this.data.colorselectid;
    var missionArr = this.data.color;
    for (let i in missionArr) {
      //遍历列表数据      
      if (i == index) {
        //根据下标找到目标,改变状态  
        if (missionArr[i].status == 1) {
          missionArr[i].status = 0
          this.remove(colorch, value);
          this.remove(colselid, this.data.colorids[i]);
        } else {
          missionArr[i].status = 1
          colorch.push(value);
          colselid.push(this.data.colorids[i])
        }
      }
    }
    this.setData({
      color: missionArr,
      colorselectid: colselid
    });
  },
  onTap2(event) {
    // console.log(event);
    var index = event.target.dataset.index;
    var value = event.currentTarget.dataset.value;
    var featurech = this.data.featurechoice;
    var fetselid = this.data.featureselectid;
    var missionArr = this.data.feature;
    for (let i in missionArr) {
      //遍历列表数据      
      if (i == index) {
        //根据下标找到目标,改变状态  
        if (missionArr[i].status == 1) {
          missionArr[i].status = 0
          this.remove(featurech, value);
          this.remove(fetselid, this.data.featureids[i]);
        } else {
          missionArr[i].status = 1
          featurech.push(value);
          fetselid.push(this.data.featureids[i]);
        }
      }
    }
    this.setData({
      feature: missionArr,
      featureselectid: fetselid
    });
  },
  onChange0(event) {
    this.setData({
      radio0: event.detail,
      featurechoice: [],
      featureselectid: [],
      feature: [],
      colorchoice: [],
      colorselectid: [],
      color: []
    });
    this.changeTips(event.detail);
  },
  onChange1(event) {
    // console.log(event.detail);
    this.setData({
      name: event.detail
    });
  },
  onChange2(event) {
    this.setData({
      radio1: event.detail
    });
  },
  onChange3(event) {
    var value = event.detail.value;
    var index = event.detail.index;
    var year = value[0];
    var month = value[1];
    if (index[0] == 0) {
      year = '';
    } 
    var age = year + month;
    this.setData({
      age: age,
      showAge: false
    });
  },
  onChange4(event) {
    this.setData({
      area: event.detail
    });
  },
  onChange5(event) {
    this.setData({
      radio2: event.detail
    });
  },
  onChange6(event) {
    this.setData({
      radio3: event.detail
    });
  },
  onChange7(event) {
    this.setData({
      radio4: event.detail
    });
  },
  onChange8(event) {
    // console.log(event)
    this.setData({
      message: event.detail.value
    });
  },
  Finish: function() {
    var that = this;
    if (that.data.permission != 1) {
      wx.showToast({
        title: `您的信息需认证后才可以发布宠物信息`,
        icon: "none"
      })
      return;
    } 
    var picsData = this.data.pics
    var photoIdStr = "";
    console.log(this.data.photoIds)
    for (let l in this.data.photoIds) {
      photoIdStr += this.data.photoIds[l];
      if (l < this.data.photoIds.length - 1) {
        photoIdStr += "#";
      } 
    }
    console.log(photoIdStr)

    var colorselidstr = ""
    for (let l in this.data.colorselectid) {
      colorselidstr += this.data.colorselectid[l];
      if (l < this.data.colorselectid.length - 1) {
        colorselidstr += "#"
      }
    }

    var featureselidstr = ""
    for (let l in this.data.featureselectid) {
      featureselidstr += this.data.featureselectid[l];
      if (l < this.data.featureselectid.length - 1) {
        featureselidstr += "#"
      }
    }

    var parms = {
      nameCn: this.data.name,
      type: this.data.radio0,
      sex: this.data.radio1,
      age: this.data.age,
      area: this.data.area,
      desc: this.data.message,
      quchong: this.data.radio2,
      yimiao: this.data.radio3,
      jueyu: this.data.radio4,
      // color: this.data.colorchoice,
      // feature: this.data.featurechoice,
      color: colorselidstr,
      feature: featureselidstr,
      photoId: photoIdStr
    };
    console.log(parms)
    
    
    if (!parms.nameCn) {
      wx.showToast({
        title: `请填写宠物昵称！`,
        icon: "none"
      })
      return;
    } 
    if (!parms.age) {
      wx.showToast({
        title: `请填写宠物年龄！`,
        icon: "none"
      })
      return;
    }
    // var regPos = /^[0-9]*$/; //非负浮点数
    // if (!regPos.test(parms.age)) {
    //   wx.showToast({
    //     title: `宠物年龄请填写数字！`,
    //     icon: "none"
    //   })
    //   return;
    // } 
    if (!parms.area) {
      wx.showToast({
        title: `请填写宠物地区！`,
        icon: "none"
      })
      return;
    } 
    if (!parms.desc) {
      wx.showToast({
        title: `请填写宠物故事！`,
        icon: "none"
      })
      return;
    } 
    if (!parms.color) {
      wx.showToast({
        title: `请选择宠物花色！`,
        icon: "none"
      })
      return;
    } 
    if (!parms.feature) {
      wx.showToast({
        title: `请选择宠物特点！`,
        icon: "none"
      })
      return;
    } 
    if (!parms.photoId) {
      wx.showToast({
        title: `请上传宠物图片！`,
        icon: "none"
      })
      return;
    } 
    

    Dialog.confirm({
      title: '提示',
      message: '确认发布宠物信息吗'
    }).then(() => {
      that.showLoading();
      requesttoken('/pets/uploadPetInfoNoImg', "GET",
        parms, function (res) {
          
          console.log(res);
          if (res.success) {
            // wx.showToast({
            //   title: `保存成功！`,
            //   icon: "none",
            //   mask: true,
            //   duration: 2000
            // })
            that.hideLoading();
            
            Dialog.confirm({
              title: '提示',
              message: '上传成功，是否继续上传？',
              confirmButtonText: '继续上传',
              cancelButtonText: '返回首页'
            }).then(() => {
              //继续上传刷新页面
              that.resetData();
            }).catch(() => {
              //返回首页刷新首页
              app.globalData.refreshIndex = true;
              wx.switchTab({
                url: '/pages/index/index'
              })
            })
          }
        })
      }).catch(() => {

      });
  },
  remove: function(array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == val) {
        array.splice(i, 1);
      }
    }
    return -1;
  },
  gotoCropper: function() {
    var that = this;
    if (that.data.permission < 1) {
      wx.showToast({
        title: `您的信息需认证后才可以发布宠物信息`,
        icon: "none"
      })
      return;
    } 
    wx.navigateTo({
      url: '/pages/cropper/cropper',
    })
  },
  //上传图片开始
  uploadImg: function() {
    var that = this;
    var crop = that.data.crop;
    var imgUrl = that.data.showpic;
    if (crop && imgUrl.length > 0) {
      that.setData({
        showon: true,
        showpic: imgUrl
      })
      wx.showToast({
        title: '正在上传...',
        icon: 'loading',
        mask: true,
        duration: 10000
      });
      requestpic('/pets/uploadImg', "POST",
        imgUrl, undefined, function (res) {
          that.data.photoIds = [];
          that.data.photoIds.push(res.data.id);
          console.log(that.data.photoIds);
          wx.hideToast();
        });
    } else {
      that.setData({
        showon: false,
        showpic: '/images/add_a_photo-material.png'
      })
    }
    that.setData({
      crop: false
    })
  },
  //废弃的方法
  chooseImg: function(e) {
    var that = this;
    if (that.data.permission < 1) {
      wx.showToast({
        title: `您的信息需认证后才可以发布宠物信息`,
        icon: "none"
      })
      return;
    } 
    // pics = this.data.pics;
    that.setData({
      pics: [],
      photoIds: []
    })
    var pics = this.data.pics;
    // if (pics.length < 1) {
      wx.chooseImage({
        count: 3, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          });
          for (var i = 0; i < tempFilePaths.length; i++) {
            pics.push(tempFilePaths[i]);
          }
          var num = tempFilePaths.length - 1
          if (tempFilePaths.length > 0) {
            that.setData({
              showon: true,
              showpic: tempFilePaths[num]
            })
            requestpic('/pets/uploadImg', "POST",
              pics[0], undefined, function (res) {
                that.data.photoIds.push(res.data.id);
                console.log(that.data.photoIds)
                wx.hideToast();
              });
          }else{
            that.setData({
              showon: false,
              showpic: '/images/add_a_photo-material.png'
            })
          }

          that.setData({
            pics: pics
          })
        },
      });
    // } else {
    //   wx.showToast({
    //     title: '最多上传1张图片',
    //     icon: 'none',
    //     duration: 3000
    //   });
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu();
    this.computeScrollViewHeight();
    this.resetData();
  },

  resetData: function() {
    this.setData({
      searchPanel: false,
      books: Object,
      radio0: '0',
      radio1: '1',
      radio2: '0',
      radio3: '0',
      radio4: '0',
      name: '',
      age: '',
      area: '',
      message: '',
      color: [],
      colorids: [],
      colorselectid: [],
      colorchoice: [],
      feature: [],
      featureids: [],
      featureselectid: [],
      featurechoice: [],
      pics: [], //图片
      showon: false,
      showpic: '/images/add_a_photo-material.png',
      more: false,
      photoIds: []
    })
    this.changeTips(0);
  },

  onShow: function() {
    var that = this;
    requesttoken('/user/getMyInfo', 'GET',
      {}, function (res) {
        console.log(res);
        if (res.success) {
          that.setData({
            permission: res.data.permission
          })
          if (res.data.permission != 1) {          
            Dialog.alert({
              message: '您的信息需认证后才可以发布宠物信息'
            }).then(() => {
            
            })
          }

        }
      })
    var crop = that.data.crop;
    if (crop) {
      this.uploadImg();
    }
  },

  changeTips: function(type) {
    var that = this;
    that.showLoading();
    if (type == 0) {
      requestsend('/util/getPickerPetUpload', "GET",
        { "type": type, "key": 0 }, function (res) {
          var temp = res.data.dogColor;
          var coloridstemp = res.data.dogColorId
          var colorData = [];
          for (var i = 0; i < temp.length; i++) {
            colorData[i] = { "name": temp[i], "status": 0 };
          }
          that.setData({
            color: colorData,
            colorids: coloridstemp
          })
        });
      requestsend('/util/getPickerPetUpload', "GET",
        { "type": type, "key": 1 }, function (res) {
          var temp = res.data.dogFeature;
          var featureidstemp = res.data.dogFeatureId
          var featureData = [];
          for (var i = 0; i < temp.length; i++) {
            featureData[i] = { "name": temp[i], "status": 0 };
          }
          that.setData({
            feature: featureData,
            featureids: featureidstemp
          })
        });
    } else if (type == 1) {
      requestsend('/util/getPickerPetUpload', "GET",
        { "type": type, "key": 0 }, function (res) {
          var temp = res.data.catColor;
          var coloridstemp = res.data.catColorId
          var colorData = [];
          for (var i = 0; i < temp.length; i++) {
            colorData[i] = { "name": temp[i], "status": 0 };
          }
          that.setData({
            color: colorData,
            colorids: coloridstemp
          })
        });
      requestsend('/util/getPickerPetUpload', "GET",
        { "type": type, "key": 1 }, function (res) {
          var temp = res.data.catFeature;
          var featureidstemp = res.data.catFeatureId
          var featureData = [];
          for (var i = 0; i < temp.length; i++) {
            featureData[i] = { "name": temp[i], "status": 0 };
          }
          that.setData({
            feature: featureData,
            featureids: featureidstemp
          })
        });
    }
    that.hideLoading();
  },

  showAgePicker: function() {
    this.setData({
      showAge: true
    })
  },

  onAgePickerClose: function() {
    this.setData({
      showAge: false
    })
  },

  gotoSwitchCity: function() {
    var that = this;
    if (that.data.permission < 1) {
      wx.showToast({
        title: `您的信息需认证后才可以发布宠物信息`,
        icon: "none"
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/switchcity/switchcity',
    })
  },

  //计算 scroll-view 的高度
  computeScrollViewHeight: function() {
    let that = this
    const device = wx.getSystemInfoSync()
    const width = device.windowWidth
    const height = device.windowHeight - 60
    console.log(height);
    that.setData({
      scrollHeight: height
    })
  },


  onActivateSearch: function(event) {
    this.setData({
      searchPanel: true
    })
  },

  onCancel: function(event) {
    this.setData({
      searchPanel: false
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