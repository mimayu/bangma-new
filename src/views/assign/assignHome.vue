<template>
  <div class="assignHome_container">
    <div class="homepage">
      <a :href="'http://www.51bangma.com/client/add/'" class="alink">
        <img class="all_user" src="../../assets/img/kh.png">
        新建客户
      </a>
      <router-link to="underAssignList" class="alink">
        <img class="all_user" src="../../assets/img/11.png">
        待分配列表
      </router-link>
      <router-link to="assignList" class="alink">
        <img class="all_user" src="../../assets/img/list.png">
        已分配列表
      </router-link>
      <router-link to="allStaff" class="alink">
        <img class="all_user" src="../../assets/img/ylist.png">
        员工列表
      </router-link>
      <router-link to="allLabourer" class="alink">
        <img class="all_user" src="../../assets/img/66.png">
        工长列表
      </router-link>
    </div>
    <footerNav></footerNav>
  </div>
</template>

<script>
  import footerNav from '../../components/footerNav'

  export default {
    name: 'home',
    components: {
      'footerNav': footerNav
    },
    created() {
      // this.toastCookieError();
    },
    methods: {
      //设置cookie
      // setCookie(cookieName, cookieValue, nDays) {
			// 			var today = new Date;
			// 			var expire = new Date;
			// 			if (nDays) {
			// 				expire.setTime(today.getTime() + 3600000 * 24 * nDays);
			// 			}
      //       document.cookie = cookieName + '=' + escape(cookieValue) + 
      //       (nDays ? ('; expires=' + expire.toGMTString()) : '') + '; path=/; domain=51bangma.com';
		
      // },
      // getCookie(name) {
			// 			var nameEQ = name + '=';
			// 			var ca = document.cookie.replace(/\s/g, '').split(';');
			// 			for (var i = 0; i < ca.length; i++) {
			// 				var c = ca[i];
			// 				if (c.indexOf(nameEQ) == 0)
			// 					return unescape(c.substring(nameEQ.length, c.length).replace(/\+/g, ' '));
			// 			}
			// 			return null;
			// },
      //读取cookie
      // toastCookieError: function() {
      //   if (this.getCookie("_fmsg")) {
      //     var flash_msg = this.getCookie("_fmsg");
      //     this.setCookie("_fmsg", "", -1);
      //     var flash_msg_obj = eval("(" + flash_msg + ")");
      //     var jsonObj = eval(flash_msg_obj) || {};
      //     var error_msg = jsonObj.error_msg || "";
      //     if (jsonObj) {
      //         Toast(error_msg);
      //     }

      //   }
      // },
      //清除cookie
      // clearCookie: function() {
      //     this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      // }
    }
  }
</script>

<style lang="scss">
  .assignHome_container {
    .homepage {
      padding: 15px;
      display: flex;
      flex-wrap: wrap ;
    }
    a{
      width:33%;
      text-align: center; 
      margin-bottom:10%;
    }
    .alink{
      font-size: 14px;
    }
    .all_user{
      width:73px;
      height:73px;
      border-radius:50%;
      display:block;
      margin: 0 auto 10px auto;
    }
  }
</style>
