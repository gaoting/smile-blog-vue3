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
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { mainStore } from "@/store/typeList";
import { useRouter } from "vue-router";

const colorList = reactive([
  "#e18094",
  "#02bfbb",
  "#73d2ec",
  "#956ebf",
  "#1f74b9",
  "#46b2d8",
  "#f5b480",
  "#019997",
  "#f390a5",
  "#6ca9ab",
  "#bcabcd",
  "#5fc72c",
  "#ecbcce",
  "#edb458",
  "#d44969",
  "#e3a7b5",
  "#2dc3bb",
]);
const rand= items => items[Math.random() * items.length | 0];
const emit = defineEmits(["tagMsg"]);
const router = useRouter()
const tagMsg = (data: string) => {
  // emit("tagMsg", data);
  router.push({ path: "frondPage", query: { id: data.id } });
};
let cardList = ref();
onMounted(() => {
  const store = mainStore();
  cardList.value = store.tags;
});
</script>

<style scoped lang="scss">
.content-box .cont-right .card {
  h3 {
    display: inline-block;
  }
  ul.flex {
    flex-wrap: wrap;
    padding: 12px 20px;

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