import {
  Config
} from '../../utils/config.js'
let app = getApp();
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
    pagesOn: 1,//总页数
    pageOn: 1,//当前页码
    pagesOff: 1,//总页数
    pageOff: 1,//当前页码
    pagesOff: 1,//总页数
    pageOff: 1,//当前页码
    size: 8,//每页显示个数
    index: 0,
    active: 0,
    catsListOn: [],
    catsListOff: [],
    catsListSong: [],
    reload: false
  },

  onChange(event) {
    let index = event.detail.index;
    this.setData({
      index : event.detail.index,
      active : event.detail.index
    });
  },

  refreshPetInfo: function (page, size, status, index, reload) {
    var that = this;
    that.showLoading();
    requesttoken('/pets/getPetsByUserIdAndStatus', "GET",
      { "page": page, "size": size, "status": status }, function (res) {
        console.log(res);
        if (res.success) {
          var list = res.data.list;
          var pets = [];
          for (let l in list) {
            var temp = {};
            temp.id = list[l].id;
            temp.name = list[l].nameCn;
            temp.age = list[l].age;
            temp.color = list[l].color;
            temp.view = list[l].view;
            temp.sex = list[l].sex;
            temp.image = Config.imgPath + "/" + list[l].photosId;
            if (index == 0) {
              temp.status = 1;
            } else if (index == 2) {
              temp.status = 3;
            }
            pets.push(temp);
          }
          console.log(pets);
          if (index == 0) {
            var data = that.data.catsListOn;
            if (!reload) {
              pets = data.concat(pets)
            }
            that.setData({
              catsListOn: pets,
              pagesOn: res.data.pages,
              pageOn: res.data.pageNum,
            });
          } else if (index == 2) {
            var data = that.data.catsListOff;
            if (!reload) {
              pets = data.concat(pets)
            }
            that.setData({
              catsListOff: pets,
              pagesOff: res.data.pages,
              pageOff: res.data.pageNum,
            });
          }
          
        }
        that.hideLoading();
      })
  },

  refreshPetSong: function (page, size, status, reload) {
    var that = this;
    that.showLoading();
    requesttoken('/pets/getPetAndAdoptUser', "GET",
      { "page": page, "size": size, "status": status }, function (res) {
        console.log(res);
        if (res.success) {
          var list = res.data.list;
          var pets = [];
          for (let l in list) {
            var temp = {};
            temp.id = list[l].id;
            temp.name = list[l].nameCn;
            temp.image = Config.imgPath + "/" + list[l].photosId;
            temp.status = 2;
            temp.nickName = list[l].nickName;
            temp.phoneNumber = list[l].phoneNumber;
            temp.wechat = list[l].wechat;
            var adoptTime = list[l].adoptTime.substring(0,10);
            temp.adoptTime = adoptTime;
            pets.push(temp);
          }
          console.log(pets);
          var data = that.data.catsListSong;
          if (!reload) {
            pets = data.concat(pets)
          }
          that.setData({
            catsListSong: pets,
            pagesSong: res.data.pages,
            pageSong: res.data.pageNum,
          });
        }
        that.hideLoading();
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  modify: function (event) {
    var petId = event.currentTarget.dataset.petid;
    var status = event.currentTarget.dataset.status;
    console.log(petId);
    wx.navigateTo({
      url: '/pages/sendinforModify/sendinforModify?bid=' + petId + '&status=' + status,
    })
  },

  remove: function (event) {
    var that = this;
    var size = that.data.size;
    Dialog.confirm({
      title: '提示',
      message: '确认下架这只宠物吗'
    }).then(() => {
      that.showLoading();
      var petId = event.currentTarget.dataset.petid;
      requesttoken('/pets/removePetByMaster', "POST",
        { "petId": petId }, function (res) {
          if (res.success) {
            that.refreshPetInfo(1, size, 1, 0, true);
            that.refreshPetInfo(1, size, 3, 2, true);

          }
          that.hideLoading();
        })
    }).catch(() => {
      
    });
    
  },

  putAway: function (event) {
    var that = this;
    var size = that.data.size;
    Dialog.confirm({
      title: '提示',
      message: '确认上架这只宠物吗'
    }).then(() => {
      that.showLoading();
      var petId = event.currentTarget.dataset.petid;
      requesttoken('/pets/putAwayPetByMaster', "POST",
        { "petId": petId }, function (res) {
          if (res.success) {
            that.refreshPetInfo(1, size, 1, 0, true);
            that.refreshPetInfo(1, size, 3, 2, true);

          }
          that.hideLoading();
        })
    }).catch(() => {

    });
  },

  share: function (event) {
    console.log(event);
  },

  deletePet: function (event) {
    var that = this;
    var size = that.data.size;
    Dialog.confirm({
      title: '提示',
      message: '确认删除这只宠物吗'
    }).then(() => {
      that.showLoading();
      var petId = event.currentTarget.dataset.petid;
      requesttoken('/pets/deletePetByMaster', "POST",
        { "petId": petId }, function (res) {
          if (res.success) {
            that.refreshPetInfo(1, size, 3, 2, true);

          }
          that.hideLoading();
        })
    }).catch(() => {

    });
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
    var size = this.data.size;
    this.refreshPetInfo(1, size, 1, 0, true);
    this.refreshPetInfo(1, size, 3, 2, true);
    this.refreshPetSong(1, size, 2, true);
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
    var that = this;
    var index = that.data.index;
    var size = that.data.size;
    console.log("index" + index);
    if (index == 0) {
      var pageOn = that.data.pageOn + 1;
      var pagesOn = that.data.pagesOn;
      that.setData({
        pageOn: pageOn
      })
      if (pageOn <= pagesOn) {
        that.refreshPetInfo(pageOn, size, 1, 0, false);
      }
    } else if (index == 1) {
      var pageSong = that.data.pageSong + 1;
      var pagesSong = that.data.pagesSong;
      that.setData({
        pageSong: pageSong
      })
      if (pageSong <= pagesSong) {
        that.refreshPetSong(pageSong, size, 2, false);
      }
    } else if (index == 2) {
      var pageOff = that.data.pageOff + 1;
      var pagesOff = that.data.pagesOff;
      that.setData({
        pageOff: pageOff
      })
      if (pageOff <= pagesOff) {
        that.refreshPetInfo(pageOff, size, 3, 2, false);
      }
    }
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