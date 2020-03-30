<template>
    <div class="visit_container">
        <div style="text-align:left;font-size: 20px;padding: 18px 10px 0px 10px;color:#ccc">
            <span>
                问题：{{questioninfo.content}}
            </span>
        </div>
        <Cell>
            <Field
                v-model="message"
                label="建议回答："
                type="textarea"
                placeholder="请输入建议需要回答的内容"
                rows="10"
                autosize
            />
        </Cell>

        

        <Button type="primary" size="large" @click="handleSubmit">提交</Button>


    </div>
</template>

<script>
    import { Cell, Popup, Button, Field, Toast } from 'vant';
    import { postAnswerAdd } from '@/server';
    import { getQuestionInfo } from '@/server';

    export default {
        name: 'visit',
        components: {
            Cell,
            Popup,
            Button,
            Field,
            Toast
        },
        data() {
            return {
                message: '',
                questioninfo:''
            }
        },
        created() {
            this.getQuestionInfo();
        },
        methods: {

            getQuestionInfo() {
                let iQuestionId = this.$route.query.iQuestionId || 0;
                let params = {
                    'iQuestionId': iQuestionId
                }
                getQuestionInfo(params).then(
                    res => {
                        if(res.success == 1) {
                            this.questioninfo = res.questioninfo;
                            //console.log(this.questioninfo.content);
                        }
                    }
                )
            }, 

            /*
            * 处理提交
            */
            handleSubmit() {
                let iQuestionId = this.$route.query.iQuestionId || 0;
                let params = {
                    'content': `${this.message}`,
                    'iQuestionId':iQuestionId
                }
                postAnswerAdd(params).then(
                    res => {
                        if(res.success == 1) {
                            Toast(res.msg);
                            this.$router.push(
                                {
                                    name: 'faq'
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