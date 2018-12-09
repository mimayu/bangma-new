<template>
  <div class="detection">
    <Tabs v-model="active">
      <Tab title="签约等待" >
        <detectionList></detectionList>
      </Tab>
      <Tab title="签约成功">
        <detectionList></detectionList>
      </Tab>
      <Tab title="签约失败">
        <detectionList></detectionList>
      </Tab>
     
    </Tabs>
    <footerNav></footerNav>
  </div>
</template>

<script>
import footerNav from '../../components/footerNav' // 引入login.vue组件
import detectionList from '../../components/detectionList' // 引入login.vue组件
import { Tab, Tabs } from 'vant';

export default {
  name: 'detection',
 data () {
    return {
      active: 1,
    }
  },
  components: {
    Tab,
    Tabs,
    'footerNav': footerNav,
    'detectionList':  detectionList,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
