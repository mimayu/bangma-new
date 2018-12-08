<template>
  <div class="detection">
    <!--<Tabs value="name1">
        <TabPane label="基检未约" name="name1">
            <detectionList></detectionList>
        </TabPane>
        <TabPane label="基检预约" name="name2">
          <detectionList></detectionList>
        </TabPane>
        <TabPane label="基检确认" name="name3">
          <detectionList></detectionList>
        </TabPane>
        <TabPane label="基检取消" name="name4">
          <detectionList :data="data_cancel" title="基检取消"></detectionList>
        </TabPane>
    </Tabs>-->
    <van-tabs v-model="active">
      <van-tab title="基检未约" >
          <detectionList></detectionList>
      </van-tab>
      <van-tab title="基检预约">
          <detectionList></detectionList>
      </van-tab>
      <van-tab title="基检确认">
          <detectionList></detectionList>
      </van-tab>
      <van-tab title="基检取消">
          <detectionList></detectionList>
      </van-tab>
    </van-tabs>
    <footerNav></footerNav>
  </div>
</template>

<script>
import { getCustomer } from '@/server';
import footerNav from '../../components/footerNav' // 引入login.vue组件
import detectionList from '../../components/detectionList' // 引入login.vue组件
// import footerNav from "../../components/footerNav"; // 引入页脚

import { Tab, Tabs } from 'vant';
// Vue.use(Tab).use(Tabs);

export default {
  
  name: 'detection',
  data () {
    return {
      active: 2,
      data_under: [],
      data_order: [],
      data_confirm: [],
      data_cancel: []
    }
  },
  components: {
    'footerNav': footerNav,
    'detectionList':  detectionList,
    Tab:Tabs,
  },
  created() {
    let params = {
      status: 3,
      page: 1,
      keywords: ''
    }
    this.getInfo(params);
  },
  methods: {
    getInfo(params, type) {
      getCustomer(params).then(
        res => {
          console.log('res', res);
          this.data_cancel = res.list;
        }
      )
    },
    getOption() {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
