<template>
  <div class="saleWorking_container">
    <Tabs v-model="active">
      <Tab title="派工完成">
        <List
          v-model="loading_paigong"
          :finished="finished_paigong"
          :finished-text="finished_paigong_text"
          @load="handlePaigongLoad"
        >
          <Cell-group class="group" v-for="item in data_paigong" :key="item.iCustomerId">
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
            <Cell title="预计开工日期" :value="item.dateYujiKaigong || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>
      <Tab title="开工进场">
        <List
          v-model="loading_kaigong"
          :finished="finished_kaigong"
          :finished-text="finished_kaigong_text"
          @load="handleKaigongLoad"
        >
          <Cell-group class="group" v-for="item in data_kaigong" :key="item.iCustomerId">
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
            <Cell title="预计完工日期" :value="item.dateYujiWangong || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>
      <Tab title="完工验收">
        <List
          v-model="loading_yanshou"
          :finished="finished_yanshou"
          :finished-text="finished_yanshou_text"
          @load="handleYanshouLoad"
        >
          <Cell-group class="group" v-for="item in data_yanshou" :key="item.iCustomerId">
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
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>

      <Tab title="完工收款">
        <List
          v-model="loading_wancheng"
          :finished="finished_wancheng"
          :finished-text="finished_wancheng_text"
          @load="handleWanchengLoad"
        >
          <Cell-group class="group" v-for="item in data_wancheng" :key="item.iCustomerId">
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
            <Cell title="尾款金额" :value="item.orderWeikuan || '-'" />
            <Cell title="尾款日期" :value="item.dateWeikuan || '-'" />
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
        data_paigong: [],
        data_kaigong: [],
        data_yanshou: [],
        data_wancheng: [],
        modeShow: false, // 选择模式
        actions: [],
        actionids:[],
        currentId: '', // 选择的id
        loading_paigong: false, // 签约等待
        finished_paigong: false, // 签约等待
        finished_paigong_text: '没有更多了',
        page_paigong: 1, // 签约等待
        loading_kaigong: false, // 签约成功 
        finished_kaigong: false, // 签约成功 
        finished_kaigong_text: '没有更多了', // 签约成功 
        page_kaigong: 1, // 签约成功 
        loading_yanshou: false, // 签约失败 
        finished_yanshou: false, // 签约失败 
        finished_yanshou_text: '没有更多了', // 签约成功 
        page_yanshou: 1, // 签约失败 
        loading_wancheng: false, // 合同取消 
        finished_wancheng: false, // 合同取消 
        finished_wancheng_text: '没有更多了', // 合同取消 
        page_wancheng: 1, // 合同取消 
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
      /*
      * 点击按钮
      * 2 -> 上门
      * 3 -> 报价处理
      * 4 -> 报价调整
      * 5 -> 合同解除
      * 6 -> 派工
      * 7 -> 开工
      * 8 -> 完工
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
          case 7:
            this.handleGo(id, type);
            break;
          case 8:
            this.handleGo(id, type);
            break;
          case 9:
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
        if(type == 11) {
            name = 'followup'; 
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
      * 加载派工完成数据
      */
      handlePaigongLoad() {
        let params = {
          status: 6,
          page: this.page_paigong,
        }
        this.getInfo(params, 'paigong');
      },
      /*
      * 加载开工进场数据
      */
      handleKaigongLoad() {
        let params = {
          status: 7,
          page: this.page_kaigong
        }
        this.getInfo(params, 'kaigong');
      },
      /*
      * 加载完工验收数据
      */
      handleYanshouLoad() {
        let params = {
          status: 8,
          page: this.page_yanshou,
        }
        this.getInfo(params, 'yanshou');
      },
      /*
      * 加载合同取消数据
      */
      handleWanchengLoad() {
        let params = {
          status: 9,
          page: this.page_wancheng,
        }
        this.getInfo(params, 'wancheng');
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
    }
</style>
