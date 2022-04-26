<template>
  <div class="card card2">
    <div class="card-title">
      <h3><img src="../../assets/img/f14.png" alt="" class="animal" />标签</h3>
    </div>
    <ul class="flex tag-list">
      <li v-for="(item, index) in cardList" :key="index" @click="tagMsg(item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import Articles from "../interface/index";

const cardList = reactive([
  "vue",
  "typescript",
  "JavaScript",
  "node.js",
  "nest.js",
  "es6+",
  "MySQL",
  "工具",
  "css",
  "vite",
  "webpack",
  "git",
  "软件",
  "rollup",
  "linux",
  "读书笔记",
  "壁纸",

  "日志",
]);

const emit = defineEmits(["tagMsg"]);
const tagMsg = (data: string) => {
  emit("tagMsg", data);
};
onMounted(() => {});
</script>

<style scoped lang="scss">
.content-box .cont-right .card {
  height: 256px;
  h3 {
    display: inline-block;
  }
  ul.flex {
    flex-wrap: wrap;
    margin-top: 16px;

    li {
      list-style-type: none;
      width: 33.33333%;
      height: 30px;
      cursor: pointer;
      color: #666;
      border-right: 1px solid #f2f2f2;
      border-bottom: 1px solid #f2f2f2;

      display: block;
      text-align: center;
      line-height: 16px;
      font-size: 13px;
      font-weight: 400;
      &:nth-child(3n) {
        border-right: 0;
      }

      &:nth-last-child(3),
      &:nth-last-child(2),
      &:nth-last-child(1) {
        border-bottom: 0;
      }
      &:hover {
        background: #ff99ac;
        color: #fff;
      }
    }
  }
}
</style>