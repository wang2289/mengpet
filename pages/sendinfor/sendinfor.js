// pages/book/book.js
import {
  random
} from '../../utils/util.js'
let app = getApp();
import {
  requestsend,
  requestsendtoken
} from '../../utils/util.js'
import {
  Config
} from '../../utils/config'
import {
  Token
} from '../../utils/token.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPanel: false,
    books: Object,
    radio1: '1',
    radio2: '1',
    radio3: '1',
    radio4: '1',
    color: [],
    feature: [],
    colorchoice: [],
    featurechoice: [],
    pics: [], //图片
    showpic: '/images/add_a_photo-material.png',
    more: false
  },

  onReachBottom: function(event) {},
  onTap1(event) {
    // console.log(event);
    var index = event.target.dataset.index;
    var value = event.currentTarget.dataset.value;
    var colorch = this.data.colorchoice
    var missionArr = this.data.color;
    for (let i in missionArr) {
      //遍历列表数据      
      if (i == index) {
        //根据下标找到目标,改变状态  
        if (missionArr[i].status == 1) {
          missionArr[i].status = 0
          this.remove(colorch, value);
        } else {
          missionArr[i].status = 1
          colorch.push(value);
        }
      }
    }
    this.setData({
      color: missionArr
    });
  },
  onTap2(event) {
    // console.log(event);
    var index = event.target.dataset.index
    var value = event.currentTarget.dataset.value;
    var featurech = this.data.featurechoice
    var missionArr = this.data.feature;
    for (let i in missionArr) {
      //遍历列表数据      
      if (i == index) {
        //根据下标找到目标,改变状态  
        if (missionArr[i].status == 1) {
          missionArr[i].status = 0
          this.remove(featurech, value);
        } else {
          missionArr[i].status = 1
          featurech.push(value);
        }
      }
    }
    this.setData({
      feature: missionArr
    });
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
    this.setData({
      age: event.detail
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
    var parms = {
      name: this.data.name,
      sex: this.data.radio1,
      age: this.data.age,
      area: this.data.area,
      message: this.data.message,
      quchong: this.data.radio2,
      yimiao: this.data.radio3,
      jue: this.data.radio4,
      color: this.data.colorchoice,
      feature: this.data.featurechoice,
      pics: this.data.pics
    };
    console.log(parms)
    var obj1 = JSON.stringify(parms);
    var param = {
      result: obj1
    }
    console.log(parms)
    token.verify((tokenres) => {
      wx.request({
        url: Config.apiUrl + '/api/QX/TiJiaoPaper',
        data: param,
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded",
          'authorization': 'Bearer ' + tokenres + ''
        },
        success: function(res) {
          console.log(res)
        },
        fail: function(error) {
          wx.showToast({
            icon: "none",
            title: '服务器异常，清稍候再试'
          })
        }
      })
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
  //上传图片开始
  chooseImg: function(e) {
    var that = this,
      pics = this.data.pics;
    console.log(pics);
    if (pics.length < 3) {
      wx.chooseImage({
        count: 3, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          // wx.showToast({
          //   title: '正在上传...',
          //   icon: 'loading',
          //   mask: true,
          //   duration: 10000
          // });
          for (var i = 0; i < tempFilePaths.length; i++) {
            pics.push(tempFilePaths[i]);
          }
          var num = tempFilePaths.length - 1
          if (tempFilePaths.length > 0) {
            that.setData({
              showon: true,
              showpic: tempFilePaths[num]
            })
          }else{
            that.setData({
              showon: false,
              showpic: '/images/add_a_photo-material.png'
            })
          }

          console.log(pics);
          that.setData({
            pics: pics
          })
        },
      });
    } else {
      wx.showToast({
        title: '最多上传3张图片',
        icon: 'none',
        duration: 3000
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    requestsend('/util/getPickerPetUpload', "GET",
      { "type": 0, "key": 0 }, function (res) {
        var temp = res.data.pickerList;
        var colorData = [];
        for (var i = 0; i < temp.length; i++) {
          colorData[i] = { "name": temp[i].value, "status": 0 };
        }
        that.setData({
          color: colorData
        })
    });
    requestsend('/util/getPickerPetUpload', "GET",
      { "type": 0, "key": 1 }, function (res) {
        var temp = res.data.pickerList;
        var featureData = [];
        for (var i = 0; i < temp.length; i++) {
          featureData[i] = { "name": temp[i].value, "status": 0 };
        }
        that.setData({
          feature: featureData
        })
    });
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

  }
})