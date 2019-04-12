<template>
    <div class="visit_container">
        <Cell-group>
            <Cell title="跟进时间" is-link :value="time" @click="choseTime" />
            <Cell title="重点跟进等级" is-link :value="level" @click="choseLevel"/>
            <Cell title="客户反馈" is-link :value="action" @click="choseCustom"/>
            <Cell title="下次跟进时间" is-link :value="nextTime" @click="choseNextTime"/>
        </Cell-group>
        <Cell-group>
            <Field
                v-model="message"
                label="补充说明"
                type="textarea"
                placeholder="请填写补充说明"
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
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </Popup>
        <Popup v-model="nextShow" position="bottom">
            <datetime-picker
                @confirm="handleNextComfirm"
                @cancel="handleNextCancel"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
                v-model="currentDate"
            />
        </Popup>

        <Popup v-model="levelShow" position="bottom">
            <Picker show-toolbar :columns="levelActions" @cancel="handleLevelCancel" @confirm="handleLevelConfirm"/>
        </Popup>
        <Popup v-model="customShow" position="bottom">
            <Picker show-toolbar :columns="customActions" @cancel="handleCustomCancel" @confirm="handleCustomConfirm"/>
        </Popup>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, DatetimePicker, Button, Field, Toast, Picker } from 'vant';
    import { postFollowupAdd } from '@/server';
    import { timetrans } from '@/utils/time';

    // 统计img总数 防止重复
    let imgNumber = 0;
    // 生成唯一的id
    const getUuid = () => {
        return "img-" + new Date().getTime() + "-" + imgNumber++;
    };

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
                maxDate: new Date(),
                currentDate: new Date(),
                show: false,
                nextShow: false, //跟进日期 签约等待
                levelShow: false,
                customShow: false,
                showOrder: false, // 处理成功 -> 签约日期
                message: '',
                levelActions: [
                    'A', 'B', 'C', 'D'
                ],
                customActions: [
                    '',
                    '客户需要商量考虑。', 
                    '已加微信，继续跟进。', 
                    '预留电话，已约定下次联系时间。', 
                    '时间安排不过来，不做了。', 
                    '价格太贵，不做了。'
                ],
                time: '', // 时间
                level: '', // 客户重要程度
                action: '', // 操作
                nextTime: '', //跟进日期 签约等待
                backurl:'',
                active:'',

            };
        },
        mounted () {
            let nowDate = new Date();
            let year = nowDate.getFullYear();
            let min_month = nowDate.getMonth();
            let max_month = nowDate.getMonth() + 3;
            let day = nowDate.getDate();
            this.minDate = new Date(year + ', ' + min_month + ', ' + day); // 向前推迟一周的时间点
            this.maxDate = new Date(year + ', ' + max_month + ', ' + day); // 当前的时间点
        },
        created() {
            this.active = this.$route.params.active || 0;
            this.backurl = this.$route.params.backurl || 0;
        },
        methods: {
            /*
            * 处理提交
            */
            handleSubmit() {
                let iCustomerId = this.$route.params.id || 0;
                let params = {
                    'iCustomerId': iCustomerId,
                    'timeFollow': this.time,
                    'tContent': `${this.action}${this.message}`,
                    'iLevel': this.level,
                    'timeNextFollow':this.nextTime,
                }
     
                postFollowupAdd(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast(res.msg);
                            this.$router.push(
                                {
                                    name: this.backurl,
                                    query: {
                                        active: this.active
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
                let data = timetrans(value);
                this.time = data;
                this.show = false;
            },
            handleCancel(e) {
                this.show = false;
            },
            /*
            * 选择客户等级
            */
            choseLevel() {
                this.levelShow = true;
            },
            handleLevelConfirm(value) {
                this.level = value;
                this.levelShow = false;
            },
            handleLevelCancel() {
                this.levelShow = false;
            },
            /*
            * 选择客户反馈
            */
            choseCustom() {
                this.customShow = true;
            },
            handleCustomConfirm(value) {
                this.action = value;
                this.customShow = false;
            },
            handleCustomCancel() {
                this.customShow = false;
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
                let data = timetrans(value);
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
