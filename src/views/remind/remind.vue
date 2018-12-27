<template>
    <div class="remind_container">
        <vue-event-calendar :events="salelist" @monthChanged="" @dayChanged=""></vue-event-calendar>
        <Tabs v-model="active">
            <Tab title="提醒" >
                <ul>
                    <li>
                        <div>
                            <i></i>
                            <span>09：30</span>
                        </div>
                        <div></div>
                        <div></div>
                    </li>
                </ul>
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
    import { getCalendar } from '@/server';
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { Tab, Tabs } from 'vant';

    export default {
        name: 'remind',
        components: {
            Tab,
            Tabs,
            footerNav: footerNav
        },
        data () {
            return {
                salelist: [],
                active:0,
            }
        },
        created() {
            this.getCalendar();
        },
        methods: {
            monthChange (month) {
                console.log(month)
            },
            dayChange (day) {
                console.log(day)
            },
            getCalendar() {
                let params = {

                }
                getCalendar(params).then(
                    res => {
                        this.salelist = [{
                            date: '2018/12/16', // Required
                            time: '13:51:35',
                            title: '订单',
                            department_name: "总经办",
                            'group_name': null,
                            'iId': "38",
                            'role_name': "业务员",
                            'sMobilePhone': "13524761932",
                            'sName': "刘厚贤",
                            'timeCreated': "2018-11-16 13:51:35",
                        },
                        {
                            date: '2018/11/16', // Required
                            time: '13:51:35',
                            title: '订单',
                            department_name: "总经办",
                            'group_name': null,
                            'iId': "38",
                            'role_name': "业务员",
                            'sMobilePhone': "13524761932",
                            'sName': "刘厚贤",
                            'timeCreated': "2018-11-16 13:51:35",
                        }];
                        console.log('res', this.salelist);
                    }
                )
                console.log('1');
            }
        }
    }
</script>

<style lang="scss">
    .remind_container {
        .events-wrapper {
            display: none !important; 
        }
    }
    .remind-list{
        .orderNum{
            font-size:14px; border-bottom:1px solid #D8D8D8;margin-left:10px;line-height:40px;
            display:flex;padding-right:10px;margin-bottom:5px;
            a{
                flex:2;
            }
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
