<template>
  <div class="content-box flex">
    <div class="content-left-box">
      <a-tabs
        v-model:activeKey="activeKey"
        type="card"
        @change="changeTab"
        v-if="!route.query.id"
        :loading="loading"
      >
        <a-tab-pane key="0" tab="全部">
          <List
            :page="page"
            :allArticleList="allArticleList"
            @onShowSizeChange="onShowSizeChange"
          ></List>
        </a-tab-pane>
        <a-tab-pane key="1" tab="前端">
          <List
            :page="page"
            :allArticleList="allArticleList"
            @onShowSizeChange="onShowSizeChange"
          ></List>
        </a-tab-pane>
        <a-tab-pane key="2" tab="后端">
          <List
            :page="page"
            :allArticleList="allArticleList"
            @onShowSizeChange="onShowSizeChange"
          ></List>
        </a-tab-pane>
        <a-tab-pane key="4" tab="其他">
          <List
            :page="page"
            :allArticleList="allArticleList"
            @onShowSizeChange="onShowSizeChange"
          ></List>
        </a-tab-pane>

        <template #rightExtra>
          <a-button
            @click="addArticle"
            type="primary"
            style="margin-bottom: 8px"
            v-if="adminButton"
            ><edit-outlined />新建文章</a-button
          >
        </template>
      </a-tabs>
      <template v-else>
        <div class="top-title flex-between">
          <h2>
            <span>{{ title }}</span>
          </h2>
          <a-button @click="addArticle" type="primary" v-if="adminButton">
            <edit-outlined />
            新建文章
          </a-button>
        </div>
        <List
          :page="page"
          :allArticleList="allArticleList"
          @onShowSizeChange="onShowSizeChange"
        ></List>
      </template>
    </div>

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
import Articles from "../interface/article";
import { allList, searchList } from "../../common/axios";
import List from "./list.vue";
import CardList from "./cardList.vue";
import TagList from "./tagList.vue";
import { useRoute, useRouter } from "vue-router";
import { mainStore } from "../../store/typeList";

const activeKey = ref("0");
const title = computed(() =>
  route.query?.id ? store.tagsObj[+route.query?.id] : ""
);
let loading = ref(false);

let page = reactive({
  current: 1,
  total: 0,
  pageSize: 10,
});

const adminButton = computed(() => {
  return (
    localStorage.getItem("userName") &&
    localStorage.getItem("userName") === "admin"
  );
});

// 分页交互
let allArticleList = ref([] as Articles[]);
const onShowSizeChange = (ctx: any) => {
  page.current = ctx.current;
  page.pageSize = ctx.pageSize;
  console.log(ctx);
  getAllList();
};

const changeTab = () => {
  router.push({ path: "/frondPage" });
};

// 分页列表
const route = useRoute();
const getAllList = async () => {
  loading.value = true;
  const data = await allList({
    pageSize: page.pageSize,
    current: page.current,
    tags: route.query.id ? route.query.id : null,
    types: +activeKey.value ? +activeKey.value : null,
  });
  allArticleList.value = data.list as Articles[];
  page.total = data.total;
  loading.value = false;
};

const router = useRouter();
const addArticle = () => {
  router.push({ path: "articleAdd" });
};

watch([() => route.query, activeKey], () => getAllList());

// 热门推荐
let newList = ref([] as Articles[]);
const getsearchList = async () => {
  const params = {
    orderByDesc: ["lookNum"],
  };
  const result = await searchList(params);
  newList.value = result.list;
};

// 收藏列表
let collectList = ref([] as Articles[]);
const getCollectList = async () => {
  const params = {
    orderByDesc: ["loveNum"],
  };
  const result = await searchList(params);
  collectList.value = result.list;
};

const store = mainStore();

onMounted(() => {
  getAllList();
  getsearchList();
  getCollectList();
});
</script>

<style scoped lang="scss">
@import "../../assets/css/font.css";

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
.page-header {
  background-size: cover;
}

.top-title {
  // background: #fff;
  padding: 2px 0px 4px 6px;
  margin-bottom: 24px;
  border-bottom: 2px solid #5dc2ad;
  h2 {
    background: #5dc2ad;
    color: #fff;
    text-align: center;
    padding: 0px 32px;
    transform: skewX(-20deg);

    span {
      transform: skewX(20deg);
      display: inline-block;
      padding-bottom: 4px;
    }
  }
}
</style>
