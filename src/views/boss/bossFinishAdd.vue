<template>
    <div class="bossFinishAdd_container">
        <Cell-group>
            <Cell title="完工日期" is-link :value="startTime" @click="choseTime" />
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
    import { postAddWangong } from '@/server';
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
                maxDate: new Date(),
                currentDate: new Date(),
                show: false, // 完工日期 时间显示
                startTime: '', // 完工日期
            };
        },
        mounted () {
            let nowDate = new Date();
            let year = nowDate.getFullYear();
            let min_month = nowDate.getMonth();
            let max_month = nowDate.getMonth() + 2;
            let day = nowDate.getDate();
            this.minDate = new Date(year + ', ' + min_month + ', ' + day); // 向前推迟一周的时间点
            this.maxDate = new Date(year + ', ' + max_month + ', ' + day); // 当前的时间点
        },
        methods: {
            Confirm() {
                let iCustomerId = this.$route.params.id || 1;
                let from = this.$route.params.from || '';
                let name = from == 'boss' ? 'bossFinish' : 'saleFinish';
                let active = from == 'boss' ? '0' : '0';
                let params = {
                    'iCustomerId': iCustomerId,
                    'dateWangong': this.startTime
                }
                postAddWangong(params).then(
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
