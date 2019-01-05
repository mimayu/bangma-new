<template>
    <div class="visit_container">
        <Cell-group>
            <Cell title="订单状态" is-link :value="status" @click="choseOrder" />
            <Cell title="上门时间" is-link :value="time" @click="choseTime" />
            <Cell title="重点跟进" is-link :value="level" @click="choseLevel"/>
            <Cell title="客户反馈" is-link :value="action" @click="choseCustom"/>
            <Cell title="跟进时间" is-link :value="nextTime" @click="choseNextTime" v-if="status === '签约等待'" />
            <Cell title="签约日期" is-link :value="dateOrder" @click="showOrderTime" v-if="status === '签约成功'" />
            <Cell title="预计开工日期" is-link :value="dateYujiKaigong" @click="showWorkTime" v-if="status === '签约成功'" />
            <Field label="签约金额" v-model="orderFee" placeholder="请输入签约金额" v-if="status === '签约成功'" />
            <Field label="签约定金" v-model="orderDingjin" placeholder="请输入签约定金" v-if="status === '签约成功'" />
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
        <Button type="primary" size="large" @click="handleSubmit">提交</Button>

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
        <Popup v-model="nextShow" position="bottom">
            <datetime-picker
                @confirm="handleNextComfirm"
                @cancel="handleNextCancel"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
        <Popup v-model="showOrder" position="bottom">
            <datetime-picker
                @confirm="handleOrderDateComfirm"
                @cancel="handleOrderDateCancel"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
        <Popup v-model="showWork" position="bottom">
            <datetime-picker
                @confirm="handleWorkComfirm"
                @cancel="handleWorkCancel"
                type="date"
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
                nextShow: false, //跟进日期 签约等待
                orderShow: false,
                levelShow: false,
                customShow: false,
                showOrder: false, // 处理成功 -> 签约日期
                showWork: false,  //处理成功 -> 预计开工日期
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
                nextTime: '', //跟进日期 签约等待
                dateOrder: '', // 签约成功 签约日期 2018-12-08
                dateYujiKaigong: '', // 签约成功 预计开工日期 2018-12-08
                orderFee: '', // 签约成功 金额
                orderDingjin: '', // 签约成功 签约定金
            };
        },
        methods: {
            /*
            * 处理提交
            */
            handleSubmit() {
                let iCustomerId = this.$route.params.id || 1;
                let params = {
                    'iCustomerId': iCustomerId,
                    'dateShangmen': this.time,
                    'shangmenContent': `${this.action}${this.message}`,
                    'iLevel': this.level
                }
                if(this.status == '签约等待') {
                   params.iStatus = 4;
                   params.timeNextFollow = this.nextTime;
                }
                if(this.status == '签约成功') {
                   params.iStatus = 5;
                   params.dateOrder = this.dateOrder;
                   params.dateYujiKaigong = this.dateYujiKaigong;
                   params.orderFee = this.orderFee
                   params.orderDingjin = this.orderDingjin
                }
                if(this.status == '签约失败') {
                   params.iStatus = 101;
                }
                postShangmenAdd(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast(res.msg);
                            return;
                        }
                        Toast(res.msg);
                    }
                )
            },
            /*
            * 选择订单状态
            */
            choseOrder() {
                this.orderShow = true;
            },
            handleOrderConfirm(value) {
                this.status = value;
                this.orderShow = false;
            },
            handleOrderCancel() {
                this.orderShow = false;
            },
            /*
            * 选择上门时间
            */
            choseTime() {
                this.show = true;
            },
            handleComfirm(value) {
                let data = timetrans(value);
                this.time = data;
                this.show = false;
            },
            handleCancel(e) {
                this.show = false;
            },
            /*
            * 选择客户等级
            */
            choseLevel() {
                this.levelShow = true;
            },
            handleLevelConfirm(value) {
                this.level = value;
                this.levelShow = false;
            },
            handleLevelCancel() {
                this.levelShow = false;
            },
            /*
            * 选择客户反馈
            */
            choseCustom() {
                this.customShow = true;
            },
            handleCustomConfirm(value) {
                this.action = value;
                this.customShow = false;
            },
            handleCustomCancel() {
                this.customShow = false;
            },
            /*
            * 处理等待 -> 下次跟进日期
            */
            choseNextTime() {
                this.nextShow = true;
            },
            handleNextCancel(e) {
                this.nextShow = false;
            },
            handleNextComfirm(value) {
                let data = timetrans(value);
                this.nextTime = data;
                this.nextShow = false;
            },
            /*
            * 处理成功 -> 签约日期
            */
            showOrderTime() {
                this.showOrder = true;
            },
            handleOrderDateCancel(e) {
                this.showOrder = false;
            },
            handleOrderDateComfirm(value) {
                let data = timetrans(value, 1);
                this.dateOrder = data;
                this.showOrder = false;
            },
            /*
            * 处理成功 -> 预计开工日期
            */
            showWorkTime() {
                this.showWork = true;
            },
            handleWorkCancel(e) {
                this.showWork = false;
            },
            handleWorkComfirm(value) {
                let data = timetrans(value, 1);
                this.dateYujiKaigong = data;
                this.showWork = false;
            }
        }
    }
</script>

<style lang="scss">
    .visit_container {
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
    }
</style>
