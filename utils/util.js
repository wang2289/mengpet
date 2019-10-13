import {
  Config
} from 'config.js'
import {
  Token
} from 'token.js'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//带token 验证的
function requestsendtoken(url, method, data, callBack) {
  var username = wx.getStorageSync("userName")
  var passwoerd = wx.getStorageSync("userPassword")

  if (username == "" || passwoerd == "") {
    wx.navigateTo({
      url: '/pages/register/register?returnurl=returnurl',
    })
  } else {
    data["classid"] = Config.classid;
    var url = Config.apiUrl + '/' + url;

    var token = new Token();
    if (!method) {
      method = "GET"
    };
    token.verify((tokenres) => {
      // console.log("res：" + tokenres);

      wx.request({
        url: url,
        data: data,
        method: method,
        header: {
          'content-type': 'application/json',
          //'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'Bearer ' + tokenres + ''
        },
        success: function(res) {
          callBack(res.data);
        },
        fail: function(error) {
          wx.showToast({

            icon: "none",

            title: '服务器异常，清稍候再试'

          })
        }

      })
    });
  }


}

//带token post 验证的
function requestposttoken(url, data, callBack) {
  var username = wx.getStorageSync("userName")
  var passwoerd = wx.getStorageSync("userPassword")

  if (username == "" || passwoerd == "") {
    wx.navigateTo({
      url: '/pages/register/register?returnurl=returnurl',
    })
  } else {
    data["classid"] = Config.classid;
    var url = Config.apiUrl + '/' + url;

    var token = new Token();

    token.verify((tokenres) => {
      // console.log("res：" + tokenres);

      wx.request({
        url: url,
        data: data,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charse=utf-8',
          'authorization': 'Bearer ' + tokenres + ''
        },
        success: function(res) {
          callBack(res.data);
        },
        fail: function(error) {
          wx.showToast({

            icon: "none",

            title: '服务器异常，清稍候再试'

          })
        }

      })
    });
  }


}
// 不带token的请求
function requestsend(url, method, data, callBack) {
  data["classid"] = Config.classid;
  var url = Config.apiUrl + '/' + url;
  if (!method) {
    method = "GET"
  };
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      'content-type': 'application/json',
    },
    success: function(res) {
      callBack(res.data);
    },
    fail: function(error) {
      console.log(error)
    }

  })


}

// 上直播的请求
function shangzhiborequestsend(bianhao, callBack) {

  wx.request({
    url: 'https://shangzhibo.tv/api/activity/' + bianhao,
    method: 'get',
    header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer c3804420-656b-11e9-8ece-21692d2c8db4'
    },
    success: function(res) {
      callBack(res);
    },
    fail: function(error) {
      wx.showToast({

        icon: "none",

        title: '服务器异常，清稍候再试'

      })
    }

  })


}
//验证用户是否购买课程
function checkuserbuycourse(aomid) {
  var url = 'api/QX/CheckIsBuy?'
  var result = requestsendtoken(url, null, {
    aomid: aomid
  }, res => {
    console.log("util获取的值" + res)
    if (res.code == 0) {
      return true
    } else {
      return false
    }
  })
}
module.exports = {
  formatTime: formatTime,
  requestsendtoken: requestsendtoken,
  requestsend: requestsend,
  checkuserbuycourse: checkuserbuycourse,
  shangzhiborequestsend: shangzhiborequestsend,
  requestposttoken: requestposttoken
}