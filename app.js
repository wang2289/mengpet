//app.js
App({
  globalData: {
    remoteUrl: "http://47.94.161.221:8092/zmengstar_miniprogram/",
    // remoteUrl: "http://localhost:8091/zmengstarwx",
    userInfo: null,
    token:null,
    refreshIndex: false
  },
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     var isAuthorize = false //用户是否授权
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           isAuthorize = true
    //         },
    //         fail() {
    //           console.log("authorize fail")
    //         }
    //       })
    //     } else{
    //       isAuthorize = true
    //     }
    //     if (isAuthorize) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log(userInfo)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: this.globalData.remoteUrl + 'wechat/login',// 开发者服务器的登陆url
    //         data: {
    //           code: res.code// 发送的数据是号码牌
    //         },
    //         success: res => {
    //           wx.setStorageSync("session_token", res.header.session_token);
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  }
})