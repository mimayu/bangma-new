<template>
    <div class="visit">
        <Cell-group>
            <Cell title="订单状态" is-link value="上门" @click="choseOrder" />
            <Cell title="上门时间" is-link value="" @click="choseTime" />
            <Cell title="重点跟进" is-link value="上门" @click="choseLevel"/>
            <Cell title="客户反馈" is-link value="非常满意，签约" @click="choseCustom"/>
        </Cell-group>
        <Cell-group>
            <Field
                v-model="message"
                label="留言"
                type="textarea"
                placeholder="请输入留言"
                rows="2"
                autosize
            />
        </Cell-group>
        <Button type="primary" size="large" @click="visitAdd">普通按钮</Button>
        <Popup v-model="show" position="bottom">
            <datetime-picker
                @confirm="handleComfirm"
                @cancel="handleCancel"
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>

        <Popup v-model="orderShow" position="bottom">
            <Picker show-toolbar :columns="orderActions" @cancel="handleOrderCancel" @confirm="handleOrderConfirm" @change="handleOrderSelect" />
        </Popup>
        <Popup v-model="levelShow" position="bottom">
            <Picker show-toolbar :columns="levelActions" @cancel="handleLevelCancel" @confirm="handleLevelConfirm" @change="handleLevelSelect" />
        </Popup>
        <Popup v-model="customShow" position="bottom">
            <Picker show-toolbar :columns="customActions" @cancel="handleCustomCancel" @confirm="handleCustomConfirm" @change="handleCustomSelect" />
        </Popup>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast, Picker } from 'vant';
    import { postShangmenAdd } from '@/server';

    export default {
        name: 'visit',
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
                currentDate: new Date(),
                show: false,
                orderShow: false,
                levelShow: false,
                customShow: false,
                message: '',
                orderActions: [
                    '签约等待', '签约成功', '签约失败'
                ],
                levelActions: [
                    'A级', 'B级', 'C级', 'D级'
                ],
                customActions: [
                    '客户需要商量考虑', '已加微信，继续跟进', '预留电话，已约定下次联系时间', '时间安排不过来，不做了', '价格太贵，不做了'
                ]
            };
        },
        methods: {
            choseTime() {
                this.show = true;
            },
            visitAdd() {
                let time = Date.parse(this.currentDate);
                let params = {
                    'iCustomerId': 1,
                    'dateShangmen': time,
                    'shangmenContent': this.message
                }
                postShangmenAdd(params).then(
                    res => {
                        if(res.success == 2) {
                            Toast(res.msg);
                            return;
                        }
                        console.log('res', res);
                    }
                )
            },
            choseOrder() {
                this.orderShow = true;
            },
            choseLevel() {
                this.levelShow = true;
            },
            choseCustom() {
                this.customShow = true;
            },
            handleComfirm(value) {
                this.show = false;
            },
            handleCancel(e) {
                this.show = false;
            },
            handleOrderConfirm() {
                this.orderShow = false;
            },
            handleOrderCancel() {
                this.orderShow = false;
            },
            handleOrderSelect(item) {
                
            },
            handleLevelConfirm() {
                this.levelShow = false;
            },
            handleLevelCancel() {
                this.levelShow = false;
            },
            handleLevelSelect(item) {
                
            },
            handleCustomConfirm() {
                this.customShow = false;
            },
            handleCustomCancel() {
                this.customShow = false;
            },
            handleCustomSelect(item) {
                
            }
        }
    }
</script>

<style lang="scss">
    .van-cell__title, .van-field .van-cell__title {
        max-width: 100px;
    }
    .van-cell__title, .van-cell__value{
        text-align: left;
    }
</style>
