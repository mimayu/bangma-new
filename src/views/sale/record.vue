<template>
 
  <div class="record">
    <h3>签约成功  2008-09-09 16:30</h3>
    <div class="r-content">
      <p>客户临时提了个小需求，让帮在卫生间马桶旁边装个插座，好让她在上洗手间时可以可以给手机充电。</p>
      <p class="r-pic">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
      </p>
    </div>
    <h3>签约成功  2008-09-09 16:30</h3>
    <div class="r-content">
      <p>客户临时提了个小需求，让帮在卫生间马桶旁边装个插座，好让她在上洗手间时可以可以给手机充电。</p>
      <div class="r-pic">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
          <img src="../../assets/img/5.png">
      </div>
    </div>
</div>

</template>

<script>

export default {
  name: 'record',
  data () {
    return {
      // msg: '我是hello word'
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .record{
    background-color: #f6f6f6;
  }
  .record h3{
    padding: 5px 10px;
    color: #757575;
  }
  .r-content{
    padding: 5px 10px;
    background-color: #fff;
    color: #A3A4A6;
    font-size: 16px;
  }
  .r-pic{
    border-top: solid 1px #C6C6C6;
    padding: 10px;
    margin-top: 3px;
    // display:flex;
    img{max-width:20%;height:auto;margin:5px;}
  }
 
</style>
