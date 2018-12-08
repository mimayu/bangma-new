<template>
    <div class="visit">
        <Cell-group>
            <Cell title="订单状态" value="基建取消" />
            <Cell title="上门时间" is-link value="" @click="choseTime" />
        </Cell-group>
        <Cell-group>
            <Field
                v-model="message"
                label="取消原因"
                type="textarea"
                placeholder="请输入留言"
                rows="2"
                autosize
            />
        </Cell-group>
        <Button type="primary" size="large" @click="cancelConfirm">保存</Button>
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
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast } from 'vant';
    import { postQuxiaoAdd } from '@/server';

    export default {
        name: 'cancel',
        components: {
            Cell,
            CellGroup,
            Popup,
            DatetimePicker,
            Button,
            Field,
            Toast
        },
        data() {
            return {
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),
                show: false,
                message: '',
            };
        },
        methods: {
            choseTime() {
                this.show = true;
            },
            cancelConfirm() {
                let time = Date.parse(this.currentDate);
                let params = {
                    'iCustomerId': 1,
                    'dateQuxiao': time,
                    'quxiaoContent': this.message
                }
                postQuxiaoAdd(params).then(
                    res => {
                        if(res.success == 2) {
                            Toast(res.msg);
                            return;
                        }
                        console.log('res', res);
                    }
                )
            },
            handleComfirm(value) {
                this.show = false;
            },
            handleCancel(e) {
                this.show = false;
            }
        }
    }
</script>

<style lang="scss">
    .van-cell__title, .van-field .van-cell__title {
        max-width: 100px;
    }
    .van-cell__title {
        text-align: left;
    }
</style>
