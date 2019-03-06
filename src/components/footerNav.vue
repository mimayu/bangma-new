<template>
  <div class="footerNav_container">
    <router-link :to="'/'+homeurl" class="alink">
      <div class="tab-link">
        <img class="home_icon" src="../assets/img/22x.png">
        {{home}}
      </div>
    </router-link>
    <router-link to="/remind" class="alink">
      <div class="tab-link">
        <img class="home_icon" src="../assets/img/12x.png">
        {{msg}}
      </div>
    </router-link>
    <router-link to="/profile" class="alink">
      <div class="tab-link">
        <img class="home_icon" src="../assets/img/32x.png">
        {{me}}
      </div>
    </router-link>
  </div>
</template>

<script>
import { checkRoleType } from '@/server';
import { Toast } from 'vant';

export default {
  name: 'footerNav',
  data () {
    return {
      active: 0,
      home: '首页',
      msg: '消息',
      me: '我的',
      homeurl: 'home'
    }
  },
  created() {
    this.getHomeUrl();
    this.toastCookieError();
  },
  methods: {
    getHomeUrl() {
        checkRoleType().then(
          res => {
              this.homeurl = res.homeurl;
            }
        )
    },
     //设置cookie
      setCookie(cookieName, cookieValue, nDays) {
						var today = new Date;
						var expire = new Date;
						if (nDays) {
							expire.setTime(today.getTime() + 3600000 * 24 * nDays);
						}
            document.cookie = cookieName + '=' + escape(cookieValue) + 
            (nDays ? ('; expires=' + expire.toGMTString()) : '') + '; path=/; domain=51bangma.com';
		
      },
      getCookie(name) {
						var nameEQ = name + '=';
						var ca = document.cookie.replace(/\s/g, '').split(';');
						for (var i = 0; i < ca.length; i++) {
							var c = ca[i];
							if (c.indexOf(nameEQ) == 0)
								return unescape(c.substring(nameEQ.length, c.length).replace(/\+/g, ' '));
						}
						return null;
			},
      //读取cookie
      toastCookieError: function() {
        if (this.getCookie("_fmsg")) {
          var flash_msg = this.getCookie("_fmsg");
          this.setCookie("_fmsg", "", -1);
          var flash_msg_obj = eval("(" + flash_msg + ")");
          var jsonObj = eval(flash_msg_obj) || {};
          var error_msg = jsonObj.error_msg || "";
          if (jsonObj) {
              Toast(error_msg);
          }

        }
      },
      //清除cookie
      clearCookie: function() {
          this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }
  }
}
</script>

<style lang="scss">
  .footerNav_container {
    background: #fff;
    position: fixed;
    width: 100%; display: flex;left: 0;bottom: 0;
    border-top:1px solid #eee;
    line-height:10px;
    padding-top: 7px;
    box-shadow:0px 0px 9px #eee;
    z-index: 999;
    .alink{
      flex: 1;
      text-align: center;
      margin: 0;
      height: 45px;
      line-height: 18px;
      font-weight: 500;
      font-size: 10px;
    }
    .home_icon{
      width:18px;
      height:18px;
      display:block;
      margin:0 auto 3px auto;
    }
    .tab-link {
      font-size: 10px;
    }
    .router-link-active .tab-link{ //.router-link-active 指定
      color: red;
      font-size: 10px;
    }
  }  
</style>
