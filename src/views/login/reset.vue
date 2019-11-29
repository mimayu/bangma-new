<template>
  <div class="reset_container">
    <Cell-group>
      <Field v-model="passwd" placeholder="请输入原始密码" />
      <Field v-model="newPasswd" placeholder="请输入新密码" />
      <Field v-model="newRPasswd" placeholder="请确认新密码" />
    </Cell-group>
    <div class="do-login">
      <Button type="primary" class="enter" @click="handleSubmit" >重置</Button>
    </div>
  </div>
</template>

<script>
import { postReset } from '@/server';
import { CellGroup, Field, Button, Toast } from 'vant';

export default {
  name: 'reset',
  components: {
    CellGroup,
    Field,
    Button,
    Toast
  },
  data() {
    return {
      passwd: '',
      newPasswd: '',
      newRPasswd: '',
    }
  },
  methods: {
    handleSubmit(name) {
      let params = {
        'sPassword': this.passwd,
        'sNewPassword': this.newPasswd,
        'sReNewPassword': this.newRPasswd
      }
      postReset(params).then(
        res => {
          if(res.success == 1) {
              Toast('修改密码成功');
              this.$router.push('/');
              return;
          }
          if(res.success == 2) {
            Toast(res.msg);
          }
        }
      )
    }
  }
}
</script>

<style lang="scss">
    .reset_container {
        .do-login {
            margin-top: 10px;
            button{
                width: 100%;
            }
        }
    }
</style>