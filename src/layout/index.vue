<template>
  <a-layout class="layout-wrap">
    <div class="sider-fixed-stuff"></div>
    <a-layout-sider class="sider-fixed" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <router-link to="/gen-license"><span>生成License</span></router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <table-outlined />
          <router-link to="/license-list"><span>许可证列表</span></router-link>
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
            <label>AAA</label>
        </div>
        <div class="header-right header-buttons">
          <UserOutlined /> username
        </div>
      </a-layout-header>
      <vnam-tabs></vnam-tabs>
      <a-layout-content
        id="main-content"
      >
        <div class="layout-page-container-wrap">
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
.sider-fixed {
  position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
.layout-page-container-wrap {
  margin:-24px -24px 0;
}
</style>
