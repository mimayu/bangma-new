<template>
    <div class="remind_container">
        <vue-event-calendar :events="saleLists" @day-changed="handleDay"></vue-event-calendar>
        <Tabs v-model="active" @click="onClick">
            <Tab title="预约提醒" >
                <div v-if="remindLists != null && remindLists.length > 0">
                    <dl class="remind-list" v-for="(item, index) in remindLists" :key="index">
                        <dt class="on">{{item.date}}</dt>
                        <dd class="orderNum">
                            <a>
                                <span>订单号:</span>{{item.iCustomerId}}
                            </a>
                            <span class="timeout">
                                {{item.title}}</span>
                            <span class="red">{{item.iStatus_name}}</span>
                        </dd>
                        <dd>
                            <span>姓名:</span>
                            {{item.sUsername}}
                        </dd>
                        <dd>
                            <span>手机号:</span>
                            {{item.sMobile}}{{item.sTelPhone ? '/'+item.sTelPhone:''}}
                        </dd>
                        <dd>
                            <span>地址:</span>
                            {{item.sAddress}}
                        </dd>
                    </dl>
                </div>
                <div v-else>
                    暂无提醒
                </div>
            </Tab>

            <Tab title="开工提醒">
                <div v-if="remindLists != null && remindLists.length > 0">
                    <dl class="remind-list" v-for="(item, index) in remindLists" :key="index">
                        <dt class="on">{{item.date}}</dt>
                        <dd class="orderNum">
                            <a>
                                <span>订单号:</span>{{item.iCustomerId}}
                            </a>
                            <span class="timeout">
                                {{item.title}}</span>
                            <span class="red">{{item.iStatus_name}}</span>
                        </dd>
                        <dd>
                            <span>姓名:</span>
                            {{item.sUsername}}
                        </dd>
                        <dd>
                            <span>手机号:</span>
                            {{item.sMobile}}{{item.sTelPhone ? '/'+item.sTelPhone:''}}
                        </dd>
                        <dd>
                            <span>地址:</span>
                            {{item.sAddress}}
                        </dd>
                    </dl>
                </div>
                <div v-else>
                    暂无提醒
                </div>
            </Tab>
            <Tab title="再约提醒">
                <div v-if="remindLists != null && remindLists.length > 0">
                    <dl class="remind-list" v-for="(item, index) in remindLists" :key="index">
                        <dt class="on">{{item.date}}</dt>
                        <dd class="orderNum">
                            <a>
                                <span>订单号:</span>{{item.iCustomerId}}
                            </a>
                            <span class="timeout">
                                {{item.title}}</span>
                            <span class="red">{{item.iStatus_name}}</span>
                        </dd>
                        <dd>
                            <span>姓名:</span>
                            {{item.sUsername}}
                        </dd>
                        <dd>
                            <span>手机号:</span>
                            {{item.sMobile}}{{item.sTelPhone ? '/'+item.sTelPhone:''}}
                        </dd>
                        <dd>
                            <span>地址:</span>
                            {{item.sAddress}}
                        </dd>
                    </dl>
                </div>
                <div v-else>
                    暂无提醒
                </div>
            </Tab>
            <Tab title="跟进提醒">
                <div v-if="remindLists != null && remindLists.length > 0">
                    <dl class="remind-list" v-for="(item, index) in remindLists" :key="index">
                        <dt class="on">{{item.date}}</dt>
                        <dd class="orderNum">
                            <a>
                                <span>订单号:</span>{{item.iCustomerId}}
                            </a>
                            <span class="timeout">
                                {{item.title}}</span>
                            <span class="red">{{item.iStatus_name}}</span>
                        </dd>
                        <dd>
                            <span>姓名:</span>
                            {{item.sUsername}}
                        </dd>
                        <dd>
                            <span>手机号:</span>
                            {{item.sMobile}}{{item.sTelPhone ? '/'+item.sTelPhone:''}}
                        </dd>
                        <dd>
                            <span>地址:</span>
                            {{item.sAddress}}
                        </dd>
                    </dl>
                </div>
                <div v-else>
                    暂无提醒
                </div>
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
                saleLists: [],
                remindLists: [],
                active:0,
                type:1
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
            getCalendar(type) {
                let params = {
                    type:this.type
                }
                getCalendar(params).then(
                    res => {
                        this.saleLists = res.allForDateArr;
                        this.remindLists = res.allForDateArr;
                    }
                )
                //console.log('1');
            },
            handleDay(value) {
                console.log('value', value);
                this.remindLists = value.events;
            },
             onClick(index, title) {
                  //console.log(index, title)
                  if(index==0){
                      this.type = 1
                  }else if (index==1){
                      this.type = 2
                  }else if(index == 2){
                      this.type=3
                  }else if(index == 3){
                      this.type=4
                  }
                  this.getCalendar(this.type)
                       
                },
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
