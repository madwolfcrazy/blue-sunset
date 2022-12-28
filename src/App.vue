<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {ref} from "vue"
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {useLoadingStore} from '@/store/loading.js'
const LSS = useLoadingStore()
</script>

<template>
  <a-config-provider :locale="zhCN">
  <a-spin :spinning="LSS.getLoadingState">
    <router-view />
  </a-spin>
  </a-config-provider>
</template>

<style>

</style>
