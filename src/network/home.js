/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-04 17:15:01
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-04 17:48:52
 */
import { request } from "./request";
export function getPlayList(uid) {
  return request({
    url: "/user/playlist",
    params: {
      uid
    }
  });
}
