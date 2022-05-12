<template>
  <div class="flex">
    <span>单价</span>
    <span>{{ price }}</span>
  </div>

  <div class="flex">
    <span>数量</span>
    <span>{{ num }}</span>
  </div>

  <div class="flex">
    <span @click="compute">合计</span>

    <span>{{ count }}</span>
  </div>
</template>

<script setup lang="ts">

import { mainStore } from "@/store/index";
import { storeToRefs } from "pinia";

const store = mainStore();
const { count, num, price } = storeToRefs(store);


</script>

<style scoped lang="scss">
span {
  border: 1px solid #ccc;
  display: inline-block;
  min-width: 28px;
  // height: 28px;
  text-align: center;
  margin: 20px;
  padding: 8px 16px;
  &:first-child {
    border: 0;
  }
}
</style>