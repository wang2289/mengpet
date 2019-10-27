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
    index: 0,
    active: 0,
    catsListOn: [],
    catsListOff: [],
    catsListSong: []
  },

  onChange(event) {
    let index = event.detail.index;
    // if (index == 0) {
    //   this.refreshPetInfo(1, 10, 1);
    // } else 
    // if (index == 1) {
    //   this.refreshPetInfo(1, 10, 3);
    // }
    // if (index == 2) {
    //   this.refreshPetInfo(1, 10, 3);
    // }
    this.setData({
      index : event.detail.index,
      active : event.detail.index
    });
  },

  refreshPetInfo: function (page, size, status, index) {
    var that = this;
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
            that.setData({
              catsListOn: pets
            });
          } else if (index == 2) {
            that.setData({
              catsListOff: pets
            });
          }
          
        }
      })
  },

  refreshPetSong: function (page, size, status) {
    var that = this;
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
          that.setData({
            catsListSong: pets
          });
        }
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
    Dialog.confirm({
      title: '提示',
      message: '确认下架这只宠物吗'
    }).then(() => {
      var petId = event.currentTarget.dataset.petid;
      requesttoken('/pets/removePetByMaster', "POST",
        { "petId": petId }, function (res) {
          if (res.success) {
            that.refreshPetInfo(1, 10, 1, 0);
            that.refreshPetInfo(1, 10, 3, 2);

          }
        })
    }).catch(() => {
      
    });
    
  },

  putAway: function (event) {
    var that = this;
    Dialog.confirm({
      title: '提示',
      message: '确认上架这只宠物吗'
    }).then(() => {
      var petId = event.currentTarget.dataset.petid;
      requesttoken('/pets/putAwayPetByMaster', "POST",
        { "petId": petId }, function (res) {
          if (res.success) {
            that.refreshPetInfo(1, 10, 1, 0);
            that.refreshPetInfo(1, 10, 3, 2);

          }
        })
    }).catch(() => {

    });
  },

  share: function (event) {
    console.log(event);
  },

  deletePet: function (event) {
    var that = this;
    Dialog.confirm({
      title: '提示',
      message: '确认删除这只宠物吗'
    }).then(() => {
      var petId = event.currentTarget.dataset.petid;
      requesttoken('/pets/deletePetByMaster', "POST",
        { "petId": petId }, function (res) {
          if (res.success) {
            that.refreshPetInfo(1, 10, 3, 2);

          }
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
    this.refreshPetInfo(1, 10, 1, 0);
    this.refreshPetInfo(1, 10, 3, 2);
    this.refreshPetSong(1, 10, 2);
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