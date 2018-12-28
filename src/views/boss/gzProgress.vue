<template>
    <div class="gzProgress">
        <section v-for="item in list">
            <dl class="progress-list">
                <dt>{{item.iForemanName}}</dt>
                <dd>
                    <span>姓名</span>
                    <span>{{item.sUsername}}</span>
                    <span>订单号：</span>
                    <span>{{item.icustomerid}}</span>
                </dd>
                <dd>
                    <span>地址</span>
                    <span>{{item.sAddress}}</span>
                </dd>
                
            </dl>
            <div class="bar">
                <span class="bar-title">剩余工期28天</span>
                <Progress color='#19BC9C' :percentage="50" />
            </div>
            <ul class="date-list">
                <li>开工日期<span>{{item.dateKaigong}}</span></li>
                <li>完工日期<span>{{item.dateYujiWangong}}</span></li>
            </ul>
        </section>

      
       
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { CellGroup, Cell, Row, Col, Progress } from 'vant';
    import { getProgress } from '@/server';

    export default {
        name: 'job',
        components: {
            CellGroup,
            Cell,
            Row,
            Col,
            Row,
            Col,
            Progress,
            footerNav: footerNav
        },
         data () {
            return {
                list:{}
            }
        },
        computed:{
            // user: function() {
            //     return this.$store.getters.getUser;
            // }
        },
          created() {
            this.getProgress()
        },
        methods: {

             getProgress() {
                getProgress().then(
                 res => {
                    this.list = res.resultArr[0];
                    console.log(this.list)
                    }
                )
            },
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
    .bar{
        padding:10px;text-align:center;
        .bar-title{
            background: #FFCC66;display:inline-block;
            border-radius:20px;
            font-size: 12px;padding:5px 10px;margin-bottom:15px;
            color: #000000;
        }
        }
    .progress-list{

        border-bottom:1px solid #D8D8D8;

        dd,dt{
            padding:10px;
        }
        dt{
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #262626;
            border-bottom:1px solid #D8D8D8;
        }
        dd{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            text-align: right;
            display:flex;
            span{
                text-align:left;
                &:nth-child(n){flex:1;}                
                &:nth-child(2n){flex:2;color: #161616;}                
            }
            &:last-child{
                span{
                    &:nth-child(1){flex:1;}                
                    &:nth-child(2){flex:5;color: #161616;}  
                }
              
            }
        }

    }
    .date-list{
        border-bottom:3px solid #D8D8D8;
        padding:10px;
        display:flex;
        justify-content: space-between;
        li{
            font-size: 12px;
            color: #999999;
            span{
                display:block;
                color: #161616;
            }
            &:nth-child(2){
                text-align:right;
            }
        }
    }
</style>
