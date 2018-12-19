<template>
  <div id="quote" class="quote_container">
    <Tabs v-model="active">
      <Tab title="卫生间" >
       <TreeSelect
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @navclick="onNavClick"
        @itemclick="onItemClick"
      />
      </Tab>
      <Tab title="客厅">
        12
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import { getQutoe } from '@/server';
import { Tab, Tabs,TreeSelect } from 'vant';

export default {
  data() {
    return {
      active: 1,
      mainActiveIndex: 0,
      activeId: 1,
      items:[
          {
            text: '所有城市',
            children: [
              {
                text: '温yyy州',
                id: 1,
                disabled: true
              },
              {
                text: '杭rrr州',
                id: 2
              }
            ]
          },
          {
            text: '所有城市',
            children: [
              {
                text: '温www州',
                id: 1,
                disabled: true
              },
              {
                text: '杭555州',
                id: 2
              }
            ]
          },
          {
            text: '所有城市',
            children: [
              {
                text: '温444州',
                id: 1,
                disabled: true
              },
              {
                text: '杭qqq州',
                id: 2
              }
            ]
          },
          {
            text: '所有城市',
            children: [
              {
                text: '温eeee州',
                id: 1,
                disabled: true
              },
              {
                text: '杭eeee州',
                id: 2
              }
            ]
          }

        ],
    
    };
  },
  computed: {
    // items() {
     
    // }
  },
    components: {
    Tab,
    Tabs,
    TreeSelect
  },
  methods: {
      onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  }
};
</script>

<style lang="scss">
  
</style>
