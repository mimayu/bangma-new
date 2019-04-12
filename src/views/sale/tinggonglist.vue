<template>
  <div class="tinggong_list_cintainer">
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
                    <Cell title="姓名" :value="item.sUsername" />
                    <Cell title="手机号" :value="item.sMobile" @click="doTel(item.sMobile)"/>
                    <Cell title="地址" :value="item.sAddress" />
                    <Cell title="施工内容" :value="item.sRemarks || '-'" />
                    <Cell title="开工日期" :value="item.dateKaigong || '-'" />
                    <Cell title="施工工长" :value="item.iForeman_name || '-'" />
                    <Cell title="停工日期" :value="item.tinggongDate || '-'" />
                    <Cell title="停工原因" :value="item.tTinggongContent || '-'" />
                    <Cell title="预计再次开工日期" :value="item.yujizaiciKaigongDate || '-'" />
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
  import { Cell, CellGroup, Popup, DatetimePicker, Row, Col, Picker, Search, Toast, List, Actionsheet } from 'vant';
  import { getCustomer } from '@/server';
  import { getBaojiaMode } from '@/server';
  import footerNav from '../../components/footerNav' // 引入login.vue组件

  export default {
    name: 'signStatus',
    data () {
      return {
        active: 0,
        data_under: [],
        data_success: [],
        data_cancel: [],
        data_quxiao: [],
        modeShow: false, // 选择模式
        actions: [],
        actionids:[],
        currentId: '', // 选择的id
        loading: false, // 签约等待
        finished: false, // 签约等待
        finished_text: '没有更多了',
        page: 1, // 签约等待
        customerLists: [],
      }
    },
    components: {
        Cell,
        CellGroup,
        Popup,
        Picker,
        DatetimePicker,
        Row,
        Col,
        Search,
        Toast,
        List,
        Actionsheet,
        footerNav: footerNav
    },
    created() {
      this.getBaojiaMode();
    },
    methods: {
      doTel(mobile){
          //console.log(mobile);
          window.location.href = "tel:"+mobile;
      },   
      /*
      * 点击按钮
      * 2 -> 上门
      * 3 -> 报价处理
      * 4 -> 报价调整
      * 5 -> 合同解除
      * 6 -> 派工
      */
      handleClick(type, id) {
        switch(type) {
         case 0:
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
          case 11:
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
      * 处理上门/调整报价/取消报价/派工
      */
      handleGo(id, type) {
        let name = '';
        if(type == 0) {
          name = 'previewCustom' 
        }
        if(type == 2) {
          name = 'visit' 
        }
        if(type == 4) {
          name = 'quotationList' 
        }
        if(type == 5) {
          name = 'quotationCancel' 
        }
        if(type == 6) {
          name = 'managerPaigong' 
        }
        if(type == 11) {
          name = 'followup' 
        }
        if(type == 13) {
          name = 'bossFugongAdd' 
        }
        this.$router.push(
          {
              name: name,
              params: {
                  id: id,
                  backurl:'signStatus',
                  active:this.active
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
      * 加载数据
      */
      handleLoad() {
          let params = {
              status: 104,
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

    }
  }
</script>

<style lang="scss">
  .tinggong_list_cintainer {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 53px;
    right: 0;
    // 重新tabs
    .van-tabs {
      height: 100%;
      overflow: hidden;
    }
    .van-tabs--line {
      padding-top: 0;
      display: flex;
      flex-direction: column;
      background-color: #f6f6f6;
    }
    .van-tabs__wrap {
      position: static;
    }
    .van-tabs__content {
      flex: 1;
      overflow: auto;
    }
    
    .van-cell__title, .van-field .van-cell__title {
        max-width: 100px;
    }
    .van-cell__title, .van-cell__value{
        text-align: left;
    }
    .group {
      margin-bottom: 8px;
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
  }
</style>
