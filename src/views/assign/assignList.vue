<template>
    <div class="assignList_container">
        <Cell-group class="group" v-for="item in assignLists" :key="item.iCustomerId">
            <Cell title="订单号" :value="item.iCustomerId" is-link />
            <Cell title="姓名" :value="item.sUsername" />
            <Cell title="手机号" :value="item.sMobile" />
            <Cell title="地址" :value="item.sAddress" />
            <Cell title="施工内容" :value="item.sRemarks" />
            <Cell title="业务员" value="-" />
            <div class="van-cell btn_wrap">
                <button plain type="primary" class="assign_btn" v-if="assign == 1" @click="goAssign(item.iCustomerId)">手动分配</button>
            </div>
        </Cell-group>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { getAssignList } from '@/server';
    import { Cell, CellGroup, Toast } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'allStaff',
        components: {
            Cell,
            CellGroup,
            Toast,
            footerNav: footerNav
        },
        data() {
            return {
                assignLists: [],
                assign: 0, // 0 无权限
            };
        },
        created() {
            this.getAssignList()
        },
        methods: {
            getAssignList() {
                let params = {
                    'page': 1
                }
                getAssignList(params).then(
                    res => {
                        if(res.success == 1) {
                            this.assignLists = res.list;
                            this.assign = 1;
                        }
                    }
                )
            },
            goAssign(id) {
                this.$router.push({ name:'assign',params: { id }});
            }
        }
    }
</script>

<style lang="scss">
    .assignList_container {
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
        .btn_wrap {
            justify-content: flex-end;
        }
        .assign_btn {
            border: none;
            padding: 8px;
            outline: none;
            margin: 0;
            background: red;
            border-radius: 5px;
        }
    }
</style>
