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
       <router-link to="settlement" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
        结算
      </router-link>
       <router-link to="loss" class="alink">
        <img class="all_user" src="../../assets/img/7.png">
        流失名单
      </router-link>
    </div>

     <div class="rank">
      <router-link to="gzProgress" class="alink">
        工长实施进程
      </router-link>
      <router-link to="salesSortYj" class="alink">
        业绩排行榜
      </router-link>
      <router-link to="salesSort" class="alink">
        渠道排行榜
      </router-link>
    </div>

    <h3>数据统计</h3>

    <Tabs v-model="active">
        <Tab title="今天">
         <Row class=mini>
            <Col span="6">%</Col>
            <Col span="6">上门率66%</Col>
            <Col span="6">签单率66%</Col>
            <Col span="6">%</Col>

        </Row>
        <Row class="order">
            <Col span="6">30<br/>总接单数</Col>
            <Col span="6">30<br/>总上门数</Col>
            <Col span="6">30<br/>总签单数</Col>
            <Col span="6">30<br/>总签单金额</Col>
        </Row>
        
           
        </Tab>
        <Tab title="本周">www</Tab>
        <Tab title="本月">www</Tab>
    </Tabs>


    <h3>签单占比</h3>

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
            active: 0
        }
    }
}
</script>

<style lang="scss"> 
.mini{
    text-align:center;padding:10px 0;font-size: 10px;
    color: #8797B6;
    .van-col:first-child,
    .van-col:last-child{color:#fff;}
}
.order{
    text-align:center;line-height:1.5;
    font-size: 12px;
    color: #575757;
    padding-bottom:10px;
    border-bottom:1px solid #EBEBEB;
    }
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
    width:60%;
    // height:73px;
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
