<template>
  <div class="cont-left" v-if="allArticleList && allArticleList.length">
    <ul>
      <li v-for="item in allArticleList" :key="item.id" class="flex">
        <div :class="item.types !== '读书笔记' ? 'articleImg' : 'bookImg'">
          <img
            :src="item.picture"
            alt=""
            class="cont-img"
            @click="goUrl(item.id)"
          />
        </div>
        <div class="box-text">
          <h4>
            <a :href="`/content?id=${item.id}`">{{ item.title }}</a>
          </h4>
          <p v-if="item.description">
            {{
            item.description
            }}
          </p>
          <div class="flex text-list">
            <div class="flex">
              <span>分类：{{ store.typesObj[item.types] }}</span>
              <span>
                <tags-two-tone two-tone-color="#69CFC8" />
                {{ store.tagsObj[item.tags] }}
              </span>
              <span>
                <eye-outlined :style="{ color: '#02bfbb' }" />
                {{ item.lookNum }}
              </span>
              <span>
                <star-filled :style="{ color: '' }" />
                {{ item.loveNum }}</span
              >

              <span
                ><clock-circle-outlined />{{ timeStr(item.createTime) }}</span
              >
            </div>
            <button class="read" @click="goUrl(item.id)">阅 读</button>
          </div>
        </div>
      </li>
    </ul>
    <Pagination
      :page="page"
      class="right"
      @onShowSizeChange="onShowSizeChange"
    ></Pagination>
  </div>
  <div class="cont-empty" v-else>
    菩提本无树，明镜亦非台。本来无一物，何处惹尘埃。
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  reactive,
  ref,
  nextTick,
  PropType,
  toRefs,
  toRaw,
} from "vue";
import {
  TagsTwoTone,
  UserOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  ForwardOutlined,
  StarFilled,
} from "@ant-design/icons-vue";
import Pagination from "../../components/Pagination.vue";
import Articles from "../interface/article";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { mainStore } from "@/store/typeList";

interface PageType {
  current: number;
  pageSize: number;
  total: number;
}
const props = defineProps({
  allArticleList: {
    type: Array as PropType<Articles[]>,
    default: () => [],
  },
  page: {
    type: Object as PropType<PageType>,
    default: () => {
      return {
        current: 1,
        pageSize: 10,
        total: 0,
      };
    },
  },
});
const store = mainStore();
const router = useRouter();

const goUrl = (id: number) => {
  console.log(id);
  router.push({ path: "/content", query: { id } });
};

const textStr = (text: string) => {
  return text?.substring(0, 110);
};

const timeStr = (date: string) => {
  return date?.substring(0, 10);
};
const state = toRaw(props);

// 随机图片
let imgStr = ref("");

const randomStr = items => items[Math.random() * items.length | 0];
const getAssetsImages = () => {
  let imgUrl = new URL(
    `../../assets/img/${randomStr(store.bannerList)}`,
    import.meta.url
  ).href;
  return imgUrl;
};

// 去除描述的html标签
const textHtml = (str: string) => {
  const reg4 = /(<\/?font.*?>)|(<\/?span.*?>)|(<\/?a.*?>)/gi;
  let newStr = str.replace(reg4, "");
  return newStr.length > 90 ? newStr.substring(0, 90) : newStr;
};

// 分页交互
const emit = defineEmits(["onShowSizeChange"]);
const onShowSizeChange = (data: any) => {
  state.page.pageSize = data.pageSize;
  state.page.current = data.current;

  emit("onShowSizeChange", state.page);
};


</script>

<style scoped>
</style>