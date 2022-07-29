<template>
  <div>
    <ul class="flex">
      <li v-for="item in allArticleList" :key="item.id">
        <a :href="item.url">
          <img :src="item.img" alt="" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { allList } from "../../common/axios";
interface Articles {
  author: string;
  tags: string;
  types: string;
  title: string;
  description: string;
  content: string;
  activeKey: string;
  picture: string;
  img: string;
  url: string;
  id: number | string;
}

let page = reactive({
  current: 1,
  total: 0,
  pageSize: 10,
});

let allArticleList = ref([] as Articles[]);
const getAllList = async () => {
  const { data } = await allList({
    pageSize: page.pageSize,
    current: page.current,
    type: "读书笔记",
  });
  allArticleList.value = data.list as Articles[];
  page.total = data.total;
};
</script>

<style lang="scss" scoped>
ul.flex {
  li {
    // width: ;
    img {
    }
    h3 {
    }
    p {
    }
  }
}
</style>