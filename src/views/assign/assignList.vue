<template>
    <div class="assignList_container">
        <List
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="handleLoad"
        >
            <Cell-group class="group" v-for="item in assignLists" :key="item.iCustomerId">
                <Cell title="订单号" :value="item.iCustomerId" is-link />
                <Cell title="姓名" :value="item.sUsername" />
                <Cell title="手机号" :value="item.sMobile" />
                <Cell title="地址" :value="item.sAddress" />
                <Cell title="施工内容" :value="item.sRemarks" />
                <Cell title="业务员" value="-" />
                <div class="van-cell btn_wrap" v-if="item.actions">
                    <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                </div>
            </Cell-group>
        </List>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Toast, List } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { getAssignList } from '@/server';

    export default {
        name: 'assignList',
        components: {
            Cell,
            CellGroup,
            Toast,
            List,
            footerNav
        },
        data() {
            return {
                assignLists: [],
                page: 1,
                loading: false,
                finished: false
            };
        },
        methods: {
            /*
            * 滑动加载
            */
            handleLoad() {
                this.getAssignList();
            },
            /*
            * 加载数据
            */
            getAssignList() {
                let params = {
                    'page': this.page
                }
                getAssignList(params).then(
                    res => {
                        if(res.success == 1) {
                            this.assignLists = this.assignLists.concat(res.list);
                            this.loading = false;
                            this.page += 1;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                        console.log('res', res);
                    }
                )
            },
            /*
            * 点击操作
            * 1 -> 分配
            */
            handleClick(type, id) {
                switch(type) {
                    case 1:
                        this.handleGo(id, type);
                        break;
                    default:
                        break;
                }
            },
            /*
            * 跳转分配页面
            */
            handleGo(id, type) {
                this.$router.push(
                    {
                        name: 'assign',
                        params: {
                            id: id
                        }
                    }
                )
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
            padding: 6px 8px;
            margin-left: 9px;
            border: 1px solid #ebedf0;
            border-radius: 10px;
            outline: none;
            color: #333;
            background: #fff;
        }
    }
</style>
