/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-05 20:37:48
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-06 17:46:46
 */
import { request } from "./request";
/**
 * @describe: 获取歌单详情
 * @param {string} id 歌单id
 * @return:
 */
export function getDetailsongList(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  });
}
/**
 * @describe:   获取音乐url
 * @param {String} id 歌曲id
 * @return:
 */
export function getSongUrl(id) {
  return request({
    url: "/song/url",
    params: {
      id
    }
  });
}
/**
 * @describe: 检查音乐的可用性
 * @param {String} id 歌曲id 
 * @return: 
 */
export function checkMusic(id) {
  return request({
    url: "/check/music",
    params: {
      id
    }
  });
}
