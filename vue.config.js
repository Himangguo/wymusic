/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 14:46:04
 * @LastEditors: mangguo
 * @LastEditTime: 2020-05-16 21:40:10
 */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        plugins: "@/plugins",
        network: "@/network",
        views: "@/views",
      },
    },
  },
  devServer: {
    disableHostCheck: true, // 这是由于新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname 不是配置内的，将中断访问
   
  }
};
