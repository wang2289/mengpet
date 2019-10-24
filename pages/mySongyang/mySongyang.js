import {
  Config
} from '../../utils/config.js'
let app = getApp();
import {
  requestsend,
  requesttoken
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    active: 0,
    catsList: [{
      id: '0',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '毛球球球球球球球',
      lingyangName: '小娃',
      phone: 13888888888,
      weixin: 'asffsgf',
      date: '2019.03.02',
      age: '1岁1个月',
      color: '橘猫',
      view: 20
    }, {
      id: '1',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '毛球球球球球球球球球球球wwwwww球球…',
      lingyangName: '小娃',
      phone: 13888888888,
      weixin: 'asffsgf',
      date: '2019.03.02',
      age: '1岁1个月',
      color: '橘猫',
      view: 20
    }],

    catsList2: [{
      id: '0',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '栗子',
      lingyangName: '小娃',
      phone: 13888888888,
      weixin: 'asffsgf',
      date: '2019.03.02',
      age: '1岁1个月',
      color: '橘猫'
    }, {
      id: '1',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '花化',
      lingyangName: '小娃',
      phone: 13888888888,
      weixin: 'asffsgf',
      date: '2019.03.02'
    }, {
      id: '1',
      image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      name: '小狸狸狸狸狸狸狸狸狸狸狸狸狸',
      lingyangName: '小娃',
      phone: 13888888888,
      weixin: 'asffsgf',
      date: '2019.03.02'
    }]
  },

  onChange(event) {
    this.setData({
      index : event.detail.index,
      active : event.detail.index
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    requesttoken('/pets/getPetsByUserIdAndStatus', "GET",
      { "page": 1, "size": 10, "status": 1}, function (res) {
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
            temp.image = Config.imgPath + "/" + list[l].photosId
            pets.push(temp);
          }
          console.log(pets);
        that.setData({
          catsList: pets
        });
        }
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