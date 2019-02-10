<template>
  <div class="bossLoss_cintainer">
    <Tabs v-model="active">
      <Tab title="基建取消">
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
            <Cell title="接单日期" :value="item.tOrderDate || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>
      <Tab title="签约失败">
        <List
          v-model="loading_fail"
          :finished="finished_fail"
          finished-text="没有更多了"
          @load="handleSuccessLoad"
        >
          <Cell-group class="group" v-for="item in data_fail" :key="item.iCustomerId">
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
            <Cell title="上门时间" :value="item.dateShangmen || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>
      <Tab title="解约合同">
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
                        <span class="status">解约合同</span>
                    </div>
                </template>
            </Cell>
            <Cell title="姓名" :value="item.sUsername" />
            <Cell title="手机号" :value="item.sMobile" />
            <Cell title="地址" :value="item.sAddress" />
            <Cell title="施工内容" :value="item.sRemarks || '-'" />
            <Cell title="解约日期" :value="item.dateQuxiao || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>
    </Tabs>
    <footerNav></footerNav>
  </div>
</template>

<script>
  import { Tab, Tabs, Cell, CellGroup, Toast, List } from 'vant';
  import footerNav from '../../components/footerNav' // 引入login.vue组件
  import { getCustomer } from '@/server';

  export default {
    name: 'bossLoss',
    data () {
      return {
        active: 0,
        data_under: [],
        data_fail: [],
        data_cancel: [],
        loading_under: false, // 基建取消
        finished_under: false, // 基建取消
        page_under: 1, // 基建取消
        loading_fail: false, // 签约失败 
        finished_fail: false, // 签约失败 
        page_fail: 1, // 签约失败 
        loading_cancel: false, // 解约合同 
        finished_cancel: false, // 解约合同 
        page_cancel: 1, // 解约合同 
      }
    },
    components: {
      Tab,
      Tabs,
      Cell, 
      CellGroup,
      Toast,
      List,
      footerNav
    },
    methods: {
      /*
      * 点击按钮
      * 1 -> 预约
      */
      handleClick(type, id) {
        switch(type) {
          case 1:
            this.handleGo(id, type);
            break;
          default:
            break;
        }
      },
      /*
      * 处理预约
      */
      handleGo(id, type) {
          this.$router.push(
              {
                  name: 'order',
                  params: {
                      id: id
                  }
              }
          )
      },
      /*
      * 加载基建数据
      */
      handleUnderLoad() {
        let params = {
          status: 3,
          page: this.page_under,
        }
        this.getInfo(params, 'under');
      },
      /*
      * 加载失败数据
      */
      handleSuccessLoad() {
        let params = {
          status: 101,
          page: this.page_fail
        }
        this.getInfo(params, 'fail');
      },
      /*
      * 加载解约数据
      */
      handleCancelLoad() {
        let params = {
          status: 102,
          page: this.page_cancel,
        }
        this.getInfo(params, 'cancel');
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
  .bossLoss_cintainer {
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
