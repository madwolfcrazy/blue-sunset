import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "@/style/index.scss";

import { store } from "./store";
import router from "./router";

const app = createApp(App).use(Antd).use(store).use(router)
app.mount('#app')
