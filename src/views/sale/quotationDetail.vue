<template>
  <div class="quoteDetail_container">

        <div style="text-align:center;font-size: 16px;padding: 8px 15px;">
            <span>
                订单号：{{iCustomerId}}
            </span>
        </div>

    <Collapse v-model="activeNames">
      <Collapse-item :title="items.name" name="1" v-for="(items, index) in lists" :key="index" :name="index">
        <div class="quote_item" v-for="item in items.list" :key="item.id" >
          <p>{{item.project}}</p>
          <span class="area">{{item.quantity}}{{item.unit}}</span>
          <span class="price">￥{{item.total}}</span>
        </div>
      </Collapse-item>
    </Collapse>
    <section class="quote_toolbar">
      <div class="quote_toolbar_content">
        <span class="quote_price">¥{{totalPrice}}</span>
      </div>
      <Button size="large" @click="handleSubmit">请打开"邦马"公众号打印</Button>
    </section>
    
  </div>
</template>

<script>
import { Collapse, CollapseItem, Toast, Button } from 'vant';
import { getSubmitInfo } from '@/server';

export default {
  name: 'quoteDetail',
  components: {
    Collapse, 
    CollapseItem, 
    Toast,
    Button
  },
  data () {
    return {
      iCustomerId: '',
      activeNames: [0],
      lists: [],
      iMode:0,
    }
  },
  created() {
    this.iCustomerId = this.$route.params.id || 0;
    this.iMode = this.$route.params.iMode || 1;
    this.getSubmitInfo();
  },
  computed: {
    totalPrice() {
      let total = 0;
      //console.log(this.lists);
      this.lists.forEach((items) => {
        items.list.forEach((item) => {
          total += item.price * Math.round(item.quantity*100)/100;
        })
      });
      total = parseInt(total+total*0.15);
      return total;
    },
  },
  methods: {
    getSubmitInfo() {
      let params = {
        'iCustomerId': this.iCustomerId,
        'iMode': this.iMode,
      }
      getSubmitInfo(params).then(
        res => {
          if(res.success == 1) {
            this.lists = Object.values(res.result);
            //console.log('this.lists', this.lists);
          }
        }
      )
    },   
    handleSubmit() {
      //console.log(11);
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
    .quote_toolbar {
      display: flex;
      line-height: 50px;
      .quote_toolbar_content {
        flex: 1;
        padding-left: 15px;
        background: #333333;
        font-size: 14px;
        color: #fff;
        .quote_price {
          margin-left: 4px;
          margin-right:12px;
          font-size: 18px;
        }
      }
      button {
        padding: 0 20px;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        background: #FF5C12;
        border: 0;
      }
    }
  }
</style>
