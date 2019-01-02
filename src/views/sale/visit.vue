<template>
    <div class="visit">
        <Cell-group>
            <Cell title="订单状态" is-link :value="status" @click="choseOrder" />
            <Cell title="上门时间" is-link :value="time" @click="choseTime" />
            <Cell title="跟进时间" is-link :value="netxTime" @click="choseNextTime" />
            <Cell title="重点跟进" is-link :value="level" @click="choseLevel"/>
            <Cell title="客户反馈" is-link :value="action" @click="choseCustom"/>
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
        <Button type="primary" size="large" @click="visitAdd">提交</Button>
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
        <Popup v-model="netxShow" position="bottom">
            <datetime-picker
                @confirm="handleNextComfirm"
                @cancel="handleNextCancel"
                v-model="currentNextDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>

        <Popup v-model="orderShow" position="bottom">
            <Picker show-toolbar :columns="orderActions" @cancel="handleOrderCancel" @confirm="handleOrderConfirm" />
        </Popup>
        <Popup v-model="levelShow" position="bottom">
            <Picker show-toolbar :columns="levelActions" @cancel="handleLevelCancel" @confirm="handleLevelConfirm"/>
        </Popup>
        <Popup v-model="customShow" position="bottom">
            <Picker show-toolbar :columns="customActions" @cancel="handleCustomCancel" @confirm="handleCustomConfirm"/>
        </Popup>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast, Picker } from 'vant';
    import { postShangmenAdd } from '@/server';
    import { timetrans } from '@/utils/time';

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
                netxShow: false,
                orderShow: false,
                levelShow: false,
                customShow: false,
                message: '',
                orderActions: [
                    '签约等待', '签约成功', '签约失败'
                ],
                levelActions: [
                    'A', 'B', 'C', 'D'
                ],
                customActions: [
                    '客户需要商量考虑', '已加微信，继续跟进', '预留电话，已约定下次联系时间', '时间安排不过来，不做了', '价格太贵，不做了'
                ],
                status: '签约等待', // 状态
                time: '', // 时间
                level: '', // 客户重要程度
                action: '', // 操作
                netxTime: '' //跟进日期
            };
        },
        methods: {
            choseTime() {
                this.show = true;
            },
            choseNextTime() {
                this.nextShow = true;
            },
            visitAdd() {
                let iCustomerId = this.$route.params.id;
                let params = {
                    'iCustomerId': iCustomerId,
                    'dateShangmen': this.time,
                    'shangmenContent': this.action,
                    'iLevel': this.level
                }
                postShangmenAdd(params).then(
                    res => {
                        if(res.success == 2) {
                            Toast(res.msg);
                            return;
                        }
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
                let data = timetrans(value);
                this.time = data;
                this.show = false;
            },
            handleCancel(e) {
                this.show = false;
            },
            handleNextCancel(e) {
                this.nextShow = false;
            },
            handleNextComfirm(value) {
                let data = timetrans(value);
                this.netxTime = data;
                this.nextShow = false;
            },
            handleOrderConfirm(value) {
                this.status = value;
                this.orderShow = false;
            },
            handleOrderCancel() {
                this.orderShow = false;
            },
            handleLevelConfirm(value) {
                this.level = value;
                this.levelShow = false;
            },
            handleLevelCancel() {
                this.levelShow = false;
            },
            handleCustomConfirm(value) {
                this.action = value;
                this.customShow = false;
            },
            handleCustomCancel() {
                this.customShow = false;
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
