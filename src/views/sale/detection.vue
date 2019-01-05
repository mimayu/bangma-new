<template>
  <div class="detection_container">
    <Tabs v-model="active" @change="handleChange">
      <Tab title="基检未约" >
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
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleGo(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
        </Cell-group>
      </Tab>
      <Tab title="基检预约">
        <Cell-group class="group" v-for="item in data_order" :key="item.iCustomerId">
            <Cell title="订单号">
                <template>
                    <div class="custom_wrap">
                        <span class="order_id">{{item.iCustomerId}}</span>
                        <span class="status">基检预约</span>
                    </div>
                </template>
            </Cell>
            <Cell title="姓名" :value="item.sUsername" />
            <Cell title="手机号" :value="item.sMobile" />
            <Cell title="地址" :value="item.sAddress" />
            <Cell title="施工内容" :value="item.sRemarks || '-'" />
            <Cell title="开工时间" :value="item.tOrderDate || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleGo(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
        </Cell-group>
      </Tab>
      <Tab title="基检确认">
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
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleGo(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
        </Cell-group>
      </Tab>
      <Tab title="基检取消">
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
            <div class="van-cell btn_wrap">
                <button plain type="primary" class="assign_btn" >预约</button>
            </div>
        </Cell-group>
      </Tab>
    </Tabs>
    <footerNav></footerNav>
  </div>
</template>

<script>
import { Tab, Tabs, Cell, CellGroup } from 'vant';
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
      record: [0, 0, 0, 0],
      page: 1,
    }
  },
  components: {
    Tab,
    Tabs,
    Cell,
    CellGroup,
    'footerNav': footerNav
  },
  created() {
    let params = {
      status: 1,
      page: 1,
      keywords: ''
    }
    this.getInfo(params, 'data_under');
  },
  methods: {
    getInfo(params, type) {
      getCustomer(params).then(
        res => {
          if(res.success == 1) {
            this[type] = res.list;
          }
        }
      )
    },
    handleChange(value) {
      if(value == 1) {
        let params = {
          status: 2,
          page: 1,
          keywords: ''
        }
        this.getInfo(params, 'data_order');
      }
      if(value == 2) {
        let params = {
          status: 103,
          page: 1,
          keywords: ''
        }
        this.getInfo(params, 'data_confirm');
      }
      if(value == 3) {
        let params = {
          status: 3,
          page: 1,
          keywords: ''
        }
        this.getInfo(params, 'data_cancel');
      }
    },
    handleGo(type, id) {
      /*
      *  3 -> 跳转报价
      */
      switch(type) {
          case 3:
              this.$router.push(
                  {
                      name: 'quotation',
                      params: {
                          id: id
                      }
                  }
              )
              break;
          default:
              break;
      }
    }
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
