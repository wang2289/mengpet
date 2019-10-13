import Toast from 'vant-weapp/toast/toast';

function checkusername(username) {


  var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  var isMobile = /^1[345789]\d{9}$/;
  if (username == "") {
    // wx.showToast({
    //   title: '账号不能为空！',
    //   icon: "none"
    // })
    Toast.fail("账号不能为空！")
    return false;

  } else if (!email.test(username) && !isMobile.test(username)) {

    // wx.showToast({
    //   title: '请输入正确的\r\n手机或邮箱格式！',
    //   icon: "none"
    // })
    Toast.fail("请输入正确的\r\n手机或邮箱格式！")
    return false;
  } else {

    return true;
  }
}

function checkpassword(password) {
  if (password == "" || password.length < 6) {
    // wx.showToast({
    //   title: '密码不能为空！并且长度不能小于6位数',
    //   icon: "none"
    // })
    Toast.fail("密码不能为空！并且长度不能小于6位数")
    return false;
  } else {
    return true;

  }
}

function checkrepassword(password, repassword) {
  if (repassword == "") {
    // wx.showToast({
    //   title: '确认密码不能为空！',
    //   icon: "none"
    // })
    Toast.fail("确认密码不能为空！")
    return false;
  } else if (password != repassword) {

    // wx.showToast({
    //   title: '两次密码输入不一致！',
    //   icon: "none"
    // })
    Toast.fail("两次密码输入不一致！")
    return false;
  } else {
    return true;

  }
}

module.exports.checkusername = checkusername;
module.exports.checkpassword = checkpassword;
module.exports.checkrepassword = checkrepassword;