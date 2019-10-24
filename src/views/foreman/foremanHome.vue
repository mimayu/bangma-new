<template>
  <div class="foremanHome_container">
    <div class="homepage">
      <router-link to="foremanRecommend" class="alink">
        <img class="all_user" src="../../assets/img/home.png">
        我的推荐
      </router-link>
      <router-link to="foremanBaoming" class="alink">
        <img class="all_user" src="../../assets/img/5.png">
        扫码客户
      </router-link>
      <router-link to="foremanConstruction" class="alink">
        <img src="/img/4.51235a66.png" class="all_user">
        施工工地
      </router-link>
    </div>
    <footerNav></footerNav>
  </div>
</template>

<script>
  import footerNav from '../../components/footerNav';

  export default {
    name: 'foremanHome',
    components: {
      'footerNav': footerNav,
    },
  }
</script>

<style lang="scss">
   a:link,a:visited,a:hover,a:active { 
      font-size: 14px;
      color: #575757;
      }
  .foremanHome_container {
    .homepage{
      padding: 15px;
      display: flex;
      flex-wrap: wrap;
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
      width:70%;
      // height:73px;
      border-radius:50%;
      display:block;
      margin: 0 auto 10px auto;
    }
  }
</style>
