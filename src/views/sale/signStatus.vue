<template>
  <div class="sign_status_cintainer">
    <Tabs v-model="active" @change="handleChange">
      <Tab title="签约等待" >
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
          <Cell title="手机号" :value="item.sMobile" />
          <Cell title="地址" :value="item.sAddress" />
          <Cell title="施工内容" :value="item.sRemarks || '-'" />
          <Cell title="开工时间" :value="item.tOrderDate || '-'" />
          <div class="van-cell btn_wrap" v-if="item.actions">
            <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type">{{action.name}}</button>
          </div>
        </Cell-group>
      </Tab>
      <Tab title="签约成功">
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
          <Cell title="手机号" :value="item.sMobile" />
          <Cell title="地址" :value="item.sAddress" />
          <Cell title="施工内容" :value="item.sRemarks || '-'" />
          <Cell title="开工时间" :value="item.tOrderDate || '-'" />
          <div class="van-cell btn_wrap" v-if="item.actions">
            <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type">{{action.name}}</button>
          </div>
        </Cell-group>
      </Tab>
      <Tab title="签约失败">
        <Cell-group class="group" v-for="item in data_cancel" :key="item.iCustomerId">
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
          <Cell title="开工时间" :value="item.tOrderDate || '-'" />
          <div class="van-cell btn_wrap" v-if="item.actions">
            <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type">{{action.name}}</button>
          </div>
        </Cell-group>
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
  import { Tab, Tabs, Cell, CellGroup, Toast, Actionsheet } from 'vant';
  import { getCustomer, getCancel } from '@/server';
  import footerNav from '../../components/footerNav' // 引入login.vue组件

  export default {
    name: 'detection',
    data () {
      return {
        active: 0,
        data_under: [],
        data_success: [],
        data_cancel: [],
        record: [0, 0, 0, 0],
        underPage: 1,
        successPage: 1,
        cancelPage: 1,
        modeShow: false,
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
        currentId: ''
      }
    },
    components: {
      Tab,
      Tabs,
      Cell, 
      CellGroup,
      Toast,
      Actionsheet,
      'footerNav': footerNav,
    },
    created() {
      this.active = this.$route.query.active || 0;
      if(this.active == 0) {
        this.getUnder(1);
        return;
      }
      if(this.active == 1) {
        this.getSuccess(1);
        return;
      }
      if(this.active == 2) {
        this.getCancel(1);
        return;
      }
    },
    methods: {
      getUnder(page) {
        let params = {
          status: 4,
          page: page,
        }
        this.getInfo(params, 'data_under');
      },
      getSuccess(page) {
        let params = {
            status: 5,
            page: page,
          }
          this.getInfo(params, 'data_success');
      },
      getCancel(page) {
        let params = {
          status: 101,
          page: page,
        }
        this.getInfo(params, 'data_cancel');
      },
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
        if(value == 0) {
          this.getUnder(1);
          return;
        }
        if(value == 1) {
          this.getSuccess(1);
          return;
        }
        if(value == 2) {
          this.getCancel(1);
          return;
        }
      },
      handleCancel(id) {
        let params = {
          'iCustomerId': id
        };
        getCancel(params).then(
          res => {
            if(res.success == 1) {
              let index = this.data_success.findIndex(item => {
                return item.iCustomerId == id;
              });
              this.data_success.splice(index, 1);
              Toast('解约成功');
            }else {
              Toast(res.msg);
            }
          }
        )
      },
      handleQuote(id) {
        this.modeShow = true;
        this.currentId = id;
        console.log('this.currentId', this.currentId)
      },
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
        console.log('value', value, mode)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .sign_status_cintainer {
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
