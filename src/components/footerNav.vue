<template>
  <div class="footerNav">
    <router-link to="/" class="alink">
    <img class="home_icon" src="../assets/img/22x.png">
    {{home}}
    </router-link>
    <router-link to="" class="alink">
      <img class="home_icon" src="../assets/img/12x.png">
      {{msg}}
      </router-link>
    <router-link to="" class="alink">
      <img class="home_icon" src="../assets/img/32x.png">
      {{me}}
      </router-link>  
  </div>
</template>

<script>
export default {
  name: 'footerNav',
  data () {
    return {
      home: '首页',
      msg: '消息',
      me: '我的',
    }
  }
}
</script>

<style scoped lang="scss">
  .footerNav{
    background: #fff;
    position: fixed;
    width: 100%; display: flex;left: 0;bottom: 0;
    border-top:1px solid #eee;
    line-height:10px;
    padding-top: 7px;
    box-shadow:0px 0px 9px #eee;
    z-index: 999;
  }
  .alink{
    flex: 1;
    text-align: center;
    margin: 0;
    height: 45px;
    line-height: 18px;
    font-weight: 500;font-size: 10px;
  }
  .home_icon{
    width:18px;
    height:18px;
    display:block;
    margin:0 auto 3px auto;
  }
</style>
