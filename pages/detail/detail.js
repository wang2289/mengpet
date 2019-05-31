// pages/detail/detail.js
// import {
//   PetsModel
// } from '../../models/pets.js'
import {
  LikeModel
} from '../../models/like.js'
import {
  CommentModel
} from '../../models/comment.js'

// let petsModel = new PetsModel()
let commentModel = new CommentModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pets: Object,
    pet: null,
    comments: [],
    noComment: true,
    posting: false,
    like: false,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let bid = options.bid
    // petsModel.getDetail(bid, (data) => {
    var data = 
      {
        id: '0',
        image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        name: '毛球球球球球球球球…',
        age: '1岁1个月',
        newname: '狸花',
        tips: '亲人',
        city: '上海',
        area: '普陀',
        view: '20'
      }
    var data2 = [
      {
        id: '0',
        image: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        name: '毛球球球球球球球球…',
        age: '1岁1个月',
        newname: '狸花',
        tips: '亲人',
        city: '上海',
        area: '普陀',
        view: '20'
      },
      {
        id: '1',
        image: '/images/icon/search.png',
        name: '毛球球球球球球球球球球球wwwwww球球…',
        age: '1岁1个月',
        newname: '狸花',
        tips: '亲人',
        city: '上海',
        area: '普陀',
        view: '20'
      }
    ]
    this.setData({
      pets: data2
    })
      this.setData({
        pet: data
      })
   // })

    commentModel.getComment(bid, (data) => {
      this.setData({
        noComment: data.comments == false ? true : false,
        comments: data.comments
      })
    })

    // petsModel.getLikeStatus(bid, (data) => {
    //   this.setData({
    //     like: data.like_status,
    //     count: data.fav_nums
    //   })
    // })
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

  onShareAppMessage() {

  }
})