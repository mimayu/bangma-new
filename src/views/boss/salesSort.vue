<template>
    <div class="salesSort">
        <h1 class="sales-title">渠道排行
            <!--<a @click="choseType">筛选</a>-->
            <Popup v-model="show" position="bottom">
             <datetime-picker
                @confirm="handleComfirm"
                @cancel="handleCancel"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
            />
            </Popup>
        </h1>
         <Tabs v-model="active" @click="onClick">
            <Tab  title="本日" >
                <div>
                    <Row>
                        <Col span="2">排行</Col>
                        <Col span="5">渠道名称</Col>
                        <Col span="3">单数</Col>
                        <Col span="3">派/总签单数</Col>
                        <Col span="8" align="right">派/总签约额</Col>
                        <Col span="3">操作</Col>
                    </Row>
                     <Row v-for="(item, index) in list">
                        <Col span="2">{{index+1}}</Col>
                        <Col span="5">{{item.sSourceName}}</Col>
                        <Col span="3">{{item.allnum}}</Col>
                        <Col span="3">{{item.qianyue_num}}/{{item.all_qianyue_num||0}}</Col>
                        <Col span="8" align="right">{{item.allFee|NumFormat}}/{{item.all_allFee|NumFormat}}</Col>
                        <Col span="3"><a @click="handleGo(item.iSource)">查看</a></Col>
                    </Row>
                </div>
            </Tab>
            <Tab  title="本周" >
                <div>
                    <Row>
                        <Col span="2">排行</Col>
                        <Col span="5">渠道名称</Col>
                        <Col span="3">单数</Col>
                        <Col span="3">派/总签单数</Col>
                        <Col span="9" align="right">派/总签约额</Col>
                        <Col span="2">操作</Col>
                    </Row>
                     <Row v-for="(item, index) in list">
                        <Col span="2">{{index+1}}</Col>
                        <Col span="5">{{item.sSourceName}}</Col>
                        <Col span="3">{{item.allnum}}</Col>
                        <Col span="3">{{item.qianyue_num}}/{{item.all_qianyue_num||0}}</Col>
                        <Col span="9" align="right">{{item.allFee|NumFormat}}/{{item.all_allFee|NumFormat}}</Col>
                        <Col span="2"><a @click="handleGo(item.iSource)">查看</a></Col>
                    </Row>
                </div>
            </Tab>
            <Tab  title="本月" >
                <div>
                    <Row>
                        <Col span="2">排行</Col>
                        <Col span="5">渠道名称</Col>
                        <Col span="3">单数</Col>
                        <Col span="3">派/总签单数</Col>
                        <Col span="9" align="right">派/总签约额</Col>
                        <Col span="2">操作</Col>
                    </Row>
                     <Row v-for="(item, index) in list">
                        <Col span="2">{{index+1}}</Col>
                        <Col span="5">{{item.sSourceName}}</Col>
                        <Col span="3">{{item.allnum}}</Col>
                        <Col span="3">{{item.qianyue_num}}/{{item.all_qianyue_num||0}}</Col>
                        <Col span="9" align="right">{{item.allFee|NumFormat}}/{{item.all_allFee|NumFormat}}</Col>
                        <Col span="2"><a @click="handleGo(item.iSource)">查看</a></Col>
                    </Row>
                </div>
            </Tab>
            <Tab  title="上月" >
                <div>
                    <Row>
                        <Col span="2">排行</Col>
                        <Col span="5">渠道名称</Col>
                        <Col span="3">单数</Col>
                        <Col span="3">派/总签单数</Col>
                        <Col span="9" align="right">派/总签约额</Col>
                        <Col span="2">操作</Col>
                    </Row>
                     <Row v-for="(item, index) in list">
                        <Col span="2">{{index+1}}</Col>
                        <Col span="5">{{item.sSourceName}}</Col>
                        <Col span="3">{{item.allnum}}</Col>
                        <Col span="3">{{item.qianyue_num}}/{{item.all_qianyue_num||0}}</Col>
                        <Col span="9" align="right">{{item.allFee|NumFormat}}/{{item.all_allFee|NumFormat}}</Col>
                        <Col span="2"><a @click="handleGo(item.iSource)">查看</a></Col>
                    </Row>
                </div>
            </Tab>
            <Tab title="本年" >
                 <div>
                    <Row>
                        <Col span="2">排行</Col>
                        <Col span="5">渠道名称</Col>
                        <Col span="3">单数</Col>
                        <Col span="3">派/总签单数</Col>
                        <Col span="8" align="right">派/总签约额</Col>
                        <Col span="3">操作</Col>
                    </Row>
                     <Row v-for="(item, index) in list">
                        <Col span="2">{{index+1}}</Col>
                        <Col span="5">{{item.sSourceName}}</Col>
                        <Col span="3">{{item.allnum}}</Col>
                        <Col span="3">{{item.qianyue_num}}/{{item.all_qianyue_num||0}}</Col>
                        <Col span="8" align="right">{{item.allFee|NumFormat}}/{{item.all_allFee|NumFormat}}</Col>
                        <Col span="3"><a @click="handleGo(item.iSource)">查看</a></Col>
                    </Row>
                </div>
            </Tab>
         </Tabs>
        
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { Cell, CellGroup, Popup, Row, Col, Picker, Toast,Tab, Tabs ,DatetimePicker } from 'vant';
    import { salesSortqd } from '@/server';
    import { timetrans } from '@/utils/time';

    export default {
        components: {
            Cell,
            CellGroup,
            Popup,
            Picker,
            Row,DatetimePicker,
            Col,
            Toast,Tab, Tabs,Popup,
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
                // typeShow: false,
                active: 0,
                list:{}, 
                show: false,
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),
                startTime: '', // 收取尾款日期
                type:'today'
            }
        },
        computed:{
            // user: function() {
            //     return this.$store.getters.getUser;
            // }
        },
        created() {
            this.salesSortqd()
        },
        methods: {
             salesSortqd(type) {
                let params = {
                    'type': this.type,
                }
                salesSortqd(params).then(
                 res => {
                    this.list = res.statistics;
                    }
                )
                console.log(this.list)
            },
            choseType() {
                this.show = true;
            },
            handleTypeComfirm() {
                this.show = false;
            },
            handleTypeCancel() {
                this.show = false;
            },
            Confirm() {
                console.log("Confirm")
                let iCustomerId = this.$route.params.id || 1;
                let params = {
                    'iCustomerId': iCustomerId,
                    'dateWeikuan': this.startTime,
                    'orderWeikuan': this.money
                }
                postAddWork(params).then(
                    res => {
                        if(res.success == 2) {
                            Toast(res.msg);
                            return;
                        }
                        Toast(res.msg);
                    }
                )
            },
            choseTime() {
                this.show = true;
            },
            handleComfirm(value) {
                let data = timetrans(value, 1);
                this.startTime = data;
                this.show = false;
            },
            handleCancel(e) {
                this.show = false;
            },
             onClick(index, title) {
                  console.log(index, title)
                  if(index==0){
                       this.type = "today"
                  }else if (index==1){
                       this.type = "week"
                  }else if(index == 2){
                      this.type="month"
                  }else if(index == 3){
                      this.type="lastmonth"
                  }else{
                      this.type="year"

                  }
                  this.salesSortqd(this.type)         
            },
            /*
            * 查看具体渠道
            */
            handleGo(iSource) {
                this.$router.push(
                    {
                        name: 'salesSortc',
                        query: {
                            iSource:iSource
                        }
                    }
                )
            },
        }
    }
</script>

<style lang="scss">
   .van-row{
       text-align:center;font-size: 14px;background: #fff;
        color: #808792;height:30px;line-height:30px;
        &:nth-child(2n-1){background:#F0F5FF;}
    }
    .van-col{white-space:nowrap;}
   .sales-title{
       text-align:center;font-size:18px;color: #262626;height:44px;line-height:44px;
       position:relative;
       a{position:absolute;right:10px;font-size:14px;}
   }
</style>
