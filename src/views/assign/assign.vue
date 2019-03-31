<template>
    <div class="assign_container">
        <Radio-group v-model="iSalesId" @change="handleChange">
            <Cell-group>
                <Cell value="查看" is-link v-for="(item, index) in lists" :key="item.iId">
                    <template slot="title">
                        <span class="custom-text">{{item.sName}}</span>
                        <Radio class="custom-radio" :name="item.iId"></Radio>
                    </template>
                </Cell>
            </Cell-group>
        </Radio-group>
        <Button size="large" type="primary" @click="handleSubmit">保存</Button>
    </div>
</template>

<script>
    import { postAssign } from '@/server';
    import { CellGroup, Cell, RadioGroup, Radio, Button, Toast } from 'vant';

    export default {
        name: 'postAssign',
        components: {
            CellGroup,
            Cell,
            RadioGroup,
            Radio,
            Button,
            Toast
        },
        created() {
            this.getAssign()
        },
        data() {
            return {
               lists: [],
               iSalesId: 0
            };
        },
        methods: {
            getAssign() {
                let { id } = this.$route.params || 1;
                let params = {
                    'iCustomerId': id,
                    'doAction': ''
                }
                postAssign(params).then(
                    res => {
                        if(res.success == 1) {
                            this.lists = res.accountlist;
                        }
                    }
                )
            },
            handleChange(res) {
                this.iSalesId = res;
            },
            handleSubmit() {
                let { id } = this.$route.params || 0;
                let params = {
                    'iCustomerId': id,
                    'iSalesId': this.iSalesId,
                    'doAction': 'assign'
                }
                postAssign(params).then(
                    res => {
                        //console.log('res', res);
                        if(res.success == 1) {
                            Toast(res.msg);
                            window.location.href = 'http://www.51bangma.com/api/sendMessage/?iCustomerId='+id+'&iSalesId='+this.iSalesId;
                            // this.$router.push({
                            //     //name: 'assignList'
                            //     name: 'api/sendMessage',
                            //     params: {
                            //         'iCustomerId': id,
                            //         'iSalesId': this.iSalesId
                            //     }
                            // })
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    .assign_container {
        .custom-radio {
            display: inline;
            margin-left: 10px;
        }
        .custom-text {
            display: inline-block;
            width: 80px;
        }
        .van-cell__title{
            text-align: left;
        }
    }
</style>
