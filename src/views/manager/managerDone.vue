<template>
    <div class="bossFinish_container">
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
            <div class="van-cell btn_wrap" >
                <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
        </Cell-group>
        </List>
          <Actionsheet
            v-model="modeShow"
            :actions="actions"
            @select="handleSelect"
        />
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { getEstate } from '@/server';
    //import { Cell, CellGroup, Button, Field, Toast, Popup, Picker } from 'vant';
    import { Cell, CellGroup, Popup, Row, Col, Picker, Toast, List, Actionsheet } from 'vant';
    import { getCustomer } from '@/server';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'bossFinish',
        components: {
            Cell,
            CellGroup,
            Popup,
            Picker,
            Row,
            Col,
            Toast,
            List,
            Actionsheet,
            footerNav: footerNav
        },
        data() {
            return {
                page: 1,
                status:8,
                customerLists: [],
                loading: false,
                finished: false,
                modeShow: false, // 选择报价模式
                actions: [
                    {
                    name: '普装'
                    },
                    {
                    name: '精装'
                    },
                    {
                    name: '奢华'
                    }
                ],
                currentId: '' // 选择的id 
            };
        },
        methods: {
            getCustomer() {
                let params = {
                    status: this.status,
                    page: this.page,
                }
                getCustomer(params).then(
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
                    status: this.status,
                    page: this.page,
                }
                getCustomer(params).then(
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
            * 点击操作
            * 1 -> 预约
            * 2 -> 上门
            * 3 -> 报价
            * 5 -> 合同解除
            * 8 -> 完工
            */
            handleClick(type, id) {
                switch(type) {
                    case 0:
                        this.handleGo(id, type);
                        break;
                    case 1:
                        this.handleGo(id, type);
                        break;
                    case 2:
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
                    case 6:
                        this.handleGo(id, type);
                        break;
                    case 7:
                        this.handleGo(id, type);
                        break;
                    case 8:
                        this.handleGo(id, type);
                        break;
                    case 9:
                        this.handleGo(id, type);
                        break;
                    default:
                        break;
                }
            },
            handleGo(id, type) {
                // 8 -> 完工
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
                this.$router.push(
                    {
                        name: name,
                        params: {
                            id: id
                        }
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
            /*
            * 处理报价选择
            */
            handleSelect(value) {
                let mode = this.actions.findIndex(item => {
                    return item.name == value.name;
                })
                this.modeShow = false;
                this.$router.push(
                    {
                        name: 'quotation',
                        params: {
                            id: this.currentId,
                            mode: +mode + 1
                        }
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
        .empty {
            font-size: 14px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3D(-50%, -50%, 0);
        }
    }
</style>