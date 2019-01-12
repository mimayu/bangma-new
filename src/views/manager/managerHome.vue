<template>
  <div class="manageHome_container">
    <div class="homepage">
      <router-link to="allUser" class="alink">
        <img class="all_user" src="../../assets/img/home.png">
        全部客户
      </router-link>
      <router-link to="managerSign" class="alink">
        <img class="all_user" src="../../assets/img/3.png">
        签约成功
      </router-link>
      <router-link to="managerWork" class="alink">
        <img class="all_user" src="../../assets/img/4.png">
        派工完成
      </router-link>
      <router-link to="managerWork" class="alink">
        <img class="all_user" src="../../assets/img/5.png">
        开工实施
      </router-link>
      <router-link to="managerDone" class="alink">
        <img class="all_user" src="../../assets/img/6.png">
        完工·收款中
      </router-link>
      <router-link to="managerFinish" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
        完工·已结清
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
