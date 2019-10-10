<template>
    <div class="foremanBaoming_container">
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
                                <span class="order_id">{{item.id}}</span>
                                <span class="status">{{item.iStatus_name}}</span>
                            </div>
                        </template>
                    </Cell>
                    <Cell title="姓名" :value="item.uname" />
                    <Cell title="手机号" :value="item.phone" @click="doTel(item.phone)"/>
                    <Cell title="装修类型" :value="item.type_name" />
                    <Cell title="区域" :value="item.city_name" />
                    <Cell title="小区" :value="item.sXiaoqu" />
                    <Cell title="地址" :value="item.sAddress" />
                    <Cell title="报名时间" :value="item.baoming_time || '-'" />


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
    import { getSaomaBaoming } from '@/server';
    import { timetrans } from '@/utils/time';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'foremanBaoming',
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
                minDate: new Date(2018, 1, 1),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),
                typeShow: false,
                timeShow: false,
                typeLists: [ 
                    '全部状态',
                    '未处理',
                    '已处理'
                ],
                typeCode: [
                    '', '1', '2'
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
            getForemanBaoming() {
                let params = {
                    status: this.status,
                    page: this.page,
                    keywords: this.value,
                    fromdate: this.time
                }
                getSaomaBaoming(params).then(
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
                getSaomaBaoming(params).then(
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
                this.getForemanBaoming();
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
                this.getForemanBaoming();
            },
            handleCancel() {
                this.timeShow = false;
            },
            /*
            * 搜索
            */
            handleSearch() {
                this.reset();
                this.getForemanBaoming();
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
                            backurl: 'getForemanBaoming'
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