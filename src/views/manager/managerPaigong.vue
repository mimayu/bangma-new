<template>
    <div class="assign_container">
        <Radio-group v-model="iForeman" @change="handleChange">
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
    import { postPaigong } from '@/server';
    import { CellGroup, Cell, RadioGroup, Radio, Button, Toast } from 'vant';
    import { getPaigong } from '@/server';

    export default {
        name: 'managerPaigong',
        components: {
            CellGroup,
            Cell,
            RadioGroup,
            Radio,
            Button,
            Toast
        },
        created() {
            this.getPaigong()
        },
        data() {
            return {
               lists: [],
               iForeman: 0
            };
        },
        methods: {
            getPaigong() {
                let { id } = this.$route.params || 1;
                let params = {
                    'iCustomerId': id
                }
                getPaigong(params).then(
                    res => {
                        if(res.success == 1) {
                            this.lists = res.foremanlist;
                        }
                    }
                )
            },
            handleChange(res) {
                this.iForeman = res;
            },
            handleSubmit() {
                let { id } = this.$route.params || 1;
                let params = {
                    'iCustomerId': id,
                    'iForeman': this.iForeman
                }
                postPaigong(params).then(
                    res => {
                        console.log('res', res);
                        if(res.success == 1) {
                            Toast(res.msg);
                            this.$router.push(
                                {
                                    name: 'signStatus',
                                    query: {
                                        active: 1
                                    }
                                }
                            )
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