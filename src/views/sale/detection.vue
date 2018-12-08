<template>
  <div class="detection">
    <Tabs v-model="active">
      <Tab title="基检未约" >
          <detectionList></detectionList>
      </Tab>
      <Tab title="基检预约">
          <detectionList></detectionList>
      </Tab>
      <Tab title="基检确认">
          <detectionList></detectionList>
      </Tab>
      <Tab title="基检取消">
          <detectionList></detectionList>
      </Tab>
    </Tabs>
    <footerNav></footerNav>
  </div>
</template>

<script>
import { getCustomer } from '@/server';
import detectionList from '../../components/detectionList' // 引入login.vue组件
import footerNav from "../../components/footerNav"; // 引入页脚

import { Tab, Tabs } from 'vant';

export default {
  
  name: 'detection',
  data () {
    return {
      active: 1,
      data_under: [],
      data_order: [],
      data_confirm: [],
      data_cancel: []
    }
  },
  components: {
    Tab,
    Tabs,
    'footerNav': footerNav,
    'detectionList':  detectionList,
  },
  created() {
    let params = {
      status: 3,
      page: 1,
      keywords: ''
    }
    // this.getInfo(params);
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
