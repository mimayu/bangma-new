<template>
  <div class="quoteDetail_container">
    <Collapse v-model="activeNames">
      <Collapse-item title="卫生间" name="1">
        <div class="quote_item">
          <p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
          <span class="area">33米</span>
          <span class="price">￥5.432</span>
        </div>
        <div class="quote_item">
          <p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
          <span class="area">33米</span>
          <span class="price">￥5.432</span>
        </div>
      </Collapse-item>
      <Collapse-item title="卫生间" name="2">
        <div class="quote_item">
          <p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
          <span class="area">33米</span>
          <span class="price">￥5.432</span>
        </div>
        <div class="quote_item">
          <p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
          <span class="area">33米</span>
          <span class="price">￥5.432</span>
        </div>
      </Collapse-item>
      <Collapse-item title="卫生间" name="3">
        <div class="quote_item">
          <p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
          <span class="area">33米</span>
          <span class="price">￥5.432</span>
        </div>
        <div class="quote_item">
          <p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
          <span class="area">33米</span>
          <span class="price">￥5.432</span>
        </div>
      </Collapse-item>
    </Collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem, Toast } from 'vant';
import { getSubmitInfo } from '@/server';

export default {
  name: 'quoteDetail',
  components: {
    Collapse, 
    CollapseItem, 
    Toast
  },
  data () {
    return {
      iCustomerId: '',
      activeNames: ['1']
    }
  },
  created() {
    let iCustomerId = this.$route.params.id || 4665;
    this.iCustomerId = iCustomerId;
    this.getSubmitInfo();
  },
  methods: {
    getSubmitInfo() {
      let params = {
        'iCustomerId': this.iCustomerId
      }
      getSubmitInfo(params).then(
        res => {
          console.log('res', res);
        }
      )
    }
  }
}
</script>

<style lang="scss">
  .quoteDetail_container {
    .quote_item {
      border-bottom: 1px solid #eee;
    }
    .van-cell {
      padding: 8px 15px;
      font-size: 12px;
      background: #f6f6f6;
    }
    .van-cell:not(:last-child)::after {
      content: ' ';
      position: absolute;
      pointer-events: none;
      box-sizing: border-box;
      right: 0;
      bottom: 0;
      transform: scaleY(.5);
      border-bottom: 1px solid #ebedf0;
    }
    .van-collapse-item__content {
      padding: 0px 15px;
    }
    .quote_item {
      padding: 10px 10px;
      display: flex;
      align-items: center; 
      border-bottom: solid 1px #f6f6f6;
      p{
        flex: 2;
        font-size: 14px;}
      .area{
        color: #9A9A9A;
        margin:0  23px 0 3px;
      }
    }
  }
</style>
