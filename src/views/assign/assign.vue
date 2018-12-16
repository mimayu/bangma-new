<template>
    <div class="assign_container">
        <Radio-group v-model="radio" @change="handleChange">
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
    import { CellGroup, Cell, RadioGroup, Radio, Button } from 'vant';

    export default {
        name: 'postAssign',
        components: {
            CellGroup,
            Cell,
            RadioGroup,
            Radio,
            Button
        },
        created() {
            this.getAssign()
        },
        data() {
            return {
               lists: [],
               radio: 0,
               iSalesId: 0
            };
        },
        methods: {
            getAssign() {
                let { id } = this.$route.params;
                let params = {
                    'iCustomerId': id || 1,
                    'doAction': ''
                }
                postAssign(params).then(
                    res => {
                        if(res.success == 1) {
                            this.lists = res.accountlist
                        }
                    }
                )
            },
            handleChange(res) {
                this.iSalesId = res;
            },
            handleSubmit() {
                let { id } = this.$route.params;
                let params = {
                    'iCustomerId': id,
                    'iSalesId': this.iSalesId,
                    'doAction': 1
                }
                postAssign(params).then(
                    res => {
                        console.log('res', res);
                        if(res.success == 1) {
                            
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
