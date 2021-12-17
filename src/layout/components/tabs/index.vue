
<script>
import Sortable from "sortablejs";
import { useTabsStore } from "@/store/tabs";
import { computed, defineComponent } from "vue";
import { HomeOutlined, MoreOutlined, ArrowLeftOutlined, ArrowRightOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    HomeOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    MoreOutlined
  },
  setup() {
    const tabsStore = useTabsStore();
    const tmpTabs = [
      {name: 'AAA', fullPath: '/aaaa', meta:{title: 'AAA'}},
      {name: 'BBB', fullPath: '/bbbb', meta:{title: 'BBB'}},
      {name: 'CHIJ', fullPath: '/chi-ij', meta:{title: 'chi ij'}},
    ]
    const actions = {
      close: tabsStore.close,
      closeLeft: tabsStore.closeLeft,
      closeRight: tabsStore.closeRight,
      closeOther: tabsStore.closeOther,
      closeAll: tabsStore.closeAll,
      openedSort: tabsStore.openedSort
    };
    const computeOpened = computed(() => {
      return tabsStore.getOpened;
    });
    return {
      page: tabsStore,
      tmpTabs,
      ...actions,
      computeOpened
    };
  },
  data() {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuListIndex: [{ icon: "times-circle", title: "关闭全部", value: "all" }],
      contextmenuList: [
        { icon: "arrow-left", title: "关闭左侧", value: "left" },
        { icon: "arrow-right", title: "关闭右侧", value: "right" },
        { icon: "times", title: "关闭其它", value: "other" },
        { icon: "times-circle", title: "关闭全部", value: "all" }
      ],
      tagName: "/index",
    };
  },
  mounted() {
    const el = document.querySelectorAll(".OT-multiple-page-sort .el-tabs__nav")[0];
    // Sortable.create(el, {
    //   onEnd: (evt) => {
    //     const { oldIndex, newIndex } = evt;
    //     this.openedSort({ oldIndex, newIndex });
    //   }
    // });
  },
  methods: {
    /**
     * @description 计算某个标签页是否可关闭
     * @param {Object} page 其中一个标签页
     */
    isTabClosable(page) {
      return page.name !== "index";
    },
    /**
     * @description 右键菜单功能点击
     * @param {Object} event 事件
     */
    handleContextmenu(event) {
      let target = event.target;
      // fix https://github.com/fs-projects/fs-admin/issues/54
      let flag = false;
      if (target.className.indexOf("el-tabs__item") > -1) flag = true;
      else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
        target = target.parentNode;
        flag = true;
      }
      if (flag) {
        event.preventDefault();
        event.stopPropagation();
        this.contentmenuX = event.clientX;
        this.contentmenuY = event.clientY;
        this.tagName = target.getAttribute("aria-controls").slice(5);
        this.contextmenuFlag = true;
      }
    },
    /**
     * @description 右键菜单的 row-click 事件
     * @param {String} command 事件类型
     */
    contextmenuClick(command) {
      this.handleControlItemClick(command, this.tagName);
    },
    /**
     * @description 接收点击关闭控制上选项的事件
     * @param {String} command 事件类型
     * @param {String} tagName tab 名称
     */
    handleControlItemClick(command, tagName = null) {
      //if (tagName) this.contextmenuFlag = false;
      const params = { pageSelect: tagName };
      switch (command.key) {
        case "left":
          this.closeLeft(params);
          break;
        case "right":
          this.closeRight(params);
          break;
        case "other":
          this.closeOther(params);
          break;
        case "all":
          this.closeAll();
          break;
        default:
          this.$message.error("无效的操作");
          break;
      }
    },
    /**
     * @description 接收点击 tab 标签的事件
     * @param {object} tab 标签
     * @param {object} event 事件
     */
    handleClick(tab) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.page.getOpened.find((page) => page.fullPath === tab);
      if (page) {
        const { name, params, query } = page;
        this.$router.push({ name, params, query });
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里
     * @param {String} tagName tab 名称
     */
    handleTabEdit(tagName, action) {
      if (action === "remove") {
        this.close({ tagName });
      }
    }
  }
});
</script>
<style lang="scss">
.OT-multiple-page-control-group {
  width: 100%;
  display: flex;
  margin-top: 6px;
  .OT-multiple-page-control-content {
    flex: 1;
    overflow-x: auto;
  }
  .OT-multiple-page-control-btn {
    flex: 0;
  }
}
.OT-multiple-page-control-group {
  .ant-tabs-bar {
    margin: 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav {
    .ant-tabs-tab {
      margin-right: 0;
      border-right: 0;
      &:first-of-type {
        border-top-left-radius: 2px;
      }
      &:last-of-type {
        border-top-right-radius: 2px;
        border-right: 1px;
      }
      &:not(.ant-tabs-tab-active) {
        color: #666;
      }
    }
    .ant-tabs-tab-active {
      border-bottom-color: #fff;
    }
  }
  .ant-tabs-close-x {
    display: none;
  }
  .ant-tabs-tab {
    &:hover {
      .ant-tabs-close-x {
        display: initial;
      }
    }
  }
  .ant-tabs-tab-active {
    .ant-tabs-close-x {
      display: initial;
    }
  }
  .OT-multiple-page-control-btn {
    display: flex;
    .ant-btn {
      display: flex;
      align-items: center;
      justify-items: center;
      height: 100%;
      color: #666;
      border-bottom: 1px solid #f0f0f0;
    }
    .ant-dropdown-trigger {
      border: none;
    }
  }
  .ant-tabs-tab-arrow-show {
    border: 1px solid #e5e7eb;
  }
  .ant-tabs-tab-prev {
    border-right: 0;
    border-bottom: 0;
  }
  .ant-tabs-tab-next {
    border-left: 0;
    border-bottom: 0;
  }
}
</style>
<template>
  <div class="OT-multiple-page-control-group">
    <div class="OT-multiple-page-control-content">
      <div class="OT-multiple-page-control-content-inner">
        <a-tabs
          class="OT-multiple-page-control OT-multiple-page-sort"
          :active-key="page.getCurrent"
          type="editable-card"
          hide-add
          @tabClick="handleClick"
          @edit="handleTabEdit"
          @contextmenu="handleContextmenu"
        >
          <a-tab-pane
            v-for="item in tmpTabs"
            :key="item.fullPath"
            :tab="item.meta?.title || '未命名'"
            :name="item.fullPath"
            :closable="isTabClosable(item)"
          />
        </a-tabs>
      </div>
    </div>
    <div class="OT-multiple-page-control-btn">
      <a-dropdown-button class="btn-ddd" size="default" split-button @click="closeAll">
        <template #icon><MoreOutlined /></template>
        <template #overlay>
          <a-menu @click="(command) => handleControlItemClick(command)">
            <a-menu-item key="left">
              <ArrowLeftOutlined />
              关闭左侧
            </a-menu-item>
            <a-menu-item key="right">
              <ArrowRightOutlined />
              关闭右侧
            </a-menu-item>
            <a-menu-item key="other">
              <ClockCircleOutlined />
              关闭其它
            </a-menu-item>
            <a-menu-item key="all">
              <CloseCircleOutlined />
              全部关闭
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown-button>
    </div>
  </div>
</template>
