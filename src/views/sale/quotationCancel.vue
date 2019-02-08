<template>
    <div class="quotationCancel_container">
        <Cell-group>
            <Cell title="取消时间" is-link :value="time" @click="choseTime" />
        </Cell-group>
        <Cell-group>
            <Field
                v-model="message"
                label="取消理由"
                type="textarea"
                placeholder="请输入取消理由"
                rows="2"
                autosize
            />
        </Cell-group>

        <Button type="primary" size="large" @click="handleSubmit">提交</Button>
        
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
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast, Picker } from 'vant';
    import { postCancel } from '@/server';
    import { timetrans } from '@/utils/time';

    export default {
        name: 'quotationCancel',
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
                time: '', // 取消时间
                message: '', // 留言
                show: false, // 时间显示
            }
        },
        methods: {
            /*
            * 选择时间
            */
            choseTime() {
                this.show = true;
            },
            handleComfirm(value) {
                let data = timetrans(value, 1);
                this.time = data;
                this.show = false;
            },
            handleCancel() {
                this.show = false;
            },
            /*
            * 提交
            */
            handleSubmit() {
                let iCustomerId = this.$route.params.id || 1;
                let params = {
                    'iCustomerId': iCustomerId,
                    'dateQuxiao': this.time,
                    'quxiaoContent': this.message
                }
                postCancel(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast(res.msg);
                            this.$router.push(
                                {
                                    name: 'signStatus',
                                    query: {
                                        active: 3
                                    }
                                }
                            )
                            return;
                        }
                        Toast(res.msg);
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    .quotationCancel_container {
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
    }
</style>
