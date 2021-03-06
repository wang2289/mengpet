// pages/mysong/mysong.js
let app = getApp();
import {
  Config
} from '../../utils/config.js'
import {
  requestsend,
  requesttoken
} from '../../utils/util.js'
import Dialog from 'vant-weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    scrollHeight: 1000,
    quesDetails: [],
    id: 0,
    appStatus: 0,
    petId: -1,
    petOwnerId: -1,
    appConfirmCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.computeScrollViewHeight();
    this.setData({
      id: options.id,
      appStatus: options.appStatus,
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  accept: function() {
    var that = this;
    
    var param = {
      id: this.data.id,
      userId: this.data.user.userId,
      petId: this.data.petId,
      petOwnerId: this.data.petOwnerId,
    }
    //如果已经确认过两个以上，那么提示最后一次确认的描述
    var message = '当您通过任意初审时，我们会安排工作人员和您取得联系，同时此宠物将不能再收到其他人领养的新领养申请（已申请的可以继续查看），是否继续？'
    if (that.data.appConfirmCount >=2) {
      param.lastConfirm = true;
      message = '当您通过第三条审核时，您将不能再查看更多问卷报告，是否继续？'
    }

    Dialog.confirm({
      title: '提示',
      // message: '确认接受该领养吗？确认后将暂时下架宠物，暂时无法接收更多领养申请(可重新操作上架'
      message: message,
      confirmButtonText: '初审通过',
      cancelButtonText: '我再想想'
    }).then(() => {
      that.showLoading();
      requesttoken('/app/accept', 'GET',
        param , function (res) {
          console.log(res);
          if (res.success) {
            wx.showToast({
              title: `确认成功！`,
              icon: "none",
              mask: true,
              duration: 3000,
              complete: function () {
                that.hideLoading();
                setTimeout(function () {
                  // wx.navigateBack({
                  //   delta: 1
                  // })
                  wx.navigateTo({
                    url: '/pages/help/help?action=confirm',
                  })
                }, 1000)
              }
            })
            
          }
        });
    }).catch(() => {

    });
  },

  reject: function() {
    var that = this;
    var param = {
      id: this.data.id,
      userId: this.data.user.userId,
      petId: this.data.petId
    }
    Dialog.confirm({
      title: '提示',
      message: '确认拒绝这份申请吗'
    }).then(() => {
      that.showLoading();
      requesttoken('/app/reject', 'GET',
        param, function (res) {
          console.log(res);
          if (res.success) {
            wx.showToast({
              title: `拒绝成功！`,
              icon: "none",
              mask: true,
              duration: 3000,
              complete: function () {
                that.hideLoading();
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              }
            })
            
          }
        });
    }).catch(() => {

    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var id = this.data.id;
    var status = this.data.appStatus;
    that.showLoading();
    requesttoken('/app/getDetails', 'GET',
      { "id": id, "status": status }, function (res) {
        console.log(res);
        if (res.success) {
          var results = [];
          var resultItem = {};
          var answerItems = [];
          var answers = res.data.answersList;
          var info = res.data.appUserPetInfo;

          var appConfirmCount = res.data.appConfirmCount;

          var phCreateDate = info.phCreateTime.substring(0, 10);
          var pet = {};
          pet.image = Config.imgPath + "/" + phCreateDate + "/" + info.path;
          pet.name = info.nameCn;

          var user = {};
          user.name = info.nickName;
          user.sex = info.sex;
          user.area = info.area;
          user.userId = info.userId;
          user.image = info.profilePicture;
          var temp = info.age;
          switch(temp) {
            case 0: 
              temp = '60后';
              break;
            case 1:
              temp = '70后';
              break;
            case 2:
              temp = '80后';
              break;
            case 3:
              temp = '90后';
              break;
            case 4:
              temp = '00后';
              break;
          }
          user.age = temp;
          user.phoneNumber = info.phoneNumber;
          user.wechat = info.wechat;


          that.setData({
            pet: pet,
            user: user,
            petId: info.petId,
            petOwnerId: info.petOwnerId
          })
          var temp = answers[0].questionId;
          for (let i = 0; i < answers.length; i++) {
            var questionAnswer = answers[i].questionAnswer;
            var questionDec = answers[i].questionDec;
            var questionId = answers[i].questionId;
            var answerSplit = questionAnswer.split('.');

            if (answerSplit.length > 1 && (answerSplit[1] == 'png' || answerSplit[1] == 'jpg')) {
              // 图片
              var createDate = answers[i].createTime.substring(0, 10);
              questionAnswer = Config.imgPath + "/" + createDate + "/" + questionAnswer;
            }

            if (questionId != temp) {
              resultItem.answerItems = answerItems;
              results.push(resultItem);
              resultItem = {};
              answerItems = [];
            }

            resultItem.desc = questionDec;
            resultItem.id = questionId;
            answerItems.push(questionAnswer);
            
            if ((answers.length != 1 && i == answers.length - 1) 
              || answers.length == 1) {
              resultItem.answerItems = answerItems;
              results.push(resultItem);
              resultItem = {};
              answerItems = [];
            }
            temp = questionId;          
          }

          that.setData({
            quesDetails: results,
            appConfirmCount: appConfirmCount
          })
          that.hideLoading();
          console.log(that.data.quesDetails);
        }
      })
  },

  //计算 scroll-view 的高度
  computeScrollViewHeight: function () {
    let that = this
    const device = wx.getSystemInfoSync()
    const width = device.windowWidth
    const height = device.windowHeight - 60
    console.log(height);
    that.setData({
      scrollHeight: height
    })
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
  
  showLoading: function() {
    this.setData ({
      loading: true
    })
  },

  hideLoading: function () {
    this.setData({
      loading: false
    })
  }
})