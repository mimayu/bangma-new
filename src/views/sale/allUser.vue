<template>
    <div class="allUser_container">
        <Row class="header">
            <Col span="6">
                <Cell title="筛选" is-link arrow-direction="down" @click="choseType"/>
            </Col>
            <Col span="6">
                <Cell title="时间" is-link arrow-direction="down" @click="choseTime" />
            </Col>
            <Col span="12" class="search_bar">
                <Search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="handleSearch"
                >
                    <div slot="action" @click="handleSearch">搜索</div>
                </Search>
            </Col>
        </Row>
        <div class="content">
            <Cell-group class="group" v-for="item in customerLists" :key="item.iCustomerId">
                <Cell title="订单号">
                    <template>
                        <div class="custom_wrap">
                            <span class="order_id">{{item.iCustomerId}}</span>
                            <span class="status">基检未约</span>
                        </div>
                    </template>
                </Cell>
                <Cell title="姓名" :value="item.sUsername" />
                <Cell title="手机号" :value="item.sMobile" />
                <Cell title="地址" :value="item.sAddress" />
                <Cell title="施工内容" :value="item.sRemarks || '-'" />
                <Cell title="预约时间" :value="item.tOrderDate || '-'" />
                <div class="van-cell btn_wrap">
                    <button plain type="primary" class="assign_btn" >预约</button>
                </div>
            </Cell-group>
        </div>

        <Popup v-model="timeShow" position="bottom">
            <datetime-picker
                @confirm="handleComfirm"
                @cancel="handleCancel"
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
        <Popup v-model="typeShow" position="bottom">
            <Picker show-toolbar :columns="typeLists" @cancel="handleTypeCancel" @confirm="handleTypeComfirm" />
        </Popup>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Row, Col, Picker, Search, Toast } from 'vant';
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
            Toast,
            footerNav: footerNav
        },
        data() {
            return {
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),
                typeShow: false,
                timeShow: false,
                typeLists: [ 
                    '基检未约',
                    '基检确认',
                    '基检再约',
                    '签约取消',
                    '签约等待',
                    '签约成功',
                    '派工完成',
                    '开工进场',
                    '完工验收',
                    '完工付款',
                    '审核完成',
                    '已结算',
                    '签约失败',
                    '合同取消'
                ],
                typeCode: [
                    '1', '2', '103', '3', '4', '5', '6', '7', '8', '9', '10', '11', '101', '102'
                ],
                customerLists: [],
                value: '',
                status: '',
                page: 1
            };
        },
        created() {
            this.getCustomer();
        },
        methods: {
            choseType() {
                this.typeShow = true;
            },
            choseTime() {
                this.timeShow = true;
            },
            handleComfirm(value) {
                this.timeShow = false;
            },
            handleCancel() {
                this.timeShow = false;
            },
            handleTypeComfirm(value) {
                let index = this.typeLists.findIndex((item) => {
                    return item == value
                });
                let status = this.typeCode[index];
                this.status = status;
                this.typeShow = false;
                this.getCustomer();
            },
            handleTypeCancel() {
                this.typeShow = false;
            },
            handleSearch() {
                this.getCustomer();
            },
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
            border: none;
            padding: 8px;
            outline: none;
            margin: 0;
            background: red;
            border-radius: 5px;
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
