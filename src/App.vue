<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {ref} from "vue"
import {useLoadingStore} from '@/store/loading.js'
const LSS = useLoadingStore()
</script>

<template>
  <a-spin :spinning="LSS.getLoadingState">
    <router-view />
  </a-spin>
</template>

<style>

</style>
