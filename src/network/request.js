/*
 * @Descripttion: 网络请求外部依赖的封装
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-03 20:18:24
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-10 12:47:31
 */
import axios from "axios";
/**
 * @describe: 创建axios实例
 * @param {object} config 配置信息
 * @return: axios实例
 */
export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: "http://192.168.0.105:3000",

    // baseURL: "http://localhost:3000",
    timeout: 5000
  });
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // 网络请求加载动画
      // token  uid
      return config;
    },
    err => {
      console.log(err);
    }
  );
  // 响应拦截
  instance.interceptors.response.use(
    config => {
      return config.data;
    },
    err => {
      console.log(err);
    }
  );
  return instance(config);
}
