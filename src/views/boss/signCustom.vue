<template>
    <div class="bossAddCustom_container">
        <div class="tips">
            <span class="now">
                {{time}}<i :class="{'active': clicked==6}">今</i>
            </span>
            <span class="count">
                {{total}}个
            </span>
        </div>
        <ul class="time_list">
            <li v-for="(item, index) in dateLists" :key="index" class="time_item">
                <span class="time_item_week">{{item.week}}</span>
                <span class="time_item_day" :class="{'active': index===clicked}" @click="handleTime(item.full,item.i)">{{item.short}}</span>
            </li>
        </ul>
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
                                <span class="status">签约成功</span>
                            </div>
                        </template>
                    </Cell>
                    <Cell title="姓名" :value="item.sUsername" />
                    <Cell title="手机号" :value="item.sMobile" />
                    <Cell title="地址" :value="item.sAddress" />
                    <Cell title="施工内容" :value="item.sRemarks || '-'" />
                    <Cell title="签约日期" :value="item.dateOrder || '-'" />
                    <Cell title="签约金额" :value="item.orderFee || '-'" />
                    <Cell title="预计开工日期" :value="item.dateYujiKaigong || '-'" />
                    <div class="van-cell btn_wrap" v-if="item.actions">
                        <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                    </div>
                </Cell-group>
            </List>
        </div>
        <Actionsheet
            v-model="modeShow"
            :actions="actions"
            @select="handleSelect"
        />
        <footerNav></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Toast, List, Actionsheet } from 'vant';
    import dayjs from 'dayjs';
    import { getCustomerOrder } from '@/server';
    import { switchWeek } from '@/utils/time';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'bossAddCustom',
        components: {
            Cell,
            CellGroup,
            Toast,
            List,
            Actionsheet,
            footerNav: footerNav
        },
        data() {
            return {

                clicked:6,
                dateLists: [], //日历
                time: dayjs().format('YYYY-MM-DD'), // 切换时间
                current: dayjs().format('YYYY-MM-DD'), // 当前时间
                page: 1, //页数
                list: [],
                customerLists: [],
                total: 0,
                loading: false,
                finished: false,

                modeShow: false, // 报价显示
                currentId: '', // 选择id
                actions: [
                    {
                        name: '普装'
                    },
                    {
                        name: '精装'
                    },
                    {
                        name: '奢华'
                    }
                ]
            };
        },
        created() {
            this.dateLists = this.createData();
        },
        methods: {
            /*
            * 创建日历时间
            */
            createData() {
                let dateLists = [];
                for(let i = -6; i <=0; i++) {
                    let current = {
                        full: dayjs().add(i, 'day').format('YYYY-MM-DD'),
                        short: dayjs().add(i, 'day').date(),
                        week: switchWeek(dayjs().add(i, 'day').day()),
                        today: i == 0 ? true : false,
                        i:i
                    }
                    dateLists.push(current);
                }
                return dateLists;
            },
            /*
            * 点击时间切换
            */
            handleTime(value,i) {
                this.time = value;
                this.clicked = i+6;
                this.reset();
                this.getCustomerOrder();
            },
            /*
            * 获取数据
            */
            handleLoad() {
                this.getCustomerOrder();
            },
            getCustomerOrder() {
                let params = {
                    'fromdate': this.time,
                    'page': this.page
                }
                getCustomerOrder(params).then(
                    res => {
                        if(res.success == 1) {
                           this.customerLists = this.customerLists.concat(res.list); 
                           this.total = res.total;
                           this.loading = false;
                           this.page += 1;
                           if(res.list.length < 20) {
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
                this.page = 1;
                this.customerLists = [];
                this.loading = true;
                this.finished = false;
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
                    default:
                        break;
                }
            },
            handleGo(id, type) {
                // 8 -> 完工
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
                this.$router.push(
                    {
                        name: name,
                        params: {
                            id: id
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
                let mode = this.actions.findIndex(item => {
                    return item.name == value.name;
                })
                this.modeShow = false;
                this.$router.push(
                    {
                        name: 'quotation',
                        params: {
                            id: this.currentId,
                            mode: +mode + 1
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    .bossAddCustom_container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
        .group {
            margin-bottom: 8px;
        }
        .btn_wrap {
            justify-content: flex-end;
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
        .time_list {
            display: flex;
            li {
                flex: 1;
            }
        }
        .time_item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #FBFBFB;
            .time_item_week {
                margin: 8px 0 10px 0;
                font-size: 12px;
                color: #999999;
            }
            .time_item_day {
                display: block;
                width: 30px;
                height: 30px;
                margin-bottom: 10px;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                color: #151515;
                border-radius: 100%;
            }
            .active {
                background: #1E97FF;
                color: #fff;
            }
        }
        .tips {
            display: flex;
            justify-content: space-between;
            padding: 0 15px;
            height: 44px;
            line-height: 44px;
            font-size: 18px;
            color: #262626;
            font-weight: 700;
            .now {
                display: flex;
                align-items: center;
                i {
                    display: inline-block;
                    margin-left: 8px;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    background: #D5D5D5;
                    color: #fff;
                    font-size: 12px;
                    font-weight: normal;
                }
                .active {
                    background: #1E97FF;
                    color: #fff;
                }
            }
        }
        .content {
            flex: 1;
            overflow: auto;
        }
    }
</style>
