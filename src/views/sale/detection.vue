<template>
  <div class="detection_container">
    <Tabs v-model="active">
      <Tab title="基检未约" >
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
                          <span class="status">{{item.iStatus_name}}</span>
                      </div>
                  </template>
              </Cell>
              <Cell title="来源" :value="item.iSource_name" />
              <Cell title="姓名" :value="item.sUsername" />
              <Cell title="手机号" :value="item.sMobile"  @click="doTel(item.sMobile)"/>
              <Cell title="地址" :value="item.sAddress" />
              <Cell title="施工内容" :value="item.sRemarks || '-'" />
              <Cell title="接单日期" :value="item.tOrderDate || '-'" />
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
          :finished-text="finished_order_text"
          @load="handleOrderLoad"
        >
          <Cell-group class="group" v-for="item in data_order" :key="item.iCustomerId">
              <Cell title="订单号">
                  <template>
                      <div class="custom_wrap">
                          <span class="order_id">{{item.iCustomerId}}</span>
                          <span class="status">{{item.iStatus_name}}</span>
                      </div>
                  </template>
              </Cell>
              <Cell title="来源" :value="item.iSource_name" />
              <Cell title="姓名" :value="item.sUsername" />
              <Cell title="手机号" :value="item.sMobile"  @click="doTel(item.sMobile)"/>
              <Cell title="地址" :value="item.sAddress" />
              <Cell title="施工内容" :value="item.sRemarks || '-'" />
              <Cell title="再约日期" :value="item.dateZaiyue || '-'" />
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
          :finished-text="finished_confirm_text"
          @load="handleConfirmLoad"
        >
          <Cell-group class="group" v-for="item in data_confirm" :key="item.iCustomerId">
              <Cell title="订单号">
                  <template>
                      <div class="custom_wrap">
                          <span class="order_id">{{item.iCustomerId}}</span>
                          <span class="status">{{item.iStatus_name}}</span>
                      </div>
                  </template>
              </Cell>
              <Cell title="来源" :value="item.iSource_name" />
              <Cell title="姓名" :value="item.sUsername" />
              <Cell title="手机号" :value="item.sMobile"  @click="doTel(item.sMobile)"/>
              <Cell title="地址" :value="item.sAddress" />
              <Cell title="施工内容" :value="item.sRemarks || '-'" />
              <Cell title="预约时间" :value="item.dateYuyue || '-'" />
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
          :finished-text="finished_cancel_text"
          @load="handleCancelLoad"
        >
          <Cell-group class="group" v-for="item in data_cancel" :key="item.iCustomerId">
              <Cell title="订单号">
                  <template>
                      <div class="custom_wrap">
                          <span class="order_id">{{item.iCustomerId}}</span>
                          <span class="status">{{item.iStatus_name}}</span>
                      </div>
                  </template>
              </Cell>
              <Cell title="来源" :value="item.iSource_name" />
              <Cell title="姓名" :value="item.sUsername" />
              <Cell title="手机号" :value="item.sMobile"  @click="doTel(item.sMobile)"/>
              <Cell title="地址" :value="item.sAddress" />
              <Cell title="取消理由" :value="item.quxiaoContent || '-'" />
              <Cell title="取消日期" :value="item.dateQuxiao || '-'" />
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
import { getBaojiaMode } from '@/server';
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
      finished_under_text: '没有更多了',
      page_under: 1, // 基检未约 
      loading_order: false, // 基检未约 
      finished_order: false, // 基检未约 
      finished_order_text: '没有更多了',
      page_order: 1, // 基检未约 
      loading_confirm: false, // 基检未约 
      finished_confirm: false, // 基检未约 
      finished_confirm_text: '没有更多了',
      page_confirm: 1, // 基检未约 
      loading_cancel: false, // 基检未约 
      finished_cancel: false, // 基检未约 
      finished_cancel_text: '没有更多了',
      page_cancel: 1, // 基检未约 
      modeShow: false, // 选择报价模式
      actions: [],
      actionids:[],
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
  created() {
    console.log(this.$store.getters.getActive);
    this.active = this.$route.query.active || this.$store.getters.getActive;
    let recruitScrollY = this.$store.state.recruitScrollY
    //console.log(recruitScrollY);
    window.scroll(0, recruitScrollY)
    this.getBaojiaMode();

  },
  methods: {
    doTel(mobile){
        window.location.href = "tel:"+mobile;
    },    
    /*
    * 点击操作
    * 1 -> 预约
    * 2 -> 上门
    * 3 -> 报价
    */
    handleClick(type, id) {
      switch(type) {
         case 0:
            this.handleGo(id, type);
            break;
        case 1:
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
    * 处理预约/上门
    */
    handleGo(id, type) {
      let name = '';
      if(type == 0) {
        name = 'previewCustom' 
      }
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
      if(type == 11) {
          name = 'followup'; 
      }
      if(type == 4){
          this.$router.push(
              {
                name: name,
                query: {
                    id: id,
                    backurl:'detection',
                    active:this.active,
                }
              }
          )
      }else{
        this.$router.push(
          {
              name: name,
              params: {
                  id: id,
                  backurl:'detection',
                  active:this.active,
              }
          }
        )
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
        let index = this.actions.findIndex(item => {
            return item.name == value.name;
        })
        let mode = this.actionids[index];
        this.modeShow = false;
        this.$router.push(
            {
                name: 'quotation',
                query: {
                    id: this.currentId,
                    mode:mode
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
      this.$store.dispatch("setActive", 0);
      this.getInfo(params, 'under');
    },
    /*
    * 基检再约
    */
    handleOrderLoad() {
      let params = {
        status: 103,
        page: this.page_order,
      }
      this.$store.dispatch("setActive", 1);
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
      this.$store.dispatch("setActive", 2);
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
      this.$store.dispatch("setActive", 3);
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
          }
        }
      )
    },
  },
  beforeRouteLeave(to, from, next) {
    let position = window.scrollY  //记录离开页面的位置
    if (position == null) position = 0
    this.$store.commit('changeRecruitScrollY', position) //离开路由时把位置存起来
    next()
  }
}
</script>

<style lang="scss">
  .detection_container {
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
