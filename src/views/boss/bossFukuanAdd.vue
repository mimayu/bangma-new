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
                v-model="currentDate"
            />
        </Popup>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast } from 'vant';
    import { postAddFukuan } from '@/server';
    import { timetrans } from '@/utils/time';

    export default {
        name: 'bossFukuanAdd',
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
                maxDate: new Date(),
                currentDate: new Date(),
                show: false, // 收取尾款日期 时间显示
                startTime: '', // 收取尾款日期
                money: '', // 收取尾款金额
            };
        },
        created() {
            this.minDate.setMonth(this.minDate.getMonth()-1);
            this.maxDate.setMonth(this.minDate.getMonth()+2);
        },
        methods: {
            Confirm() {
                let iCustomerId = this.$route.params.id || this.$route.query.id || 0;
                let from = this.$route.params.from || this.$route.query.from || '';
                let name = from == 'boss' ? 'bossFinish' : 'saleFinish';
                let active = from == 'boss' ? '1' : '1';
                let params = {
                    'iCustomerId': iCustomerId,
                    'dateWeikuan': this.startTime,
                    'orderWeikuan': this.money
                }
                postAddFukuan(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast(res.msg);
                            this.$router.push(
                                {
                                    name: name,
                                    query: {
                                        active: active
                                    }
                                }
                            )
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
