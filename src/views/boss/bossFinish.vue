<template>
    <div class="bossFinish_container">
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
                            <span class="status">完工</span>
                        </div>
                    </template>
                </Cell>
                <Cell title="姓名" :value="item.sUsername" />
                <Cell title="手机号" :value="item.sMobile" />
                <Cell title="地址" :value="item.sAddress" />
                <Cell title="施工内容" :value="item.sRemarks || '-'" />
                <Cell title="预约时间" :value="item.tOrderDate || '-'" />
                <div class="van-cell btn_wrap" v-if="item.actions">
                    <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                </div>
            </Cell-group>
        </List>
        <Actionsheet
            v-model="modeShow"
            :actions="actions"
            @select="handleSelect"
        />
        <footerNav></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker, List, Actionsheet } from 'vant';
    import footerNav from "@/components/footerNav"; // 引入页脚    
    import { getCustomer } from '@/server';

    export default {
        name: 'bossFinish',
        components: {
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Popup, 
            Picker,
            List,
            Actionsheet,
            footerNav
        },
        data() {
            return {
                page: 1,
                customerLists: [],
                loading: false, // 是否加载
                finished: false, // 是否结束
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
        methods: {
            /*
            * 点击按钮
            * 3 -> 报价处理
            * 9 -> 完工
            */
            handleClick(type, id) {
                switch(type) {
                    case 3:
                        this.handleQuote(id);
                        break;
                    case 9:
                        this.handleGo(id, type);
                        break;
                    default:
                        break;
                }
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
                    return item.name == value.name
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
            },
            /*
            * 取消报价/完工
            */
            handleGo(id, type) {
                let name = type == 5 ? 'quotationCancel' : 'bossFinishAdd';
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
                    status: 8,
                    page: this.page
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
        }
    }
</script>

<style lang="scss">
    .bossFinish_container {
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
