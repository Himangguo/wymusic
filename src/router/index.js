/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-02 14:38:18
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-15 20:17:24
 */
import Vue from "vue";
import Router from "vue-router";

// 重写router中的replace方法
const routerReplace = Router.prototype.replace;
Router.prototype.replace = function(location) {
  return routerReplace.call(this, location).catch(error => error);
};
// 重写router中的push方法
const routerPush = Router.prototype.push;
Router.prototype.push = function(location) {
  return routerPush.call(this, location).catch(error => error);
};
const Index = () => import("views/index/index");
const Login = () => import("views/login/Login");
const Password = () => import("views/login/Password");
const Home = () => import("views/home/Home");
const Mine = () => import("views/home/children/mine/Mine");
const Discover = () => import("views/home/children/discover/Discover");
const CloudVillage = () =>
  import("views/home/children/cloudVillage/CloudVillage");
const TVideo = () => import("views/home/children/tvideo/TVideo");
const MyLike = () => import("views/mylike/MyLike");
const Search = () => import("views/search/Search");
Vue.use(Router);
const routes = [
  {
    path: "",
    redirect: "/index"
  },
  {
    path: "/index",
    component: Index
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/pwd",
    name: "pwd",
    component: Password
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "",
        redirect: "mine"
      },
      {
        path: "mine",
        component: Mine
      },
      {
        path: "discover",
        component: Discover
      },
      {
        path: "cloudVillage",
        component: CloudVillage
      },
      {
        path: "tVideo",
        component: TVideo
      },
      {
        path: "myLike",
        component: MyLike
      },
      {
        path:"search",
        component:Search
      }
    ]
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
