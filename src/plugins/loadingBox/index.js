/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-05-03 09:14:36
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-03 21:16:46
 */
import Vue from "vue";
import vueLoadingBox from "./index.vue";

// 1. 将组件挂在到vue上
let LoadingTem = Vue.extend(vueLoadingBox);

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

// 2 .创建实例
let instance;
let timer = null; 
let time = 10000; // 默认超时时间为10s

let loadingBox = (options) => {
  if (!instance) {
    instance = new LoadingTem();
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
  
  if (typeof options === "string") {
    instance.message = options;
  } else if (isObject(options)) {
    let { message, time } = options;
    instance.message = message;
    time = time || 10000;
  } else {
    console.error(
      "参数格式错误，正确格式为'x'或{message:'x'}或{message:'x',time:5000}"
    );
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
loadingBox.close = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    instance.show = false;
    instance.message = "";
  }
};

// 挂载到全局
loadingBox.install = (Vue) => {
  Vue.prototype.$loadingBox = loadingBox;
};
export default loadingBox;
