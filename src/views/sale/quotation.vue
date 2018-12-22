<template>
  <div id="quote" class="quote_container">
    <div class="quote_tabs">
      1
    </div>
    <section class="quote_contents list-box">
      <div class="left-box" ref="menuWrapper">
        <ul>
          <li v-for="item in goods" ref="menuList">{{item}}</li>
        </ul>
      </div>
      <div class="right-box" ref="foodsWrapper">
        <ul>
          <li v-for="item in details" ref="foodList">
            <h3>卫生间</h3>
            <section class="info">
              <h4>立邦底材体系之墙面涂刷基层界面剂及造毛处理</h4>
              <p class="pricem">单价：￥25   单位：m</p>
              <span class="price">小计
                <b class="red" v-show="item.count > 0">{{getSinglePrice(item.price,item.count)}}</b>
                <b class="red" v-show="item.count <= 0">0</b>
              </span>
              <section class="price-edit">
                <a class="minus" @click="minusCart(item)">-</a>
                <span>{{item.count}}</span>
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
      <button>保存并打印</button>
    </section>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { getQutoe } from '@/server';

export default {
  name: 'quotation',
  components: {
    
  },
  created() {
    this.getQuote();
  },
  data(){
    return {
      goods: ['厨房报价', '卫生间', '卫生洁具', '厨房报价', '卫生间', '卫生洁具', '厨房报价', '卫生间', '卫生洁具', '厨房报价', '卫生间', '卫生洁具'],
      details: [
        {
          'title': '卫生间',
          'brief': '立邦底材体系之墙面涂刷基层界面剂及造毛处理',
          'price': '25',
          'count': 0
        },
        {
          'title': '卫生间',
          'brief': '立邦底材体系之墙面涂刷基层界面剂及造毛处理',
          'price': '25',
          'count': 0
        },
        {
          'title': '卫生间',
          'brief': '立邦底材体系之墙面涂刷基层界面剂及造毛处理',
          'price': '25',
          'count': 0
        },
        {
          'title': '卫生间',
          'brief': '立邦底材体系之墙面涂刷基层界面剂及造毛处理',
          'price': '25',
          'count': 0
        },
        {
          'title': '卫生间',
          'brief': '立邦底材体系之墙面涂刷基层界面剂及造毛处理',
          'price': '25',
          'count': 0
        },
        {
          'title': '卫生间',
          'brief': '立邦底材体系之墙面涂刷基层界面剂及造毛处理',
          'price': '25',
          'count': 0
        },
      ],
      listHeight: [],
      scrollY: 0,
    }
  },
  methods: {
    handleTabsAdd () {
        this.tabs ++;
    },
    getQuote() {
      let params = {
        iCustomerId: 1,
        iMode: 1
      }
      getQutoe(params).then(
        res => {
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
          console.log('res', res);
        }
      )
    },
    addCart(item) {
      item.count ++;
    },
    minusCart(item) {
      if(item.count == 0) {
        return;
      }
      item.count --;
    },
    getSinglePrice(price, count) {
      console.log(price, count)
      return price * count
    },
    getTotalPrice(price, count) {
      console.log(price, count)
      return price * count
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
      console.log('11', this.listHeight)

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
      line-height: 44px;
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
      width:105px;
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
        font-size:14px;
      }
      p{
        font-size:12px; 
        color:#999;
      }
      position:relative;
      padding:10px ;
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
  }
</style>
