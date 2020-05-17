<template>
    <div class="prebaojia_container">
        <div style="font-size: 24px;padding: 8px 15px;">
            <span>
                卫生间
            </span>
        </div>
        <Cell-group>
            <Field label="地面面积" type="text" v-model="toiletDmArea" placeholder="请填写卫生间地面面积"/>
            <Field label="墙面面积" v-model="toiletQmArea" placeholder="请填写卫生间墙面面积"/>
        </Cell-group>
        <div style="font-size: 24px;padding: 8px 15px;">
            <span>
                厨房间
            </span>
        </div>
        <Cell-group>
            <Field label="地面面积" v-model="kitchenDmArea" placeholder="请填写厨房间地面面积"/>
            <Field label="墙面面积" v-model="kitchenQmArea" placeholder="请填写厨房间墙面面积"/>
        </Cell-group>

        <Button type="primary" size="large" @click="handleSubmit">提交</Button>

    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast, Picker } from 'vant';
    import { postPreBaojiaAdd } from '@/server';


    export default {
        name: 'prebaojia',//厨卫改造快速报价
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
                toiletDmArea: '', // 卫生间地面面积
                toiletQmArea: '', // 卫生间墙面面积
                kitchenDmArea: '',  // 厨房间地面面积
                kitchenQmArea: '',  // 厨房间墙面面积
                backurl:'',
                active:'',

            };
        },
        created() {
            this.active = this.$route.params.active || this.$route.query.active || 0;
            this.backurl = this.$route.params.backurl || this.$route.query.backurl || 0;
        },
        methods: {
            /*
            * 处理提交
            */
            handleSubmit() {
                let iCustomerId = this.$route.query.iCustomerId || 0;
                let params = {
                    'iCustomerId':iCustomerId,
                    'toiletDmArea': this.toiletDmArea,
                    'toiletQmArea': this.toiletQmArea,
                    'kitchenDmArea': this.kitchenDmArea,
                    'kitchenQmArea': this.kitchenQmArea,
                }
                postPreBaojiaAdd(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast(res.msg);
                            this.$router.push(
                                {
                                    name: 'quotationList',
                                    query: {
                                        id: iCustomerId
                                    }
                                }
                            )
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
    .prebaojia_container {
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
    }
</style>