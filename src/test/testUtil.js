/*
 * @Descripttion: 用于测试一些功能性代码
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-08 12:01:10
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-12 21:17:18
 */
function timeStrToSecond(timeStr) {
  let m, s;
  [m, s] = timeStr.split(":");
  return parseInt(m) * 60 + parseInt(s);
}
// console.log(timeStrToSecond("01:09 "));
function fib(numb) {
  if (numb === 0 || numb === 1) {
    return 1;
  }
  return fib(numb - 1) + fib(numb - 2);
}

function fib2(N) {
  var result = 0; //前两个数之和
  var pre_result = 1; //前一个数
  var next_older_result = 1; //前前一个数-_-！
  result = pre_result;
  while (N > 2) {
    N--;
    next_older_result = pre_result;
    pre_result = result;
    result = pre_result + next_older_result; //结果为前两个数之和
  }
  return result;
}
console.log(fib2(7));
