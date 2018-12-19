<template>
    <div class="remind">
        <vue-event-calendar :events="demoEvents">
            <template scope="props">
                <div v-for="(event, index) in props.showEvents" class="event-item">
                <!-- 这里拿到的是传入的单个event所有数据 -->
                {{event}}
                </div>
            </template>
        </vue-event-calendar>
        <Tabs v-model="active">
            <Tab title="提醒" >
                <dl class="remind-list">
                    <dt class="on">10:55</dt>
                    <dd class="orderNum">
                        <a>
                            <span>订单号:</span>
                        </a>
                        <span class="timeout">上门倒计时01：53</span>
                        <span class="red">签约成功</span>
                    </dd>
                    <dd>
                        <span>姓名:</span>
                        巴啦啦
                    </dd>
                    <dd>
                        <span>手机号:</span>
                        18217157168
                    </dd>
                    <dd>
                        <span>地址:</span>
                        静安区 皇家大道 15号
                    </dd>
                </dl>
            </Tab>

            <Tab title="事项">
                 <dl class="remind-list">
                    <dt class="on">10:55</dt>
                    <dd class="orderNum">
                        <a>
                            <span>订单号:</span>
                        </a>
                        <span class="timeout">上门倒计时01：53</span>
                        <span class="red">签约成功</span>
                    </dd>
                    <dd>
                        <span>姓名:</span>
                        巴啦啦
                    </dd>
                    <dd>
                        <span>手机号:</span>
                        18217157168
                    </dd>
                    <dd>
                        <span>地址:</span>
                        静安区 皇家大道 15号
                    </dd>
                </dl>
                <dl class="company">
                    <dt>公司公告</dt>
                    <dd>
                        巴拉巴拉巴拉
                    </dd>
                </dl>
            </Tab>
        </Tabs>
        
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { Tab, Tabs } from 'vant';

    export default {
        name: 'job',
        components: {
            Tab,
            Tabs,
            footerNav: footerNav
        },
         data () {
            return {
                demoEvents: [{
                    date: '2016/12/15',
                    title: 'eat',
                    desc: 'longlonglong description'
                },{
                    date: '2016/11/12',
                    title: 'this is a title'
                }],
                active:0,
            }
        },
        computed:{
            user: function() {
                return this.$store.getters.getUser;
            }
        },
        methods: {
            monthChange (month) {
                console.log(month)
            },
            dayChange (day) {
                console.log(day)
            }
        }
    }
</script>

<style lang="scss">
    .remind-list{
       
        .orderNum{
            font-size:14px; border-bottom:1px solid #D8D8D8;margin-left:10px;line-height:40px;
            display:flex;padding-right:10px;margin-bottom:5px;
            a{flex:2;}
            .timeout{
                font-size: 14px;flex:2;
                color: #F5A623;
            }
            span{
                flex:1;
                    &:last-child{text-align:right;color: #161616;}
                    &.red{color: #FF5601;}
                }
            }
        dd{
            padding-left:10px;line-height:25px;
            font-size: 12px;
            color: #161616;
            
        }
        span{
            font-size: 12px;display:inline-block;vertical-align:middle;width:50px;
            color: #999999;
            text-align: left;
            }
        dt{
            background: #D8D8D8;line-height:25px;padding-left:10px;position:relative;
            font-size: 12px;
            color: #9C9C9C;
             &:before,&:after{
                content:"";
            }
            &:before{
                height:100%;margin:0 10px;
                border:1px solid #9C9C9C;
            }
            &.on{
                &:after{
                    position:absolute; 
                    background: #F5A623;height:14px;width:14px; border-radius:50%;left:14px;top:50%;margin-top:-7px;
                }
            }
        }
    }
    .company{
        border-top:10px solid #D8D8D8;
       
        dt{
            border-bottom:1px solid #D8D8D8;
            font-size: 14px; line-height:40px;
            color: #FF5601;margin-left:10px;
        }
        dd{
            font-size: 12px;padding:10px;
            color: #161616;
        }
    }
</style>
