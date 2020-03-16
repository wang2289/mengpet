// pages/wenjuan/wenjuan.js
import {
  Config
} from '../../utils/config.js'
import {
  CommentModel
} from '../../models/comment.js'
let app = getApp();
import {
  requestsend,
  requesttoken,
  requestpic
} from '../../utils/util.js'
import Dialog from 'vant-weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    gotoStore: [],
    textRequire: false,
    answerCheckbox: [],
    answerRadio: '',
    answerTextTemp: '',
    nextText: "下一题",
    prevBtn: false,
    nextBtn: true,
    submitBtn: false,
    submitFlag: false,
    code: "",//宠物code
    groupId: 0,//问卷id
    groupType: 0,//问卷类型 猫 狗
    allow: 0,//问题类型
    questionDec: "",//问题的描述
    questionAnswer: "",//问题的答案
    questionId: 0,//问题对应配置表中的id
    currQuestId: 1,//当前题目的id
    nextId: 1,//下一题的id
    dialogDec: "",//小贴士的描述
    dialogList: [],
    questionType: 0,//问题的类型 单选、多选、填空、图片上传、混合单选、混合对选
    groupList: [],//问卷内容json
    answers: [],//答案内容json
    prevList: [],//存放上一题id的list，用于返回上一题
    increaseId: 0,
    prevAnswerNum: 0,//前一个问题的答案个数，主要是多选和混合题会有多个答案
    imageData: [],//图片信息
    sendData: {},
    num: 0,
    saveAnswerFlag: false,
    petDetailMainInfo: [],
    showon: false,
    pics: [], //图片
    showpic: '/images/add_a_photo-material.png',
    imagePath: ''
  },
  changeRadio: function(event) {
    var checkId = event.currentTarget.dataset.checkid;
    for (let i in this.data.gotoStore) {
      if (i == checkId) {
        this.setData({
          nextId: this.data.gotoStore[i].gotoId
        })
      }
    }
    this.setData({
      answerRadio: event.detail,

    });
  },
  changeCheckbox: function (event) {
    this.setData({
      answerCheckbox: event.detail,

    });
  },
  changeText: function (event) {
    this.setData({
      answerTextTemp: event.detail.value
    });
  },
  submit: function() {
    var that = this;
    if (this.data.submitFlag) {
      return;
    }
    console.log("startSubmit")
    var param = this.data.answers;
    param = JSON.stringify(param);
    console.log(param);
    // wx.showToast({
    //   title: '正在上传...',
    //   icon: 'loading',
    //   mask: true,
    //   duration: 10000
    // });
    
    that.showLoading();
    requesttoken('/app/addAnswers', "POST",
      {'answers': param}, function (res) {
        console.log(res);
        if (res.success) {
          wx.showToast({
            title: `保存成功！`,
            icon: "none",
            mask: true,
            duration: 3000,
            complete: function () {
              that.hideLoading();
              setTimeout(function () {
                var pages = getCurrentPages();
                //   var currPage = pages[pages.length - 1];   //当前页面
                var prevPage = pages[pages.length - 2];  //上一个页面
                //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                prevPage.setData({
                  approveStatus: 1
                })
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
          
        }
      })
  },
  create_UUID: function () {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },
  loadGroup: function (code) {
    var that = this;
    requesttoken("/app/" + code, 'GET',
      {}, function (res) {
        if (res.success) {
          that.setData({
            groupId: res.data.groupId,
            groupType: res.data.groupType,
            groupList: res.data.groupQuestionInfoList,            
          })
          that.loadDialogs(code);
        }
      })  
  },
  loadDialogs: function () {
    var that = this;
    requesttoken("/app/getDialog/" + 'all', 'GET',
      {}, function (res) {
        if (res.success) {
          that.setData({
            dialogList: res.data
          })
          that.checkQuestionType(that.data.nextId);
        }
      })
  },
  //根据问题类型，重绘问题区域
  checkQuestionType: function (index) {
    var that = this;
    var self = this.data;

    if (index <= 0) {
      return;
    }

    if (index == 1) {
      this.setData({
        prevBtn: false,
      })
    } else {
      this.setData({
        prevBtn: true,
      })
    }

    //保存当前问题的id
    this.data.currQuestId = self.nextId;

    var data;
    for (var i in self.groupList) {
      var tempId = self.groupList[i].id;
      if (tempId == index) {
        data = self.groupList[i];
        break;
      }
    }
    if (data == undefined) {
      data = self.groupList[self.increaseId + 1];
    }

    var question = data.question;
    var type = question.type;
    self.questionType = type;
    self.allow = question.allow;
    var dec = question.dec;
    self.questionDec = dec;
    self.questionId = question.id;
    var need = question.need;
    var dialog = question.dialog;
    if (dialog != null && dialog != undefined) {
      this.setData({
        dialogDec: dialog.dec
      })
    } else {
      var index = Math.floor(Math.random() * Math.floor(self.dialogList.length));
      this.setData({
        dialogDec: self.dialogList[index]
      })
    }

    var questionDetailList = question.questionDetailList;

    var gotoId = data.gotoId;
    if (gotoId == null || gotoId == undefined) {
      gotoId = index + 1;
    }
    //确定问题跳转id
    self.nextId = gotoId;

    //当前问题的id * 100 / 问题总长度，算出百分比，设置成进度条的宽度
    var increaseId = question.increaseId
    self.increaseId = increaseId;
    var width = increaseId * 100 / self.groupList.length
    if (width > 100) {
      width = 100;
    }
    this.setData({
      process: width
    });

    switch (type) {
      case 1:
      case 5:
        this.drawRadio(dec, questionDetailList);
        break;
      case 2:
      case 6:
        this.drawCheckbox(dec, questionDetailList);
        break;
      case 3:
        this.drawText(dec, questionDetailList, need);
        break;
      case 4:
        this.drawUpload(dec, questionDetailList);
        break;
      default:
        break;
    }

    if (self.nextId <= 0) {
      this.setData({
        process: 100,
        nextText: "提交"
      });
    } else {
      this.setData({        
        nextText: "下一题"
      });
    }
    //问题更新完毕后重置保存按钮状态
    self.saveAnswerFlag = false;
  },
  //单选、单选加填空类型
  drawRadio: function (dec, questionDetailList) {
    var that = this;
    var self = this.data;
    this.setData({
      questionShow: 'radio',
      dec: dec,
      questionDetailList: questionDetailList
    })

    questionDetailList.forEach(function (item, index) {
      //按问题选项跳转
      var gotoInfo = item.gotoInfo;
      var radioGotoId = ""
      if (gotoInfo != "" && gotoInfo != null && gotoInfo != undefined) {
        var gotoInfos = gotoInfo.split("#");//格式类似 1:3#2:20#3:4
        var radioGotoId = self.nextId;
        for (var i = 0; i < gotoInfos.length; i++) {
          var subGroupId = gotoInfos[i].substring(0, 1);
          var subGotoId = gotoInfos[i].substring(2);
          if (self.groupId == subGroupId) {
            radioGotoId = subGotoId;
            break;
          }
        }
        var gotoStoreTemp = self.gotoStore;
        gotoStoreTemp.push({ 'id': index, 'gotoId': radioGotoId });
        that.setData({
          gotoStore: gotoStoreTemp
        })
      }
      var txt = item.txt;      
      that.setData({
        txt: txt
      })
    });
  },
  //多选、多选加填空类型
  drawCheckbox: function (dec, questionDetailList) {
    var that = this;
    var self = this.data;
    this.setData({
      questionShow: 'checkbox',
      dec: dec,
      questionDetailList: questionDetailList
    })

    questionDetailList.forEach(function (item, index) {
      var txt = item.txt;
      that.setData({
        txt: txt
      })
    });
  },
  //文本输入类型
  drawText: function (dec, questionDetailList, need) {
    var self = this.data;
    this.setData({
      questionShow: 'text',
      dec: dec,
      questionDetailList: questionDetailList,
      
    })
    if (need == 1) {
      this.setData({
        textRequire: true
      })
    }
  },
  //上传图片类型
  drawUpload: function (dec, questionDetailList) {
    var that = this;
    var self = this.data;
    this.setData({
      questionShow: 'image',
      dec: dec,
      questionDetailList: questionDetailList
    })
    

    
  },
  nextBtnEvent: function() {
    var that = this;
    var self = this.data;
    if (self.questionShow == 'radio') {
      if ('' == self.answerRadio && '' == self.answerTextTemp) {
        wx.showToast({
          title: `请填写信息！`,
          icon: "none"
        })
        return;
      }
    } else if (self.questionShow == 'checkbox') {
      if (self.answerCheckbox.length == 0 && '' == self.answerTextTemp) {
        wx.showToast({
          title: `请填写信息！`,
          icon: "none"
        })
        return;
      }
    } else if (self.questionShow == 'text') {
      if (!self.answerTextTemp) {
        wx.showToast({
          title: `请填写信息！`,
          icon: "none"
        })
        return;
      }
    } else if (self.questionShow == 'image') {
      if (!self.imagePath) {
        wx.showToast({
          title: `请填写信息！`,
          icon: "none"
        })
        return;
      }
    }
    //问卷结束，最后一题
    if (self.nextId <= 0) {
      Dialog.confirm({
        title: '提示',
        message: '确认提交问卷吗'
      }).then(() => {
        that.saveQuestionAnswer();
        that.submit();
        
      }).catch(() => {

      });
      return;
    }
    this.saveQuestionAnswer();
  },
  saveQuestionAnswer: function () {
    var self = this.data;
    //每道题只能保存一次
    if (self.saveAnswerFlag) {
      return;
    }

    //保存上一题id
    self.prevList.push(self.currQuestId);

    switch (self.questionType) {
      //单选题
      case 1:
        var value = self.answerRadio;
        var answer = {
          "groupId": self.groupId, "groupType": self.groupType,
          "questionType": self.questionType, "questionId": self.questionId,
          "allow": self.allow, "questionDec": self.questionDec,
          "questionAnswer": value, "code": self.code
        };
        var temp = self.answers;
        temp.push(answer);
        this.setData({
          answers: temp,
          prevAnswerNum: 1
        })
        break;
      //多选题
      case 2:
        self.prevAnswerNum = 0;
        var values = self.answerCheckbox;
        for (let i in values) {
          var value = values[i];
          var answer = {
            "groupId": self.groupId, "groupType": self.groupType,
            "questionType": self.questionType, "questionId": self.questionId,
            "allow": self.allow, "questionDec": self.questionDec,
            "questionAnswer": value, "code": self.code
          };
          var temp = self.answers;
          temp.push(answer);
          this.setData({
            answers: temp,
            prevAnswerNum: self.prevAnswerNum++
          })
        };
        break;
      //填空题
      case 3:
        var value = self.answerTextTemp;
        var answer = {
          "groupId": self.groupId, "groupType": self.groupType,
          "questionType": self.questionType, "questionId": self.questionId,
          "allow": self.allow, "questionDec": self.questionDec,
          "questionAnswer": value, "code": self.code
        };
        var temp = self.answers;
        temp.push(answer);
        this.setData({
          answers: temp,
          prevAnswerNum: 1
        })
        break;
      //上传图片
      case 4:
        // var uuid = self.create_UUID();
        // var file = self.imagePath;
        // var value = "";
        // if (file == undefined) {

        // } else {
        //   var suffix = file.name.substring(file.name.lastIndexOf("."));
        //   self.uploadImage(uuid);
        //   value = uuid + suffix;
        // }
        var value = self.imagePath;
        var answer = {
          "groupId": self.groupId, "groupType": self.groupType,
          "questionType": self.questionType, "questionId": self.questionId,
          "allow": self.allow, "questionDec": self.questionDec,
          "questionAnswer": value, "code": self.code
        };
        var temp = self.answers;
        temp.push(answer);
        this.setData({
          answers: temp,
          prevAnswerNum: 1
        })
        break;
      //混合单选题
      case 5:
        var value = self.answerRadio;
        var answer = {
          "groupId": self.groupId, "groupType": self.groupType,
          "questionType": self.questionType, "questionId": self.questionId,
          "allow": self.allow, "questionDec": self.questionDec,
          "questionAnswer": value, "code": self.code
        };
        var temp = self.answers;
        temp.push(answer);
        this.setData({
          answers: temp,
          prevAnswerNum: 1
        })

        // var radioGotoId = $("input[type='radio']:checked").parent().next().text();
        // if (radioGotoId != "") {
        //   this.setData({
        //     nextId = radioGotoId
        //   })
        // }

        var textValue = self.answerTextTemp;
        if (textValue != undefined && textValue != "") {
          var textAnswer = {
            "groupId": self.groupId, "groupType": self.groupType,
            "questionType": self.questionType, "questionId": self.questionId,
            "allow": self.allow, "questionDec": self.questionDec,
            "questionAnswer": textValue, "code": self.code
          };
          var temp = self.answers;
          temp.push(answer);
          this.setData({
            answers: temp,
            prevAnswerNum: self.prevAnswerNum++
          })
        }
        break;
      //混合多选题
      case 6:
        self.prevAnswerNum = 0;
        var values = self.answerCheckbox;
        for (let i in values) {
          var value = values[i];
          var answer = {
            "groupId": self.groupId, "groupType": self.groupType,
            "questionType": self.questionType, "questionId": self.questionId,
            "allow": self.allow, "questionDec": self.questionDec,
            "questionAnswer": value, "code": self.code
          };
          var temp = self.answers;
          temp.push(answer);
          this.setData({
            answers: temp,
            prevAnswerNum: self.prevAnswerNum++
          })
        };

        var textValue = self.answerTextTemp;
        if (textValue != undefined && textValue != "") {
          var textAnswer = {
            "groupId": self.groupId, "groupType": self.groupType,
            "questionType": self.questionType, "questionId": self.questionId,
            "allow": self.allow, "questionDec": self.questionDec,
            "questionAnswer": textValue, "code": self.code
          };
          var temp = self.answers;
          temp.push(answer);
          this.setData({
            answers: temp,
            prevAnswerNum: self.prevAnswerNum++
          })
        }
        break;
      default:
        break;
    }
    //清空保存信息的参数
    this.setData({
      showon: false,
      pics: [], //图片
      showpic: '/images/add_a_photo-material.png',
      imagePath: '',
      gotoStore: [],
      answerRadio: '',
      answerCheckbox: [],
      answerTextTemp: '',
      saveAnswerFlag: true
    })
    this.checkQuestionType(self.nextId);
  },
  prevBtnEvent: function() {
    var self = this.data;
    if (self.prevList.length < 1) {
      return;
    }
    var temp = self.prevList;
    var tempNextId = temp.pop();
    this.setData({
      nextId: tempNextId,
      prevList: temp
    })

    for (var i = 0; i < self.prevAnswerNum; i++) {
      var temp = self.answers;
      temp.pop();
      this.setData({
        answers: temp
      })
    }
    this.checkQuestionType(self.nextId);
  },



  //上传图片开始
  chooseImg: function (e) {
    var that = this,
    pics = this.data.pics;
    if (pics.length < 1) {
      wx.chooseImage({
        count: 3, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          // wx.showToast({
          //   title: '正在上传...',
          //   icon: 'loading',
          //   mask: true,
          //   duration: 10000
          // });
          that.showLoading();
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
                that.setData({
                  imagePath: res.data.file
                });
                // wx.hideToast();
                that.hideLoading();
              });
          } else {
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
    } else {
      wx.showToast({
        title: '最多上传1张图片',
        icon: 'none',
        duration: 3000
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let code = options.code;
    this.setData({
      code: code
    })
    this.loadGroup(code);
    // this.loadDialogs(code);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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