<template>
  <div id="userinfo">
   
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
}
</script>

<style scoped lang="scss">
#userinfo{background-color:#ccc;}
.userinfo_top{
  width:100%;height:64px;background-color:#fff;display:flex;align-items: center;justify-content: space-between;padding-left: 15px;padding-right:15px;
  .user_img{
    width:48px;height:48px;border-radius: 50%;
  }
  .user_right{
    display: flex;
    align-items: center;
    .user-details{
      margin-left: 10px;
    .user-name{font-size:14px;color: #191F25;}
    span{font-size: 9px;color:#191F25;} 
    }
  }
}
.basic-text{color:#9C9C9C;font-size:12px;background-color: #ccc;display: inline-block;width: 100%;height:25px;line-height:25px;padding-left:15px;}
.basic_info{
  background-color:#fff;
  .basic_info_title{
    height:44px;line-height:44px;border-bottom:1px solid #C6C6C6 ;
    .basic_info_list{
      color:#191F25;width:100%;display: flex;padding-left:15px;padding-right:15px;
      li{
        &:first-child{width: 25%;}
        &:last-child{width:25%;}
        &:nth-child(2){width:50%;}
      }
      .arrow{ text-align: right;}
      .arrow img{
        width: 8px;
        height: 14px;
        
      }
      .work-content::placeholder{
        margin-left:30%;
      }
    }
  }
}
textarea{
  height: 115px;background-color: #fff;width:100%;padding-left:15px;margin-right:15px;margin-bottom:15px;
}
textarea::placeholder {
        color: red;
    }
.order-text{color:#9C9C9C;font-size:12px;}
.order_info{
  background-color: #fff;
  .order_info_title{
    height:44px;line-height:44px;border-bottom:1px solid #c6c6c6;
    .order_info_list{
      color:#191F25;width:100%;display: flex;
       li{
        flex: 1;
        &:first-child{width: 20%;}
        &:last-child{width:20%;}
        &:nth-child(2){width:60%;}
      }
      .arrow{text-align: right;}
    }
  }
}
.basic_info_title{
    height:44px;line-height:44px;background-color:#fff;
    .basic_info_list{
      color:#191F25;width:100%;display: flex;padding-left:15px;padding-right:15px;
      li{
        &:first-child{width: 25%;}
        &:last-child{width:25%;}
        &:nth-child(2){width:50%;}
      }
      .arrow{text-align: right;}
      .work-content::placeholder{
        margin-left:30%;
      }
    }
  }
</style>
