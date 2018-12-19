<template>
    <div class="gzProgress">
        
        <dl class="progress-list">
            <dt>宗国平</dt>
            <dd>
                <span>姓名</span>
                <span>毛先生</span>
                <span>订单号：</span>
                <span>201808200236</span>
            </dd>
            <dd>
                <span>地址</span>
                <span>上海市普陀区远景路97弄48号2103室</span>
            </dd>
            
        </dl>
        <div class="bar">
            <span class="bar-title">剩余工期28天</span>
            <Progress color='#19BC9C' :percentage="50" />
        </div>
        <ul class="date-list">
            <li>开工日期<span>2018/09/09</span></li>
            <li>完工日期<span>2018/09/09</span></li>
        </ul>


        <dl class="progress-list">
            <dt>宗国平</dt>
            <dd>
                <span>姓名</span>
                <span>毛先生</span>
                <span>订单号：</span>
                <span>201808200236</span>
            </dd>
            <dd>
                <span>地址</span>
                <span>上海市普陀区远景路97弄48号2103室</span>
            </dd>
        </dl>
        <Progress color='#19BC9C' :percentage="50" />
        <ul class="date-list">
            <li>开工日期<span>2018/09/09</span></li>
            <li>完工日期<span>2018/09/09</span></li>
        </ul>



        <dl class="progress-list">
            <dt>宗国平</dt>
            <dd>
                <span>姓名</span>
                <span>毛先生</span>
                <span>订单号：</span>
                <span>201808200236</span>
            </dd>
            <dd>
                <span>地址</span>
                <span>上海市普陀区远景路97弄48号2103室</span>
            </dd>
        </dl>
        <Progress color='#19BC9C' :percentage="50" />
        <ul class="date-list">
            <li>开工日期<span>2018/09/09</span></li>
            <li>完工日期<span>2018/09/09</span></li>
        </ul>
       
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { CellGroup, Cell, Row, Col, Progress } from 'vant';

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
                demoEvents: [{
                    date: '2016/12/15',
                    title: 'eat',
                    desc: 'longlonglong description'
                },{
                    date: '2016/11/12',
                    title: 'this is a title'
                }]
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
        }

    }
    .date-list{
        border-bottom:1px solid #D8D8D8;
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
