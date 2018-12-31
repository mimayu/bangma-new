<template>
  <div id="quote" class="quote_container">
    <ul class="quote_tabs">
      <li class="quote_item" v-for="item in tabs">
        厨卫报价
      </li>
      <li class="quote_item_add" @click="addQuote">
        +
      </li>
    </ul>
    <section class="quote_contents list-box">
      <div class="left-box" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" ref="menuList" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">{{item}}</li>
        </ul>
      </div>
      <div class="right-box" ref="foodsWrapper">
        <ul>
          <li v-for="(items, index) in details" ref="foodList">
            <h3>{{goods[index]}}</h3>
            <section class="info" v-for="item in items">
              <h4>{{item.project}}</h4>
              <p class="pricem">单价：￥{{item.price}}   单位：{{item.unit}}</p>
              <span class="price">小计
                <b class="red" v-show="item.quantity > 0">{{getSinglePrice(item.price,item.quantity)}}</b>
                <b class="red" v-show="item.quantity <= 0">0</b>
              </span>
              <section class="price-edit">
                <a class="minus" @click="minusCart(item)">-</a>
                <span>{{item.quantity}}</span>
                <a class="add" @click="addCart(item)">+</a>
              </section>
            </section>
          </li>
        </ul>
      </div>
    </section>
    <section class="quote_toolbar">
      工程总价
      <span class="quote_price">¥33</span>
      <button @click="handleSubmit">保存并打印</button>
    </section>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { getQuote, getAddQuote, postSubmit, getSubmitInfo } from '@/server';

export default {
  name: 'quotation',
  components: {
    
  },
  created() {
    let iCustomerId = this.$route.params.id || 1;
    let iMode = this.$route.params.mode || 1;
    this.getQuote(iCustomerId, iMode);
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        console.log(4, !height2, this.scrollY >= height1 ,this.scrollY < height2)
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    },
  },
  data(){
    return {
      tabs: [1],
      goods: [],
      details: [],
      iCustomerId: 1,
      listHeight: [],
      scrollY: 0,
      current: 0
    }
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      console.log('this.listHeight', this.listHeight);
    },
    _followScroll(index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.meunScroll.scrollToElement(el, 300, 0, -100);
    },
    addQuote() {
      let params = {
        'iCustomerId': 1
      }
      getAddQuote(params).then(
        res => {
          if(res.success == 1) {
            let id = res.zengxiang_customer_id;
            this.tabs.push(id);
            this.reset();
            this.getQuote(id);
          }
        }
      )
    },
    handleSubmit() {
      let params = {
        'iCustomerId': 1,
        'idAndNumberValues': ["1|2"]
      }
      postSubmit(params).then(
        res => {
          console.log('res', res);
          if(res.success == 1) {
          }
        }
      )
    },
    handleTabsAdd () {
        this.tabs ++;
    },
    getQuote(id, mode) {
      let params = {
        iCustomerId: id,
        iMode: mode
      }
      getQuote(params).then(
        res => {
          if(res.success == 1) {
            this.goods = Object.values(res.type_arr);
            this.details = Object.values(res.result);
            this.iCustomerId = id;
            this.tabs = this.tabs.concat(res.zengxiang_arr)
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            });
          }
          console.log('res', res);
        }
      )
    },
    addCart(item) {
      item.quantity ++;
    },
    minusCart(item) {
      if(item.quantity == 0) {
        return;
      }
      item.quantity --;
    },
    getSinglePrice(price, count) {
      return price * count
    },
    getTotalPrice(price, count) {
      return price * count
    },
    reset() {
      this.scrollY = 0;
    }
  }
}
</script>

<style lang="scss">
  .quote_container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    .quote_tabs {
      display: flex;
      line-height: 44px;
      .quote_item {
        padding: 0 13px;
        color: #FF5C12;
      }
      .quote_item_add {
        padding: 0 20px;
        background: red;
        color: #fff;
      }
    }
    .quote_contents {
      flex: 1;
      display:flex;
      overflow: hidden;
    }
    .quote_toolbar {
      line-height: 50px;
    }

    .left-box{
      width:100px;
      li{
        height:60px; 
        line-height:60px;
        font-size: 16px; 
        text-align:center;
        color: #393837;
        background: #F7F8F9;
        border-bottom:1px solid #fff;
        &.active{
          color: #1E97FF;background: #fff;
        }
      }
    }
    .right-box{
      li{
        margin-bottom:15px;
        margin-left:10px
      }
    }
    h3{
      background: #F6F6F6;
      height:30px;
      line-height:30px;
      margin-bottom:10px;
    }
    .pricem{
      padding:10px 0;
    }
    .price-edit{
      position:absolute;
      right:10px; 
      bottom:0;
      right:10px;
      a{
        flex:1;
        width:23px;
        height:23px; 
        border-radius:13px; 
        text-align:center;
        line-height:23px;
        border:2px solid #F7F8F9;
        padding:0;display:inline-block;    
        vertical-align: middle;
      }
      span{
        flex:2;
        font-size:12px; 
        color:#000; 
        background:#F7F8F9;
        border-radius:13px;     
        vertical-align: middle;
        text-align:center;
        line-height:23px;
        display:inline-block;
        padding:0 10px;
        margin:0 10px;
      }
      .add{
        background:#1E97FF;color:#fff;
      }
      .minus{
        color:gray;
      }
    }
    .price{
      font-size: 16px;
      color: #FF5C12;
    }
    .info{
      h4{
        font-size: 14px;
      }
      p{
        font-size: 12px; 
        color: #999;
      }
      position: relative;
      padding: 10px ;
      margin-bottom: 15px;
      .price{
        font-size:16px;
      }
      &:before{
        width:5px;display:inline-block;content:"";position:absolute;left:0;top:0;
        background: #1E97FF;height:100%;
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
      }
    }
    .current {
      background: red !important;
    }
  }
</style>
