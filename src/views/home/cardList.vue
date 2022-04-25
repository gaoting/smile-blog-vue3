<template>
  <div class="card2 card">
    <div class="flex card-title">
      <h3>
        <img src="../../assets/img/f14.png" alt="" class="animal" />
        {{ header.title }}
      </h3>
      <a href="/">更多</a>
    </div>

    <ul v-if="loveList && loveList.length > 0">
      <li v-for="(item, index) in loveList" :key="item.id" class="flex">
        <a href="`/content?=${id}`">
          <span :class="index < 3 ? 'order' : ''">{{ index + 1 }}</span>
          {{ item.title }}
        </a>
        <span>{{ timeStr(item.updateTime) }}</span>
      </li>
    </ul>

    <ul v-else-if="newList && newList.length > 0">
      <li v-for="(item, index) in newList" :key="item.id" class="flex">
        <a href="`/content?=${id}`">
          <span :class="index < 3 ? 'order' : ''">{{ index + 1 }}</span>
          {{ item.title }}
        </a>
        <span style="color: #ea3657">
          <fire-filled style="color: #ea3657; font-size: 16px" />
          {{ item.lookNum }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import Articles from "../interface/index";
import { FireFilled } from "@ant-design/icons-vue";

const timeStr = (date: string) => {
  return date?.substring(0, 10);
};

const props = defineProps({
  newList: { type: Array, default: () => [] as Array<Articles[]> },
  header: { type: Object, default: { title: "热门推荐", url: "/" } },
  timer: { type: Number, default: 0 },
});

let state = reactive({
  ...props,
});

// 获取我的收藏
let loveList = ref([] as Articles[]);
const getLove = () => {
  if (props.header.title == "我的收藏") {
    const data = localStorage.getItem("myLove");
    if (data) {
      // console.log(JSON.parse(data));
      let arr = JSON.parse(data).reverse();
      if (arr.length > 10) {
        loveList.value = arr.splice(0, 10);
      } else {
        loveList.value = arr;
      }
      console.log(loveList.value);
    }
  }
};

// watch(
//   loveList,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal);
//   },
//   { deep: true }
// );

watch(
  () => props.timer,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
    getLove();
  }
);

onMounted(() => {
  getLove();
});
</script>

<style scoped>
</style>