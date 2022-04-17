import { defineStore } from "pinia";
import { cloneDeep, get, uniq } from "lodash-es";

export const useLoadingStore = defineStore('app.loading', {
  state: () => ({
    loadingState: false
  }),
  getters: {
    getLoadingState(state) {
      return state.loadingState;
    },
  },
  actions: {
    showLoading() {
      this.loadingState = true
    },
    hideLoading() {
      this.loadingState = false
    },
  }
})
