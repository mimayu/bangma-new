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
                    <Cell title="来源" :value="item.iSource_name" />
                    <Cell title="配合人" :value="item.coordinatorName" v-if="item.coordinatorName!=null&&item.coordinatorName!=''"/>
                    <Cell title="推荐人" :value="item.introducerName"  v-if="item.introducerName!=null&&item.introducerName!=''"/>
                    <Cell title="姓名" :value="item.sUsername" />
                    <Cell title="手机号" :value="item.sMobile" @click="doTel(item.sMobile)"/>
                    <Cell title="地址" :value="item.sAddress" />
                    <Cell title="施工内容" :value="item.sRemarks || '-'" />
                    <Cell title="签约日期" :value="item.dateOrder || '-'" />
                    <Cell title="预计开工日期" :value="item.dateYujiKaigong || '-'" />
                    <Cell title="家居顾问" :value="item.iSales_name || '-'" />
                    <Cell title="签约金额" :value="item.orderFee || '-'" />
                    <Cell title="首付金额" :value="item.orderDingjin || '-'" />
                    
                    <div class="van-cell btn_wrap" v-if="item.actions">
                        <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId,action.mode)">{{action.name}}</button>
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
    import { getForemanConstruction } from '@/server';
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
                    '派工完成',
                    '开工进场',
                ],
                typeCode: [
                    '6', '7'
                ],
                customerLists: [],
                value: '', // 搜索
                status: '', // 状态
                time: '', // 时间
                page: 1,
                loading: false,
                finished: false,
                modeShow: false, // 选择报价模式
                actions: [{'name':'卫生间改造'},{'name':'厨房改造'},{'name':'厨卫改造'},{'name':'其他'}],
                actionids:[1,2,3,4],
                currentId: '' // 选择的id 
            };
        },
       created() {
           //console.log(this.$store.state.active)
        },
        methods: {
            doTel(mobile){
                //console.log(mobile);
                window.location.href = "tel:"+mobile;
            },
            /*
            * 初始化数据加载
            */
            getForemanConstruction() {
                let params = {
                    status: this.status,
                    page: this.page,
                    keywords: this.value,
                    fromdate: this.time
                }
                getForemanConstruction(params).then(
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
            * 加载数据
            */
            handleLoad() {
                let params = {
                    status: this.status,
                    page: this.page,
                    keywords: this.value,
                    fromdate: this.time
                }
                getForemanConstruction(params).then(
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
                this.getForemanConstruction();
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
                this.getForemanConstruction();
            },
            handleCancel() {
                this.timeShow = false;
            },
            /*
            * 搜索
            */
            handleSearch() {
                this.reset();
                this.getForemanConstruction();
            },
            /*
            * 点击操作
            * 0 -> 预约
            * 1 -> 上门
            * 2 -> 报价
            */
            handleClick(type, id, mode) {
                switch(type) {
                    case 0:
                        this.handleQuote(id);
                        break;
                    case 1:
                        this.handleGo(id, type,mode);
                        break;
                    case 2:
                        this.handleGo(id, type);
                        break; 
                    default:
                        break;
                }
            },
            /*
            * 处理预约/上门
            */
            handleGo(id, type, mode) {
                let name = '';
                if(type == 1) {
                    name = 'setting';
                    window.location.href = 'http://www.51bangma.com/gongqi/setting/?iCustomerId='+id+'&type='+mode;
                }
                if(type == 2) {
                    window.location.href = 'http://www.51bangma.com/gongqi/yanshou/?iCustomerId='+id;
                }

            },
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
                window.location.href = 'http://www.51bangma.com/gongqi/setting/?iCustomerId='+this.currentId+'&type='+mode;
            }

        }
    }
</script>

<style lang="scss">
    .allUser_container {
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
