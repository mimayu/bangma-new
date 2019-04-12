<template>
    <div class="bossFugongAdd_container">
        <Cell-group>
            <Cell title="实际再次开工日期" is-link :value="startTime" @click="choseTime" />
            <Cell title="预计完工日期" is-link :value="endTime" @click="choseEndTime" />
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
        <Popup v-model="endShow" position="bottom">
            <datetime-picker
                @confirm="handleEndComfirm"
                @cancel="handleEndCancel"
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
    import { postAddFugong } from '@/server';
    import { timetrans } from '@/utils/time';

    export default {
        name: 'bossFugongAdd',
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
                show: false, // 开工日期 时间显示
                endShow: false, // 预计完工日期 时间显示
                startTime: '', // 开工日期
                endTime: '', // 预计完工日期
            };
        },
        created() {
            this.minDate.setMonth(this.minDate.getMonth()-1);
            this.maxDate.setMonth(this.minDate.getMonth()+2);
        },
        methods: {
            Confirm() {
                let iCustomerId = this.$route.params.id || 1;
                let from = this.$route.params.from || '';
                let name = from == 'boss' ? 'bossWorking' : 'saleWorking';
                let params = {
                    'iCustomerId': iCustomerId,
                    'shijizaiciKaigongDate': this.startTime,
                    'dateYujiWangong': this.endTime,
                }
                postAddFugong(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast(res.msg);
                            this.$router.push(
                                {
                                    name: name,
                                    query: {
                                        active: 1
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
            },
            choseEndTime() {
                this.endShow = true;
            },
            handleEndComfirm(value) {
                let data = timetrans(value, 1);
                this.endTime = data;
                this.endShow = false;
            },
            handleEndCancel(e) {
                this.endShow = false;
            }
        }
    }
</script>

<style lang="scss">
    .bossFugongAdd_container {
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
