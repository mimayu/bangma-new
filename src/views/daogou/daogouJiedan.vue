<template>
    <div class="daogouJiedan_container">
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
                    <Cell title="立邦订单号">
                        <template>
                            <div class="custom_wrap">
                                <span class="order_id">{{item.sLibangCode}}</span>
                                <span class="status">{{item.iStatus_name}}</span>
                            </div>
                        </template>
                    </Cell>
                    <Cell title="姓名" :value="item.sUsername" />
                    <Cell title="手机号" :value="item.sMobile" @click="doTel(item.sMobile)"/>
                    <Cell title="区域" :value="item.city_name" />
                    <Cell title="小区" :value="item.sXiaoqu" />
                    <Cell title="地址" :value="item.sAddress" />

                    <Cell title="业务员" :value="item.iSales_name" v-if="item.iSales_name!=''"/>
                    <Cell title="签约金额" :value="item.orderFee" v-if="item.orderFee!='0.00'"/>


                    <Cell title="建单日期" :value="item.tOrderDate || '-'" />


                    <div class="van-cell btn_wrap">
            
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
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Row, Col, Picker, Search, Toast, List } from 'vant';
    import { getShuaxinJiedan } from '@/server';
    import { timetrans } from '@/utils/time';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'daogouJiedan',
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
            footerNav: footerNav
        },
        data() {
            return {
                minHour: 10,
                maxHour: 20,
                minDate: new Date(2019, 1, 1),
                maxDate: new Date(2020, 10, 1),
                currentDate: new Date(),
                typeShow: false,
                timeShow: false,
                typeLists: [ 
                    '全部状态',
                    '基检未约',
                    '基检确认',
                    '基检取消',
                    '签约等待',
                    '签约成功',
                    '派工完成',
                    '开工进场',
                    '完工验收',
                    '收款完成',
                    '审核完成',
                    '已结算',
                    '签约失败',
                    '合同取消',
                    '基检再约',
                    '施工暂停',
                    '客户取消',
                    '基检暂缓',
                ],
                typeCode: [
                    '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '101', '102', '103', '104', '105', '106'
                ],
                customerLists: [],
                value: '', // 搜索
                status: '', // 状态
                time: '', // 时间
                page: 1,
                loading: false,
                finished: false,
                actions: [],
                actionids:[],
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
            getDaogouJiedan() {
                let params = {
                    status: this.status,
                    page: this.page,
                    keywords: this.value,
                    fromdate: this.time
                }
                getShuaxinJiedan(params).then(
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
                getShuaxinJiedan(params).then(
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
                this.getDaogouJiedan();
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
                this.getDaogouJiedan();
            },
            handleCancel() {
                this.timeShow = false;
            },
            /*
            * 搜索
            */
            handleSearch() {
                this.reset();
                this.getDaogouJiedan();
            },
            /*
            * 点击操作
            * 5 -> 合同解除
            * 8 -> 完工
            */
            handleClick(type, id) {
                switch(type) {
                    case 0:
                        this.handleGo(id, type);
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
                if(type == 11) {
                    name = 'followup' 
                }
                this.$router.push(
                    {
                        name: name,
                        params: {
                            id: id,
                            backurl: 'getDaogouJiedan'
                        }
                    }
                )

            },
            /*
            * 处理查看记录
            */
            handleCheckRecord(iCustomerId) {
                this.$router.push(
                    {
                        name: 'followupList',
                        params: {
                            iCustomerId: iCustomerId
                        }
                    }
                )
            }

        }
    }
</script>

<style lang="scss">
    .daogouJiedan_container {
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
            margin: 4px;
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