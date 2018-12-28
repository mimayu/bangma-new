<template>
    <div class="salesSort">
        <h1 class="sales-title">百度渠道签单排行榜</h1>
        <Row>
            <Col span="4">排行</Col>
            <Col span="6">渠道名称</Col>
            <Col span="4">单数</Col>
            <Col span="5">签单数</Col>
            <Col span="5">签单率</Col>
        </Row>
        <Row>
            <Col span="4">排行</Col>
            <Col span="6">渠道名称</Col>
            <Col span="4">单数</Col>
            <Col span="5">签单数</Col>
            <Col span="5">签单率</Col>
        </Row>
          
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { Cell, CellGroup, Popup, Row, Col, Picker, Toast } from 'vant';
    import { salesSort } from '@/server';
    export default {
        components: {
            Cell,
            CellGroup,
            Popup,
            Picker,
            Row,
            Col,
            Toast,
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
            // this.salesSort()
        },
        methods: {

             salesSort() {
                salesSort().then(
                 res => {
                    this.list = res.resultArr[0];
                    console.log(this.list)
                    }
                )
            },
          
        }
    }
</script>

<style lang="scss">
   .van-row{
       text-align:center;font-size: 14px;background: #F0F5FF;
        color: #808792;height:30px;line-height:30px;
    }
   .sales-title{
       text-align:center;font-size:18px;color: #262626;height:44px;line-height:44px;
   }
</style>
