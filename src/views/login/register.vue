<template>
  <div class="register_container">
    <Cell-group>
      <Field v-model="mobile" placeholder="请输入用户名" />
      <Field v-model="name" placeholder="请输入手机号" />
      <Field v-model="contact" placeholder="请输入公司名称" />
    </Cell-group>
    <div class="do-register">
      <Button type="primary" class="enter" @click="handleSubmit" >立即注册使用</Button>
    </div>
  </div>
</template>

<script>
import { postRegiste } from '@/server';
import { CellGroup, Field, Row, Col, Button, Toast } from 'vant';

export default {
  name: 'register',
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
      name: '',
      contact: ''
    }
  },
  created() {
    
  },
  methods: {
    handleSubmit() {
      let params = {
        'sMobile': this.mobile,
        'sName': this.name,
        'sContacts': this.contact
      }
      postRegiste(params).then(
        res => {
          if(res.success == 1) {
            Toast(res.msg);
          }else {
            Toast(res.msg);
          }
        }
      )
    }
  }
}
</script>

<style lang="scss">
  .register_container {
    .do-register {
      margin: 15px;
      button{
        width: 100%;
      }
    }
  }
</style>