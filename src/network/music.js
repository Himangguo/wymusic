/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-06 21:07:10
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-06 21:08:34
 */
import { request } from "./request";

export function getWordsOfMusic(id) {
  return request({
    url: "/lyric",
    params: {
      id
    }
  });
}
