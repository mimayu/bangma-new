<template>
    <div class="bossSettle_container">
        <List
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="handleLoad"
        >
            <Cell-group class="group" v-for="item in settleLists" :key="item.iCustomerId">
                <Cell title="订单号">
                    <template>
                        <div class="custom_wrap">
                            <span class="order_id">{{item.iCustomerId}}</span>
                            <span class="status">结算完成</span>
                        </div>
                    </template>
                </Cell>
                <Cell title="姓名" :value="item.sUsername" />
                <Cell title="手机号" :value="item.sMobile" />
                <Cell title="地址" :value="item.sAddress" />
                <Cell title="施工内容" :value="item.sRemarks || '-'" />
                <Cell title="接单日期" :value="item.tOrderDate || '-'" />
                <div class="van-cell btn_wrap" v-if="item.actions">
                    <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                </div>
            </Cell-group>
        </List>
        <footerNav></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker, List } from 'vant';
    import footerNav from "@/components/footerNav"; // 引入页脚    
    import { getCustomer } from '@/server';

    export default {
        name: 'bossSettle',
        components: {
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Popup, 
            Picker,
            List,
            footerNav
        },
        data() {
            return {
                page: 1,
                settleLists: [],
                loading: false, // 是否加载
                finished: false, // 是否结束
            };
        },
        methods: {
            /*
            * 处理加载
            */
            handleLoad() {
                this.getCustomer();
            },
            /*
            * 请求数据
            */
            getCustomer() {
                let params = {
                    status: 11,
                    page: this.page
                }
                getCustomer(params).then(
                    res => {
                        if(res.success == 1) {
                            this.settleLists = this.settleLists.concat(res.list);
                            this.page += 1;
                            this.loading = false;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                    }
                )
            },
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
        .group {
            margin-bottom: 8px;
        }
    }
</style>
