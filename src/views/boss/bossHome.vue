<template>
  <div id="bossHome">
    <!--<homePage></homePage>-->
    <div class="homepage">
      <router-link to="allUser" class="alink">
        <img class="all_user" src="../../assets/img/home.png">
        全部客户
      </router-link>
      <router-link to="detection" class="alink">
        <img class="all_user" src="../../assets/img/3.png">
        新进客户
      </router-link>
      <router-link to="startWork" class="alink">
        <img class="all_user" src="../../assets/img/4.png">
        签约客户
      </router-link>
      <router-link to="signStatus" class="alink">
        <img class="all_user" src="../../assets/img/5.png">
        开工实施
      </router-link>
      <router-link to="signStatus" class="alink">
        <img class="all_user" src="../../assets/img/6.png">
        完工
      </router-link>
      <router-link to="signStatus" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
        审核完成
      </router-link>
       <router-link to="signStatus" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
        结算
      </router-link>
       <router-link to="signStatus" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
        流失名单
      </router-link>
    </div>

     <div class="rank">
      <router-link to="allUser" class="alink">
        工长实施进程
      </router-link>
      <router-link to="detection" class="alink">
        业绩排行榜
      </router-link>
      <router-link to="startWork" class="alink">
        渠道排行榜
      </router-link>
    </div>

    <h3>数据统计</h3>

    <Tabs v-model="active">
        <Tab title="今天">今天</Tab>
        <Tab title="本周">www</Tab>
        <Tab title="本月">www</Tab>
    </Tabs>
    <footerNav></footerNav>
  </div>
</template>

<script>
import footerNav from '../../components/footerNav'

import { Cell, CellGroup, Popup, Row, Col, Picker, Toast , Tab,Tabs,} from 'vant';

// import homePage from '../components/modPage/homePage' // 引入login.vue组件
export default {
  name: 'bossHome',
    components: {
        Cell,
        CellGroup,
        Popup,
        Picker,
        Row,
        Col,
        Toast,
         Tab,
            Tabs,
        footerNav: footerNav
    },
    data () {
        return {
            list:{},
            active: 2
        }
    },

  components: {
    'footerNav': footerNav,
    // 'homePage': homePage,
  },
}
</script>

<style lang="scss"> 
    a{
    font-size: 28px;
    color: #575757;
    }
    h3{
        font-size: 14px;
        color: #262626;
        font-family: PingFangSC-Medium;
        padding:10px;text-align:center;
    }
  .homepage{
    padding: 15px;display: flex;
    flex-wrap: wrap ;
  }
  a{
    width:25%;
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
  .rank{
      padding:10px 0;
      display:flex; justify-content: space-between;
      border-top: 1px solid #EBEBEB;
      border-bottom: 1px solid #EBEBEB;
      a{line-height:100%;margin:0;border-right: 1px solid #EBEBEB;width:33%}
      }
</style>
