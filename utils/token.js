import {
  Config
} from 'config'
class Token {
  constructor() {

    this.tokenUrl = Config.tokenUrl + '/connect/token';

  }

  verify(sbackcall) {

    var token = wx.getStorageSync('token');
    // console.log('1111'+token);
    if (!token) {

      this.getTokenFromServer((res) => {

        // token = res;
        // console.log('2222' + res);
        sbackcall(res);

        // callback(res);
      });
    } else {
      let timestamp = Date.parse(new Date());
      let expiration = wx.getStorageSync('data_expiration');
      // console.log('timestamp:' + timestamp + 'expiration:' + expiration);
      if (expiration < timestamp) {
        //  this.getTokenFromServer().then((res) => { token = res;
        //   console.log('3333' + token);
        // }).catch((res)=>{console.log(res)})
        this.getTokenFromServer((res) => {
          // token=res;
          //  console.log('3333' + res);
          sbackcall(res);

          // callback(res);
        });

      } else {

        sbackcall(token);
      }

    }
    // console.log('4444' + token);
    // console.log('5555' + wx.getStorageSync('token'));
    // return  wx.getStorageSync('token');
  }

  //从服务器获取token
  getTokenFromServer(callback) {
    var that = this;
    // return new Promise(function (resolve, reject){
    //   wx.request({
    //     url: that.tokenUrl,
    //     method: 'POST',
    //     data: {
    //       username: 'jljy',
    //       password: '20162017',
    //       grant_type: 'password',
    //       client_id: 'weixin',
    //       client_secret: 'secret'
    //     },
    //     header: {
    //       "content-type": "application/x-www-form-urlencoded",
    //       //'content-type': 'json'
    //     },
    //     success: function (res) {

    //       let timestamp = Date.parse(new Date());
    //       wx.setStorageSync('token', res.data.access_token);
    //       wx.setStorageSync('data_expiration', timestamp + (res.data.expires_in - 60) * 1000);
    //       console.log('timestamp:' + timestamp + 'res.data.expires_in:' + res.data.expires_in);
    //       console.log(wx.getStorageSync('data_expiration'));
    //       resolve(res.data.access_token);
    //     }
    //   })
    // })
    wx.request({
      url: that.tokenUrl,
      method: 'POST',
      data: {
        username: wx.getStorageSync("userName"), // 'jljy',
        password: wx.getStorageSync("userPassword"), // '20162017',
        grant_type: 'password',
        client_id: Config.client_id,
        client_secret: Config.client_secret
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        //'content-type': 'json'
      },
      success: function (res) {
        // var result = JSON.parse(res)
        // console.log("异步获取的：" + res.data.access_token);
        let timestamp = Date.parse(new Date());
        wx.setStorageSync('token', res.data.access_token);
        wx.setStorageSync('data_expiration', timestamp + (res.data.expires_in - 60) * 1000);
        // console.log('timestamp:' + timestamp + 'res.data.expires_in:' + res.data.expires_in);
        // console.log(wx.getStorageSync('data_expiration'));
        callback(res.data.access_token);
      }
    })

  }
}
export {
  Token
};