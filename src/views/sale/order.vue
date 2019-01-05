<template>
    <div class="order_container">
        <Cell-group>
            <Cell title="订单状态" is-link :value="status" @click="choseOrder" />
            <Cell title="上门时间" is-link :value="time" @click="choseTime" v-if="status !== '基检取消'"/>
        </Cell-group>
        <Cell-group v-if="status === '基检取消'">
            <Field
                v-model="message"
                label="取消理由"
                type="textarea"
                placeholder="请输入取消理由"
                rows="2"
                autosize
            />
        </Cell-group>

        <Button type="primary" size="large" @click="handleSubmit">提交</Button>
        
        <Popup v-model="show" position="bottom">
            <datetime-picker
                @confirm="handleComfirm"
                @cancel="handleCancel"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>

        <Popup v-model="orderShow" position="bottom">
            <Picker show-toolbar :columns="orderActions" @cancel="handleOrderCancel" @confirm="handleOrderConfirm" />
        </Popup>
    </div>

</template>
    
<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast, Picker } from 'vant';
    import { postYuyueAdd } from '@/server';
    import { timetrans } from '@/utils/time';

    export default {
        name: 'order',
        components: {
            Cell,
            CellGroup,
            Popup,
            DatetimePicker,
            Button,
            Field,
            Toast,
            Picker
        },
        data() {
            return {
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(2019, 10, 1),
                orderActions: [
                    '基检确认', '基检取消', '基检再约'
                ],
                time: '', // 上门时间
                status: '基检确认', // 状态
                message: '', // 留言
                show: false, // 时间显示
                orderShow: false // 选择状态
            }
        },
        methods: {
            /*
            * 选择状态
            */
            choseOrder() {
                this.orderShow = true;
            },
            handleOrderCancel() {
                this.orderShow = false;
            },
            handleOrderConfirm(value) {
                this.orderShow = false;
                this.status = value;
            },
            /*
            * 选择时间
            */
            choseTime() {
                this.show = true;
            },
            handleComfirm(value) {
                let data = timetrans(value);
                this.time = data;
                this.show = false;
            },
            handleCancel() {
                this.show = false;
            },
            /*
            * 提交
            */
            handleSubmit() {
                let iCustomerId = this.$route.params.id || 1;
                let params = {
                    'iCustomerId': iCustomerId
                }
                if(this.status == '基检确认') {
                   params.dateYuyue = this.time;
                   params.iStatus = 2;
                }
                if(this.status == '基检取消') {
                   params.quxiaoContent = this.message;
                   params.iStatus = 3;
                }
                if(this.status == '基检再约') {
                   params.dateZaiyue = this.time;
                   params.iStatus = 103;
                }
                postYuyueAdd(params).then(
                    res => {
                        console.log('res', res);
                        if(res.success == 1) {
                            Toast(res.msg);
                            return;
                        }
                        Toast(res.msg);
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    .order_container {
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
    }
</style>
