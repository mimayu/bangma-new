<template>
    <div class="allUser_container">
       
        <Tabs v-model="active">
            <Tab title="基建取消">
          
            <div class="content">
                <Cell-group class="group" v-for="item in customerLists" :key="item.iCustomerId">
                    <Cell title="订单号">
                        <template>
                            <div class="custom_wrap">
                                <span class="order_id">{{item.iCustomerId}}</span>
                                <span class="status">结算</span>
                            </div>
                        </template>
                    </Cell>
                    <Cell title="姓名" :value="item.sUsername" />
                    <Cell title="手机号" :value="item.sMobile" />
                    <Cell title="地址" :value="item.sAddress" />
                    <Cell title="施工内容" :value="item.sRemarks || '-'" />
                    <Cell title="预约时间" :value="item.tOrderDate || '-'" />
                    <div class="van-cell btn_wrap">
                        <button plain type="primary" class="assign_btn" >结算</button> 
                    </div>
                </Cell-group>
            </div>

            
            </Tab>
            <Tab title="签约失败">www</Tab>
            <Tab title="解约合同">www</Tab>
        </Tabs>

       
        
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Row, Col, Picker, Search, Toast ,Tab,Tabs,} from 'vant';
    import { getCustomer } from '@/server';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'visit',
        components: {
            Cell,
            CellGroup,
            Popup,
            Picker,
            DatetimePicker,
            Row,
            Col,
            Search,
            Toast,Tab,Tabs,
            footerNav: footerNav
        },
        data() {
            return {
                customerLists: [],
                value: '',
                status: '',
                page: 1,
                active:0
            };
        },
        created() {
            this.getCustomer();
        },
        methods: {
           
            getCustomer(cb) {
                let params = {
                    status: this.status,
                    page: this.page,
                    keywords: this.value
                }
                getCustomer(params).then(
                    res => {
                        if(res.success == 1) {
                            this.customerLists = res.list;
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    .allUser_container {
        display: flex;
        flex-direction: column;
        background-color: #f6f6f6;
        .header_btn {
            height: 44px;
            line-height: 44px;
            background-color: #f6f6f6;
            padding: 0 10px;
        }
        .header_btn img {
            width: 14px;
            height: 7px;
        }
        .header_btn .search {
            float: right;
        }
        .header_btn .search img {
            width: 15px;
            height: 16px;
        }
        .order {
            background: #fff;
            margin-bottom: 10px;
            padding: 10px;
        }
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
        .btn_wrap {
            justify-content: flex-end;
        }
        .assign_btn {
            border: 1px solid #EBEBEB;
            outline: none;
            margin: 0;
            background: #fff;
            border-radius: 5px;margin-left:10px;width:50px;height:30px;
        }
        .custom_wrap {
            display: flex;
        }
        .order_id {
            flex: 1;
        }
        .status {
            width: 60px;
            text-align: center;
            font-size: 14px;
            color: #FF5601;
        }
        .search_bar {
            display: flex;
            align-items: center;
            height: 44px;
            background: #fff;
        }
        .van-search {
            background: #fff !important;
            padding: 0;
        }
        .group {
            margin-bottom: 8px;
        }
    }
</style>
