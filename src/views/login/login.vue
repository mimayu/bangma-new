<template>
  <div class="login_container">
    <Cell-group>
      <Field v-model="mobile" placeholder="请输入用户名" />
      <Field v-model="passwd" placeholder="请输入密码" type="password"/>
    </Cell-group>
    <Row gutter="20">
      <Col span="14">
        <Field v-model="code" placeholder="请输入验证码" />
      </Col>
      <Col span="10" class="pic-wrap">
        <img class="yzm-pic" :src='picCode' @click="handleGetCode">
      </Col>
      <Col span="20" style="margin-left:12px;font-size:14px;color:#ccc;line-height:24px;">
        <input type="checkbox" v-model="checked" style="color:#ccc;">记住密码
      </Col>
    </Row>
    
    <div class="do-login">
      <Button type="primary" class="enter" @click="handleSubmit" >登录</Button>
    </div>
    <div class="do-register">
      <Button type="primary" class="register" @click="handleRegister" >公司立即申请使用</Button>
    </div>
  </div>
</template>

<script>
import { getIsLogin } from '@/server';
import { postLogin } from '@/server';
import { CellGroup, Field, Row, Col, Button, Toast } from 'vant';

export default {
  name: 'login',
  components: {
    CellGroup,
    Field,
    Row,
    Col,
    Button
  },
  data() {
    return {
      mobile: '',
      passwd: '',
      code: '',
      picCode: ''
    }
  },
  created() {
    this.getIsLogin();
    this.picCode = this.createPicCode();
    this.checked = true;
    this.getCookie();
  },
  methods: {
    getIsLogin() {
      getIsLogin().then(
        res => {
          if(res.success == 1) {

              if(res.role_type == 1 || res.role_type == 10){
                this.$router.push('/bossHome');
              }else if(res.role_type == 2){
                this.$router.push('/home');
              }else if(res.role_type == 3){
                this.$router.push('/managerHome');
              }else if(res.role_type == 4){
                this.$router.push('/assignHome');
              }else if(res.role_type == 5){
                this.$router.push('/foremanHome');
              }
              return;
          }
        }
      )
    },
    createPicCode() {
      let time = new Date().getTime();
      return `/api/getcode/?${time}`;
    },
    handleGetCode() {
      this.picCode = this.createPicCode();
    },
    handleSubmit(name) {
      let params = {
        'sUsername': this.mobile,
        'sPassword': this.passwd,
        'sCode': this.code
      }
      postLogin(params).then(
        res => {
          if(res.success == 1) {
              Toast('登录成功');

                const self = this;
              //判断复选框是否被勾选 勾选则调用配置cookie方法
              if (self.checked == true) {
                  //console.log("checked == true");
                  //传入账号名，密码，和保存天数3个参数
                  self.setCookie(self.mobile, self.passwd, 7);
              }else {
                //console.log("清空Cookie");
                //清空Cookie
                self.clearCookie();
              }
              //window.location.href = 'http://www.51bangma.com/api/setHudong/';
              if(res.role_type == 1 || res.role_type == 10){
                this.$router.push('/bossHome');
              }else if(res.role_type == 2){
                this.$router.push('/home');
              }else if(res.role_type == 3){
                this.$router.push('/managerHome');
              }else if(res.role_type == 4){
                this.$router.push('/assignHome');
              }else if(res.role_type == 5){
                this.$router.push('/foremanHome');
              }
                

              return;
          }
          if(res.success == 2) {
            if(res.msg == '验证码输入有误') {
                this.picCode = this.createPicCode();
            }
            Toast(res.msg);
          }
        }
      )
    },
    handleRegister() {
      this.$router.push('/register');
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "sUsername" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "sPassword" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
        if (document.cookie.length > 0) {
            var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'sUsername') {
                    this.mobile = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'sPassword') {
                    this.passwd = arr2[1];
                }
            }
        }
    },
    //清除cookie
    clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
}
</script>

<style lang="scss">
  .login_container {
    .pic-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      img {
        width: 60%;
      }
    }
    .do-login {
      margin: 15px;
      button{
        width: 100%;
      }
    }
    .do-register {
      margin: 15px;
      button{
        width: 100%;
      }
    }
  }
</style>