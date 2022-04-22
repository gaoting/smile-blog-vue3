<template>
  <div class="content-box flex">
    <div class="cont-left">
      <div class="article-box">
        <div class="article-title">{{ newDate.title }}</div>
        <div class="flex">
          <p>作者：{{ newDate.author }}</p>
          <p>时间：{{ $utils.timeStr(newDate.updateTime) }}</p>
          <p>浏览：{{ newDate.lookNum }}</p>
        </div>
        <div class="article-content">
          <strong>{{ newDate.description ? newDate.description : "" }}</strong>
          <div>
            {{ newDate.content }}
          </div>
        </div>
        <div class="flex next-page">
          <span @click="goPage(newDate.prevId)">{{ newDate.prevTitle }}</span>
          <span @click="goPage(newDate.nextId)">{{ newDate.nextTitle }}</span>
        </div>
      </div>
    </div>

    <div class="cont-right">
      <TagList></TagList>
      <CardList :newList="newList"></CardList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { findById, searchList } from "../../common/axios";
import Articles from "../interface/index";
import CardList from "./cardList.vue";
import TagList from "./tagList.vue";

const props = defineProps({
  id: Number,
});

let getId = ref(0);
const route = useRoute();
let newDate = ref({} as Articles);

const getRightsList = async () => {
  const { data } = await findById({ id: getId.value });
  newDate.value = data.list[0] as any;
  console.log(newDate.value);
};

let newList = ref([] as Articles[]);
const getNewList = async () => {
  const { data } = await searchList({ types: "前端" });
  newList.value = data.list;
};

const router = useRouter();
const goPage = (id: number) => {
  router.push({
    path: "/content",
    query: {
      id: id,
    },
  });
};

onMounted(() => {
  console.log(route.query);
  getId.value = parseInt(route.query.id as string);

  // getRightsList();
  getNewList();
});
</script>

<style scoped lang="scss">
.article-box {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  .article-title {
    font-size: 32px;
    text-align: center;
  }
  .flex {
    justify-content: center;
    p {
      margin-right: 20px;
      color: #757575;
    }
  }
}
</style>