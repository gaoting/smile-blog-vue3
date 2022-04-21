<template>
  <div class="content-box flex">
    <List
      :page="page"
      :allArticleList="allArticleList"
      @onShowSizeChange="onShowSizeChange"
    ></List>

    <div class="cont-right">
      <TagList></TagList>
      <CardList :newList="newList"></CardList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import Articles from "../interface/index";
import { allList, searchList } from "../../common/axios";
import List from "./list.vue";
import CardList from "./cardList.vue";
import TagList from "./tagList.vue";

let page = reactive({
  current: 1,
  total: 0,
  pageSize: 10,
});

let allArticleList = ref([] as Articles[]);
const onShowSizeChange = (ctx: any) => {
  page.current = ctx.current;
  page.pageSize = ctx.pageSize;
  console.log(ctx);
};

const getAllList = async () => {
  const { data } = await allList({
    pageSize: page.pageSize,
    current: page.current,
    types: "前端",
  });
  allArticleList.value = data.list as Articles[];
  page.total = data.total;
};

let newList = ref([] as Articles[]);
const getsearchList = async () => {
  const params = {
    types: "前端",
  };
  const { data } = await searchList(params);
  newList.value = data.list;
};

onMounted(() => {
  getAllList();
  getsearchList();
});
</script>

<style scoped>
</style>