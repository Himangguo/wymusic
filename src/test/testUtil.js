/*
 * @Descripttion: 用于测试一些功能性代码
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-08 12:01:10
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-08 12:03:23
 */
function timeStrToSecond(timeStr) {
  let m, s;
  [m, s] = timeStr.split(":");
  return parseInt(m) * 60 + parseInt(s);
}
console.log(timeStrToSecond("01:09 "));