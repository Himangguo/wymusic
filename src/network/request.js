/*
 * @Descripttion: 网络请求外部依赖的封装
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-03 20:18:24
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-18 09:24:16
 */
import axios from "axios";
import vue from "vue";
/**
 * @describe: 创建axios实例
 * @param {object} config 配置信息
 * @return: axios实例
 */
export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: "http://127.0.0.1:3000",
    timeout: 5000,
  });
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // 网络请求加载动画
      vue.prototype.$loadingBox("加载中");
      // token  uid
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  // 响应拦截
  instance.interceptors.response.use(
    (config) => {
      // 关闭加载动画
      vue.prototype.$loadingBox.close();
      return config.data;
    },
    (err) => {
      // 关闭加载动画
      vue.prototype.$loadingBox.close();
      console.log(err);
    }
  );
  return instance(config);
}
