
<template>
  <nav class="flex">
    <div class="logo">
      <img src="../../assets/img/logo.svg" alt="smile" />
    </div>
    <ul class="flex">
      <li v-for="(item, index) in navigation" :key="index">
        <a :href="item.href">{{ item.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { reactive } from "@vue/reactivity";

const navigation = reactive([
  { name: "首页", href: "/", current: true },
  { name: "前端", href: "frondPage", current: false },
  { name: "后端", href: "/backstage", current: false },
  { name: "日志", href: "/log", current: false },
  { name: "关于我", href: "/about", current: false },
]);
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
</style>