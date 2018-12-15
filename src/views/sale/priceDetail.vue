<template>
  <div class="priceDetail">
    <dl>
      <dt>
        卫生间
        <span class="price">
          ¥3849038
          <a></a>
        </span>
      </dt>
      <dd>
        <p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥5.432</span>
      </dd>
       <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥1.322</span>
      </dd>

       <dt>
        卫生间
        <span class="price">
          ¥3849038
          <a></a>
        </span>
      </dt>
      <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥2.562</span>
      </dd>
       <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥9.322</span>
      </dd>

      <dt>
        卫生间
        <span class="price">
          ¥3849038
          <a></a>
        </span>
      </dt>
      <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥2.562</span>
      </dd>
       <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥9.322</span>
      </dd>

      <dt>
        卫生间
        <span class="price">
          ¥3849038
          <a></a>
        </span>
      </dt>
      <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥2.562</span>
      </dd>
       <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥9.322</span>
      </dd>

      <dt>
        卫生间
        <span class="price">
          ¥3849038
          <a></a>
        </span>
      </dt>
      <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥2.562</span>
      </dd>
       <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥9.322</span>
      </dd>

      <dt>
        卫生间
        <span class="price">
          ¥3849038
          <a></a>
        </span>
      </dt>
      <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥2.562</span>
      </dd>
       <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥9.322</span>
      </dd>

      <dt>
        卫生间
        <span class="price">
          ¥3849038
          <a></a>
        </span>
      </dt>
      <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥2.562</span>
      </dd>
       <dd>
        <p>描述描述描述</p>
        <span class="area">33米</span>
        <span class="price">￥9.322</span>
      </dd>
    </dl>
    <section class="printBox">
      工程总价
      <span class="price">¥88888888</span>
      <button>保存并打印</button>
    </section>
  </div>
</template>

<script>
// import detectionList from './modPage/detectionList' // 引入login.vue组件

export default {
  name: 'priceDetail',
  data () {
    return {
    //   msg: '我是hello word'
    }
  },
    components: {
    // 'footerNav': footerNav,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.priceDetail{
  dt{background: #F6F6F6;height: 30px;line-height: 30px;position: relative;padding-left: 10px;
  font-size: 12px;
color: #333333;
    .price{
      position: absolute;right: 10px;font-size: 14px;
    }
    .price a{
      border-left: solid 1px #d8d8d8;
      padding-left: 5px;
      margin-left: 5px;
    }
  }
  dd{
    padding: 5px 10px;display:flex;align-items:center; border-bottom: solid 1px #f6f6f6;
    p{flex: 2;font-size: 14px;}
    .area{
      color: #9A9A9A;margin:0  23px 0 3px;
    }
  }
}
.printBox{
  position: fixed;width:100%;color: #fff;font-size: 18px;padding-left: 5%;
  left: 0;bottom: 0;background: #333; height: 50px; line-height: 50px;
  button{position: absolute;right: 0; height: 50px;line-height: 50px; padding: 0 10px; background: #FF5C12;}
  .price {font-size: 18px;}
}
.stretch{
  width: 14px;
  height: 8px;
}
</style>
