/* 获取用户系统配置引用 start */
import { login } from '@/settings';

import {
  setToken,
  getToken,
  getStorage,
  toLogin,
} from '@/utils/index';


//登陆后获取用户相关系统配置信息
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    var _login = login && login.unadd;
    // 判断是否使用的是单点登录
    if (!_login) {
      var userId = '';
      let hash = window.location.hash
      if (hash.indexOf('?userTag=') > -1) {
        let param = hash.split('?')
        for (let i = 0; i < param.length; i++) {
          if (param[i].indexOf('userTag=') > -1) {
            userId = 297 + Number(param[i].split('=')[1])
            continue
          }
        }
        setToken('123')
      } else {
        this.loginSuccess = true;
        var hasToken = getToken();
        var userInfo = getStorage('userInfo');
        let tokenIndex = window.location.href.lastIndexOf('?token=');
        //判断是否从登陆页跳转过来
        if (tokenIndex === -1) {
          //判断用户是否已登陆过
          if (hasToken && userInfo) {
            userId = userInfo.userId;
          } else {
            toLogin();
          }
        } else {
          let userInfoUrl = window.location.href;
          let tokenIndex = userInfoUrl.lastIndexOf('?token=');
          let userIndex = userInfoUrl.lastIndexOf('&userId=');
          //判断是否携带token和userId
          if (userIndex !== -1) {
            setToken(userInfoUrl.substring(tokenIndex + 7, userIndex));
            userId = userInfoUrl.substring(userIndex + 8, userInfoUrl.length);
          } else {
            toLogin();
          }
        }
      }
      //判断是否存在userId
      if (userId != '') {
        //获取码表
        //获取用户权限
        //获取用户信息---组织机构等
      }
    }
  },
  watch: {
  }
}
