/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 14:46:04
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-04 13:48:29
 */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        plugins:"@/plugins",
        network: "@/network",
        views: "@/views"
      }
    }
  }
};
