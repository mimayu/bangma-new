<template>
  <div class="sale_loss_cintainer">
    <Tabs v-model="active">
      <Tab title="签约失败">
        <List
          v-model="loading_cancel"
          :finished="finished_cancel"
          :finished-text="finished_cancel_text"
          @load="handleCancelLoad"
        >
          <Cell-group class="group" v-for="item in data_cancel" :key="item.iCustomerId" :id="item.iCustomerId">
            <Cell title="订单号">
                <template>
                    <div class="custom_wrap">
                        <span class="order_id">{{item.iCustomerId}}</span>
                        <span class="status">签约失败</span>
                    </div>
                </template>
            </Cell>
            <Cell title="姓名" :value="item.sUsername" />
            <Cell title="手机号" :value="item.sMobile" @click="doTel(item.sMobile)"/>
            <Cell title="地址" :value="item.sAddress" />
            <Cell title="施工内容" :value="item.sRemarks || '-'" />
            <Cell title="接单日期" :value="item.tOrderDate || '-'" />
            <Cell title="上门日期" :value="item.dateShangmen || '-'" />

            <Cell title="客户紧急" :value="item.iLevel || '-'" v-if="item.iLevel!=null&&item.iLevel!=''&&item.iLevel!=0"/>
            <Cell title="环保意识" :value="item.iHuanbao || ''" v-if="item.iHuanbao!=null&&item.iHuanbao!=''"/>
            <Cell title="消费能力" :value="item.iJiage || ''" v-if="item.iJiage!=null&&item.iJiage!=''"/>
            <Cell title="业主标签" :value="item.iBiaoqian || ''" v-if="item.iBiaoqian!=null&&item.iBiaoqian!=''"/>
            <Cell title="业主年龄" :value="item.iAge || ''" v-if="item.iAge!=null&&item.iAge!=''"/>
            <Cell title="家庭成员" :value="item.iChengyuan || ''" v-if="item.iChengyuan!=null&&item.iChengyuan!=''"/>
            <Cell title="决策人" :value="item.iJueceren || ''" v-if="item.iJueceren!=null&&item.iJueceren!=''"/>
            <Cell title="翻新目的" :value="item.iMudi || ''" v-if="item.iMudi!=null&&item.iMudi!=''"/>

            <Cell title="报价金额" :value="item.baojia_total || ''" v-if="item.baojia_total!=null&&item.baojia_total!=''"/>
            <Cell title="施工项目" :value="item.type_name || ''" v-if="item.type_name!=null&&item.type_name!=''"/>

            <Cell title="上门反馈" :value="item.shangmenContent || '-'" />
            <div class="van-cell btn_wrap" v-if="item.actions">
              <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
            </div>
          </Cell-group>
        </List>
      </Tab>

      <Tab title="合同取消">
        <List
          v-model="loading_quxiao"
          :finished="finished_quxiao"
          :finished-text="finished_quxiao_text"
          @load="handleQuxiaoLoad"
        >
          <Cell-group class="group" v-for="item in data_quxiao" :key="item.iCustomerId">
            <Cell title="订单号">
                <template>
                    <div class="custom_wrap">
                        <span class="order_id">{{item.iCustomerId}}</span>
                        <span class="status">合同取消</span>
                    </div>
                </template>
            </Cell>
            <Cell title="姓名" :value="item.sUsername" />
            <Cell title="手机号" :value="item.sMobile" @click="doTel(item.sMobile)"/>
            <Cell title="地址" :value="item.sAddress" />
            <Cell title="施工内容" :value="item.sRemarks || '-'" />
            <Cell title="接单日期" :value="item.tOrderDate || '-'" />
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
  import { Tab, Tabs, Cell, CellGroup, Toast, List, Actionsheet } from 'vant';
  import { getCustomer } from '@/server';
  import { getBaojiaMode } from '@/server';
  import footerNav from '../../components/footerNav' // 引入login.vue组件

  export default {
    name: 'saleLoss',
    data () {
      return {
        active: 0,
        data_cancel: [],
        data_quxiao: [],
        modeShow: false, // 选择模式
        actions: [],
        actionids:[],
        currentId: '', // 选择的id
        
        loading_cancel: false, // 签约失败 
        finished_cancel: false, // 签约失败 
        finished_cancel_text: '没有更多了', // 签约成功 
        page_cancel: 1, // 签约失败 
        loading_quxiao: false, // 合同取消 
        finished_quxiao: false, // 合同取消 
        finished_quxiao_text: '没有更多了', // 合同取消 
        page_quxiao: 1, // 合同取消 
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
          case 17:
              this.doCopy(id);
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
      * 加载失败数据
      */
      handleCancelLoad() {
        let params = {
          status: 101,
          page: this.page_cancel,
        }
        this.getInfo(params, 'cancel');
      },
      /*
      * 加载合同取消数据
      */
      handleQuxiaoLoad() {
        let params = {
          status: 102,
          page: this.page_quxiao,
        }
        this.getInfo(params, 'quxiao');
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
      },

          doCopy: function (id) {
            var oInput = document.createElement('textarea');
            oInput.value =                     
            document.getElementById(id).innerHTML
                .replace(/<\/?.+?>/g,"\n")
                .replace(/\n+/g,"\n")
                .replace("\n查看","")
                .replace("\n上门\n","")
                .replace("\n报价调整","")
                .replace("\n报价\n","")
                .replace("\n编辑","")
                .replace("\n复制","")
                .replace("\n合同取消","")
                .replace("\n派工","")
                .replace("\n跟进","")
                

                .replace("\n订单号\n","订单号：")
                .replace("来源\n","来源：")
                .replace("姓名\n","姓名：")
                .replace("配合人\n","配合人：")
                .replace("推荐人\n","推荐人：")
                .replace("手机号\n","手机号：")
                .replace("固话\n","固话：")
                .replace("客户紧急\n","客户紧急：")
                .replace("上门日期\n","上门日期：")
                .replace("环保意识\n","环保意识：")
                .replace("消费能力\n","消费能力：")

                .replace("业主标签\n","业主标签：")
                .replace("业主年龄\n","业主年龄：")
                .replace("家庭成员\n","家庭成员：")
                .replace("决策人\n","决策人：")
                .replace("翻新目的\n","翻新目的：")


                .replace("报价金额\n","报价金额：")
                .replace("施工项目\n","施工项目：")
                .replace("区域\n","区域：")
                .replace("签约日期\n","签约日期：")
                .replace("签约金额\n","签约金额：")
                .replace("合同定金\n","合同定金：")
                .replace("上门反馈\n","上门反馈：")
                .replace("预计开工日期\n","预计开工日期：")

                .replace("地址\n","地址：")
                .replace("施工内容\n","施工内容：")
                .replace("业务员\n","业务员：")
                .replace("接单日期\n","接单日期：");
            document.body.appendChild(oInput);
            oInput.select(); 
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display = 'none';
            console.log('复制成功');
            Toast('复制成功');
        }



    }
  }
</script>

<style lang="scss">
  .sale_loss_cintainer {
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
