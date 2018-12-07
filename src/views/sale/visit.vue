<template>
    <div class="visit">
        <cell-group>
            <cell title="单元格" is-link value="上门" />
            <cell title="上门时间" is-link @click="choseTime"/>
            <cell title="重点跟进" is-link value="上门" />
            <cell title="客户反馈" is-link value="非常满意，签约" />
        </cell-group>
        <popup v-model="show" position="bottom">
            <datetime-picker
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </popup>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker } from 'vant';
    export default {
        name: 'visit',
        components: {
            Cell,
            CellGroup,
            Popup,
            DatetimePicker
        },
        data() {
            return {
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),
                show: false
            };
        },
        methods: {
            choseTime() {
                this.show = !this.show;
            }
        }
    }
</script>

<style lang="scss">
    .van-cell__title, .van-cell__value{
        text-align: left;
    }
</style>
