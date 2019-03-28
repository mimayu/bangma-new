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
            <List
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
                >
                <Cell-group class="group" v-for="item in customerLists" :key="item.iCustomerId">
                    <Cell title="订单号">
                        <template>
                            <div class="custom_wrap">
                                <span class="order_id">{{item.iCustomerId}}</span>
                                <span class="status">{{item.iStatus_name}}</span>
                            </div>
                        </template>
                    </Cell>
                    <Cell title="姓名" :value="item.sUsername" />
                    <Cell title="手机号" :value="item.sMobile" @click="doTel(item.sMobile)"/>
                    <Cell title="地址" :value="item.sAddress" />
                    <Cell title="施工内容" :value="item.sRemarks || '-'" />
                    <Cell title="接单日期" :value="item.tOrderDate || '-'" />
                    <div class="van-cell btn_wrap" v-if="item.actions">
                        <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                    </div>
                </Cell-group>
            </List>
        </div>

        <Popup v-model="timeShow" position="bottom">
            <datetime-picker
                @confirm="handleComfirm"
                @cancel="handleCancel"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
        <Popup v-model="typeShow" position="bottom">
            <Picker show-toolbar :columns="typeLists" @cancel="handleTypeCancel" @confirm="handleTypeComfirm" />
        </Popup>
         <Actionsheet
            v-model="modeShow"
            :actions="actions"
            @select="handleSelect"
        />
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Row, Col, Picker, Search, Toast, List, Actionsheet } from 'vant';
    import { getCustomer } from '@/server';
    import { getBaojiaMode } from '@/server';
    import { timetrans } from '@/utils/time';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'allUser',
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
            List,
            Actionsheet,
            footerNav: footerNav
        },
        data() {
            return {
                minHour: 10,
                maxHour: 20,
                minDate: new Date(2018, 1, 1),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),
                typeShow: false,
                timeShow: false,
                typeLists: [ 
                    '全部状态',
                    '基检未约',
                    '基检确认',
                    '基检再约',
                    '基检取消',
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
                    '', '1', '2', '103', '3', '4', '5', '6', '7', '8', '9', '10', '11', '101', '102'
                ],
                customerLists: [],
                value: '', // 搜索
                status: '', // 状态
                time: '', // 时间
                page: 1,
                loading: false,
                finished: false,
                modeShow: false, // 选择报价模式
                actions: [],
                actionids:[],
                currentId: '' // 选择的id 
            };
        },
       created() {
            this.getBaojiaMode();
        },
        methods: {
            doTel(mobile){
                //console.log(mobile);
                window.location.href = "tel:"+mobile;
            },
            /*
            * 初始化数据加载
            */
            getCustomer() {
                let params = {
                    status: this.status,
                    page: this.page,
                    keywords: this.value,
                    fromdate: this.time
                }
                getCustomer(params).then(
                    res => {
                        if(res.success == 1) {
                            this.customerLists = res.list;
                            this.page += 1;
                            this.loading = false;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }else {
                            Toast(res.msg);
                        }
                    }
                )
            },
            /*
            * 创建报价基础
            */
            getBaojiaMode() {
                getBaojiaMode().then(
                    res => {
                        let actions = [];
                        let actionids = [];
                        var array = Object.keys(res.actions).map(function(el){
                            actions.push({'name': res.actions[el]});
                            actionids.push(el);
                        });

                        this.actions = actions;
                        this.actionids = actionids;
                    }
                )
            },
            /*
            * 加载数据
            */
            handleLoad() {
                let params = {
                    status: this.status,
                    page: this.page,
                    keywords: this.value,
                    fromdate: this.time
                }
                getCustomer(params).then(
                    res => {
                        if(res.success == 1) {
                            this.customerLists = this.customerLists.concat(res.list);
                            this.page += 1;
                            this.loading = false;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                    }
                )
            },
            /*
            * 重置
            */
            reset() {
                this.customerLists = [];
                this.loading = true;
                this.finished = false;
                this.page = 1;
            },
                        /*
            * 选择类型
            */
            choseType() {
                this.typeShow = true;
            },
            handleTypeComfirm(value) {
                let index = this.typeLists.findIndex((item) => {
                    return item == value
                });
                let status = this.typeCode[index];
                this.status = status;
                this.typeShow = false;
                this.reset();
                this.getCustomer();
            },
            handleTypeCancel() {
                this.typeShow = false;
            },
            /*
            * 选择时间
            */
            choseTime() {
                this.timeShow = true;
            },
            handleComfirm(value) {
                let data = timetrans(value, 1);
                this.time = data;
                this.timeShow = false;
                this.reset();
                this.getCustomer();
            },
            handleCancel() {
                this.timeShow = false;
            },
            /*
            * 搜索
            */
            handleSearch() {
                this.reset();
                this.getCustomer();
            },
            /*
            * 点击操作
            * 1 -> 预约
            * 2 -> 上门
            * 3 -> 报价
            * 5 -> 合同解除
            * 8 -> 完工
            */
            handleClick(type, id) {
                switch(type) {
                    case 0:
                        this.handleGo(id, type);
                        break;
                    case 1:
                        this.handleGo(id, type);
                        break;
                    case 2:
                        this.handleGo(id, type);
                        break;
                    case 3:
                        this.handleQuote(id);
                        break;
                    case 4:
                        this.handleGo(id, type);
                        break;
                    case 5:
                        this.handleGo(id, type);
                        break;
                    case 6:
                        this.handleGo(id, type);
                        break;
                    case 7:
                        this.handleGo(id, type);
                        break;
                    case 8:
                        this.handleGo(id, type);
                        break;
                    case 9:
                        this.handleGo(id, type);
                        break;
                     case 10:
                        window.location.href = 'http://www.51bangma.com/client/edit/?iCustomerId='+id+'&backurl=http://m.51bangma.com/allUser/';
                        break; 
                     case 11:
                        this.handleGo(id, type);
                        break;
                    default:
                        break;
                }
            },
            /*
            * 处理预约/上门
            */
            handleGo(id, type) {
                let name = '';
               if(type == 0) {
                    name = 'previewCustom' 
                }
                if(type == 1) {
                    name = 'order' 
                }
                if(type == 2) {
                    name = 'visit' 
                }
                if(type == 4) {
                    name = 'quotationList' 
                }
                if(type == 5) {
                    name = 'quotationCancel'; 
                }
                if(type == 6) {
                    name = 'managerPaigong' 
                }
                if(type == 7) {
                    name = 'bossWorkingAdd' 
                }
                if(type == 8) {
                    name = 'bossFinishAdd' 
                }
                if(type == 9) {
                    name = 'bossFukuanAdd' 
                }
                 if(type == 11) {
                    name = 'followup' 
                }
                this.$router.push(
                    {
                        name: name,
                        params: {
                            id: id,
                            backurl: 'allUser'
                        }
                    }
                )
            },
            /*
            * 处理报价
            */
            handleQuote(id) {
                this.modeShow = true;
                this.currentId = id;
            },
            /*
            * 处理报价选择
            */
            handleSelect(value) {
                let index = this.actions.findIndex(item => {
                    return item.name == value.name;
                })
                let mode = this.actionids[index];
                this.modeShow = false;
                this.$router.push(
                    {
                        name: 'quotation',
                        params: {
                            id: this.currentId,
                            mode:mode
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    .allUser_container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 53px;
        right: 0;
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
        .content {
            flex: 1;
            overflow: auto;
        }
    }
</style>
