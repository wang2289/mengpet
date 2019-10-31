// pages/mysong/mysong.js
let app = getApp();
import {
  Config
} from '../../utils/config.js'
import {
  requestsend,
  requesttoken
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quesDetails: [],
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
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
    var that = this;
    var id = this.data.id;
    requesttoken('/app/getDetails', 'GET',
      { "id": id, "status": 1 }, function (res) {
        console.log(res);
        if (res.success) {
          var results = [];
          var resultItem = {};
          var answerItems = [];
          var answers = res.data.answersList;
          var info = res.data.appUserPetInfo;

          var phCreateDate = info.phCreateTime.substring(0, 10);
          var pet = {};
          pet.image = Config.imgPath + "/" + phCreateDate + "/" + info.path;
          pet.name = info.nameCn;

          var user = {};
          user.name = info.nickName;
          user.sex = info.sex;
          user.area = info.area;
          user.age = info.age;
          user.phoneNumber = info.phoneNumber;
          user.wechat = info.wechat;


          that.setData({
            pet: pet,
            user: user
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
            quesDetails: results
          })
          console.log(that.data.quesDetails);
        }
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

  }
})