<template>
  <div class="box">
    <div class="banner">
      <div class="banner-img">
        <img src="../../assets/img/banner.jpeg" alt="" />
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
          <div class="card-box">
            <div class="flex">
              <img src="../../assets/img/xh.png" alt="" class="animal" />
              <h3>Smile Blog</h3>
            </div>
          </div>
        </div>
        <TagList></TagList>
        <CardList :newList="newList"></CardList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from "vue";
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
  });
  allArticleList.value = data.list as Articles[];
  page.total = data.total;
};

let newList = ref([] as Articles[]);
const getsearchList = async () => {
  const params = {};
  const { data } = await searchList(params);
  newList.value = data.list;
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

function randomStr(arr: any) {
  let newArr: Array<string> = [];
  while (arr.length > 0) {
    let randomIndex = Math.random() * arr.length;
    newArr.push(arr[parseInt(randomIndex + "")]);
    arr.splice(randomIndex, 1);
  }
  return newArr[0];
}

let title: any = ref(textList);

onMounted(() => {
  getAllList();
  getsearchList();
  nextTick(() => {
    title.value = randomStr(textList);
  });
  console.log(title.value);
});
</script>

<style scoped lang="scss">
.banner {
  position: relative;
  .banner-img {
    max-height: calc(100vh - 60px);
    overflow: hidden;
    img {
      display: block;
      width: 100%;
    }
  }
  .banner-text {
    position: absolute;
    top: 60%;
    left: 50%;
    width: 90%;
    min-height: 200px;
    background-color: rgba(0, 0, 0, 0.75);
    transform: translate(-50%, -50%);
    border: 4px solid #fff;
    padding: 2%;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 50px;
    .mask {
      background: -webkit-linear-gradient(left, yellow, #05f8c7) 0 0 no-repeat; /*设置线性渐变*/
      -webkit-background-size: 20% 400px; /*设置背景大小*/
      -webkit-background-clip: text; /*背景被裁剪到文字*/
      -webkit-text-fill-color: rgba(255, 255, 255, 0.3); /*设置文字的填充颜色*/
      -webkit-animation: shine 5s infinite;
    }
    h2 {
      width: 100%;
      font-size: 40px;
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