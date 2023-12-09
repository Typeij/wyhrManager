import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //初始标签页
    breadItem:[
      { path: "/", name: "首页"},
      { path: "/layout/druglist", name: "商品列表"},
    ]
  },
  getters: {
  },
  mutations: {
    addItem(state, payload) {
      // 判断是否重复添加
      let repeatItem = state.breadItem.filter(v => {
        if (v.path == payload.path) {
          return v;
        }
      })
      if (repeatItem.length == 0) {
        state.breadItem.push(payload)
      }
    },

  },
  actions: {
  },
  modules: {
  }
})
