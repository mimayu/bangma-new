<template>
  <div id="bossHome" class="bossHome_container">
    <!--<homePage></homePage>-->
    <div class="homepage">
      <router-link to="allUser" class="alink">
        <img class="all_user" src="../../assets/img/home.png">
        全部客户
      </router-link>
      <router-link to="bossAddCustom" class="alink">
        <img class="all_user" src="../../assets/img/kh.png">
        新进客户
      </router-link>
      <router-link to="bossSignCustom" class="alink">
        <img class="all_user" src="../../assets/img/44.png">
        签约客户
      </router-link>
      <router-link to="bossWorking" class="alink">
        <img class="all_user" src="../../assets/img/33.png">
        开工实施
      </router-link>
      <router-link to="bossFinish" class="alink">
        <img class="all_user" src="../../assets/img/6.png">
        完工
      </router-link>
      <router-link to="bossAudit" class="alink">
        <img class="all_user" src="../../assets/img/55.png">
        审核完成
      </router-link>
       <router-link to="bossSettle" class="alink">
        <img class="all_user" src="../../assets/img/88.png">
        结算
      </router-link>
       <router-link to="bossLoss" class="alink">
        <img class="all_user" src="../../assets/img/order.png">
        流失名单
      </router-link>
    </div>

     <div class="rank">
      <router-link to="gzProgress" class="alink">
        <img class="" src="../../assets/img/77.png">
        
        工长实施进程
      </router-link>
      <router-link to="salesSortYj" class="alink">
        <img class="" src="../../assets/img/rank2.png">

        业绩排行榜
      </router-link>
      <router-link to="salesSort" class="alink">
        <img class="" src="../../assets/img/rank.png">

        渠道排行榜
      </router-link>
    </div>


    <Tabs v-model="active">
        <Tab title="今天">
            <h3>数据统计</h3>
            <Row class=mini>
                <Col span="6">%</Col>
                <Col span="6">上门率{{data.shangmen_rate * 100}}%</Col>
                <Col span="6">签单率{{data.qiandan_rate * 100}}%</Col>
                <Col span="6">%</Col>
            </Row>
            <Row class="order">
                <Col span="6">{{data.all_num}}<br/>总接单数</Col>
                <Col span="6">{{data.shangmen_num}}<br/>总上门数</Col>
                <Col span="6">{{data.qiandan_num}}<br/>总签单数</Col>
                <Col span="6">{{data.qiandan_fee}}<br/>总签单金额</Col>
            </Row>
            <div class="chart-wrapper">
                <h3>签单占比</h3>
                <canvas id="visit" class="piechart"></canvas>
            </div>
       </Tab>
        <Tab title="本周">
            <h3>数据统计</h3>
            <Row class=mini>
                <Col span="6">%</Col>
                <Col span="6">上门率{{data.shangmen_rate * 100}}%</Col>
                <Col span="6">签单率{{data.qiandan_rate * 100}}%</Col>
                <Col span="6">%</Col>
            </Row>
            <Row class="order">
                <Col span="6">{{data.all_num}}<br/>总接单数</Col>
                <Col span="6">{{data.shangmen_num}}<br/>总上门数</Col>
                <Col span="6">{{data.qiandan_num}}<br/>总签单数</Col>
                <Col span="6">{{data.qiandan_fee}}<br/>总签单金额</Col>
            </Row>
            <h3>签单占比</h3>
        </Tab>
      <Tab title="本月">
         <h3>数据统计</h3>

          <Row class=mini>
            <Col span="6">%</Col>
            <Col span="6">上门率{{data.shangmen_rate * 100}}%</Col>
            <Col span="6">签单率{{data.qiandan_rate * 100}}%</Col>
            <Col span="6">%</Col>

          </Row>
          <Row class="order">
            <Col span="6">{{data.all_num}}<br/>总接单数</Col>
            <Col span="6">{{data.shangmen_num}}<br/>总上门数</Col>
            <Col span="6">{{data.qiandan_num}}<br/>总签单数</Col>
            <Col span="6">{{data.qiandan_fee}}<br/>总签单金额</Col>
          </Row>
          <h3>签单占比</h3>
      </Tab>
    </Tabs>



    <footerNav></footerNav>
  </div>
</template>

<script>
import { Cell, CellGroup, Popup, Row, Col, Picker, Toast , Tab,Tabs,} from 'vant';
import F2 from '@antv/f2/lib/index-all';
import PieLabel from '@antv/f2/lib/plugin/pie-label'; 
import footerNav from '../../components/footerNav'
import { datastatistical } from '@/server';

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
            data: {},
            active: 0,
            list_all: []
        }
    },
    created() {
      this.datastatistical();
    },
    mounted() {
        setTimeout(
            () => {
                this.createChart();
            }, 4000
        )
    },
    methods: {
       datastatistical(type) {
            let params = {
                'type': this.type,
            }
            datastatistical(params).then(
                res => {
                    this.data = res.statistics;
                    this.list_all = res.statistics.all_num_groupby_res;
                    this.list_all.map(item => {
                        item.const = 'const';
                        item.num = +item.num;
                        item.sSalesName = item.sSalesName || '-';
                    })
                }
            )
        },
        createChart() {
            let chart = new F2.Chart({
                id: 'visit',
                plugins: PieLabel
            });
            chart.source(this.list_all);
            chart.coord('polar', {
                transposed: true,
                radius: 0.75
            });
            chart.legend(false);
            chart.axis(false);
            chart.tooltip(false);
            // 添加饼图文本
            chart.pieLabel({
                sidePadding: 20,
                label1: function label1(data, color) {
                    return {
                        text: data.sSalesName,
                        fill: color
                    };
                },
                label2: function label2(data) {
                    return {
                        text: data.num,
                        fill: '#808080',
                        fontWeight: 'bold'
                    };
                }
            });
            chart.interval().position('const*num').color('sSalesName', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14']).adjust('stack');
            chart.render();
        }
    },
}
</script>

<style lang="scss"> 
    .bossHome_container {
        .piechart {
            width: 100%;
            height: auto;
        }
        .mini{
            text-align: center;
            padding: 10px 0;
            font-size: 10px;
            color: #8797B6;
            .van-col:first-child,
            .van-col:last-child{
                color:#fff;
            }
        }
        .order{
            text-align: center;
            line-height: 1.5;
            font-size: 12px;
            color: #575757;
            padding-bottom:10px;
            border-bottom:1px solid #EBEBEB;
        }
        a:link,a:visited,a:hover,a:active { 
            font-size: 14px;
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
            a{color:#575757;}
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
            display:flex; 
            justify-content: space-between;
            border-top: 1px solid #EBEBEB;
            border-bottom: 1px solid #EBEBEB;
            a{
                line-height:100%;height:90px;
                margin:0;
                border-right: 1px solid #EBEBEB;
                width:33%;
                // text-align:center;
                img{width:auto;display:block; height:50%;margin:10px auto;max-width:70%;}

            }
        }
    }
</style>
