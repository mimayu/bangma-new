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
    <Tabs v-model="active" @click="toggleTab">
        <Tab title="本周">
            <h3>数据统计</h3>
            <Row class=mini>
                <Col span="6">%</Col>
                <Col span="6">上门率{{data.shangmen_rate}}%</Col>
                <Col span="6">签单率{{data.qiandan_rate}}%</Col>
                <Col span="6">%</Col>
            </Row>
          <Row class="order" style="border-bottom: 0px solid;">
            <Col span="6">{{data.all_num}}<br/>总接单数</Col>
            <Col span="6">{{data.shangmen_num}}<br/>总上门数</Col>
            <Col span="6">{{data.qiandan_num}}<br/>派单签单数</Col>
            <Col span="6">{{data.qiandan_fee|NumFormat}}<br/>派单签单金额</Col>
          </Row>
          <Row class="order">
            <Col span="6">&nbsp;</Col>
            <Col span="6">&nbsp;</Col>
            <Col span="6">{{data.all_qiandan_num}}<br/>总签单数</Col>
            <Col span="6">{{data.all_qiandan_fee|NumFormat}}<br/>总签单金额</Col>
          </Row>
            <div class="chart-wrapper">
                <h3>签单占比</h3>
                <Tabs v-model="active1"  @click="toggleTab1">
                <Tab title="接单数">
                    <h3>接单数</h3>
                    <canvas id="visit00" class="piechart"></canvas>
                </Tab>
                <Tab title="上门数">
                    <h3>上门数</h3>
                    <canvas id="visit01" class="piechart"></canvas>
                </Tab>
                 <Tab title="派单签单数">
                     <h3>派单签单数</h3>
                    <canvas id="visit02" class="piechart"></canvas>
                </Tab>
                <Tab title="派单签约额">
                    <h3>派单签约额</h3>
                    <canvas id="visit03" class="piechart"></canvas>
                </Tab>
                <Tab title="签单数">
                     <h3>签单数</h3>
                    <canvas id="visit04" class="piechart"></canvas>
                </Tab>
                <Tab title="签约额">
                    <h3>签约额</h3>
                    <canvas id="visit05" class="piechart"></canvas>
                </Tab>
                </Tabs>
            </div>
       </Tab>
        <Tab title="今天">
            <h3>数据统计</h3>
            <Row class=mini>
                <Col span="6">%</Col>
                <Col span="6">上门率{{data.shangmen_rate}}%</Col>
                <Col span="6">签单率{{data.qiandan_rate}}%</Col>
                <Col span="6">%</Col>
            </Row>
          <Row class="order" style="border-bottom: 0px solid;">
            <Col span="6">{{data.all_num}}<br/>总接单数</Col>
            <Col span="6">{{data.shangmen_num}}<br/>总上门数</Col>
            <Col span="6">{{data.qiandan_num}}<br/>派单签单数</Col>
            <Col span="6">{{data.qiandan_fee|NumFormat}}<br/>派单签单金额</Col>
          </Row>
          <Row class="order">
            <Col span="6">&nbsp;</Col>
            <Col span="6">&nbsp;</Col>
            <Col span="6">{{data.all_qiandan_num}}<br/>总签单数</Col>
            <Col span="6">{{data.all_qiandan_fee|NumFormat}}<br/>总签单金额</Col>
          </Row>
            <div class="chart-wrapper">
                <h3>签单占比</h3>
                <Tabs v-model="active1" @click="toggleTab1">
                <Tab title="接单数">
                    <h3>上门数</h3>
                    <canvas id="visit10" class="piechart"></canvas>
                </Tab>
                <Tab title="上门数">
                    <h3>上门数</h3>
                    <canvas id="visit11" class="piechart"></canvas>
                </Tab>
                 <Tab title="派单签单数">
                     <h3>派单签单数</h3>
                    <canvas id="visit12" class="piechart"></canvas>
                </Tab>
                <Tab title="派单签约额">
                    <h3>派单签约额</h3>
                    <canvas id="visit13" class="piechart"></canvas>
                </Tab>
                 <Tab title="签单数">
                     <h3>签单数</h3>
                    <canvas id="visit14" class="piechart"></canvas>
                </Tab>
                <Tab title="签约额">
                    <h3>签约额</h3>
                    <canvas id="visit15" class="piechart"></canvas>
                </Tab>
                </Tabs>
            </div>
        </Tab>
      <Tab title="本月">
         <h3>数据统计</h3>
          <Row class=mini>
            <Col span="6">%</Col>
            <Col span="6">上门率{{data.shangmen_rate}}%</Col>
            <Col span="6">签单率{{data.qiandan_rate}}%</Col>
            <Col span="6">%</Col>

          </Row>
          <Row class="order" style="border-bottom: 0px solid;">
            <Col span="6">{{data.all_num}}<br/>总接单数</Col>
            <Col span="6">{{data.shangmen_num}}<br/>总上门数</Col>
            <Col span="6">{{data.qiandan_num}}<br/>派单签单数</Col>
            <Col span="6">{{data.qiandan_fee|NumFormat}}<br/>派单签单金额</Col>
          </Row>
          <Row class="order">
            <Col span="6">&nbsp;</Col>
            <Col span="6">&nbsp;</Col>
            <Col span="6">{{data.all_qiandan_num}}<br/>总签单数</Col>
            <Col span="6">{{data.all_qiandan_fee|NumFormat}}<br/>总签单金额</Col>
          </Row>
            <div class="chart-wrapper">
                <h3>签单占比</h3>
                <Tabs v-model="active1" @click="toggleTab1">
                 <Tab title="接单数">
                    <h3>上门数</h3>
                    <canvas id="visit20" class="piechart"></canvas>
                </Tab>
                <Tab title="上门数">
                    <h3>上门数</h3>
                    <canvas id="visit21" class="piechart"></canvas>
                </Tab>
                 <Tab title="派单签单数">
                     <h3>派单签单数</h3>
                    <canvas id="visit22" class="piechart"></canvas>
                </Tab>
                <Tab title="派单签约额">
                    <h3>派单签约额</h3>
                    <canvas id="visit23" class="piechart"></canvas>
                </Tab>
                 <Tab title="签单数">
                     <h3>签单数</h3>
                    <canvas id="visit24" class="piechart"></canvas>
                </Tab>
                <Tab title="签约额">
                    <h3>签约额</h3>
                    <canvas id="visit25" class="piechart"></canvas>
                </Tab>
                </Tabs>
            </div>
      </Tab>
      <Tab title="本年">
         <h3>数据统计</h3>

          <Row class=mini>
            <Col span="6">%</Col>
            <Col span="6">上门率{{data.shangmen_rate}}%</Col>
            <Col span="6">签单率{{data.qiandan_rate}}%</Col>
            <Col span="6">%</Col>

          </Row>
          <Row class="order" style="border-bottom: 0px solid;">
            <Col span="6">{{data.all_num}}<br/>总接单数</Col>
            <Col span="6">{{data.shangmen_num}}<br/>总上门数</Col>
            <Col span="6">{{data.qiandan_num}}<br/>派单签单数</Col>
            <Col span="6">{{data.qiandan_fee|NumFormat}}<br/>派单签单金额</Col>
          </Row>
          <Row class="order">
            <Col span="6">&nbsp;</Col>
            <Col span="6">&nbsp;</Col>
            <Col span="6">{{data.all_qiandan_num}}<br/>总签单数</Col>
            <Col span="6">{{data.all_qiandan_fee|NumFormat}}<br/>总签单金额</Col>
          </Row>
            <div class="chart-wrapper">
                <h3>签单占比</h3>
                <Tabs v-model="active1" @click="toggleTab1">
                <Tab title="接单数">
                    <h3>上门数</h3>
                    <canvas id="visit30" class="piechart"></canvas>
                </Tab>
                <Tab title="上门数">
                    <h3>上门数</h3>
                    <canvas id="visit31" class="piechart"></canvas>
                </Tab>
                 <Tab title="派单签单数">
                     <h3>派单签单数</h3>
                    <canvas id="visit32" class="piechart"></canvas>
                </Tab>
                <Tab title="派单签约额">
                    <h3>派单签约额</h3>
                    <canvas id="visit33" class="piechart"></canvas>
                </Tab>
                 <Tab title="签单数">
                     <h3>签单数</h3>
                    <canvas id="visit34" class="piechart"></canvas>
                </Tab>
                <Tab title="签约额">
                    <h3>签约额</h3>
                    <canvas id="visit35" class="piechart"></canvas>
                </Tab>
                </Tabs>
            </div>
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
    filters:{
        NumFormat: function(value) {
            if(!value) return '0';
            
            /*原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正*/
            var intPart =  Number(value)|0; //获取整数部分
            var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
            return intPartFormat;
        }

    },
    data () {
        return {
            data: {},
            active: 0,
            active1: 0,
            index1:0,
            index2:0,
            visit:'visit00',
            list_all: [],
            type:'week'
        }
    },
    created() {
      this.datastatistical();
    },
    methods: {
       datastatistical(type) {
            let params = {
                'type': this.type,
            }
            datastatistical(params).then(
                res => {
                    this.data = res.statistics;
                    if(this.index2 == 0){
                        this.list_all = res.statistics.all_num_groupby_res;
                    }else if(this.index2 == 1){
                        this.list_all = res.statistics.shangmen_num_groupby_res;
                    }else if(this.index2 == 2){
                        this.list_all = res.statistics.qiandan_num_groupby_res;
                    }else if(this.index2 == 3){
                        this.list_all = res.statistics.qiandan_fee_groupby_res;
                    }else if(this.index2 == 4){
                        this.list_all = res.statistics.all_qiandan_num_groupby_res;
                    }else if(this.index2 == 5){
                        this.list_all = res.statistics.all_qiandan_fee_groupby_res;
                    }
                    
                    this.list_all.map(item => {
                        item.const = 'const';
                        if(this.index2 == 0){
                            item.num = +item.num;
                        }else if(this.index2 == 1){
                            item.num = +item.num;
                        }else if(this.index2 == 2){
                            item.num = +item.num;
                        }else if(this.index2 == 3){
                            item.num = +item.allFee;
                        }else if(this.index2 == 4){
                            item.num = +item.num;
                        }else{
                            item.num = +item.allFee;
                        }
                        //item.num = +item.num;
                        item.sSalesName = item.sSalesName || '-';
                    })
                    this.$nextTick(() =>{
                        this.createChart(this.visit);
                    })
                }
            )
        },
        createChart(visit) {
            let chart = new F2.Chart({
                id: this.visit,
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
        },
        toggleTab(index, title) {
            if(index==0){
                this.type = "week"
            }else if (index==1){
                this.type = "today"
            }else if(index == 2){
                this.type="month"
            }else{
                this.type="year"
            }
            this.index1 = index;
            this.visit = "visit"+index+this.index2;
            this.datastatistical(this.type)
                       
        },
        toggleTab1(index, title) {
            this.index2 = index;
            this.visit = "visit"+this.index1+index;
            this.datastatistical()         
        },
    
    
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
