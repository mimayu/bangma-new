<template>
  <div id="home" class="saleHome_container">
    <div class="homepage">
      <router-link to="allUser" class="alink">
        <img class="all_user" src="../../assets/img/home.png">
        全部客户
      </router-link>
      <router-link to="detection" class="alink">
        <img class="all_user" src="../../assets/img/3.png">
        基检
      </router-link>
      <router-link to="saleWorking" class="alink">
        <img class="all_user" src="../../assets/img/4.png">
        开工实施
      </router-link>
      <router-link :to="{path:'/signStatus', query: {active: 0}}" class="alink">
        <img class="all_user" src="../../assets/img/5.png">
        签约等待
      </router-link>
      <router-link :to="{path:'/signStatus', query: {active: 1}}" class="alink">
        <img class="all_user" src="../../assets/img/6.png">
        签约成功
      </router-link>
      <router-link to="saleFinish" class="alink">
        <img class="all_user" src="../../assets/img/88.png">
        完工
      </router-link>
      <router-link to="saleLoss" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
        流失
      </router-link>
      <a :href="'http://www.51bangma.com/client/kaigongdatelistformobile/'" class="alink">
        <img class="all_user" src="../../assets/img/mgicon06.gif">
        开工日期
      </a>
      <a :href="'http://www.51bangma.com/anli/browse/'" class="alink">
        <img class="all_user" src="../../assets/img/11.png">
        案例
      </a>

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
  }
</script>

<style lang="scss">
    a:link,a:visited,a:hover,a:active { 
       font-size: 14px;
      color: #575757;
      }
  .saleHome_container {
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
      width:70%;
      // height:73px;
      border-radius:50%;
      display:block;
      margin: 0 auto 10px auto;
    }
  }
</style>
