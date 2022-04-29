<template>
  <div class="cont-left">
    <ul>
      <li v-for="item in allArticleList" :key="item.id" class="flex">
        <div class="articleImg">
          <img :src="imgStr" alt="" class="cont-img" @click="goUrl(item.id)" />
        </div>
        <div class="box-text">
          <h4>
            <a :href="`/content?id=${item.id}`">{{ item.title }}</a>
          </h4>
          <p>
            {{ textHtml(item.description) }}
        
          </p>
          <div class="flex text-list">
            <div class="flex">
              <span>分类：{{ item.types }}</span>
              <span>
                <tags-two-tone two-tone-color="#69CFC8" />
                {{ item.tags }}
              </span>
              <span>
                <eye-outlined :style="{ color: '#02bfbb' }" />
                {{ item.lookNum }}次浏览
              </span>
              <span>
                <star-filled :style="{ color: '' }" />
                {{ item.loveNum }}个收藏</span
              >

              <span
                ><clock-circle-outlined />{{ timeStr(item.updateTime) }}</span
              >
            </div>
            <button class="read" @click="goUrl(item.id)">阅 读</button>
          </div>
        </div>
      </li>
    </ul>
    <Pagination
      :page="page"
      v-if="allArticleList.length > 1"
      class="right"
      @onShowSizeChange="onShowSizeChange"
    ></Pagination>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, nextTick } from "vue";
import {
  TagsTwoTone,
  UserOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  ForwardOutlined,
  StarFilled,
} from "@ant-design/icons-vue";
import Pagination from "../../components/Pagination.vue";
import Articles from "../interface/index";
import { useRoute, useRouter } from "vue-router";
import { object } from "vue-types";

const props = defineProps({
  allArticleList: {
    type: Array,
    default: () => [] as Articles[],
  },
  page: {
    type: Object,
    default: () => {
      return {
        current: 1,
        pageSize: 10,
        total: 0,
      };
    },
  },
});
const router = useRouter();

const goUrl = (id: number) => {
  console.log(id);
  router.push({ path: "/content", query: { id } });
};

const textStr = (text: string) => {
  return text?.substring(0, 110);
};

let state = reactive({
  ...props,
});

const timeStr = (date: string) => {
  return date?.substring(0, 10);
};

// 随机图片
let imgStr = ref("");
const imgList: Array<string> = reactive(["bg48.jpg"]);
function randomStr(arr: Array<string>) {
  let newArr: Array<string> = [];
  while (arr.length > 0) {
    let randomIndex = Math.random() * arr.length;
    newArr.push(arr[parseInt(randomIndex + "")]);
    arr.splice(randomIndex, 1);
  }
  return newArr[0];
}

// 去除描述的html标签
const textHtml = (str: string) => {
  const reg4 = /(<\/?font.*?>)|(<\/?span.*?>)|(<\/?a.*?>)/gi;
  return str.replace(reg4, "");
};

onMounted(() => {
  imgStr.value = "/src/assets/img/" + randomStr(imgList);
});

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