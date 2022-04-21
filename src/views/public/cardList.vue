<template>
  <div class="card2 card">
    <div class="flex card-title">
      <h3>
        <img src="../../assets/img/f14.png" alt="" class="animal" />热门文章
      </h3>
      <a href="">更多</a>
    </div>
    <ul>
      <li v-for="(item, index) in newList" :key="item.id" class="flex">
        <a href="">
          <span :class="index < 3 ? 'order' : ''">{{ index + 1 }}</span>
          {{ item.title }}
        </a>
        <span>{{ timeStr(item.updateTime) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import Articles from "../interface/index";

const timeStr = (date: string) => {
  return date?.substring(0, 10);
};

const props = defineProps({
  newList: Array,
  default: () => [] as Array<Articles[]>,
});

let state = reactive({
  ...props,
});

onMounted(() => {});
</script>

<style scoped>
</style>