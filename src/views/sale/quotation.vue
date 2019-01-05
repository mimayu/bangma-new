<template>
  <div id="quote" class="quote_container">
    <ul class="quote_tabs">
      <li class="quote_item" :class="{'quote_item_active': tabActive === index}" v-for="(item, index) in tabs" @click="handleClickTab(item, index)">
        厨卫报价
      </li>
      <li class="quote_item_add" @click="addQuote">
        <span>+</span>
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
      <div class="quote_toolbar_content">
        工程总价
        <span class="quote_price">¥{{totalPrice}}</span>
      </div>
      <button @click="handleSubmit">保存</button>
    </section>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { Toast } from 'vant';
import { getQuote, getAddQuote, postSubmit } from '@/server';

export default {
  name: 'quotation',
  components: {
    Toast
  },
  data(){
    return {
      tabs: [1],
      goods: [],
      details: [],
      iCustomerId: 1,
      listHeight: [],
      scrollY: 0,
      current: 0,
      tabActive: 0,
    }
  },
  created() {
    let iCustomerId = this.$route.params.id || 1;
    let iMode = this.$route.params.mode || 1;
    this.iCustomerId = iCustomerId;
    this.getQuote(iCustomerId, iMode);
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    },
    selectGoods() {
      let lists = [];
      // this.goods.forEach((good) => {
      //   good.foods.forEach((food) => {
      //     if (food.count) {
      //       foods.push(food);
      //     }
      //   });
      // });
      return lists;
    },
    totalPrice() {
      let total = 0;
      this.details.forEach((items) => {
        items.forEach((item) => {
          total += item.price * item.quantity;
        })
      });
      return total;
    },
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
      let iCustomerId = this.$route.params.id || 1;
      let params = {
        'iCustomerId': iCustomerId
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
    /*
    * 点击提交
    */
    handleSubmit() {
      let lists = [];
      this.details.forEach((items) => {
        items.forEach((item) => {
          if(item.quantity > 0) {
            lists.push(item)
          }
        })
      });
      if(lists.length == 0) {
        return;
      }
      let idAndNumberValues = [];
      let iCustomerId = this.$route.params.id || 1;
      lists.map(item => {
        idAndNumberValues.push(`${item.id}|${item.quantity}`)
      })
      
      let params = {
        'iCustomerId': this.iCustomerId,
        'idAndNumberValues': idAndNumberValues
      }
      postSubmit(params).then(
        res => {
          if(res.success == 1) {
            this.$router.push(
              {
                  name: 'quotationDetail',
                  params: {
                      id: this.iCustomerId
                  }
              }
            )
          }
          Toast(res.msg)
        }
      )
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
    /*
    * 重置
    */
    reset() {
      this.scrollY = 0;
    },
    /*
    * 获取单个订单钱数
    */
    getSinglePrice(price, count) {
      return price * count
    },
    /*
    * 点击头部tab
    */
    handleClickTab(item, index) {
      this.tabActive = index;
      console.log(item, index);
    },
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
      line-height: 44px;
      height: 44px;
      font-size: 0;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      .quote_item {
        display: inline-block;
        position: relative;
        margin: 0 13px;
        color: #333333;
        font-size: 14px;
      }
      .quote_item_active:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
        background: #FF5C12;
      }
      .quote_item_add {
        display: inline-block;
        padding: 0 5px;
        span {
          color: #aaa;
          width: 39px;
          height: 23px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 20px;
          border: 1px solid #aaa;
        }
      }
    }
    .quote_contents {
      flex: 1;
      display:flex;
      overflow: hidden;
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
      height:30px;
      line-height:30px;
      margin-bottom:10px;
      font-size: 12px;
      background: #F6F6F6;
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
      color: #1E97FF !important;
      background: #fff !important;
    }
  }
</style>
