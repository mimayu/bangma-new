<template>
    <div class="saleWorking_container">
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
            <Tab title="派工完成">
                <List
                v-model="loading_paigong"
                :finished="finished_paigong"
                finished-text="没有更多了"
                @load="handlePaigongLoad"
                >
                    <Cell-group class="group" v-for="item in data_paigong" :key="item.iCustomerId">
                        <Cell title="订单号">
                            <template>
                                <div class="custom_wrap">
                                    <span class="order_id">{{item.iCustomerId}}</span>
                                    <span class="status">派工完成</span>
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
                        <Cell title="预计开工日期" :value="item.dateYujiKaigong || '-'" />
                        <div class="van-cell btn_wrap" v-if="item.actions">
                            <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                        </div>
                    </Cell-group>
                </List>
            </tab>
            <Tab title="开工实施">
                <List
                v-model="loading_kaigong"
                :finished="finished_kaigong"
                finished-text="没有更多了"
                @load="handleKaigongLoad"
                >
                <Cell-group class="group" v-for="item in data_kaigong" :key="item.iCustomerId">
                    <Cell title="订单号">
                        <template>
                            <div class="custom_wrap">
                                <span class="order_id">{{item.iCustomerId}}</span>
                                <span class="status">开工实施</span>
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
                    <Cell title="预计完工日期" :value="item.dateYujiWangong || '-'" />
                    <div class="van-cell btn_wrap" v-if="item.actions">
                    <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                    </div>
                </Cell-group>
                </List>
            </Tab>

            <Tab title="施工暂停">
                <List
                v-model="loading_tinggong"
                :finished="finished_tinggong"
                finished-text="没有更多了"
                @load="handleTinggongLoad"
                >
                <Cell-group class="group" v-for="item in data_tinggong" :key="item.iCustomerId">
                    <Cell title="订单号">
                        <template>
                            <div class="custom_wrap">
                                <span class="order_id">{{item.iCustomerId}}</span>
                                <span class="status">施工暂停</span>
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
                    <Cell title="停工日期" :value="item.tinggongDate || '-'" />
                    <Cell title="停工原因" :value="item.tTinggongContent || '-'" />
                    <Cell title="预计再次开工日期" :value="item.yujizaiciKaigongDate || '-'" />
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
    import { getCustomer } from '@/server';
    import { getBaojiaMode } from '@/server';
    import footerNav from "../../components/footerNav"; // 引入页脚
    export default {
        name: 'saleWorking',
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
                data_paigong: [],
                data_kaigong: [],
                data_tinggong: [],

                loading_paigong: false, // 派工完成
                finished_paigong: false, // 派工完成
                page_paigong: 1, // 派工完成
                
                loading_kaigong: false, // 开工实施 
                finished_kaigong: false, // 开工实施 
                page_kaigong: 1, // 开工实施 

                loading_tinggong: false, // 开工实施 
                finished_tinggong: false, // 开工实施 
                page_tinggong: 1, // 开工实施 


                modeShow: false, // 报价显示
                currentId: '', // 选择id
                value: '', // 搜索
                actions: [],
                actionids:[],
            };
        },
        created() {
            this.active = this.$route.query.active || 0;
            this.getBaojiaMode();
        },
        methods: {
            /*
            * 点击按钮
            * 3 -> 报价处理
            * 5 -> 合同解除
            * 8 -> 完工
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
                    case 5:
                        this.handleGo(id, type);
                        break;
                   case 7:
                        this.handleGo(id, type);
                        break;
                    case 8:
                        this.handleGo(id, type);
                        break;
                    case 10:
                        window.location.href = 'http://www.51bangma.com/client/edit/?iCustomerId='+id+'&backurl=http://m.51bangma.com/bossWorking/';
                        break;  
                    case 12:
                        this.handleGo(id, type);
                        break;    
                    case 13:
                        this.handleGo(id, type);
                        break; 
                    default:
                        break;
                }
            },
            /*
            * 处理报价
            */
            handleQuote(id) {
                this.modeShow = true;
                this.currentId = id;
            },
            /*
            * 处理报价选择
            */
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
            * 取消报价/完工
            */
            handleGo(id, type) {
                let name = '';
               if(type == 0) {
                    name = 'previewCustom' 
                }
                if(type == 1) {
                    name = 'order' 
                }
                if(type == 2) {
                    name = 'visit' 
                }
                if(type == 4) {
                    name = 'quotationList' 
                }
                if(type == 5) {
                    name = 'quotationCancel'; 
                }
                if(type == 6) {
                    name = 'managerPaigong' 
                }
                if(type == 7) {
                    name = 'bossWorkingAdd' 
                }
                if(type == 8) {
                    name = 'bossFinishAdd' 
                }
                if(type == 9) {
                    name = 'bossFukuanAdd' 
                }
                if(type == 12) {
                    name = 'tinggong';
                }
                if(type == 13) {
                    name = 'bossFugongAdd';
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
            * 加载派工数据
            */
            handlePaigongLoad() {
                let params = {
                status: 6,
                keywords: this.value,
                page: this.page_paigong,
                }
                this.getInfo(params, 'paigong');
            },
            /*
            * 加载完工数据
            */
            handleKaigongLoad() {
                let params = {
                status: 7,
                keywords: this.value,
                page: this.page_kaigong
                }
                this.getInfo(params, 'kaigong');
            },
            /*
            * 加载完工数据
            */
            handleTinggongLoad() {
                let params = {
                status: 104,
                keywords: this.value,
                page: this.page_tinggong
                }
                this.getInfo(params, 'tinggong');
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
                let type = 'paigong';
                switch(active) {
                    case 0:
                        status =  6;
                        type = 'paigong';
                        break;
                    case 1:
                        status =  7;
                        type = 'kaigong';
                        break;    
                    case 2:
                        status =  104;
                        type = 'tinggong';
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
    .saleWorking_container {
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
        .empty {
            font-size: 14px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3D(-50%, -50%, 0);
        }
    }
</style>
