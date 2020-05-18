/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 14:38:18
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-03 09:38:34
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toastMessage from "@/plugins/toastMessage"; // message 提示消息插件
import loadingBox from "@/plugins/loadingBox"; // 加载动画插件
// 添加事件总线
Vue.prototype.$bus = new Vue();
Vue.use(toastMessage);
Vue.use(loadingBox);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
