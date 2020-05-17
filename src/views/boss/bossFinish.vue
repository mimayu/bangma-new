<template>
    <div class="bossFinish_container">
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
            <Tabs v-model="active">
                <Tab title="完工验收">
                <List
                v-model="loading_yanshou"
                :finished="finished_yanshou"
                finished-text="没有更多了"
                @load="handleYanshouLoad"
                >
                    <Cell-group class="group" v-for="item in data_yanshou" :key="item.iCustomerId">
                        <Cell title="订单号">
                            <template>
                                <div class="custom_wrap">
                                    <span class="order_id">{{item.iCustomerId}}</span>
                                    <span class="status">完工</span>
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
                        <div class="van-cell btn_wrap" v-if="item.actions">
                            <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                        </div>
                    </Cell-group>
                </List>
                </tab>
            <Tab title="完工付款">
                <List
                v-model="loading_fukuan"
                :finished="finished_fukuan"
                finished-text="没有更多了"
                @load="handleFukuanLoad"
                >
                <Cell-group class="group" v-for="item in data_fukuan" :key="item.iCustomerId">
                    <Cell title="订单号">
                        <template>
                            <div class="custom_wrap">
                                <span class="order_id">{{item.iCustomerId}}</span>
                                <span class="status">完工付款</span>
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
            </Tab>
                </Tabs>
        </div>
        <Actionsheet
            v-model="modeShow"
            :actions="actions"
            @select="handleSelect"
        />
        <footerNav></footerNav>
    </div>
</template>

<script>
    import { Tab, Tabs, Cell, CellGroup, Toast, Row, Col, Search, List, Actionsheet } from 'vant';
    import footerNav from "@/components/footerNav"; // 引入页脚    
    import { getCustomer } from '@/server';
    import { getBaojiaMode } from '@/server';

    export default {
        name: 'bossFinish',
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
        created() {
            this.active = this.$route.query.active || 0;
        },
        data() {
            return {
               active: 0,
                data_yanshou: [],
                data_fukuan: [],

                loading_yanshou: false, // 完工验收
                finished_yanshou: false, // 完工验收
                page_yanshou: 1, // 完工验收
                loading_fukuan: false, // 完工付款 
                finished_fukuan: false, // 完工付款 
                page_fukuan: 1, // 完工付款 


                modeShow: false, // 报价显示
                currentId: '', // 选择id
                value: '', // 搜索
                actions: [],
                actionids:[],
            };
        },
        created() {
            this.getBaojiaMode();
        },
        methods: {
            /*
            * 点击按钮
            * 3 -> 报价处理
            * 9 -> 完工
            */
            handleClick(type, id) {
                switch(type) {
                    case 0:
                        this.handleGo(id, type);
                        break;
                    case 3:
                        this.handleQuote(id);
                        break;
                    case 4:
                        this.handleGo(id, type);
                        break;
                    case 9:
                        this.handleGo(id, type);
                        break;
                    case 10:
                        window.location.href = 'http://www.51bangma.com/client/edit/?iCustomerId='+id+'&backurl=http://m.51bangma.com/bossFinish/';
                        break;  
                    case 16:
                        this.handleGo(id, type);
                        break; 
                    default:
                        break;
                }
            },
            /*
            * 创建报价基础
            */
            getBaojiaMode() {
                getBaojiaMode().then(
                    res => {
                        let actions = [];
                        let actionids = [];
                        var array = Object.keys(res.actions).map(function(el){
                            actions.push({'name': res.actions[el]});
                            actionids.push(el);
                        });

                        this.actions = actions;
                        this.actionids = actionids;
                    }
                )
            },
            /*
            * 处理报价
            */
            handleQuote(id) {
                this.modeShow = true;
                this.currentId = id;
            },
            handleSelect(value) {
                let index = this.actions.findIndex(item => {
                    return item.name == value.name;
                })
                let mode = this.actionids[index];
                this.modeShow = false;
                this.$router.push(
                    {
                        name: 'quotation',
                        params: {
                            id: this.currentId,
                            mode:mode
                        }
                    }
                )
            },
            /*
            * 取消报价/完工
            */
            handleGo(id, type) {
                let name = '';
               if(type == 0) {
                    name = 'previewCustom' 
                }
                if(type == 4) {
                    name = 'quotationList' 
                }
                if(type == 5) {
                    name = 'quotationCancel'; 
                }
                if(type == 9) {
                    name = 'bossFukuanAdd' 
                }
                if(type == 16) {
                    name = 'jiesuan' 
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
            * 加载完工验收数据
            */
            handleYanshouLoad() {
                let params = {
                status: 8,
                keywords: this.value,
                page: this.page_yanshou,
                }
                this.getInfo(params, 'yanshou');
            },
            /*
            * 加载完工数据
            */
            handleFukuanLoad() {
                let params = {
                status: 9,
                keywords: this.value,
                page: this.page_fukuan
                }
                this.getInfo(params, 'fukuan');
            },

            /*
            * 重置
            */
            reset(type) {
                let dataType = `data_${type}`;
                let finishedType = `finished_${type}`;
                let loadingType = `loading_${type}`;
                let pageType = `page_${type}`;

                this[dataType] = [];
                this[loadingType] = true;
                this[finishedType] = false;
                this[pageType] = 1;
            },
            /*
            * 处理搜索
            */
            handleSearch() {
                let active = this.active;
                let type = 'yanshou';
                switch(active) {
                    case 0:
                        status =  8;
                        type = 'yanshou';
                        break;
                    case 1:
                        status =  9;
                        type = 'fukuan';
                        break;     
                }

                this.reset(type);
                let pageType = `page_${type}`;
                let params = {
                    page: this[pageType],
                    keywords: this.value,
                    status: status,
                }

                this.getInfo(params, type);
            },

            /*
            * 获取数据
            */
            getInfo(params, type) {
                let dataType = `data_${type}`;
                let finishedType = `finished_${type}`;
                let loadingType = `loading_${type}`;
                let pageType = `page_${type}`;

                getCustomer(params).then(
                res => {
                    if(res.success == 1) {
                    this[dataType] = this[dataType].concat(res.list);
                    this[loadingType] = false;
                    if(res.list.length == 0) {
                        this[finishedType] = true;
                    }
                    this[pageType] += 1;
                    }else {
                    Toast(res.msg);
                    }
                    //console.log('this[pageType]', this[pageType]);
                }
                )
            }
        }
    }
</script>

<style lang="scss">
    .bossFinish_container {
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
