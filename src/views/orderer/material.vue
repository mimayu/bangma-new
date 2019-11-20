<template>
    <div class="material_container">
        <Row class="header">
            <Col span="24" class="search_bar">
                <Search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="handleSearch"
                >
                    <div slot="action" @click="handleSearch">搜索</div>
                </Search>
            </Col>
        </Row>
        <div class="content">
            <List
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
                >
                <Cell-group class="group" v-for="item in customerLists" :key="item.iCustomerId">
                    <Cell title="订单号">
                        <template>
                            <div class="custom_wrap">
                                <span class="order_id">{{item.iCustomerId}}</span>
                                <span class="status">{{item.iStatus_name}}</span>
                            </div>
                        </template>
                    </Cell>
                    <Cell title="来源" :value="item.iSource_name" />
                    <Cell title="配合人" :value="item.coordinatorName" v-if="item.coordinatorName!=null&&item.coordinatorName!=''"/>
                    <Cell title="推荐人" :value="item.introducerName"  v-if="item.introducerName!=null&&item.introducerName!=''"/>
                    <Cell title="姓名" :value="item.sUsername" />
                    <Cell title="手机号" :value="item.sMobile" @click="doTel(item.sMobile)"/>
                    <Cell title="地址" :value="item.sAddress" />
                    <Cell title="施工内容" :value="item.sRemarks || '-'" />
                    <Cell title="接单日期" :value="item.tOrderDate || '-'" />
                    <div class="van-cell btn_wrap" v-if="item.actions">
                        <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                    </div>
                </Cell-group>
            </List>
        </div>


        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, Row, Col, Picker, Search, Toast, List } from 'vant';
    import { getMaterial } from '@/server';
    import { postNoNeed } from '@/server';
    import { timetrans } from '@/utils/time';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'material',
        components: {
            Cell,
            CellGroup,
            Popup,
            Row,
            Col,
            Search,
            Toast,
            List,
            footerNav: footerNav
        },
        data() {
            return {
                customerLists: [],
                value: '', // 搜索
                status: '', // 状态
                time: '', // 时间
                page: 1,
                loading: false,
                finished: false,
                actions: [],
                actionids:[],
                currentId: '' // 选择的id 
            };
        },
       created() {
           //console.log(this.$store.state.active)
        },
        methods: {
            doTel(mobile){
                //console.log(mobile);
                window.location.href = "tel:"+mobile;
            },
            /*
            * 初始化数据加载
            */
            getMaterial() {
                let params = {
                    status: 1,
                    page: this.page,
                    keywords: this.value,
                    fromdate: this.time
                }
                getMaterial(params).then(
                    res => {
                        if(res.success == 1) {
                            this.customerLists = res.list;
                            this.page += 1;
                            this.loading = false;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }else {
                            Toast(res.msg);
                        }
                    }
                )
            },
            /*
            * 加载数据
            */
            handleLoad() {
                let params = {
                    status: 1,
                    page: this.page,
                    keywords: this.value,
                }
                getMaterial(params).then(
                    res => {
                        if(res.success == 1) {
                            this.customerLists = this.customerLists.concat(res.list);
                            this.page += 1;
                            this.loading = false;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                    }
                )
            },
            /*
            * 重置
            */
            reset() {
                this.customerLists = [];
                this.loading = true;
                this.finished = false;
                this.page = 1;
            },
            /*
            * 搜索
            */
            handleSearch() {
                this.reset();
                this.getMaterial();
            },
            /*
            * 点击操作
            * 1 -> 材料确认
            * 2 -> 无需主材
            */
            handleClick(type, id) {
                switch(type) {
                    case 1:
                        window.location.href= "http://www.51bangma.com/zhucai/leibie/?iCustomerId="+id+"&backurl=http://m.51bangma.com/material";
                        break;
                    case 2:
                        let params = {
                            'iCustomerId': id
                        }
                        postNoNeed(params).then(
                            res => {
                                if(res.success == 1) {
                                    Toast(res.msg);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000)
                                }
                                Toast(res.msg);
                            }
                        )
                        break;
                    default:
                        break;
                }
            },

        }
    }
</script>

<style lang="scss">
    .material_container {
        background-color: #f6f6f6;
        .header_btn {
            height: 44px;
            line-height: 44px;
            background-color: #f6f6f6;
            padding: 0 10px;
        }
        .header_btn img {
            width: 14px;
            height: 7px;
        }
        .header_btn .search {
            float: right;
        }
        .header_btn .search img {
            width: 15px;
            height: 16px;
        }
        .order {
            background: #fff;
            margin-bottom: 10px;
            padding: 10px;
        }
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
        .btn_wrap {
            justify-content: flex-end;
            button {
                margin: 4px;
            }
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
        .search_bar {
            display: flex;
            align-items: center;
            height: 44px;
            background: #fff;
        }
        .van-search {
            background: #fff !important;
            padding: 0;
        }
        .group {
            margin-bottom: 8px;
        }
    }
</style>
