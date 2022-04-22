<template>
  <a-layout class="layout-wrap">
    <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span><router-link to="/gen-license">生成License</router-link></span>
        </a-menu-item>
        <a-menu-item key="2">
          <table-outlined />
          <span><router-link to="/license-list">许可证列表</router-link></span>
        </a-menu-item>
        <a-menu-item key="3" @click="logout">
          <logout-outlined />
          <span>退出系统</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout-body">
      <a-layout-header class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <div class="header-bow">
            <label>Short Left</label>
        </div>
        <div class="header-right header-buttons">
          <UserOutlined /> username
        </div>
      </a-layout-header>
      <vnam-tabs></vnam-tabs>
      <a-layout-content
        id="main-content"
      >
        <div class="layout-page-container-wrap-x">
            <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer class="fs-framework-footer">
        dev by ymz465
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  TableOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue';
import VnamTabs from './components/tabs/index.vue'
import { defineComponent, ref } from 'vue';
import {useRouter} from 'vue-router'
import {SessionStorage} from '@/store/localstorage'
export default defineComponent({
  components: {
    UserOutlined,
    TableOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    VnamTabs
  },
  setup() {
    const router = useRouter()
    return {
      //
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
      logout: () => {
        SessionStorage.remove('info')
        router.push('/login')
      }
    };
  },
});
</script>
<style>
.layout-wrap .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 5px;
  cursor: pointer;
  transition: color 0.3s;
}
.ant-layout-sider {
  min-height: 100vh;
}
.layout-wrap .trigger:hover {
  color: #1890ff;
}

.layout-wrap .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.anticon {margin-right:10px;}
.layout-page-container-wrap {
  margin:-24px -24px 0;
}
.ant-menu-item a {color: white;}
</style>
