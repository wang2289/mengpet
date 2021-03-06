// pages/detail/detail.js
// import {
//   PetsModel
// } from '../../models/pets.js'
import {
  Config
} from '../../utils/config.js'
import {
  LikeModel
} from '../../models/like.js'
import {
  CommentModel
} from '../../models/comment.js'
let app = getApp();
import {
  requestsend,
  requesttoken
} from '../../utils/util.js'
import Dialog from 'vant-weapp/dialog/dialog'

// let petsModel = new PetsModel()
let commentModel = new CommentModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    scrollHeight: 1000,
    petId: -1,
    pets: Object,
    pet: null,
    comments: [],
    noComment: true,
    posting: false,
    like: false,
    isCollect:false,
    count: 0,
    fillInfo: true,
    adopt: false,
    self: true,
    infoStatus:0,
    approveStatus:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.computeScrollViewHeight();
    var id = options.bid
    this.setData({
      petId: id
    })

    //更新view
    requesttoken('/pets/addView', 'GET',
      {'petId': id}, function (res) {
        console.log(res);
      })

  },

  onFakePost: function() {
    this.setData({
      posting: true
    })
  },

  onPost: function(event) {
    let comment = event.detail.value || event.detail.text
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    commentModel.post(this.data.book.id, comment, (data) => {
      wx.showToast({
        title: '+ 1',
        icon: "none"
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        noComment: false
      })
    })

    this.setData({
      posting: false
    })
  },

  onCancel: function(event) {
    this.setData({
      posting: false
    })
  },

  onLike: function(event) {
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  submit: function (event) {
    var that = this;
    // var formId = event.detail.formId;
    if (!this.data.fillInfo) {
      wx.navigateTo({
        url: '/pages/infor/infor?type=init'
      })
      return;
    }
    var id = this.data.pet.id;
    var code = this.data.pet.type;
    var ownerId = this.data.pet.ownerId;

    if (this.data.approveStatus == 1) {
      that.showLoading();
      requesttoken('/app/addApplication', 'GET',
        { "petId": id, "ownerId": ownerId, "type": code }, function (res) {
          console.log(res);
          if (res.success) {
            wx.showToast({
              title: `申请成功！`,
              icon: "none",
              mask: true,
              duration: 3000,
              complete: function () {
                that.hideLoading();
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }, 1000)
              }
            })
            
          }
        });
    } else {
      Dialog.confirm({
        title: '提示',
        message: '确认提申请领养吗'
      }).then(() => {
        //获取订阅消息权限
        // console.log("before subscribe");
        // wx.requestSubscribeMessage({
        //   tmplIds: ['nAbleKTJaMIvcwR38JHPKd7azvWfTnDSLv_WL-bh130'],
        //   success: function (res) {
          that.showLoading();
          requesttoken('/app/selectByUserIdAndCode', 'GET',
            { "code": code }, function (res) {
              console.log(res);
              if (res.success) {
                if (res.data.length <= 0) {
                  that.hideLoading();
                  wx.navigateTo({
                    url: '/pages/questions/questions?code=' + code,
                  })
                } else {
                  requesttoken('/app/addApplication', 'GET',
                    { "petId": id, "ownerId": ownerId, "type": code}, function (res) {
                      console.log(res);
                      if (res.success) {
                        wx.showToast({
                          title: `申请成功！`,
                          icon: "none",
                          mask: true,
                          duration: 3000,
                          complete: function() {
                            that.hideLoading();
                            setTimeout(function() {
                              wx.switchTab({
                                url: '/pages/index/index',
                              })
                            }, 1000)
                          }
                        })
                        
                      }
                    });
                }
              }
            });
        //   },
        //   fail: function (res) {
        //     console.log(res);
        //   }
        // });

        

      }).catch(() => {

      }); 
    }
  },

  onCollect: function () {
    this.setData({
      isCollect: !this.data.isCollect
    })

  },
  onShareAppMessage() {

  },
  onShow: function() {

    var that = this;
    let bid = this.data.petId;
    that.showLoading();
    requesttoken('/user/getMyInfo', 'GET',
      {}, function (res) {
        console.log(res);
        if (res.success) {
          if (res.data.profession == undefined || res.data.profession == '') {
            that.setData({
              fillInfo: false
            })
          } else {
            that.setData({
              fillInfo: true
            })
          }
        }
      })

    requesttoken('/pets/getPetDetail', 'GET',
      { "petId": bid }, function (res) {
        console.log(res);
        var pickerList = res.data.pickerList
        var colors = [];
        var features = [];
        for (let l in pickerList) {
          if (pickerList[l].key == 1) {
            colors.push(pickerList[l].value);
          } else if (pickerList[l].key == 0) {
            features.push(pickerList[l].value);
          }
        }
        if(res.data.photoList.length>0){
        var createTime = res.data.photoList[0].createTime;
        var createDate = createTime.substring(0, 10);
        var imagePath = Config.imgPath + "/" + createDate + "/" + res.data.photoList[0].path
        }

        var data =
        {
          id: res.data.id,
          type: res.data.type,
          name: res.data.nameCn,
          age: res.data.age,
          color: colors,
          feature: features,
          city: 'city',
          area: res.data.area,
          view: res.data.view,
          desc: res.data.desc,
          yimiao: res.data.yimiao,
          jueyu: res.data.jueyu,
          quchong: res.data.quchong,
          image: imagePath,
          ownerId: res.data.userId
        }
        that.setData({
          pet: data
        })

        var param = {
          petId: res.data.id
        }
        if (res.data.userId != app.globalData.userId) {
          that.setData({
            self: false,
          })
          requesttoken('/app/selectAppByUserId', 'GET',
            param, function (res) {
              console.log(res);
              if (res.success) {
                if (res.data <= 0) {
                  that.setData({
                    adopt: true,
                  })
                }
              }
            })
        }
        that.hideLoading();
      });


    commentModel.getComment(bid, (data) => {
      this.setData({
        noComment: data.comments == false ? true : false,
        comments: data.comments
      })
    })

    console.log("this.data.approveStatus: " + this.data.approveStatus)
    if(this.data.approveStatus==1){  
          
      this.submit();
    }
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