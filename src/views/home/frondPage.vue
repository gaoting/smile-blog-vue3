<template>
  <div class="content-box flex">
    <List
      :page="page"
      :allArticleList="allArticleList"
      @onShowSizeChange="onShowSizeChange"
    ></List>

    <div class="cont-right">
      <TagList></TagList>
      <CardList :header="{ title: '我的收藏', url: '/' }"></CardList>
      <CardList :newList="newList"></CardList>
      <CardList
        :newList="collectList"
        :header="{ title: '收藏最多', url: '/' }"
      ></CardList>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import Articles from "../interface/article";
import { allList, searchList } from "../../common/axios";
import List from "./list.vue";
import CardList from "./cardList.vue";
import TagList from "./tagList.vue";
import { useRouter } from "vue-router";
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";

let page = reactive({
  current: 1,
  total: 0,
  pageSize: 10,
});

// 分页交互
let allArticleList = ref([] as Articles[]);
const onShowSizeChange = (ctx: any) => {
  page.current = ctx.current;
  page.pageSize = ctx.pageSize;
  console.log(ctx);
  getAllList()
};

// 分页列表
const getAllList = async () => {
  const { result } = await allList({
    pageSize: page.pageSize,
    current: page.current,
    types: "前端",
  });
  allArticleList.value = result.list as Articles[];
  page.total = result.total;
};

// 热门推荐
let newList = ref([] as Articles[]);
const getsearchList = async () => {
  const params = {
    types: "前端",
    orderByDesc: ["lookNum"],
  };
  const { result } = await searchList(params);
  newList.value = result.list;
};

// 收藏列表
let collectList = ref([] as Articles[]);
const getCollectList = async () => {
  const params = {
    types: "前端",
    orderByDesc: ["loveNum"],
  };
  const { result } = await searchList(params);
  collectList.value = result.list;
};

const store = mainStore();
const { token } = storeToRefs(store);
onMounted(() => {
  getAllList();
  getsearchList();
  getCollectList();
   console.log(token.value, "tttttttt2223333");
});
</script>

<style scoped lang="scss">
</style>