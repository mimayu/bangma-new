<template>
    <div class="orderlist_container">
        <Row class="header">
            <Col span="24" class="search_bar">
                <Search
                    v-model="value"
                    placeholder="请输入订单号"
                    show-action
                    @search="handleSearch"
                >
                    <div slot="action" @click="handleSearch">搜索</div>
                </Search>
            </Col>
        </Row>
        <div class="content">
            <Tabs v-model="active">
                <Tab title="确认下单">
                    <List
                        v-model="loading_xiadan"
                        :finished="finished_xiadan"
                        finished-text="没有更多了"
                        @load="handleXiadanLoad"
                        >
                        <Cell-group class="group" v-for="item in data_xiadan" :key="item.iCustomerId">
                            <Cell title="订单号">
                                <template>
                                    <div class="custom_wrap">
                                        <span class="order_id">{{item.iCustomerId}}</span>
                                        <span class="status">{{item.iStatus_name}}</span>
                                    </div>
                                </template>
                            </Cell>
                            <Cell title="地址" :value="item.sAddress" />
                            <Cell title="品牌" :value="item.brand_name"/>
                            <Cell title="主材" :value="item.material"/>
                            <Cell title="主材类别" :value="item.type_name" />
                            <Cell title="家居顾问" :value="item.iSalesId_name" />
                            <Cell title="主材状态" :value="item.iZhucaiStatus_name" />
                            <div class="van-cell btn_wrap" v-if="item.actions">
                                <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId, item.iOrderId)">{{action.name}}</button>
                            </div>
                        </Cell-group>
                    </List>
                </tab>


                <Tab title="待反馈">
                    <List
                        v-model="loading_nofankui"
                        :finished="finished_nofankui"
                        finished-text="没有更多了"
                        @load="handleNofankuiLoad"
                        >
                        <Cell-group class="group" v-for="item in data_nofankui" :key="item.iCustomerId">
                            <Cell title="订单号">
                                <template>
                                    <div class="custom_wrap">
                                        <span class="order_id">{{item.iCustomerId}}</span>
                                        <span class="status">{{item.iStatus_name}}</span>
                                    </div>
                                </template>
                            </Cell>
                            <Cell title="地址" :value="item.sAddress" />
                            <Cell title="品牌" :value="item.brand_name"/>
                            <Cell title="主材" :value="item.material"/>
                            <Cell title="主材类别" :value="item.type_name" />
                            <Cell title="家居顾问" :value="item.iSalesId_name" />
                            <Cell title="主材状态" :value="item.iZhucaiStatus_name" />
                            <div class="van-cell btn_wrap" v-if="item.actions">
                                <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId, item.iOrderId)">{{action.name}}</button>
                            </div>
                        </Cell-group>
                    </List>
                </tab>

                <Tab title="已反馈">
                    <List
                        v-model="loading_fankui"
                        :finished="finished_fankui"
                        finished-text="没有更多了"
                        @load="handleFankuiLoad"
                        >
                        <Cell-group class="group" v-for="item in data_fankui" :key="item.iCustomerId">
                            <Cell title="订单号">
                                <template>
                                    <div class="custom_wrap">
                                        <span class="order_id">{{item.iCustomerId}}</span>
                                        <span class="status">{{item.iStatus_name}}</span>
                                    </div>
                                </template>
                            </Cell>
                            <Cell title="地址" :value="item.sAddress" />
                            <Cell title="品牌" :value="item.brand_name"/>
                            <Cell title="主材" :value="item.material"/>
                            <Cell title="主材类别" :value="item.type_name" />
                            <Cell title="家居顾问" :value="item.iSalesId_name" />
                            <Cell title="主材状态" :value="item.iZhucaiStatus_name" />
                            <div class="van-cell btn_wrap" v-if="item.actions">
                                <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId, item.iOrderId)">{{action.name}}</button>
                            </div>
                        </Cell-group>
                    </List>
                </tab>

                <Tab title="安装完成">
                    <List
                        v-model="loading_anzhuang"
                        :finished="finished_anzhuang"
                        finished-text="没有更多了"
                        @load="handleAnzhuangLoad"
                        >
                        <Cell-group class="group" v-for="item in data_anzhuang" :key="item.iCustomerId">
                            <Cell title="订单号">
                                <template>
                                    <div class="custom_wrap">
                                        <span class="order_id">{{item.iCustomerId}}</span>
                                        <span class="status">{{item.iStatus_name}}</span>
                                    </div>
                                </template>
                            </Cell>
                            <Cell title="地址" :value="item.sAddress" />
                            <Cell title="品牌" :value="item.brand_name"/>
                            <Cell title="主材" :value="item.material"/>
                            <Cell title="主材类别" :value="item.type_name" />
                            <Cell title="家居顾问" :value="item.iSalesId_name" />
                            <Cell title="主材状态" :value="item.iZhucaiStatus_name" />
                            <div class="van-cell btn_wrap" v-if="item.actions">
                                <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId, item.iOrderId)">{{action.name}}</button>
                            </div>
                        </Cell-group>
                    </List>
                </tab>

            </Tabs>
        </div>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Tab, Tabs, Cell, CellGroup, Button, Field, Toast, Popup, Row, Search, Picker, List, Actionsheet } from 'vant';
    import { getOrderList } from '@/server';
    import { postNoNeed } from '@/server';
    import { timetrans } from '@/utils/time';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'orderlist',
        components: {
            Tab,
            Tabs,
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Row,
            Popup, 
            Search,
            Picker,
            List,
            Actionsheet,
            footerNav
        },
       created() {
           this.active = this.$route.query.active || 0;
        },
        data() {
            return {
                active: 0,

                data_xiadan: [],
                data_nofankui: [],
                data_fankui: [],
                data_anzhuang: [],

                loading_xiadan: false, // 类别确认待下单
                finished_xiadan: false, // 类别确认待下单
                page_xiadan: 1, // 类别确认待下单

                loading_nofankui: false, // 待主材商反馈 
                finished_nofankui: false, // 待主材商反馈 
                page_nofankui: 1, // 待主材商反馈 

                loading_fankui: false, // 主材商已反馈 
                finished_fankui: false, // 主材商已反馈 
                page_fankui: 1, // 主材商已反馈 

                loading_anzhuang: false, // 安装完成 
                finished_anzhuang: false, // 安装完成 
                page_anzhuang: 1, // 安装完成 


                value: '', // 搜索
                status: '', // 状态
                time: '', // 时间

                actions: [],
                actionids:[],
                currentId: '' // 选择的id 
            };
        },
        methods: {
            doTel(mobile){
                //console.log(mobile);
                window.location.href = "tel:"+mobile;
            },
            /*
            * 加载数据
            */
             /*
            * 加载完工验收数据
            */
            handleXiadanLoad() {
                let params = {
                    status: 2,
                    keywords: this.value,
                    page: this.page_xiadan,
                }
                this.getInfo(params, 'xiadan');
            },
            handleNofankuiLoad() {
                let params = {
                    status: 3,
                    keywords: this.value,
                    page: this.page_nofankui
                }
                this.getInfo(params, 'nofankui');
            },
            handleFankuiLoad() {
                let params = {
                    status: 4,
                    keywords: this.value,
                    page: this.page_fankui
                }
                this.getInfo(params, 'fankui');
            },
            handleAnzhuangLoad() {
                let params = {
                    status: 5,
                    keywords: this.value,
                    page: this.page_anzhuang
                }
                this.getInfo(params, 'anzhuang');
            },

            getInfo(params, type) {
                let dataType = `data_${type}`;
                let finishedType = `finished_${type}`;
                let loadingType = `loading_${type}`;
                let pageType = `page_${type}`;

                getOrderList(params).then(
                    res => {
                        if(res.success == 1) {
                            this[dataType] = this[dataType].concat(res.list);
                            this[loadingType] = false;
                            if(res.list.length == 0) {
                                this[finishedType] = true;
                            }
                            this[pageType] += 1;
                        }else {
                            Toast(res.msg);
                        }
                    }
                )
            },
            /*
            * 重置
            */
            reset(type) {
                let dataType = `data_${type}`;
                let finishedType = `finished_${type}`;
                let loadingType = `loading_${type}`;
                let pageType = `page_${type}`;

                this[dataType] = [];
                this[loadingType] = true;
                this[finishedType] = false;
                this[pageType] = 1;
            },
            /*
            * 搜索
            */
            handleSearch() {
                let active = this.active;
                let type = 'xiadan';
                switch(active) {
                    case 0:
                        type = 'xiadan';
                        break;
                    case 1:
                        type = 'nofankui';
                        break;    
                    case 2:
                        type = 'fankui';
                        break; 
                    case 3:
                        type = 'anzhuang';
                        break;       
                }

                this.reset(type);

                let pageType = `page_${type}`;
                let params = {
                    status: 2,
                    keywords: this.value,
                    page: this[pageType]
                }
                this.getInfo(params, type);
            },
            /*
            * 点击操作
            * 1 -> 材料确认
            * 2 -> 无需主材
            */
            handleClick(type, iCustomerId, iOrderId) {
                switch(type) {
                    case 1:
                        window.location.href= "http://www.51bangma.com/zhucai/leibie/?iCustomerId="+iCustomerId+"&backurl=http://m.51bangma.com/orderlist/";
                        break;
                    case 2:
                    case 4:
                        window.location.href= "http://www.51bangma.com/zhucai/order/?iOrderId="+iOrderId+"&backurl=http://m.51bangma.com/orderlist/";
                        break;
                      case 3:
                      case 5:
                      case 7:
                        window.location.href= "http://www.51bangma.com/zhucai/orderEdit/?iOrderId="+iOrderId+"&backurl=http://m.51bangma.com/orderlist/";
                        break;

                    default:
                        break;
                }
            },

        }
    }
</script>

<style lang="scss">
    .orderlist_container {
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
            button {
                margin: 4px;
            }
        }
        .assign_btn {
            padding: 6px 8px;
            margin-left: 9px;
            border: 1px solid #ebedf0;
            border-radius: 10px;
            outline: none;
            color: #333;
            background: #fff;
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
