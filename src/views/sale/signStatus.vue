<template>
  <div class="sign_status_cintainer">
    <Tabs v-model="active">
      <Tab title="签约等待">
        <List
          v-model="loading_under"
          :finished="finished_under"
          :finished-text="finished_under_text"
          @load="handleUnderLoad"
        >
          <Cell-group class="group" v-for="item in data_under" :key="item.iCustomerId">
            <Cell title="订单号">
                <template>
                    <div class="custom_wrap">
                        <span class="order_id">{{item.iCustomerId}}</span>
                        <span class="status">签约等待</span>
                    </div>
                </template>
            </Cell>
            <Cell title="姓名" :value="item.sUsername" />
            <Cell title="手机号" :value="item.sMobile" @click="doTel(item.sMobile)"/>
            <Cell title="地址" :value="item.sAddress" />
            <Cell title="施工内容" :value="item.sRemarks || '-'" />
            <Cell title="上门日期" :value="item.dateShangmen || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>
      <Tab title="签约成功">
        <List
          v-model="loading_success"
          :finished="finished_success"
          :finished-text="finished_success_text"
          @load="handleSuccessLoad"
        >
          <Cell-group class="group" v-for="item in data_success" :key="item.iCustomerId">
            <Cell title="订单号">
                <template>
                    <div class="custom_wrap">
                        <span class="order_id">{{item.iCustomerId}}</span>
                        <span class="status">签约成功</span>
                    </div>
                </template>
            </Cell>
            <Cell title="姓名" :value="item.sUsername" />
            <Cell title="手机号" :value="item.sMobile" @click="doTel(item.sMobile)"/>
            <Cell title="地址" :value="item.sAddress" />
            <Cell title="施工内容" :value="item.sRemarks || '-'" />
            <Cell title="签约日期" :value="item.dateOrder || '-'" />
            <Cell title="签约金额" :value="item.orderFee || '-'" />
            <Cell title="合同定金" :value="item.orderDingjin || '-'" />
            <Cell title="留言" :value="item.shangmenContent || '-'" />
            <Cell title="预计开工日期" :value="item.dateYujiKaigong || '-'" />
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
  import { Tab, Tabs, Cell, CellGroup, Toast, List, Actionsheet } from 'vant';
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

        modeShow: false, // 选择模式
        actions: [],
        actionids:[],
        currentId: '', // 选择的id
        loading_under: false, // 签约等待
        finished_under: false, // 签约等待
        finished_under_text: '没有更多了',
        page_under: 1, // 签约等待
        loading_success: false, // 签约成功 
        finished_success: false, // 签约成功 
        finished_success_text: '没有更多了', // 签约成功 
        page_success: 1, // 签约成功 

      }
    },
    components: {
      Tab,
      Tabs,
      Cell, 
      CellGroup,
      Toast,
      List,
      Actionsheet,
      'footerNav': footerNav,
    },
    created() {
      this.active = this.$route.query.active || 0;
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
      * 加载等待数据
      */
      handleUnderLoad() {
        let params = {
          status: 4,
          page: this.page_under,
        }
        this.getInfo(params, 'under');
      },
      /*
      * 加载成功数据
      */
      handleSuccessLoad() {
        let params = {
          status: 5,
          page: this.page_success
        }
        this.getInfo(params, 'success');
      },
      /*
      * 获取数据
      */
      getInfo(params, type) {
        let dataType = `data_${type}`;
        let finishedType = `finished_${type}`;
        let loadingType = `loading_${type}`;
        let pageType = `page_${type}`;
        let finishedTetx = `finished_${type}_text`;

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
              this[finishedTetx] = res.msg;
              this[loadingType] = false;
              this[finishedType] = true;
              Toast(res.msg);
            }
          }
        )
      }
    }
  }
</script>

<style lang="scss">
  .sign_status_cintainer {
    background-color: #f6f6f6;
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
