<template>
  <div id="upTop" @click="goback">
    <arrow-up-outlined />
  </div>
  <div class="footer">
    <!-- <ul class="flex">
      <li v-for="(item, index) in navList" :key="index">
        <a :href="item.url">{{ item.name }}</a>
      </li>
    </ul> -->
    <div class="footer-text">
      Copyright © 2022 Smile Blog ·
      <a
        href="https://beian.miit.gov.cn/#/Integrated/index"
        target="_blank"
        class="pointer"
      >
        皖ICP备2022000677号
      </a>
      · All Rights Reserved. 版权所有
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { ArrowUpOutlined } from "@ant-design/icons-vue";

const navList = reactive([{ url: "" }]);
const goback = () => {
  document.documentElement.scrollTop = 0;
};
</script>

<style scoped lang="scss">
.footer {
  background: #333;
  padding: 8px;
  .footer-text {
    text-align: center;
    color: #8590a6;
  }
}
#upTop {
  position: fixed;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 48px;
  right: 24px;
  bottom: 60px;
  color: #8590a6;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 3px #ccc;
  span {
    font-size: 24px;
    font-weight: bolder;
  }
  &:hover {
    background: #d3d3d3;
    color: #76839b;
  }
}
</style>