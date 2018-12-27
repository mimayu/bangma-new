<template>
  <div class="login_container">
    <Cell-group>
      <Field v-model="mobile" placeholder="请输入用户名" />
      <Field v-model="passwd" placeholder="请输入密码" />
    </Cell-group>
    <Row gutter="20">
      <Col span="14">
        <Field v-model="code" placeholder="请输入验证码" />
      </Col>
      <Col span="10" class="pic-wrap">
        <img class="yzm-pic" :src='picCode' @click="handleGetCode">
      </Col>
    </Row>
    <div class="do-login">
      <Button type="primary" class="enter" @click="handleSubmit" >登录</Button>
    </div>
    <div class="do-register">
      <Button type="primary" class="register" @click="handleRegister" >立即注册使用</Button>
    </div>
  </div>
</template>

<script>
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
    this.picCode = this.createPicCode();
  },
  methods: {
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
              Toast.success('登录成功');
              this.$router.push('/detection');
              return;
          }
          if(res.success == 2) {
            if(res.msg == '验证码输入有误') {
                this.picCode = this.createPicCode();
            }
            Toast.fail(res.msg);
          }
        }
      )
    },
    handleRegister() {

    },
    handleReset(name) {
      
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