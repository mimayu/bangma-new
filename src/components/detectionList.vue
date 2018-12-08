<template>
  <section>
    <div v-if="data.length == 0">
      暂无数据
    </div>
    <div v-else>
      <ul class="list">
        <li v-for="item in data">
          <dl>
            <dt>
              <span class="order_num">订单号：</span>
              <span class="number">{{item.iCustomerId}}</span>
              <span class="status">{{title}}</span>
            </dt>
            <dd>
              <span>姓名：</span>
              {{item.sUsername || '-'}}
            </dd>
            <dd>
              <span>手机号：</span>
              {{item.sMobile || '-'}}
            </dd>
            <dd>
              <span>地址：</span>
              {{item.sAddress || '-'}}
            </dd>
            <dd>
              <span>施工内容：</span>
              {{item.sRemarks || '-'}}
            </dd>
            <dd>
              <span>预约时间：</span>
              {{item.timeYuyue || '-'}}
            </dd>
            <dd>
              <router-link class="shangmen" to="">上门</router-link>
              <router-link class="yuyue" to="">预约</router-link>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </section>

</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        // msg: '我是hello word'
      };
    },
    updated() {
      console.log(12)
      console.log(this.data);
    },
    created() {
      console.log('default', this.data);
    },
    props: {
      'title': [String],
      'data': {
        type: Array,
        default: function(){
            return [];
        }
      }
    }
  };
</script>

<style scoped lang='less'>
.list {
  // margin: 0 10px;
  background: #eee;  padding-bottom: 50px;
  li{background: #fff;margin-bottom: 5px;padding-left: 10px;}
  dt {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #d8d8d8;
    position: relative;
    .order_num {
      font-size: 12px;
      display: inline-block;
      width: 60px;

      color: #999999;
    }
    .number {
      font-size: 14px;
      color: #151515;
    }
    .status {
      font-size: 14px;
      position: absolute;
      right: 10px;
      line-height: 44px;
      color: #ff5601;
    }
  }
  dd {
      position: relative;padding:5px 10px;padding-left: 60px;
      font-size: 12px;
      color: #161616;
      span {
        position: absolute;left: 0;
        font-size: 12px;
        color: #999999;
        display: inline-block;
        width: 60px;
      }
    &:last-child{text-align: right; border-top: 1px solid #eee;}

    }
  .yuyue{
    padding: 2px 10px ; height: 44px; line-height: 44px;border-radius: 22px;
    border: 1px solid #eee;
  }
}
</style>
