<template> 
  <div id="quote" class="quote_container">
    <ul class="quote_tabs">
      <li class="quote_item" :class="{'quote_item_active': tabActive === index}" v-for="(item, index) in tabs" @click="handleClickTab(item, index)">
        厨卫报价
      </li>
      <li class="quote_item_add" @click="handleAddQuote">
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
                <span>
                  <input type="text" :value="item.quantity" @change="handleChange(item)" @keyup.up='addCart(item)' @keyup.down='minusCart(item)'> 
                </span>
                <a class="add" @click="addCart(item)">+</a>
              </section>
            </section>
          </li>
        </ul>
      </div>
    </section>
    <section class="quote_toolbar">
      <div class="quote_toolbar_content" @click="handleQuotePop">
        工程总价
        <span class="quote_price">¥{{totalPrice}}</span>
      </div>
      <button @click="handleSubmit">保存</button>
    </section>
    <transition name="fade">
      <div class="cube-popup" v-show="detailActive">
        <div class="cube-popup-mask" @click="handleMaskHide">
        </div>
        <transition
          name="move"
        >
          <div class="cube-popup-container" v-show="detailActive">
            <div class="list-header">
              <h1 class="title">
                购物车
              </h1>
              <span class="empty" @click="handleEmpty">
                清空
              </span>
            </div>
            <div class="cube-popup-wrap">
              <ul class="cube-popup-content">
                <li
                  class="content-item"
                  v-for="(item, index) in selectGoods"
                  :key="index"
                >
                  <span class="name">{{item.project}}</span>
                  <div class="price">
                    <span>{{getSinglePrice(item.price,item.quantity)}}</span>
                  </div>
                  <div class="cart-control-wrapper">
                    <a class="minus" @click="minusCart(item)">-</a>
                    <span>
                      <input type="text" :value="item.quantity" @change="handleChange(item)" @keyup.up='addCart(item)' @keyup.down='minusCart(item)'>
                    </span>
                    <a class="add" @click="addCart(item)">+</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import { Toast, Dialog } from 'vant';
  import { getQuoteChange, getAddQuote, postSubmit } from '@/server';

  export default {
    name: 'quotation',
    components: {
      Toast,
      Dialog
    },
    data(){
      return {
        tabs: [], // 顶部
        goods: [], // 左侧
        details: [], // 右侧
        iCustomerId: 1, // id
        listHeight: [],
        scrollY: 0, // 滑动距离
        tabActive: 0, // 顶部tab激活
        detailActive: false,
      }
    },

    props:{
      max: {type: Number, default: Infinity},
      min: {type: Number, default: -Infinity},
      value: {type: Number, default: 0},
      step: {type: Number, default:1},
    },

    created() {
      this.iCustomerId = this.$route.params.id || 1;
      this.tabs.push(this.iCustomerId); // 头部
      this.getQuote(true);
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
        this.details.forEach((items) => {
          items.forEach((item) => {
            if(item.quantity > 0) {
              lists.push(item)
            }
          })
        });
        console.log('lists', lists);
        return lists;
      },
      totalPrice() {
        let total = 0;
        this.details.forEach((items) => {
          items.forEach((item) => {
            total += item.price * Math.round(item.quantity*100)/100;
          })
        });
        return total;
      },
    },
    methods: {
      /*
      * 初始化操作
      */
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
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
      },
      _followScroll(index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.meunScroll.scrollToElement(el, 300, 0, -100);
      },
      /*
      * 
      */
      handleQuotePop() {
        if(this.selectGoods.length == 0) {
          return;
        }
        this.detailActive = !this.detailActive;
      },
      /*
      * 点击提交
      */
       handleSubmit() {
        if(this.selectGoods.length == 0) {
          return;
        }
        let idAndNumberValues = [];
        let iCustomerId = this.$route.params.id || 1;
        this.selectGoods.map(item => {
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
      /*
      * 重置参数
      */
      reset() {
        this.scrollY = 0;
        this.listHeight = [];
      },
      /*
      * 点击头部tab
      */
      handleClickTab(item, index) {
        this.tabActive = index;
        this.iCustomerId = item.iCustomerId;
        this.reset();
        this.getQuote(false);
      },
      /*
      * 左侧点击
      */
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      /*
      * 头部+点击
      */
      handleAddQuote() {
        let iCustomerId = this.$route.params.id || 1;
        let params = {
          'iCustomerId': iCustomerId
        }
        getAddQuote(params).then(
          res => {
            if(res.success == 1) {
              let id = res.zengxiang_customer_id;
              this.iCustomerId = id;
              this.tabs.push(id);
              this.tabActive = this.tabs.length - 1;
              this.reset();
              this.getQuote(false);
            }
          }
        )
      },
      /*
      * 请求数据 只需要一次初始化
      */
      getQuote(isInit) {
        let params = {
          iCustomerId: this.iCustomerId
        }
        getQuoteChange(params).then(
          res => {
            if(res.success == 1) {
              this.goods = Object.values(res.type_arr);
              this.details = Object.values(res.result);
              this.tabs = this.tabs.concat(res.zengxiang_arr);
              this.$nextTick(() => {
                isInit && this._initScroll();
                this._calculateHeight();
              });
            }
          }
        )
      },
      /*
      * 获取单个订单钱数
      */
      getSinglePrice(price, count) {
        return price * Math.round(count*100)/100;
      },
      /*
      * 减少
      */
      minusCart(item, type) {
        if(item.quantity == 0) {
          return;
        }
        item.quantity --;
        if(!this.selectGoods.length) {
          this.detailActive = false;
        }
      },
      /*
      * 增加
      */
      addCart(item) {
        item.quantity ++;
      },
      /*
      * 处理点击mask
      */
      handleMaskHide() {
        this.detailActive = false;
      },
      /*
      * 处理清空
      */
      handleEmpty() {
        Dialog.confirm({
          title: '',
          message: '<p>清空购物车？</p>'
        }).then(() => {
          this.selectGoods.forEach((item) => {
            item.quantity = 0;
          })
        this.detailActive = false;
        }).catch(() => {
          console.log(1)
        });
      },

    handleChange(item){
      let val = event.target.value.trim();
      let max = this.max;
      let min = this.min;
      if(this.isValueNumber(val)){
        val = Number(val);
        item.quantity = val;
        if(val > max){
          item.quantity = max;
        } else if(val < min){
          item.quantity = min;
        }
      } else {
        event.target.value = parseFloat(item.quantity).toFixed(1);
      }
      console.log(item.quantity);
    },
    isValueNumber(value){
      return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
    }


    }

  }
</script>

<style lang="scss">
  .van-dialog__message {
      text-align: center !important;
    }
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
      input {
        width:24px;
        text-align:center;
        border:0px;
        outline:none;
        cursor:pointer;
        margin-top:1px;
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
    .cube-popup {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 51px;
      z-index: 100;
      pointer-events: none;
      overflow: hidden;
      .list-header {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        .title {
          font-size: 14px;
          color: #333;
        }
        .empty {
          font-size: 12px;
          color: #00a0dc;
        }
      }
      .cube-popup-wrap {
        position: relative;
        padding: 0 18px;
        max-height: 217px;
        overflow: auto;
        background: #fff;
        height: 100%;
      }
    }
    .cube-popup-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      pointer-events: auto;
      z-index: 100;
    }
    .cube-popup-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
      background-color: #07111b;
      opacity: 0.6;
      pointer-events: auto;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    .fade-enter-active, .fade-leave-active {
      transition: all .3s ease-in-out
    }
    .move-enter, .move-leave-active {
      transform: translate3d(0, 100%, 0);
    }
    .move-enter-active, .move-leave-active {
      transition: all .3s ease-in-out
    } 
    .content-item {
      position: relative;
      padding: 12px 0;
      box-sizing: border-box;
      .name {
        display: inline-block;
        max-width: 60%;
        line-height: 24px;
        font-size: 14px;
        color: #333;
      }
      .price {
        position: absolute;
        right: 90px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 24px;
        font-weight: 700;
        font-size: 14px;
        color: #f01414;
      }
      .cart-control-wrapper {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        a{
          flex: 1;
          width: 18px;
          height: 18px; 
          border-radius: 50%; 
          text-align:center;
          line-height: 18px;
          border: 1px solid #F7F8F9;
          padding:0;
          display:inline-block;    
          vertical-align: middle;
        }
        span{
          flex: 2;
          font-size: 12px; 
          color: #000; 
          vertical-align: middle;
          text-align:center;
          line-height: 18px;
          display: inline-block;
          padding: 0 2px;
          margin: 0 1px;
        }
        input {
          width:24px;
          text-align:center;
          border:0px;
          outline:none;
          cursor:pointer;
          margin-top:1px;
        }
        .add{
          background:#1E97FF;
          color:#fff;
        }
        .minus{
          color:gray;
        }
      }
    }
  }
</style>
