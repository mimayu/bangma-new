<template>
    <div class="saleWorking_container">
        <Cell-group class="group" v-for="item in customerLists" :key="item.iCustomerId">
            <Cell title="订单号">
                <template>
                    <div class="custom_wrap">
                        <span class="order_id">{{item.iCustomerId}}</span>
                        <span class="status">开工实施</span>
                    </div>
                </template>
            </Cell>
            <Cell title="姓名" :value="item.sUsername" />
            <Cell title="手机号" :value="item.sMobile" />
            <Cell title="地址" :value="item.sAddress" />
            <Cell title="施工内容" :value="item.sRemarks || '-'" />
            <Cell title="预约时间" :value="item.tOrderDate || '-'" />
            <div class="van-cell btn_wrap" >
                <button plain type="primary" class="assign_btn" @click="handleGo(action.type, item.iCustomerId)" v-for="(action, index) in item.actions" :key="action.type">{{action.name}}</button>
            </div>
        </Cell-group>
    </div>
</template>

<script>
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker } from 'vant';
    import { getCustomer } from '@/server';

    export default {
        name: 'saleWorking',
        components: {
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Popup, 
            Picker
        },
        data() {
            return {
                page: 1,
                customerLists: []
            };
        },
        created() {
            this.getCustomer()
        },
        methods: {
            getCustomer(cb) {
                let params = {
                    status: 7,
                    page: this.page
                }
                getCustomer(params).then(
                    res => {
                        console.log('res', res);
                        if(res.success == 1) {
                            this.customerLists = res.list;
                        }
                    }
                )
            },
            handleGo(type, id) {
                // 7 -> 增加开工
                switch(type) {
                    case 7:
                        this.$router.push(
                            {
                                name: 'bossWorkingAdd',
                                params: {
                                    id: id
                                }
                            }
                        )
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>

<style lang="scss">
    .saleWorking_container {
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
        .empty {
            font-size: 14px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3D(-50%, -50%, 0);
        }
    }
</style>
