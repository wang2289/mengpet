import { HTTP } from '../utils/http.js'
class TikuModel extends HTTP {
  constructor() {
    super()
  }

  getTikutab(success) {
    var params = {
      url: 'api/TiKu/GetTikuType?classid=5000&aomid=1005',
      success: success
    }
    this.request(params)
  }

  getDetail(bid, success) {
    let params = {
      url: 'book/' + bid + '/detail',
      success: success
    }
    this.request(params)
  }

  getLikeStatus(bid, success) {
    let params = {
      url: '/book/' + bid + '/favor',
      success: success
    }
    this.request(params)
  }

  getMyBookCount(success) {
    let params = {
      url: '/book/favor/count',
      success: success
    }
    this.request(params)
  }
}

export { TikuModel }