<template>
  <div class="content-box flex">
    <div class="content-left-box">
      <div class="article-box">
        <div class="article-title">{{ newData.title }}</div>

        <div class="flex msg-title">
          <div class="flex">
            <img src="../../assets/img/photo.png" alt="" />
            <div class="msg-box">
              <div class="flex">
                <h5>
                  {{ newData.author }}
                </h5>
                <a-tag color="cyan"><highlight-outlined />原创作品</a-tag>
              </div>
              <div class="flex mt10">
                <p>
                  发布时间：

                  {{ moment(newData.createTime).format("YYYY-MM-DD hh:mm:ss") }}
                </p>

                <p>浏览：{{ newData.lookNum }}</p>
                <p>收藏：{{ newData.loveNum }}</p>
              </div>
            </div>
          </div>
          <div class="power">
            <a-button type="red" v-if="!love" @click="goLove(true)">
              <template #icon>
                <HeartOutlined />
              </template>
              收藏
            </a-button>
            <a-button type="red" v-if="love" @click="goLove(false)">
              <template #icon>
                <CheckCircleFilled />
              </template>
              已收藏
            </a-button>
            <a-button
              type="success"
              @click="edit(getId)"
              style="margin-left: 10px"
              v-if="adminButton"
            >
              <edit-outlined />
              编辑</a-button
            >
          </div>
        </div>

        <!-- 内容 -->
        <div class="article-content">
          <p>{{ newData.description }}</p>
          <div>
            <v-md-editor
              v-model="newData.content"
              mode="preview"
              :default-show-toc="true"
              ref="preview"
            ></v-md-editor>
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
            分类： <span>{{ store.typesObj[newData.types] }}</span>
          </p>
          <p>
            标签： <span>{{ store.tagsObj[newData.tags] }}</span>
          </p>
        </div>

        <div class="flex next-page">
          <span
            class="pointer"
            @click="goUrl(newData.preId)"
            v-if="newData.preId"
          >
            <left-circle-filled />
            {{ newData.preTitle }}
          </span>
          <span v-else> <left-circle-filled />已是第一篇 </span>

          <span
            class="pointer"
            @click="goUrl(newData.nextId)"
            v-if="newData.nextId"
          >
            {{ newData.nextTitle }}
            <right-circle-filled />
          </span>
          <span v-else> 已是最后一篇 <right-circle-filled /></span>
        </div>
      </div>
    </div>

    <div class="cont-right">
      <a-affix :offset-top="top">
        <TagList></TagList>
        <div class="navigation">
          <div class="navigation-content" id="permiss">
            <h2>大纲 <UnorderedListOutlined /></h2>
            <div class="permiss-box">
              <div
                class="titile-list"
                v-for="(anchor, index) in titles"
                :key="index + 'art'"
                :style="{ padding: `6px 0 6px ${anchor.indent * 12}px` }"
              >
                <a
                  @click="handleAnchorClick(anchor, index, anchor.indent)"
                  :class="getColor[anchor.indent]"
                >
                  {{ anchor.title }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </a-affix>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  nextTick,
  getCurrentInstance,
  reactive,
  computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { findById, searchList, updateNum } from "../../common/axios";
import Articles from "../interface/article";
import CardList from "./cardList.vue";
import TagList from "./tagList.vue";
import { message } from "ant-design-vue";
import {
  HeartOutlined,
  RightCircleFilled,
  LeftCircleFilled,
  CheckCircleFilled,
  LikeOutlined,
  PayCircleOutlined,
  UnorderedListOutlined,
  HighlightOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import moment from "moment";
import { storeToRefs } from "pinia";
import { mainStore } from "@/store/typeList";

const props = defineProps({
  id: Number,
});
const top = ref<number>(60);
let getId = ref(0);
const route = useRoute();
let newData = ref({
  id: 0,
  author: "",
  tags: 0,
  types: "",
  title: "",
  description: "",
  content: "",
  lookNum: 0,
  loveNum: 0,

  picture: "",

  preId: 0,
  nextId: 0,
  preTitle: "",
  nextTitle: "",
  createTime: "",
  updateTime: "",
});
// const _this: any = ref(getCurrentInstance()?.appContext.config.globalProperties);

const store = mainStore();
const { types: any } = storeToRefs(store);
const setObj = (id: number) => {
  console.log(id);
  let arr = store.types.find((v: any) => v.id == id);
  console.log(id, store.types, arr.name);
  return arr.name;
};

// 获取详情   设置content description 标签转译
const getRightsList = async (id?: number) => {
  const result = await findById({ id: id });
  newData.value = result.data;
  console.log(newData.value);
  newData.value.lookNum ? (newData.value.lookNum += 1) : 1;
  // newData.value.tags = newData.value.tags ? setObj(newData.value.tags) : "";
  nextTick(() => {
    let desc = document.querySelector(".article-content>b");

    if (desc) {
      desc.innerHTML += newData.value.description;
    }
    getTitleList();
  });
};

// 热门文章
let newList = ref([]);
const getNewList = async () => {
  const result = await searchList({
    types: "前端",
    orderByDesc: ["lookNum"],
  });
  newList.value = result.list;
};

// edit
const edit = (id) => {
  router.push({ path: "/articleAdd", query: { id } });
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
        arr.push(newData.value);
        localStorage.setItem("myLove", JSON.stringify(arr));
        sendData(1);
      }
    } else {
      arr = arr.filter((v) => v.id !== getId.value);
      localStorage.setItem("myLove", JSON.stringify(arr));
      sendData(-1);
    }
  } else {
    let arr = [] as any;
    arr.push(newData.value);
    console.log(arr);
    localStorage.setItem("myLove", JSON.stringify(arr));
    love.value = true;
    sendData(1);
  }
  handleCreate();
};

const adminButton = computed(() => {
  return (
    localStorage.getItem("userName") &&
    localStorage.getItem("userName") === "admin"
  );
});

// 调用接口
const sendData = async (num: number) => {
  const result = await updateNum({
    id: newData.value.id,
    loveNum: newData.value.loveNum ? newData.value.loveNum + num : num,
  });
  newData.value.loveNum = result.data.loveNum;
};

// 判断是否收藏
const getLove = () => {
  let getData = localStorage.getItem("myLove");
  if (getData && JSON.parse(getData).length) {
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

// 设置目录color
const getColor: any = reactive({
  0: "color0",
  1: "color1",
  2: "color2",
  3: "color3",
  4: "color4",
});

// 路由跳转传参
let router = useRouter();
const goUrl = (id: number) => {
  router.push({ path: "/content", query: { id } });
  getRightsList(id);
};

const preview = ref<any>(null);
const titles = ref<any>([]);

// md 大纲
const getTitleList = () => {
  if (preview.value) {
    const anchors = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");

    const getTitleData = Array.from(anchors).filter(
      (title: any) => !!title.innerText.trim()
    );

    if (!getTitleData.length) {
      titles.value = [];
    }

    const hTags = Array.from(
      new Set(getTitleData.map((title: any) => title.tagName))
    ).sort();

    //给每一个加样式
    titles.value = getTitleData.map((el: any) => ({
      title: el.innerText,
      lineIndex: el.getAttribute("result-v-md-line"),
      indent: hTags.indexOf(el.tagName),
    }));

    let copyBtn = document.querySelector(".v-md-copy-code-btn");
    console.log(copyBtn);
    copyBtn?.addEventListener("click", () => {
      message.success("复制成功!");
    });
  }
};

const handleAnchorClick = (
  anchor: string,
  index: number | string,
  indent: number
): void => {
  console.log(anchor, index, indent);

  const heading = preview.value.$el.querySelector(
    `[data-v-md-line="${index}"]`
  );
  console.log(preview.value, heading);
  if (heading) {
    preview.value.previewScrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60,
    });
  }
};

onMounted(() => {
  console.log(route.query, location.search);

  if (route.query.id) {
    getId.value = parseInt(route.query.id as string);

    getRightsList(+getId.value);
  }

  getNewList();
  getLove();
  // getTitleList();
});
</script>

<style scoped lang="scss">
.article-box {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  // width: calc(100% - 24px);

  .article-title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 32px;
  }

  .msg-title {
    align-items: end;
    // margin: 10px 0 20px;
    padding: 20px 0 30px;
    // border-bottom: 1px solid #f2f2f2;
    justify-content: space-between;

    h5 {
      font-size: 16px;
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
    padding: 24px;
    margin: 32px 0;
    border-radius: 4px;
    align-items: center;
    background-image: linear-gradient(0deg, #c8efe7, transparent);

    .msg-content {
      width: calc(100% - 100px);
      padding: 0 24px;
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
      height: auto;
      display: block;

      &:first-child {
        border-radius: 100%;
        // transform-origin: center center;
        // -webkit-animation: photo 5s infinite;
      }
    }
  }

  .next-page {
    padding: 24px 0;
    justify-content: space-between;
    font-size: 15px;
    color: #7d818a;
    border-top: 1px solid #f2f2f2;

    // margin: 24px 0;
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
      z-index: 99;

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
        bottom: -24px;
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
        padding: 6px 24px;
      }
    }
  }
}

div#permiss {
  background: #fff;
  border-radius: 4px;
  h2 {
    padding: 8px 24px;
    border-bottom: 1px solid #f2f2f2;
    // margin-bottom: 24px;
  }
  span.anticon.anticon-unordered-list {
    color: #999;
  }
  .permiss-box {
    padding: 16px 12px;
    max-height: calc(100vh - 400px);
    overflow-y: auto;
  }
  .titile-list {
    a {
      cursor: pointer;
      position: relative;
      color: inherit;
      display: inline-block;
      padding: 0 8px;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      // &:before {
      //   position: absolute;
      //   top: 7px;
      //   left: -13px;
      //   content: "";
      //   width: 4px;
      //   height: 4px;
      //   border: 3px solid #666;
      //   border-radius: 4px;
      // }

      &:hover {
        color: #019997;
      }
    }
    .color0 {
      color: #000;
    }
    .color1 {
      color: #666;
    }
    .color2 {
      color: #909090;
    }
    .color3 {
      color: #909090;
    }
  }
}
:deep(.vuepress-markdown-body h2) {
  border-bottom: 0;
}
:deep(.v-md-pre-wrapper.copy-code-mode .v-md-copy-code-btn) {
  opacity: 1;
  visibility: initial;
  right: 3.4em;
  // position: relative;
  &::before {
    content: "一键复制";
    width: 90px;
    position: absolute;
    bottom: -20px;
    font-size: 10px;
    transform: scale(0.9);
    display: none;
  }
  &:hover {
    &::before {
      display: block;
    }
  }
}
:deep(.vuepress-markdown-body > :last-child),
.vuepress-markdown-body > div[result-v-md-line]:last-child > :last-child {
  margin-bottom: 0 !important;
}
.flex.interaction > div {
  cursor: pointer;
}
.mt10 {
  margin-top: 4px;
}
</style>