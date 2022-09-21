
<template>
  <nav class="flex flex-end">
    <div class="flex">
      <div class="logo">
        <img src="../../assets/img/logo.svg" alt="smile" />
      </div>
      <ul class="flex">
        <li v-for="(item, index) in navigation" :key="index">
          <a :href="item.href">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="login-status">
      <a-dropdown v-if="user.isLogin">
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar style="background-color: #5ec1ae">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          {{ user.userName }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a @click="loginOut">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <router-link to="/login" v-else>注册 | 登录</router-link>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { UserOutlined } from "@ant-design/icons-vue";
import { onMounted, inject, watch } from "vue";
import { useRouter } from "vue-router";
import { DownOutlined } from "@ant-design/icons-vue";

const navigation = reactive([
  { name: "首页", href: "/", current: true },
  { name: "编程", href: "/frondPage", current: false },
  // { name: "后端", href: "/backstage", current: false },
  { name: "阅读", href: "/book", current: false },
  { name: "日志", href: "/diary", current: false },
  { name: "留言板", href: "/msglist", current: false },

  { name: "关于我", href: "/about", current: false },
]);

const route = useRouter();
const loginOut = () => {
  localStorage.clear();

  route.push({ path: "/login" });
  reload();
  console.log("ttsstststs");
};

let user = reactive({
  isLogin: localStorage.getItem("token") ? true : false,
  userName: localStorage.getItem("userName")
    ? localStorage.getItem("userName")
    : "",
});
const reload: any = inject("reload");
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  background: #333;
  height: 60px;
  padding: 0 20px;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .login-status {
    a {
      color: #5acab4;
    }
  }
  ul {
    width: 600px;
    margin: 10px 0;
    li {
      // width: 100px;
      padding: 0 16px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      a {
        color: #fff;
        font-size: 18px;
        font-weight: 400;
        display: block;
      }
      &:hover {
        background: #000;
        font-weight: bold;
        border-top-left-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
  }
}
.flex-end {
  justify-content: space-between;
}
:deep(a.router-link-active.router-link-exact-active) {
  font-size: 16px;
  color: #35dcba;
}
:deep(a.ant-dropdown-link.ant-dropdown-trigger) {
  color: #fff;
}
</style>