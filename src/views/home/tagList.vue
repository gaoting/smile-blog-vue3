<template>
  <div class="card card2">
    <div class="card-title">
      <h3><img src="../../assets/img/f14.png" alt="" class="animal" />标签</h3>
    </div>
    <ul class="flex tag-list">
      <li
        v-for="(item, index) in cardList"
        :key="index"
        @click="tagMsg(item)"
        :style="{ background: rand(colorList) }"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import Articles from "../interface/article";

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

const colorList = reactive([
  "#e18094",
  "#02bfbb",
  "#e3a7b5",

  "#2dc3bb",
  "#6ca9ab",
  "#bcabcd",
  "#cabbda",
  "#dbabbd",
  "#9cb9c1",
  "#46b2d8",
  "#f5b480",
  "#73d2ec",
  "#69CFC8",
  "#ecbcce",

  "#019997",
  "#f390a5",
]);
const rand = (arr: Array<string>) => {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
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
    padding: 16px;

    li {
      list-style-type: none;
      cursor: pointer;
      color: #fff;
      display: block;
      text-align: center;
      font-size: 13px;
      font-weight: 400;
      border: 0;
      padding: 3px 12px;
      border-radius: 2px;
      margin: 0 4px 8px;
      box-sizing: border-box;

      &:hover {
        box-shadow: 0 3px 5px #666;
      }
    }
  }
}
</style>