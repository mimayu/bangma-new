<template>
  <div class="detection_container">
    <Tabs v-model="active">
      <Tab title="基检未约" >
        <List
          v-model="loading_under"
          :finished="finished_under"
          finished-text="没有更多了"
          @load="handleUnderLoad"
        >
          <Cell-group class="group" v-for="item in data_under" :key="item.iCustomerId">
              <Cell title="订单号">
                  <template>
                      <div class="custom_wrap">
                          <span class="order_id">{{item.iCustomerId}}</span>
                          <span class="status">基检未约</span>
                      </div>
                  </template>
              </Cell>
              <Cell title="姓名" :value="item.sUsername" />
              <Cell title="手机号" :value="item.sMobile" />
              <Cell title="地址" :value="item.sAddress" />
              <Cell title="施工内容" :value="item.sRemarks || '-'" />
              <Cell title="开工时间" :value="item.tOrderDate || '-'" />
              <div class="van-cell btn_wrap" v-if="item.actions">
                <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
              </div>
          </Cell-group>
        </List>
      </Tab>
      <Tab title="基检再约">
        <List
          v-model="loading_order"
          :finished="finished_order"
          finished-text="没有更多了"
          @load="handleOrderLoad"
        >
          <Cell-group class="group" v-for="item in data_order" :key="item.iCustomerId">
              <Cell title="订单号">
                  <template>
                      <div class="custom_wrap">
                          <span class="order_id">{{item.iCustomerId}}</span>
                          <span class="status">基检再约</span>
                      </div>
                  </template>
              </Cell>
              <Cell title="姓名" :value="item.sUsername" />
              <Cell title="手机号" :value="item.sMobile" />
              <Cell title="地址" :value="item.sAddress" />
              <Cell title="施工内容" :value="item.sRemarks || '-'" />
              <Cell title="开工时间" :value="item.tOrderDate || '-'" />
              <div class="van-cell btn_wrap" v-if="item.actions">
                <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
              </div>
          </Cell-group>
        </List>
      </Tab>
      <Tab title="基检确认">
        <List
          v-model="loading_confirm"
          :finished="finished_confirm"
          finished-text="没有更多了"
          @load="handleConfirmLoad"
        >
          <Cell-group class="group" v-for="item in data_confirm" :key="item.iCustomerId">
              <Cell title="订单号">
                  <template>
                      <div class="custom_wrap">
                          <span class="order_id">{{item.iCustomerId}}</span>
                          <span class="status">基检确认</span>
                      </div>
                  </template>
              </Cell>
              <Cell title="姓名" :value="item.sUsername" />
              <Cell title="手机号" :value="item.sMobile" />
              <Cell title="地址" :value="item.sAddress" />
              <Cell title="施工内容" :value="item.sRemarks || '-'" />
              <Cell title="开工时间" :value="item.tOrderDate || '-'" />
              <div class="van-cell btn_wrap" v-if="item.actions">
                <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
              </div>
          </Cell-group>
        </List>
      </Tab>
      <Tab title="基检取消">
        <List
          v-model="loading_cancel"
          :finished="finished_cancel"
          finished-text="没有更多了"
          @load="handleCancelLoad"
        >
          <Cell-group class="group" v-for="item in data_cancel" :key="item.iCustomerId">
              <Cell title="订单号">
                  <template>
                      <div class="custom_wrap">
                          <span class="order_id">{{item.iCustomerId}}</span>
                          <span class="status">基检未约</span>
                      </div>
                  </template>
              </Cell>
              <Cell title="姓名" :value="item.sUsername" />
              <Cell title="手机号" :value="item.sMobile" />
              <Cell title="地址" :value="item.sAddress" />
              <Cell title="施工内容" :value="item.sRemarks || '-'" />
              <Cell title="开工时间" :value="item.tOrderDate || '-'" />
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
import { Tab, Tabs, Cell, CellGroup, List, Actionsheet } from 'vant';
import { getCustomer } from '@/server';
import footerNav from "@/components/footerNav"; // 引入页脚

export default {
  name: 'detection',
  data () {
    return {
      active: 0,
      data_under: [],
      data_order: [],
      data_confirm: [],
      data_cancel: [],
      loading_under: false, // 基检未约 
      finished_under: false, // 基检未约 
      page_under: 1, // 基检未约 
      loading_order: false, // 基检未约 
      finished_order: false, // 基检未约 
      page_order: 1, // 基检未约 
      loading_confirm: false, // 基检未约 
      finished_confirm: false, // 基检未约 
      page_confirm: 1, // 基检未约 
      loading_cancel: false, // 基检未约 
      finished_cancel: false, // 基检未约 
      page_cancel: 1, // 基检未约 
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
    }
  },
  components: {
    Tab,
    Tabs,
    Cell,
    CellGroup,
    List,
    Actionsheet,
    'footerNav': footerNav
  },
  methods: {
    /*
    * 点击操作
    * 1 -> 预约
    * 2 -> 上门
    * 3 -> 报价
    */
    handleClick(type, id) {
      switch(type) {
        case 1:
          this.handleGo(id, type);
          break;
        case 2:
          this.handleGo(id, type);
          break;
        case 3:
          this.handleQuote(id);
          break;
        default:
          break;
      }
    },
    /*
    * 处理预约/上门
    */
    handleGo(id, type) {
      let name = type == 1 ? 'order' : 'visit';
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
    },
    /*
    * 基检未约
    */
    handleUnderLoad() {
      let params = {
        status: 1,
        page: this.page_under,
      }
      this.getInfo(params, 'under');
    },
    /*
    * 基检预约
    */
    handleOrderLoad() {
      let params = {
        status: 103,
        page: this.page_order,
      }
      this.getInfo(params, 'order');
    },
    /*
    * 基检确认
    */
    handleConfirmLoad() {
      let params = {
        status: 2,
        page: this.page_confirm,
      }
      this.getInfo(params, 'confirm');
    },
    /*
    * 基检取消
    */
    handleCancelLoad() {
      let params = {
        status: 3,
        page: this.page_cancel,
      }
      this.getInfo(params, 'cancel');
    },
    /*
    * 开始加载
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
          }
          console.log('this[pageType]', this[pageType]);
        }
      )
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .detection_container {
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
