import axios from "axios";
export default class CaptchaApi {

  public getCaptchaImage() {
    return axios.request({
      url: '/captcha/image',
      method: 'get'
    })
  }

}