/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-04 13:35:58
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-04 14:27:15
 */
import Vue from "vue";
import vueToastMessage from "./index.vue";

/**
 * @describe:判读对象是否为object
 * @param {any} obj 对象
 * @return: boolean
 */
function isObject(obj) {
  if (Object.prototype.toString.call(obj).slice(8, -1) === "Object") {
    return true;
  }
  return false;
}

// 1. 将组件挂在到vue上
let ToastTem = Vue.extend(vueToastMessage);

// 2 .创建实例
let instance;
let timer = null;

let toastMessage = options => {
  if (!instance) {
    instance = new ToastTem();
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
  }
  console.log(options);
  // 3. 防抖处理
  if (timer) {
    clearTimeout(timer);
    timer = null;
    instance.show = false;
    instance.message = "";
  }
  let time = 3000; // 默认显示时间3秒
  
  // 4. toast上的msg
  if (typeof options === "string") {
    instance.message = options;
  } else if (isObject(options)) {
    let { message, time } = options;
    instance.message = message;
    time = time || 3000;
  } else {
    console.error("参数格式错误，正确格式为{message:'x'}");
    return;
  }

  // 5. 显示toast
  instance.show = true;
  
  // 6. time时间后隐藏
  timer = setTimeout(() => {
    instance.show = false;
    clearTimeout(timer);
    timer = null;
    instance.message = "";
  }, time);
};
toastMessage.close = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    instance.show = false;
    instance.message = "";
  }
};
// 挂载到全局
toastMessage.install = Vue => {
  Vue.prototype.$toastMessage = toastMessage;
};
export default toastMessage;
