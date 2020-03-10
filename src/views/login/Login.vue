<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: mangguo
 * @Date: 2020-03-03 18:58:39
 * @LastEditors: mangguo
 * @LastEditTime: 2020-03-04 16:00:07
 -->
<template>
  <div class="login">
    <tapback>手机号登录</tapback>
    <div class="tip">未注册手机号登录后将自动创建账号</div>
    <div class="phone bBShadow">
      <div class>+86</div>
      <input class="input" type="number" placeholder="请输入手机号" v-model="phone" />
      <div class="clearInput" @click="clearInput" v-show="inputPhone">
        <i class="iconfont iconSize">&#xe604;</i>
      </div>
    </div>
    <div class="button1" @click="next">下一步</div>
  </div>
</template>
<script>
import tapback from "@/components/common/topback/TopBack";

import { checkPhone } from "@/network/login";
export default {
  data() {
    return {
      phone: "",
      toastMsg: ""
    };
  },
  components: {
    tapback
  },
  methods: {
    clearInput() {
      this.phone = "";
    },
    checkValid(phone) {
      let phoneReg = /^1[3-9]\d{9}$/;
      return phoneReg.test(phone);
    },
    next() {
      // 检测手机号是否合理
      if (this.checkValid(this.phone)) {
        // 检测手机号是否存在
        checkPhone(this.phone).then(res => {
          console.log(res);
          if (res.exist === 1) {
            // 如果此手机号注册过
            // 跳转到输入密码页面
            this.$router.push({
              name: "pwd",
              params: {
                phone: this.phone
              }
            });
          } else if (res.exist === -1) {
            this.$toastMessage({ message: "此手机号未注册过" });
          }
        });
      } else {
        // 如果手机号不合法
        this.$toastMessage({ message: "请输入11位数字的手机号" });
      }
    }
  },
  computed: {
    inputPhone() {
      return this.phone.length ? true : false;
    }
  }
};
</script>
<style scoped>
.tip {
  color: gray;
  font-size: 10px;
  padding: 5px;
}
.phone {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px;
}

.clearInput {
  position: absolute;
  right: 5px;
}
.iconSize {
  font-size: 20px;
}
</style>