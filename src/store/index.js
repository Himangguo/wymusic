/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 14:38:18
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-04 16:48:46
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinf: {}
  },
  mutations: {
    loginIn(state, payload) {
      state.userinf = payload.userinf;
    }
  },
  actions: {},
  modules: {}
});
