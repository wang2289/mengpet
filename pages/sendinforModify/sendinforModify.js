// pages/book/book.js
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
    photoIds: []
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
    var picsData = this.data.pics
    var photoIdStr = "";
    for (let l in this.data.photoIds) {
      photoIdStr += this.data.photoIds[l];
      if (l < this.data.photoIds.length - 1) {
        photoIdStr += "#";
      } 
    }

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
      id: this.data.bid,
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
    
    if (!parms.photoId) {
      wx.showToast({
        title: `请上传宠物图片！`,
        icon: "none"
      })
      return;
    } 
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
  
    Dialog.confirm({
      title: '提示',
      message: '确认修改宠物信息吗'
    }).then(() => {
      requesttoken('/pets/updataPetInfoNoImg', "GET",
        parms, function (res) {
          console.log(res);
          if (res.success) {
            wx.showToast({
              title: `保存成功！`,
              icon: "none",
              mask: true,
              duration: 1000
            })
            wx.navigateBack({
              delta:1
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
                console.log(res.data.id)
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

    let bid = options.bid;
    let status = options.status;
    if (bid > 0) {
      requesttoken('/pets/getPetDetailInfoByIdAndStatus', 'GET',
        { "petId": bid , "status": status}, function (res) {
          console.log(res);
          var pickerList = res.data.pickerList       
          var createTime = res.data.photoList[0].createTime;
          var createDate = createTime.substring(0, 10);
          var imagePath = Config.imgPath + "/" + createDate + "/" + res.data.photoList[0].path;
          var photosIdTemp = res.data.photosId.split("#");
          var tempType = res.data.type;
          that.setData({
            bid: bid,
            radio0: res.data.type + '',
            name: res.data.nameCn,
            radio1: res.data.sex + '',
            age: res.data.age,
            area: res.data.area,
            message: res.data.desc,
            radio2: res.data.quchong + '',
            radio3: res.data.yimiao + '',
            radio4: res.data.jueyu + '',
            photoIds: photosIdTemp,
            showon: true,
            showpic: imagePath
          })

          requestsend('/util/getPickerPetUpload', "GET",
            { "type": tempType, "key": 0 }, function (res) {
              var temp = [];
              if (tempType == 0) {
                temp = res.data.dogColor;
              } else if (tempType == 1) {
                temp = res.data.catColor;
              }

              var coloridstemp = [];
              if (tempType == 0) {
                coloridstemp = res.data.dogColorId;
              } else if (tempType == 1) {
                coloridstemp = res.data.catColorId;
              }
              
              var colorData = [];
              var colorselectidTemp = [];
              for (var i = 0; i < temp.length; i++) {
                var status = 0;
                for (let j in pickerList) {
                  if (pickerList[j].key == 0 && temp[i] == pickerList[j].value) {
                    status = 1;
                    colorselectidTemp.push(pickerList[j].id);
                    break;
                  }
                }
                colorData[i] = { "name": temp[i], "status": status };
              }
              that.setData({
                color: colorData,
                colorids: coloridstemp,
                colorselectid: colorselectidTemp
              })
            });
          requestsend('/util/getPickerPetUpload', "GET",
            { "type": tempType, "key": 1 }, function (res) {
              var temp = [];
              if (tempType == 0) {
                temp = res.data.dogFeature;
              } else if (tempType == 1) {
                temp = res.data.catFeature;
              }

              var featureidstemp = []
              if (tempType == 0) {
                featureidstemp = res.data.dogFeatureId;
              } else if (tempType == 1) {
                featureidstemp = res.data.dogFeatureId;
              }

              var featureData = [];
              var featureselectidTemp = [];
              for (var i = 0; i < temp.length; i++) {
                var status = 0;
                for (let j in pickerList) {
                  if (pickerList[j].key == 1 && temp[i] == pickerList[j].value) {
                    status = 1;
                    featureselectidTemp.push(pickerList[j].id);
                    break;
                  }
                }
                featureData[i] = { "name": temp[i], "status": status };
              }
              that.setData({
                feature: featureData,
                featureids: featureidstemp,
                featureselectid: featureselectidTemp
              })
            });
        });

    }

  },

  changeTips: function (type) {
    var that = this;
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