<template>
  <div class="footerNav_container">
    <router-link to="/home" class="alink">
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
export default {
  name: 'footerNav',
  data () {
    return {
      active: 0,
      home: '首页',
      msg: '消息',
      me: '我的',
    }
  },
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
