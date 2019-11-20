<template>
  <div class="manageHome_container">
    <div class="homepage">
      <router-link to="material" class="alink">
        <img class="all_user" src="../../assets/img/5.png">
        主材下单待确认
      </router-link>
      <router-link to="orderlist" class="alink">
        <img class="all_user" src="../../assets/img/6.png">
        主材确认待下单
      </router-link>
      <router-link to="orderlist?active=1" class="alink">
        <img class="all_user" src="../../assets/img/kh.png">
        待主材商反馈
      </router-link>
      <router-link to="orderlist?active=2" class="alink">
        <img class="all_user" src="../../assets/img/order.png">
        主材商已反馈
      </router-link>
      <router-link to="orderlist?active=3" class="alink">
        <img class="all_user" src="../../assets/img/55.png">
        安装完成
      </router-link>
      <router-link to="nomaterial" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
        无主材下单
      </router-link>
      <router-link to="supplement" class="alink">
        <img class="all_user" src="../../assets/img/kh.png">
        主材补单
      </router-link>
    </div>
    <footerNav></footerNav>
  </div>
</template>

<script>
  import footerNav from '../../components/footerNav';

  export default {
    name: 'manageHome',
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
  .manageHome_container {
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
