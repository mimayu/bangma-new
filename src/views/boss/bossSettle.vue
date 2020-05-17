<template>
    <div class="bossSettle_container">
        <Row class="header">
            <Col span="24" class="search_bar">
                <Search
                    v-model="value"
                    placeholder="请输入关键词"
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
            <Cell-group class="group" v-for="item in settleLists" :key="item.iCustomerId">
                <Cell title="订单号">
                    <template>
                        <div class="custom_wrap">
                            <span class="order_id">{{item.iCustomerId}}</span>
                            <span class="status">结算完成</span>
                        </div>
                    </template>
                </Cell>
                <Cell title="姓名" :value="item.sUsername" />
                <Cell title="手机号" :value="item.sMobile" />
                <Cell title="地址" :value="item.sAddress" />
                <Cell title="施工内容" :value="item.sRemarks || '-'" />
                <Cell title="签约金额" :value="item.orderFee || '-'" />
                <Cell title="签约定金" :value="item.orderDingjin || '-'" />
                <Cell title="合同首付款" :value="item.orderSoufu || '-'" />
                <Cell title="派工工长" :value="item.iForeman_name || '-'" />
                <Cell title="签约日期" :value="item.dateOrder || '-'" />
                <Cell title="开工日期" :value="item.dateKaigong || '-'" />
                <Cell title="完工日期" :value="item.dateWangong || '-'" />
                <Cell title="尾款金额" :value="item.orderWeikuan || '-'" />
                <Cell title="尾款日期" :value="item.dateWeikuan || '-'" />
                <div class="van-cell btn_wrap" v-if="item.actions">
                    <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                </div>
            </Cell-group>
        </List>
        </div>
        <footerNav></footerNav>
    </div>
</template>

<script>
    import { Tab, Tabs, Cell, CellGroup, Toast, Row, Col, Search, List, Actionsheet } from 'vant';
    import footerNav from "@/components/footerNav"; // 引入页脚    
    import { getCustomer } from '@/server';

    export default {
        name: 'bossSettle',
        components: {
            Tab,
            Tabs,
            Cell,
            CellGroup,
            Toast,
            Row,
            Col,
            Search,
            List,
            Actionsheet,
            footerNav
        },
        data() {
            return {
                page: 1,
                settleLists: [],
                value: '', // 搜索
                loading: false, // 是否加载
                finished: false, // 是否结束
            };
        },
        methods: {
            /*
            * 点击按钮
            * 0 -> 查看
            * 10 -> 编辑
            */
            handleClick(type, id) {
                switch(type) {
                    case 0:
                        this.handleGo(id, type);
                        break;
                    case 10:
                        window.location.href = 'http://www.51bangma.com/client/edit/?iCustomerId='+id+'&backurl=http://m.51bangma.com/bossSettle/';
                        break;  
                    default:
                        break;
                }
            },
            /*
            * 取消报价/完工
            */
            handleGo(id, type) {
                let name = '';
               if(type == 0) {
                    name = 'previewCustom' 
                }
                this.$router.push(
                    {
                        name: name,
                        params: {
                            id: id,
                            from: 'boss'
                        }
                    }
                )
            },
            /*
            * 处理加载
            */
            handleLoad() {
                this.getCustomer();
            },


            /*
            * 重置
            */
            reset() {
                this.settleLists = [];
                this.loading = true;
                this.finished = false;
                this.page = 1;
            },
            /*
            * 搜索
            */
            handleSearch() {
                this.reset();
                this.getCustomer();
            },


            /*
            * 请求数据
            */
            getCustomer() {
                let params = {
                    status: 11,
                    keywords: this.value,
                    page: this.page
                }
                getCustomer(params).then(
                    res => {
                        if(res.success == 1) {
                            this.settleLists = this.settleLists.concat(res.list);
                            this.page += 1;
                            this.loading = false;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                    }
                )
            },
        }
    }
</script>

<style lang="scss">
    .bossSettle_container {
        background-color: #f6f6f6;
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
        .group {
            margin-bottom: 8px;
        }
    }
</style>
