<template>
    <div class="visit_container">
        <Cell-group>
            <Cell title="停工日期" is-link :value="time" @click="choseTime" />
            <Cell title="预计再次开工日期" is-link :value="nextTime" @click="choseNextTime" />
        </Cell-group>
        <Cell-group>
            <Field
                v-model="message"
                label="停工原因"
                type="textarea"
                placeholder="请填写停工原因"
                rows="3"
                autosize
            />
        </Cell-group>
        <Button type="primary" size="large" @click="handleSubmit">提交</Button>

        <Popup v-model="show" position="bottom">
            <datetime-picker
                @confirm="handleComfirm"
                @cancel="handleCancel"
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
        <Popup v-model="nextShow" position="bottom">
            <datetime-picker
                @confirm="handleNextComfirm"
                @cancel="handleNextCancel"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast, Picker } from 'vant';
    import { postTinggongAdd } from '@/server';
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
                showOrder: false, // 处理成功 -> 签约日期
                message: '',
                time: '', // 时间
                action: '', // 操作
                nextTime: '', //跟进日期 签约等待
                active:'',

            };
        },
        created() {
            this.active = this.$route.params.active || 0;
        },
        methods: {
            /*
            * 处理提交
            */
            handleSubmit() {
                let iCustomerId = this.$route.params.id || 0;
                let from = this.$route.params.from || '';
                let name = from == 'boss' ? 'bossWorking' : 'saleWorking';
                let params = {
                    'iCustomerId': iCustomerId,
                    'tinggongDate': this.time,
                    'tTinggongContent': `${this.action}${this.message}`,
                    'yujizaiciKaigongDate':this.nextTime,
                }
     
                postTinggongAdd(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast(res.msg);
                            this.$router.push(
                                {
                                    name: name,
                                    query: {
                                        active: 2
                                    }
                                }
                            )
                            return;
                        }
                        Toast(res.msg);
                    }
                )
            },
            /*
            * 选择上门时间
            */
            choseTime() {
                this.show = true;
            },
            handleComfirm(value) {
                let data = timetrans(value,1);
                this.time = data;
                this.show = false;
            },
            handleCancel(e) {
                this.show = false;
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
                let data = timetrans(value,1);
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
        .am-image-picker-list {
            padding: 15px;
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            .am-flexbox-item-contain {
                width: 25%;
                box-sizing: border-box;
                padding: 2px;
                &::after {
                    display: block;
                    content: " ";
                    padding-bottom: 100%;
                }
            }
            .am-flexbox-item {
                position: relative; 
                width: 100%;
                height: 100%;               
            }
            .am-image-picker-item {
                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
                width: 100%;
                height: 100%;
                input {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    opacity: 0;
                }
            }
            .am-image-picker-upload-btn {
                box-sizing: border-box;
                border-radius: 3px;
                border: 1px solid #ddd;
                background-color: #fff;
                &::before {
                    width: 1px;
                    height: 25px;
                    content: " ";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    background-color: #ccc;
                }
                &::after {
                    width: 25px;
                    height: 1px;
                    content: " ";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    background-color: #ccc;
                }
            }
            .am-image-picker-item-content {
                height: 100%;
                width: 100%;
                border-radius: 3px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }
            .am-image-picker-item-remove {
                width: 25px;
                height: 25px;
                transform: scale(0.8);
                position: absolute;
                right: 2px;
                top: 2px;
                text-align: right;
                vertical-align: top;
                z-index: 2;
                background: #d8544c;
                border-radius: 50%;
                &::before {
                    content: '';
                    position: absolute;
                    height: 2px;
                    width: 15px;
                    top: 49%;
                    left: 5px;
                    transform: rotate(-45deg);
                    background: #fff;
                }
                &::after {
                    content: '';
                    position: absolute;
                    height: 2px;
                    width: 15px;
                    top: 49%;
                    left: 5px;
                    background: #fff;
                    transform: rotate(45deg);
                }
            }
        }
    }
</style>
