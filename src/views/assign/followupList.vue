<template>
    <div class="assignList_container">
        <div class="content">
        <List
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="handleLoad"
        >
            <Cell-group class="group" v-for="item in followupLists" :key="item.iCustomerId">
                <Cell title="订单号">
                    <template>
                        <div class="custom_wrap">
                            <span class="order_id">{{item.iCustomerId}}</span>
                        </div>
                    </template>
                </Cell>
                <Cell title="跟踪人员" :value="item.iSalesName" />
                <Cell title="客户等级" :value="item.iLevel" />
                <Cell title="跟踪日期" :value="item.timeFollow" />
                <Cell title="反馈内容" :value="item.tContent" />
                <Cell title="下次跟踪时间" :value="item.timeNextFollow" />
            </Cell-group>
        </List>
        </div>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, Col, Toast, Search, List } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { getFollowupList } from '@/server';

    export default {
        name: 'getFollowupList',
        components: {
            Cell,
            CellGroup,
            Popup,
            Col,
            Toast,
            Search,
            List,
            footerNav
        },
        data() {
            return {
                followupLists: [],
                page: 1,
                value:'',
                loading: false,
                finished: false
            };
        },
        created() {
            this.iCustomerId = this.$route.params.iCustomerId || this.$route.query.iCustomerId || 0;
            this.getFollowupList();
        },
        methods: {
            /*
            * 滑动加载
            */
            handleLoad() {
                this.getFollowupList();
            },
            /*
            * 加载数据
            */
            getFollowupList() {
                let params = {
                    'page': this.page,
                    'iCustomerId':this.iCustomerId,
                }
                getFollowupList(params).then(
                    res => {
                        if(res.success == 1) {
                            this.followupLists = this.followupLists.concat(res.list);
                            this.loading = false;
                            this.page += 1;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                        //console.log('res', res);
                    }
                )
            },

        }
    }
</script>

<style lang="scss">
    .assignList_container {
        background-color: #f6f6f6;
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
        .search_bar {
            display: flex;
            align-items: center;
            height: 44px;
            background: #fff;
        }
        .van-search {
            background: #fff !important;
            padding: 0;
            margin-right: 15px;
            width: 100%;
        }
        .custom_wrap {
            display: flex;
        }
        .order_id {
            flex: 1;
        }
        .status {
            width: 60px;
            text-align: center;
        }
        .group {
            margin-bottom: 8px;
        }
    }
</style>