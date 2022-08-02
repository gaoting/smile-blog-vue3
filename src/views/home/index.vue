<template>
  <div class="box">
    <div class="banner">
      <div class="banner-img">
        <img :src="banner" alt="" />
      </div>

      <div class="banner-text flex">
        <div class="mask">
          <h2>{{ title[0] }}</h2>
          <h2>{{ title[1] }}</h2>
        </div>
      </div>
    </div>
    <div class="content-box flex">
      <List
        :page="page"
        :allArticleList="allArticleList"
        @onShowSizeChange="onShowSizeChange"
      ></List>

      <div class="cont-right">
        <div class="card card1">
          <img src="../../assets/img/photo.png" alt="" class="photo" />

          <div class="flex blog-name">
            <img src="../../assets/img/xh.png" alt="" class="animal" />
            <h3>Smile Blog</h3>
          </div>
          <div class="card-msg">
            <p>高效工作/学习 + 充分休息 = 理想生活</p>
            <ul class="flex">
              <li class="flex">
                <span>{{ articleNum }}</span>
                <span> 文章数量</span>
              </li>
              <li class="flex">
                <span>{{ runDay }}</span>
                <span> 运行天数</span>
              </li>
              <li class="flex">
                <span>4577</span>
                <span> 浏览人数</span>
              </li>
            </ul>
          </div>
          <!-- <div class="card-box"></div> -->
        </div>
        <TagList></TagList>
        <CardList :header="{ title: '我的收藏', url: '/' }"></CardList>
        <CardList :newList="newList"></CardList>
        <CardList
          :newList="collectList"
          :header="{ title: '收藏最多', url: '/' }"
        ></CardList>
        <div class="card friend">
          <div class="flex card-title"><h3>友情链接</h3></div>
          <ul>
            <li v-for="(item, index) in friendList" :key="index">
              <a :href="item.url" target="_blank">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  onMounted,
  nextTick,
  computed,
  getCurrentInstance,
} from "vue";
import Articles from "../interface/article";
import { allList, searchList } from "../../common/axios";
import List from "./list.vue";
import CardList from "./cardList.vue";
import TagList from "./tagList.vue";
import {
  SnippetsOutlined,
  FieldTimeOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { mainStore } from "@/store";

let page = reactive({
  current: 1,
  total: 0,
  pageSize: 10,
});

const onShowSizeChange = (ctx: any) => {
  page.current = ctx.current;
  page.pageSize = ctx.pageSize;
  console.log(ctx);
  getAllList();
};

let allArticleList = ref([] as Articles[]);
let articleNum = ref(0);
const getAllList = async () => {
  const { result } = await allList({
    pageSize: page.pageSize,
    current: page.current,
  });
  console.log(result);
  allArticleList.value = result.list as Articles[];
  page.total = result.total;
  articleNum.value = result.total;
};

const _this: any = getCurrentInstance()?.appContext.config.globalProperties;

const runDay = computed(() => {
  const nowTime = JSON.parse(
    JSON.stringify(_this.$moment(new Date()).startOf("day").format("X"))
  );
  const startTime = JSON.parse(
    JSON.stringify(_this.$moment("2022-04-01").startOf("day").format("X"))
  );
  return Math.ceil((nowTime - startTime) / 24 / 3600);
});

// 热门推荐
let newList = ref([] as Articles[]);
const getsearchList = async () => {
  const params = {
    orderByDesc: ["lookNum"],
  };
  const { result } = await searchList(params);
  newList.value = result.list;
};

// 收藏列表
let collectList = ref([] as Articles[]);
const getCollectList = async () => {
  const params = {
    orderByDesc: ["loveNum"],
  };
  const { result } = await searchList(params);
  collectList.value = result.list;
};

// 随机文字
let textStr = ref("");
const textList: any = reactive([
  [
    "愿你的生命中有足够的云翳，来造成一个美丽的黄昏。",
    "May there be enough clouds in your life to make a beautiful sunset.",
  ],
  ["一次只做一件事，做到最好！", "Do one thing at a time, and do well."],
  [
    "把时间分配给可靠的人和事。",
    "Allocate your time to reliable people and things.",
  ],
  [
    "低调，取舍，必有得失。",
    "Low-key, trade-offs, there will be gains and losses.",
  ],

  ["一个今天胜过两个明天。", "One today will be worth two tomorrow."],
  ["人生如风雨，去如尘埃。", "Life is like wind and rain, to such as dust."],
  ["每一种创伤都是一种成熟。", "Every trauma is a kind of maturity."],
  [
    "行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。",
    "Action is the best medicine to cure fear, and hesitation, delay will continue to nourish fear.",
  ],

  [
    "生命的价值不在于能活多少天，而在于我们如何利用这些日子。",
    "The value of life lies not length of days, but in the use of we make of them.",
  ],
]);

let imgStr = ref("");
const imgList: Array<string> = reactive([
  "a1.jpg",
  "a2.jpg",
  "a3.jpg",
  "a4.jpg",
  "a5.jpg",
]);

function randomStr(arr: any) {
  let newArr: Array<string> = [];
  while (arr.length > 0) {
    let randomIndex = Math.random() * arr.length;
    newArr.push(arr[parseInt(randomIndex + "")]);
    arr.splice(randomIndex, 1);
  }
  return newArr[0];
}

let title = ref("");
let banner = ref("");

/**
 * 获取本地图
 * @param name // 文件名 如 doc.png
 * @returns {*|string}
 */
const getAssetsImages = (name: string) => {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href;
};

const friendList = reactive([{ url: "https://itsuki.cn/", name: "itsuki" }]);

const store = mainStore();
const { token } = storeToRefs(store);

onMounted(() => {
  getAllList();
  getsearchList();
  getCollectList();
  console.log(token.value, "tttttttt222");
  nextTick(() => {
    title.value = randomStr(textList);
    banner.value = getAssetsImages(randomStr(imgList));
  });
  console.log(banner.value);
});
</script>

<style scoped lang="scss">
.box {
  margin-top: -60px;
}
.banner {
  position: relative;
  .banner-img {
    max-height: 100vh;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      // height: calc(100vh - 60px);
    }
  }
  .banner-text {
    position: absolute;
    top: 70%;
    left: 50%;
    width: 76%;
    min-height: 148px;
    background-color: rgba(0, 0, 0, 0.35);
    transform: translate(-50%, -50%);
    padding: 4vh;
    flex-wrap: wrap;
    justify-content: center;
    .mask {
      background: -webkit-linear-gradient(left, yellow, #05f8c7) 0 0 no-repeat; /*设置线性渐变*/
      -webkit-background-size: 20% 400px; /*设置背景大小*/
      -webkit-background-clip: text; /*背景被裁剪到文字*/
      -webkit-text-fill-color: rgba(255, 255, 255, 0.3); /*设置文字的填充颜色*/
      -webkit-animation: shine 5s infinite;
    }
    h2 {
      width: 100%;
      font-size: 2.2vw;
      text-align: center;
      line-height: 1.75em;
    }
  }
}
@-webkit-keyframes shine {
  /*创建动画*/
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}
</style>