<template>
    <div class="assign_container">
        <Radio-group v-model="radio">
            <Cell-group>
                <Cell value="查看" is-link>
                    <template slot="title">
                        <span class="custom-text">黄晓明</span>
                        <Radio class="custom-radio" name="1"></Radio>
                    </template>
                </Cell>
                <Cell value="查看" is-link>
                    <template slot="title">
                        <span class="custom-text">黄晓明</span>
                        <Radio class="custom-radio" name="2"></Radio>
                    </template>
                </Cell>
                <Cell value="查看" is-link>
                    <template slot="title">
                        <span class="custom-text">黄晓明</span>
                        <Radio class="custom-radio" name="3"></Radio>
                    </template>
                </Cell>
                <Cell value="查看" is-link>
                    <template slot="title">
                        <span class="custom-text">黄晓明</span>
                        <Radio class="custom-radio" name="4"></Radio>
                    </template>
                </Cell>
                <Cell value="查看" is-link>
                    <template slot="title">
                        <span class="custom-text">黄晓明</span>
                        <Radio class="custom-radio" name="5"></Radio>
                    </template>
                </Cell>
                <Cell value="查看" is-link>
                    <template slot="title">
                        <span class="custom-text">黄晓明</span>
                        <Radio class="custom-radio" name="6"></Radio>
                    </template>
                </Cell>
            </Cell-group>
        </Radio-group>
    </div>
</template>

<script>
    import { postAssign } from '@/server';
    import { CellGroup, Cell, RadioGroup, Radio } from 'vant';

    export default {
        name: 'postAssign',
        components: {
            CellGroup,
            Cell,
            RadioGroup,
            Radio
        },
        created() {
            this.getAssign()
        },
        data() {
            return {
               radio: '1'
            };
        },
        methods: {
            getAssign() {
                let params = {
                    'iCustomerId': 1,
                    'iSalesId': 1,
                    'doAction': ''
                }
                postAssign(params).then(
                    res => {
                        console.log('res', res);
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
