<template>
    <div class="bossFinishAdd_container">
        <Cell-group>
            <Cell title="完工日期" is-link :value="startTime" @click="choseTime" />
            <Field
                v-model="money"
                label="尾款金额"
            />
        </Cell-group>
        <Button type="primary" size="large" @click="Confirm">保存</Button>
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
    import { postAddWork } from '@/server';
    import { timetrans } from '@/utils/time';

    export default {
        name: 'bossFinishAdd',
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
                show: false, // 收取尾款日期 时间显示
                startTime: '', // 收取尾款日期
                money: '', // 收取尾款金额
            };
        },
        methods: {
            Confirm() {
                let iCustomerId = this.$route.params.id || 1;
                let params = {
                    'iCustomerId': iCustomerId,
                    'dateWeikuan': this.startTime,
                    'orderWeikuan': this.money
                }
                postAddWork(params).then(
                    res => {
                        if(res.success == 2) {
                            Toast(res.msg);
                            return;
                        }
                        Toast(res.msg);
                    }
                )
            },
            choseTime() {
                this.show = true;
            },
            handleComfirm(value) {
                let data = timetrans(value, 1);
                this.startTime = data;
                this.show = false;
            },
            handleCancel(e) {
                this.show = false;
            }
        }
    }
</script>

<style lang="scss">
    .bossFinishAdd_container {
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__value {
            text-align: left;
        }
        .van-cell__title {
            text-align: left;
        }
    }
</style>
