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
            <div class="van-cell btn_wrap">
                <button plain type="primary" class="assign_btn" >预约</button>
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
            <div class="van-cell btn_wrap">
                <button plain type="primary" class="assign_btn" >预约</button>
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
            <div class="van-cell btn_wrap">
                <button plain type="primary" class="assign_btn" >预约</button>
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
import { Tab, Tabs, Cell, CellGroup, } from 'vant';
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
      let params = this.prepare(value);
      if(value == 1) {
        this.getInfo(params, 'data_order');
      }
      if(value == 2) {
        this.getInfo(params, 'data_confirm');
      }
      if(value == 3) {
        this.getInfo(params, 'data_cancel');
      }
    },
    prepare(value) {
      return {
        status: +value + 1,
        page: 1,
        keywords: ''
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
        border: none;
        padding: 8px;
        outline: none;
        margin: 0;
        background: red;
        border-radius: 5px;
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
