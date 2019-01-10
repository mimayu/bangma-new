<template>
  <div class="bossLoss_cintainer">
    <Tabs v-model="active" @change="handleChange">
      <Tab title="基建取消" >
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
                        <span class="status">基建取消</span>
                    </div>
                </template>
            </Cell>
            <Cell title="姓名" :value="item.sUsername" />
            <Cell title="手机号" :value="item.sMobile" />
            <Cell title="地址" :value="item.sAddress" />
            <Cell title="施工内容" :value="item.sRemarks || '-'" />
            <Cell title="取消时间" :value="item.tOrderDate || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>
      <Tab title="签约失败">
        <Cell-group class="group" v-for="item in data_success" :key="item.iCustomerId">
          <Cell title="订单号">
              <template>
                  <div class="custom_wrap">
                      <span class="order_id">{{item.iCustomerId}}</span>
                      <span class="status">签约失败</span>
                  </div>
              </template>
          </Cell>
          <Cell title="姓名" :value="item.sUsername" />
          <Cell title="手机号" :value="item.sMobile" />
          <Cell title="地址" :value="item.sAddress" />
          <Cell title="施工内容" :value="item.sRemarks || '-'" />
          <Cell title="取消时间" :value="item.tOrderDate || '-'" />
          <div class="van-cell btn_wrap" v-if="item.actions">
            <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type">{{action.name}}</button>
          </div>
        </Cell-group>
      </Tab>
      <Tab title="解约合同">
        <Cell-group class="group" v-for="item in data_cancel" :key="item.iCustomerId">
          <Cell title="订单号">
              <template>
                  <div class="custom_wrap">
                      <span class="order_id">{{item.iCustomerId}}</span>
                      <span class="status">解约合同</span>
                  </div>
              </template>
          </Cell>
          <Cell title="姓名" :value="item.sUsername" />
          <Cell title="手机号" :value="item.sMobile" />
          <Cell title="地址" :value="item.sAddress" />
          <Cell title="施工内容" :value="item.sRemarks || '-'" />
          <Cell title="取消时间" :value="item.tOrderDate || '-'" />
          <div class="van-cell btn_wrap" v-if="item.actions">
            <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type">{{action.name}}</button>
          </div>
        </Cell-group>
      </Tab>
    </Tabs>
    <footerNav></footerNav>
  </div>
</template>

<script>
  import { Tab, Tabs, Cell, CellGroup, Toast, List } from 'vant';
  import { getCustomer } from '@/server';
  import footerNav from '../../components/footerNav' // 引入login.vue组件

  export default {
    name: 'detection',
    data () {
      return {
        active: 0,
        data_under: [],
        data_success: [],
        data_cancel: [],
        currentId: '',
        loading_under: false, // 基建取消
        finished_under: fasle // 基建取消
      }
    },
    components: {
      Tab,
      Tabs,
      Cell, 
      CellGroup,
      Toast,
      List,
      'footerNav': footerNav,
    },
    created() {
      // let params = {
      //   status: 3,
      //   page: 1
      // }
      // this.getInfo(params, 'data_under');
    },
    methods: {
      /*
      * 基建取消
      */
      handleUnderLoad() {
        console.log(1)
      }
      // getInfo(params, type) {
      //   getCustomer(params).then(
      //     res => {
      //       if(res.success == 1) {
      //         this[type] = res.list;
      //       }
      //     }
      //   )
      // },
      // handleChange(value) {
      //   if(value == 1) {
      //     let params = {
      //       status: 101,
      //       page: 1
      //     }
      //     this.getInfo(params, 'data_success');
      //   }
      //   if(value == 2) {
      //     let params = {
      //       status: 102,
      //       page: 1
      //     }
      //     this.getInfo(params, 'data_cancel');
      //   }
      // }
    }
  }
</script>

<style lang="scss">
  .bossLoss_cintainer {
    background-color: #f6f6f6;
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
