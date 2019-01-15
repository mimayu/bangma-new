<template>
  <div class="assignHome_container">
    <div class="homepage">
      <router-link to="addCustom" class="alink">
        <img class="all_user" src="../../assets/img/home.png">
        新建客户
      </router-link>
      <router-link to="underAssignList" class="alink">
        <img class="all_user" src="../../assets/img/5.png">
        待分配列表
      </router-link>
      <router-link to="assignList" class="alink">
        <img class="all_user" src="../../assets/img/6.png">
        已分配列表
      </router-link>
      <router-link to="allStaff" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
        员工列表
      </router-link>
      <router-link to="allLabourer" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
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
