/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-05-15 09:25:14
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-15 09:28:34
 */

import { request } from "./request";
export function search(keywords) {
  return request({
    url: "/search",
    params: {
      keywords
    }
  });
}
