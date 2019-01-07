<template>
    <div class="bossAddCustom_container">
        <div class="tips">
            <span class="now">
                {{current}}<i>今</i>
            </span>
            <span class="count">
                {{total}}个
            </span>
        </div>
        <ul class="time_list">
            <li v-for="(item, index) in dateLists" :key="index" class="time_item">
                <span class="time_item_week">{{item.week}}</span>
                <span class="time_item_day" :class="{'active': item.today}" @click="handleTime(item.full)">{{item.short}}</span>
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
                                <span class="status">新进客户</span>
                            </div>
                        </template>
                    </Cell>
                    <Cell title="姓名" :value="item.sUsername" />
                    <Cell title="手机号" :value="item.sMobile" />
                    <Cell title="地址" :value="item.sAddress" />
                    <Cell title="施工内容" :value="item.sRemarks || '-'" />
                    <Cell title="开工时间" :value="item.tOrderDate || '-'" />
                    <div class="van-cell btn_wrap" v-if="item.actions">
                        <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                    </div>
                </Cell-group>
            </List>
        </div>
    </div>
</template>

<script>
    import { Cell, CellGroup, Toast, List } from 'vant';
    import dayjs from 'dayjs';
    import { getCustomerOrder } from '@/server';
    import { switchWeek } from '@/utils/time';

    export default {
        name: 'bossAddCustom',
        components: {
            Cell,
            CellGroup,
            Toast,
            List
        },
        data() {
            return {
                dateLists: [], //日历
                time: dayjs().format('YYYY-MM-DD'), // 切换时间
                current: dayjs().format('YYYY-MM-DD'), // 当前时间
                page: 1, //页数
                list: [],
                customerLists: [],
                total: 0,
                loading: false,
                finished: false
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
                        today: i == 0 ? true : false
                    }
                    dateLists.push(current);
                }
                return dateLists;
            },
            /*
            * 点击处理
            */
            handleClick() {

            },
            /*
            * 点击时间切换
            */
            handleTime(value) {
                this.time = value;
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
            }
        }
        .content {
            flex: 1;
            overflow: auto;
        }
    }
</style>
