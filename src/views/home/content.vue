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
                <p>发布时间：{{ myTimeToLocal(newDate.createTime) }}</p>
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
          <div class="content-text" v-if="newDate.activeKey == '2'"></div>
          <div v-if="newDate.activeKey == '1'">
            <!-- <v-md-preview :text="newDate.content"></v-md-preview> -->
            <md-editor v-model="newDate.content" :previewOnly="true" />
          </div>
        </div>
        <!-- 内容 -->

        <div class="flex interaction">
          <div class="support flex">
            <like-outlined />
            <span>赞{{}}</span>
          </div>
          <div class="exceptional flex">
            <div class="dialog-box">
              <img src="../../assets/img/WechatIMG50.jpg" alt="" />
              <img src="../../assets/img/WechatIMG51.jpg" alt="" />
            </div>
            <pay-circle-outlined />
            <span>打赏</span>
          </div>
        </div>

        <div class="myMsg flex">
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
            @click="goUrl(newDate.preId)"
            v-if="newDate.preId"
          >
            <left-circle-filled />
            {{ newDate.preTitle }}
          </span>
          <span v-else> <left-circle-filled />已是第一篇</span>

          <span
            class="pointer"
            @click="goUrl(newDate.nextId)"
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
import { reactive, onMounted, ref, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { findById, searchList } from "../../common/axios";
import Articles from "../interface/article";
import CardList from "./cardList.vue";
import TagList from "./tagList.vue";
import {
  HeartOutlined,
  RightCircleFilled,
  LeftCircleFilled,
  CheckCircleFilled,
  LikeOutlined,
  PayCircleOutlined,
} from "@ant-design/icons-vue";
import { updateNum } from "../../common/axios";
// markdown    ---------
import MdEditor from "md-editor-v3";

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
    if (newDate.value.activeKey == "2") {
      let doms = document.querySelector(".content-text");
      doms ? (doms.innerHTML += newDate.value.content) : "";
    }

    let desc = document.querySelector(".article-content>b");

    desc ? (desc.innerHTML += newDate.value.description) : "";
  });
};

// 热门文章
let newList = ref([] as Articles[]);
const getNewList = async () => {
  const { data } = await searchList({
    types: "前端",
    orderByDesc: ["lookNum"],
  });
  newList.value = data.list;
};

// 刷新子组件
let timer = ref(0);
const handleCreate = () => {
  timer.value = new Date().getTime();
};

// 收藏 / 取消收藏
let love = ref(false);
const goLove = (bool: boolean) => {
  love.value = !love.value;
  let getData = localStorage.getItem("myLove");

  if (getData && JSON.parse(getData).length > 0) {
    let arr = [...JSON.parse(getData)];

    if (bool) {
      let index = arr.findIndex((v) => v.id == getId.value);
      if (index == -1) {
        arr.push(newDate.value);
        localStorage.setItem("myLove", JSON.stringify(arr));
        sendData(1);
      }
    } else {
      arr = arr.filter((v) => v.id !== getId.value);
      localStorage.setItem("myLove", JSON.stringify(arr));
      sendData(-1);
    }
  } else {
    let arr = [];
    arr.push(newDate.value);
    console.log(arr);
    localStorage.setItem("myLove", JSON.stringify(arr));
    love.value = true;
    sendData(1);
  }
  handleCreate();
};

// 调用接口
const sendData = async (num: number) => {
  const { data } = await updateNum({
    id: newDate.value.id,
    loveNum: newDate.value.loveNum + num,
  });
  newDate.value.loveNum = data.loveNum;
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
  } else {
    love.value = false;
  }
};

// 刷新
// const reload = inject('reload')

// 路由跳转传参
let router = useRouter();
const goUrl = (id: number) => {
  router.push({ path: "/content", query: { id } });
};

watch(route, (to, from) => {
  console.log(to,from, to.query, from.query);
});

const myTimeToLocal = (date: string | number) => {
  let time = new Date(date).toJSON();
  return new Date(+new Date(time) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
};

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
  padding: 40px 20px;
  border-radius: 4px;
  .article-title {
    font-size: 32px;
    text-align: center;
  }
  .msg-title {
    align-items: end;
    // margin: 10px 0 20px;
    padding: 30px 0 40px;
    // border-bottom: 1px solid #f2f2f2;
    justify-content: space-between;
    h5 {
      font-size: 17px;
      color: #333;
      line-height: 1.4em;
      font-weight: bolder;
    }
    p {
      margin-right: 40px;
      color: #7d818a;
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
    padding: 16px;
    margin: 32px 0;
    border-radius: 4px;
    align-items: center;
    background-image: linear-gradient(0deg, #c8efe7, transparent);
    .msg-content {
      width: calc(100% - 100px);
      padding: 0 16px;
      box-sizing: border-box;
      color: #666;
      h5 {
        font-size: 18px;
        // margin-bottom: 0.1em;

        height: 1.5em;
        line-height: 1em;
      }
      p {
        font-size: 14px;
        // color: #fff;
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
    color: #7d818a;
    border-top: 1px solid #f2f2f2;
    // margin: 16px 0;
    span {
      & > .anticon {
        margin-right: 4px;
        font-size: 18px;
        vertical-align: text-bottom;
      }
      &:hover {
        color: #333;
      }
    }
  }
  .exceptional {
    position: relative;
    &:hover {
      .dialog-box {
        display: block;
      }
    }
    .dialog-box {
      position: absolute;
      top: -182px;
      left: -96px;
      width: 340px;
      height: 180px;
      box-shadow: 0 0 3px 1px #ccc;
      border-radius: 4px;
      background: #fff;
      justify-content: center;
      align-items: center;
      display: none;
      padding-top: 10px;
      &:before,
      &:after {
        position: absolute;
        left: 50%;
        width: 0;
        height: 0;
        margin-left: -8px;
        line-height: 0;
        border: 8px solid transparent;
        content: "";
      }
      &:before {
        bottom: -16px;
        border-top-color: #fff;
      }
      img {
        display: inline-block;
        width: 160px;
        height: 160px;
        border: 6px solid #fff;
        box-sizing: border-box;
      }
    }
  }
  .footer-msg {
    margin-bottom: 20px;
    p {
      color: #666;
      margin-right: 40px;
      span {
        background: #c8efe7;
        //  background: rgb(105 207 200 / 45%);
        color: #019997;
        border-radius: 4px;
        padding: 6px 16px;
      }
    }
  }
}
</style>