<template>
    <div class="bossCancel_container">
        <Cell-group>
            <Cell title="取消日期" is-link value="" @click="choseTime" />
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
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast } from 'vant';
    import { postQuxiaoAdd, postCancel } from '@/server';

    export default {
        name: 'bossCancel',
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
                show: false, // 取消时间显示
                time: '', // 取消日期
                message: '', // 取消信息
            };
        },
        methods: {
            choseTime() {
                this.show = true;
            },
            cancelConfirm() {
                let params = {
                    'iCustomerId': 1,
                    'dateQuxiao': this.time,
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
            },
            /*
            * 合同解除
            */
            handleCancel(id) {
                let params = {
                    'iCustomerId': id,
                    'dateQuxiao': this.time,
                    'quxiaoContent': this.message
                };
                postCancel(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast('解约成功');
                            return;
                        }
                        Toast(res.msg);
                    }
                )
            },
        }
    }
</script>

<style lang="scss">
    .bossCancel_container {
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title {
            text-align: left;
        }
    }
</style>
