<template>
  <div class="article-box">
    <div class="article-title">{{ data.title }}</div>
    <div class="flex">
      <p>作者：{{ data.author }}</p>
      <p>时间：{{ data.updateTime }}</p>
      <p>浏览：{{ data.lookNum }}</p>
    </div>
    <div class="article-content">
      <strong>{{ data.description }}</strong>
      <div>
        {{ data.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { findById } from "../../common/axios";
import Articles from "../interface/index";

const props = defineProps({
  id: Number,
});

let data = ref({} as Articles);
const getRightsList = async (id: number) => {
  // const { data } = await findById(id);
  // data.value = data.list as any;
};

// const findById = 

onMounted(() => {
  const route = useRoute();
  console.log(route.query);
});
</script>

<style scoped>
</style>