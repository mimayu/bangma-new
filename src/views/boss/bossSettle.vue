<template>
    <div class="bossSettle_container">
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
                    <button plain type="primary" class="assign_btn" @click="handleGo(action.type, item.iCustomerId)" v-for="(action, index) in item.actions" :key="action.type">{{action.name}}</button>
                </div>
            </Cell-group>
        </div>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Row, Col, Picker, Search, Toast } from 'vant';
    import { getCustomer } from '@/server';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'bossSettle',
        components: {
            Cell,
            CellGroup,
            Popup,
            Picker,
            DatetimePicker,
            Row,
            Col,
            Search,
            Toast,
            footerNav: footerNav
        },
        data() {
            return {
                customerLists: [],
                page: 1
            };
        },
        created() {
            this.getCustomer();
        },
        methods: {
            getCustomer(cb) {
                let params = {
                    status: 11,
                    page: this.page
                }
                getCustomer(params).then(
                    res => {
                        if(res.success == 1) {
                            this.customerLists = res.list;
                        }
                    }
                )
            },
            handleGo(type, id) {
                // 11 -> 结算
                switch(type) {
                    case 7:
                        this.$router.push(
                            {
                                name: 'bossWorkingAdd',
                                params: {
                                    id: id
                                }
                            }
                        )
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>

<style lang="scss">
    .bossSettle_container {
        background-color: #f6f6f6;
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
        .group {
            margin-bottom: 8px;
        }
    }
</style>
