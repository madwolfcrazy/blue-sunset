<template>
  <div class="login-bg">
    <div class="form-wrap">
  <a-row>
    <a-col :md="{span:8, offset: 8}">
      <h2 class="login-title">XXXX 系统 <span class="login-version">beta 0.1</span></h2>
    </a-col>
  </a-row>
  <a-row>
   <a-col :md="{span:6, offset:9}" :xs="{span: 24}">
     <div class="">
       <a-form :label-col="{span:4}" :model="formState">

         <a-form-item label="">
          <a-input v-model:value="formState.username" size="large" placeholder="">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="">
          <a-input-password v-model:value="formState.pwd" size="large" placeholder="" @pressEnter="handleLoginClick">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" class="btn-login" @click="handleLoginClick">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
   </a-col>
 </a-row>
</div>
</div>
</template>
<script setup>
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons-vue';
import {reactive} from 'vue';
import { message } from 'ant-design-vue';
import {useRouter} from 'vue-router'
import {login} from '@/api/login'
import {SessionStorage} from '@/store/localstorage'

const router = useRouter()
const formState = reactive({
     layout: 'horizontal',
     username: '',
     pwd: '',
   });

const handleLoginClick = () => {
  login({username: formState.username, password: formState.pwd}).then( resp => {
    if(resp.code === 0) {
      message.success('登录成功！');
      SessionStorage.set('info', resp.data.token)
      router.push({path: '/home'})
    }else {
      message.error('用户名或密码错误！');
    }
  })
}
</script>
<style>
.form-wrap {margin-top:200px;}
.btn-login {width:100%;}
.login-title {font-size:32px;margin-bottom:32px;}
.login-bg {display:flex;height: 100vh;background:#f0f2f5 url(/static/login_bg.svg) no-repeat center 100px;background-size:100%;flex-direction: column;}
</style>
