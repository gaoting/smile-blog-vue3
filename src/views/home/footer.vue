<template>
  <div class="footer">
    <!-- <ul class="flex">
      <li v-for="(item, index) in navList" :key="index">
        <a :href="item.url">{{ item.name }}</a>
      </li>
    </ul> -->
    <div class="footer-text">
      Copyright © 2022 Smile Blog . All Rights Reserved. smile 版权所有
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "@vue/reactivity";

const navList = reactive([{ url: "" }]);
</script>

<style scoped lang="scss">
.footer {
  background: rgba(130, 212, 195, 0.8);
  padding: 8px;
  .footer-text {
    text-align: center;
    color: #0b8068;
  }
}
</style>