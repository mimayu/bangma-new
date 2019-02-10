<template>
    <div class="saleWorking_container">
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
            <Cell title="开工日期" :value="item.dateKaigong || '-'" />
            <Cell title="预计完工日期" :value="item.dateYujiWangong || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>
        </Tabs>

        <Actionsheet
            v-model="modeShow"
            :actions="actions"
            @select="handleSelect"
        />
        <footerNav></footerNav>
    </div>
</template>

<script>
    import { Tab, Tabs, Cell, CellGroup, Button, Field, Toast, Popup, Picker, List, Actionsheet } from 'vant';
    import { getCustomer } from '@/server';
    import footerNav from "../../components/footerNav"; // 引入页脚
    export default {
        name: 'saleWorking',
        components: {
            Tab,
            Tabs,
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Popup, 
            Picker,
            List,
            Actionsheet,
            footerNav: footerNav
        },
        data() {
            return {

                active: 0,
                data_paigong: [],
                data_kaigong: [],

                loading_paigong: false, // 派工完成
                finished_paigong: false, // 派工完成
                page_paigong: 1, // 派工完成
                loading_kaigong: false, // 开工实施 
                finished_kaigong: false, // 开工实施 
                page_kaigong: 1, // 开工实施 


                modeShow: false, // 报价显示
                currentId: '', // 选择id
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
                ]
            };
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
                let mode = this.actions.findIndex(item => {
                    return item.name == value.name
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
            },
            /*
            * 取消报价/完工
            */
            handleGo(id, type) {
                let name = '';
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
            * 加载派工数据
            */
            handlePaigongLoad() {
                let params = {
                status: 6,
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
                page: this.page_kaigong
                }
                this.getInfo(params, 'kaigong');
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
                    console.log('this[pageType]', this[pageType]);
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
