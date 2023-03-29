<template>
  <div class="box">
    <div class="banner" ref="bagk">
      <div class="banner-img">
        <img :src="banner" alt="" />
        <img
          src="../../assets/fonts/down.svg"
          class="anticon anticon-down"
          @click="goHeight"
          style="cursor: pointer"
        />
      </div>

      <div class="banner-text flex">
        <div class="mask">
          <h2>{{ title[0] }}</h2>
          <h2>{{ title[1] }}</h2>
        </div>
      </div>
    </div>

    <div class="content-box flex">
      <div class="content-left-box">
        <List
          :page="page"
          :allArticleList="allArticleList"
          @onShowSizeChange="onShowSizeChange"
        ></List>
      </div>

      <div class="cont-right">
        <div class="card card1">
          <img src="/src/assets/img/photo.png" alt="" class="photo" />

          <div class="flex blog-name">
            <img src="/src/assets/img/xh.png" alt="" class="animal" />
            <h3>Smile Blog</h3>
          </div>
          <div class="card-msg">
            <p>高效工作/学习 + 充分休息 = 理想生活</p>
            <ul class="flex">
              <li class="flex">
                <span>{{ articleNum }}</span>
                <span> 文章数</span>
              </li>
              <li class="flex">
                <span>{{ messagesNum }}</span>
                <span> 留言条数</span>
              </li>
              <li class="flex">
                <span>{{ flowNum }}</span>
                <span> 访问数</span>
              </li>
              <li class="flex">
                <span>{{ runDay }}</span>
                <span> 运行天数</span>
              </li>
            </ul>
          </div>
          <!-- <div class="card-box"></div> -->
        </div>
        <div class="card flex card-weather">
          <ul style="margin-right: 8px">
            <li>
              <environment-two-tone two-tone-color="#04b7ac" style="font-size: 16px;"/>
            </li>
            <li>
              <cloud-two-tone two-tone-color="#04b7ac" style="font-size: 16px;"/>
            </li>
            <!-- <li >
              <environment-two-tone />
            </li>
             <li >
              <environment-two-tone />
            </li>
             <li >
              <environment-two-tone />
            </li>
             <li >
              <environment-two-tone />
            </li> -->
          </ul>
          <ul>
            <li v-for="(item, i) in weather" :key="i">
              {{ i > 0 ? item : "" }}
            </li>
          </ul>
          <img :src="weather[0]" alt="" v-if="weather[0]" />
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

          <div class="flex-wrap friend-list">
            <a
              :href="item.url"
              v-for="(item, index) in friendList"
              :key="index"
              target="_blank"
            >
              <img :src="item.photo" alt="" />
              <span>
                <h5>{{ item.name }}</h5>
                <p>{{ item.desc }}</p>
              </span>
            </a>
          </div>
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
import { allList, searchList, getFlowNum } from "../../common/axios";
import List from "./list.vue";
import CardList from "./cardList.vue";
import TagList from "./tagList.vue";
import {
  SnippetsOutlined,
  FieldTimeOutlined,
  EyeOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { mainStore } from "@/store/typeList";
import moment from "moment";
// import

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
let flowNum = ref(0);
let articleNum = ref(0);
let messagesNum = ref(0);
let weather = ref([]);
const getAllList = async () => {
  const data = await allList({
    pageSize: page.pageSize,
    current: page.current,
  });
  console.log(data);
  messagesNum.value = data.messagesNum;
  allArticleList.value = data.list as Articles[];
  page.total = data.total;
  articleNum.value = data.total;
  weather.value = data.weather;
};
const getflowNum = async () => {
  const data = await getFlowNum();
  flowNum.value = data.data;
};

const runDay = computed(() => {
  const nowTime = JSON.parse(
    JSON.stringify(moment(new Date()).startOf("day").format("X"))
  );
  const startTime = JSON.parse(
    JSON.stringify(moment("2022-04-01").startOf("day").format("X"))
  );
  return Math.ceil((nowTime - startTime) / 24 / 3600);
});

// 热门推荐
let newList = ref([] as Articles[]);
const getsearchList = async () => {
  const params = {
    orderByDesc: ["lookNum"],
  };
  const data = await searchList(params);
  newList.value = data.list;
};

// 收藏列表
let collectList = ref([] as Articles[]);
const getCollectList = async () => {
  const params = {
    orderByDesc: ["loveNum"],
  };
  const data = await searchList(params);
  collectList.value = data.list;
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
  "a6.jpg",
  "a7.jpg",
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

const friendList = reactive([
  {
    url: "https://itsuki.cn/",
    name: "五木的博客",
    photo: getAssetsImages("wumu.jpeg"),
    desc: "喜欢code和run的字节跳动前端攻城狮",
  },
  {
    url: "https://lxchuan12.gitee.io/",
    name: "若川的博客",
    photo: getAssetsImages("rc.jpg"),
    desc: "vue3源码学习系列大佬",
  },
  {
    url: "https://myblog.wallleap.cn/#/",
    name: "wallleap的博客",
    photo: getAssetsImages("awa.jpg"),
    desc: "97年的二次元小鲜肉前端er",
  },
  {
    url: "https://api.aa1.cn/",
    name: "夏柔分享的API",
    photo: getAssetsImages("xiarou.png"),
    desc: "一个API免费分享的网站",
  },
  {
    url: "http://www.wpon.cn/",
    name: "夏柔的博客",
    photo: getAssetsImages("xiarou.png"),
    desc: "各种分享都有的网站",
  },
]);

const currentInstance = getCurrentInstance();
const goHeight = () => {
  const scrollHeight = currentInstance.ctx.$refs.bagk.scrollHeight;
  document.documentElement.scrollTop = scrollHeight - 60;
};

const store = mainStore();
const { token } = storeToRefs(store);

onMounted(() => {
  getAllList();
  getsearchList();
  getCollectList();
  getflowNum();
  nextTick(() => {
    title.value = randomStr(textList);
    banner.value = getAssetsImages(randomStr(imgList));
  });
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
    position: relative;
    img {
      display: block;
      width: 100%;
      // height: calc(100vh - 60px);
    }
    .anticon.anticon-down {
      position: absolute;
      bottom: 3.5%;
      color: #fff;
      left: 50%;
      width: 70px;
      height: 40px;
      animation: scroll-down-effect 1.5s infinite;
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
.friend {
  .flex-wrap {
    padding: 8px 10px;
    a {
      display: flex;
      padding: 4px 10px;
      margin: 8px auto;
      align-items: end;
      img {
        width: 40px;
        display: inline-block;
        height: 40px;
        border-radius: 100%;
        margin-right: 16px;
      }
      span {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        h5 {
          font-size: 14px;
          color: #02bfbb;
        }
        p {
          color: #8590a6;
          font-size: 13px;
          width: 100%;
        }
      }
      &:hover {
        background-image: linear-gradient(270deg, #def3ee, #fff);
      }
    }
  }
}
.card.card-weather {
  padding: 18px 0 2px 24px;
  line-height: 1.75rem;
  position: relative;
  background: #f8fcfb;
  color: #34adac;
  background-image: linear-gradient(to bottom right, #fff, #fdfdfd, #7cddf9);
  & > img {
    width: 120px;
    position: absolute;
    bottom: 4px;
    right: 0;
  }
}
@keyframes shine {
  /*创建动画*/
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}
@keyframes scroll-down-effect {
  50% {
    bottom: 5%;
    color: rgba(255, 255, 255, 0.6);
  }
  100% {
    bottom: 3.5%;
    color: #fff;
  }
}
</style>
