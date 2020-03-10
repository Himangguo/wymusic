/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-03 20:36:35
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-04 16:33:55
 */
import { request } from "./request";
/**
 * @describe: 检测手机号是否注册
 * @param {string} phone 手机号
 * @return:
 */
export function checkPhone(phone) {
  return request({
    url: "/cellphone/existence/check",
    params: {
      phone
    }
  });
}
/**
 * @describe: 手机登陆
 * @param {string} phone 手机号
 * @param {string} password 密码
 * @return:
 */
export function phoneLogin(phone, password) {
  return request({
    url: "/login/cellphone",
    params: {
      phone,
      password
    }
  });
}
/**
 * @describe: 退出登录
 * @param
 * @return:
 */
export function logout() {
  return request({
    url: "/logout"
  });
}

/**
 * @describe: 查看用户登录状况
 * @param
 * @return:
 */

export function checkStatus() {
  return request({
    url: "/login/status"
  });
}
