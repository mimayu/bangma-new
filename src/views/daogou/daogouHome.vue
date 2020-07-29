<template>
  <div class="daogouHome_container">
    <div class="homepage">
      <!--router-link to="daogouJiedan" class="alink">
        <img class="all_user" src="../../assets/img/home.png">
        门店接单
      </router-link-->
      <router-link to="foremanBaoming" class="alink">
        <img class="all_user" src="../../assets/img/5.png">
        扫码客户
      </router-link>
    </div>
    <footerNav></footerNav>
  </div>
</template>

<script>
  import footerNav from '../../components/footerNav';

  export default {
    name: 'daogouHome',
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
  .daogouHome_container {
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
