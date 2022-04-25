<template>
  <div class="content-box flex">
    <div class="cont-left">
      <div class="article-box">
        <div class="article-title">{{ newDate.title }}</div>
        <div class="flex msg-title">
          <div class="flex">
            <img src="../../assets/img/photo.png" alt="" />
            <div class="msg-box">
              <h5>
                {{ newDate.author }}
              </h5>
              <div class="flex">
                <p>{{ $utils.myTimeToLocal(newDate.updateTime) }}</p>
                <p>浏览：{{ newDate.lookNum }}</p>
                <p>收藏：{{ newDate.loveNum }}</p>
              </div>
            </div>
          </div>
          <div class="power">
            <a-button type="red" v-if="!love" @click="goLove(true)">
              <template #icon><HeartOutlined /></template>
              收藏
            </a-button>
            <a-button type="red" v-if="love" @click="goLove(false)">
              <template #icon><CheckCircleFilled /></template>
              已收藏
            </a-button>
          </div>
        </div>

        <!-- 内容 -->
        <div class="article-content">
          <p>{{ newDate.description }}</p>
          <div class="content-text"></div>
        </div>
        <!-- 内容 -->

        <div class="myMsg flex" @click="goUrl('/content')">
          <img src="../../assets/img/photo.png" alt="" />
          <div class="msg-content">
            <h5>smile</h5>
            <p>
              清清楚楚看昨天，扎扎实实抓今天，高高兴兴看明天。向昨天要经验，向明天要动力，向今天要成果。记住昨天，思索明天，善待今天！
            </p>
          </div>
          <img src="../../assets/img/code.png" alt="" />
        </div>
        <div class="footer-msg flex">
          <p>
            分类： <span>{{ newDate.types }}</span>
          </p>
          <p>
            标签： <span>{{ newDate.tags }}</span>
          </p>
        </div>
        <div class="flex next-page">
          <span
            class="pointer"
            @click="goUrl('/content', newDate.prevId)"
            v-if="newDate.prevId"
          >
            <left-circle-filled />
            {{ newDate.prevTitle }}
          </span>
          <span v-else> <left-circle-filled />已是第一篇</span>

          <span
            class="pointer"
            @click="goUrl('/content', newDate.nextId)"
            v-if="newDate.nextId"
          >
            <right-circle-filled />
            {{ newDate.nextTitle }}
          </span>
          <span v-else> <right-circle-filled />已是最后一篇</span>
        </div>
      </div>
    </div>

    <div class="cont-right">
      <TagList></TagList>

      <CardList
        :header="{ title: '我的收藏', url: '/' }"
        @click="handleCreate"
        :timer="timer"
      ></CardList>
      <CardList :newList="newList"></CardList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { findById, searchList } from "../../common/axios";
import Articles from "../interface/index";
import CardList from "./cardList.vue";
import TagList from "./tagList.vue";
import {
  HeartOutlined,
  RightCircleFilled,
  LeftCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons-vue";
import { updateNum } from "../../common/axios";

const props = defineProps({
  id: Number,
});

let getId = ref(0);
const route = useRoute();
let newDate = ref({} as Articles);

// 获取详情   设置content description 标签转译
const getRightsList = async () => {
  const { data } = await findById({ id: getId.value });
  newDate.value = data as any;
  console.log(newDate.value);
  newDate.value.lookNum += 1;
  nextTick(() => {
    let doms = document.querySelector(".content-text");
    let desc = document.querySelector(".article-content>b");
    doms ? (doms.innerHTML += newDate.value.content) : "";
    desc ? (desc.innerHTML += newDate.value.description) : "";
  });
};

// 热门文章
let newList = ref([] as Articles[]);
const getNewList = async () => {
  const { data } = await searchList({ types: "前端" });
  newList.value = data.list;
};

// 刷新子组件
let timer = ref(0);
const handleCreate = () => {
  timer.value = new Date().getTime();
};

// 收藏 / 取消收藏
let love = ref(false);
const goLove = async (bool: boolean) => {
  love.value = !love.value;
  let getData = localStorage.getItem("myLove");

  if (getData && JSON.parse(getData).length > 0) {
    let arr = [...JSON.parse(getData)];

    if (bool) {
      console.log("tttttttttt");
      let index = arr.findIndex((v) => v.id == getId.value);
      if (index == -1) {
        arr.push(newDate.value);
        localStorage.setItem("myLove", JSON.stringify(arr));
        console.log(newDate.value.loveNum);
        const { data } = await updateNum({
          id: newDate.value.id,
          loveNum: newDate.value.lookNum,
        });
        newDate.value.loveNum = data.loveNum;
      }
    } else {
      arr = arr.filter((v) => v.id !== getId.value);
      localStorage.setItem("myLove", JSON.stringify(arr));
      const { data } = await updateNum({
        id: newDate.value.id,
        loveNum: newDate.value.lookNum - 2,
      });
      console.log(newDate.value.lookNum - 2, data.loveNum);
      newDate.value.loveNum = data.loveNum;
    }
  } else {
    let arr = [];
    arr.push(newDate.value);
    console.log(arr);
    localStorage.setItem("myLove", JSON.stringify(arr));
  }
  handleCreate();
};

// 判断是否收藏
const getLove = () => {
  let getData = localStorage.getItem("myLove");
  if (getData && JSON.parse(getData).length >= 0) {
    let arr = [...JSON.parse(getData)];
    arr.forEach((v) => {
      if (v.id == getId.value) {
        love.value = true;
      }
    });
  }
};

// 路由跳转传参
let router = useRouter();
function goUrl(url: string, params?: object) {
  router.push({ path: url, query: { ...params } });
}

onMounted(() => {
  console.log(route.query);
  getId.value = parseInt(route.query.id as string);

  getRightsList();
  getNewList();
  getLove();
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
  .msg-title {
    align-items: center;
    margin: 10px 0 30px;
    padding: 8px 0 20px;
    // border-bottom: 1px solid #f2f2f2;
    justify-content: space-between;
    h5 {
      font-size: 16px;
      color: #333;
    }
    p {
      margin-right: 40px;
      color: #757575;
      font-size: 14px;
    }
    img {
      width: 47px;
      height: 47px;
      display: inline-block;
      border-radius: 100%;
      margin-right: 10px;
    }
  }
  .myMsg {
    background: rgba(84, 158, 143, 0.9);
    padding: 16px;
    margin: 32px 0;
    border-radius: 4px;
    align-items: center;

    .msg-content {
      width: calc(100% - 100px);
      padding: 0 16px;
      box-sizing: border-box;

      h5 {
        font-size: 18px;
        // margin-bottom: 0.1em;
        color: #fff;
        height: 1.5em;
        line-height: 1em;
      }
      p {
        font-size: 14px;
        color: #fff;
        font-family: cursive;
      }
    }
    img {
      width: 80px;
      height: max-content;
      display: block;
      &:first-child {
        border-radius: 100%;
        // transform-origin: center center;
        // -webkit-animation: photo 5s infinite;
      }
    }
  }
  .next-page {
    padding: 16px 0;
    justify-content: space-between;
    font-size: 15px;
    color: #444;
    border-top: 1px solid #f2f2f2;
    // margin: 16px 0;
    span {
      & > .anticon {
        margin-right: 4px;
        font-size: 18px;
      }
      &:hover {
        color: #549e8f;
      }
    }
  }

  .footer-msg {
    margin-bottom: 30px;
    p {
      color: #666;
      margin-right: 40px;
      span {
        background: #c8efe7;
        color: #0e826a;
        border-radius: 4px;
        padding: 6px 16px;
      }
    }
  }
}

@-webkit-keyframes photo {
  0% {
    box-shadow: 0px 0px 10px red;
  }
  50% {
    box-shadow: 0px 0px 10px yellow;
  }
  100% {
    box-shadow: 0px 0px 10px blue;
  }
}
</style>