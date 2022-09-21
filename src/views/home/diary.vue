<template>
  <div class="diary">
    <div class="diaryBox" v-if="adminButton">
      <a-textarea
        v-model:value="diaryContent"
        :rows="3"
        style="margin-bottom: 12px"
      ></a-textarea>
      <a-typography-text type="secondary"
        >已输入{{ diaryContent.length }}个字</a-typography-text
      >

      <a-button type="primary" size="large" @click="submit">提交</a-button>
    </div>
    <a-timeline v-if="newData">
      <a-timeline-item color="green" v-for="item in newData" :key="item.id">
        <div class="content">
          {{ item.content }}
        </div>
        <div class="flex bottom">
          <p>
            {{ moment(item.createTime).format("YYYY-MM-DD hh:mm:ss") }}
          </p>
          <span>
            <heart-filled :style="{ color: 'hotpink' }" />
            {{ item.loveNum }}
          </span>
        </div>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script setup lang="ts">
import { SmileOutlined, HeartFilled } from "@ant-design/icons-vue";
import {
  reactive,
  onMounted,
  ref,
  nextTick,
  getCurrentInstance,
  watch,
  computed,
} from "vue";
import { diaryAll, diaryAdd, diaryLove } from "../../common/axios";
import Diary from "./../interface/diary";
import moment from "moment";
import photo from "../../assets/img/photo.png";
import { message } from "ant-design-vue";


const newData = ref([] as Array<Diary>);
const getRightsList = async () => {
  let params = {
    current: 1,
    pageSize: 20,
  };
  const data = await diaryAll(params);
  console.log(data);
  newData.value = data.list;
};

const diaryContent: string = ref("");

const submit = async () => {
  if (!diaryContent.value) {
    message.error("请先输入内容。。。");
    return;
  }
  const res = await diaryAdd({ content: diaryContent.value });
  console.log(res);
  if (res.code == 200) {
    diaryContent.value = "";
    getRightsList();
  }
};

const adminButton = computed(() => {
  return (
    localStorage.getItem("userName") &&
    localStorage.getItem("userName") === "admin"
  );
});

// 收藏 / 取消收藏
let love = ref(false);
let getId = ref(0);
// const _this: any = ref(getCurrentInstance()?.appContext.config.globalProperties);

const goLove = (id: number, num: number, bool: boolean) => {
  love.value = !love.value;
  let getData = localStorage.getItem("myDraryLove");

  if (getData && JSON.parse(getData).length > 0) {
    let arr = [...JSON.parse(getData)];

    if (bool) {
      let index = arr.findIndex((v) => v.id == getId.value);
      if (index == -1) {
        arr.push(newData.value);
        localStorage.setItem("myDraryLove", JSON.stringify(arr));
        sendData(id, num, 1);
      }
    } else {
      arr = arr.filter((v) => v.id !== getId.value);
      localStorage.setItem("myDraryLove", JSON.stringify(arr));
      sendData(id, num, -1);
    }
  } else {
    let arr = [] as any;
    arr.push(newData.value);
    console.log(arr);
    localStorage.setItem("myDraryLove", JSON.stringify(arr));
    love.value = true;
    sendData(id, num, 1);
  }
};

watch(diaryContent, (newVal, oldVal) => {});

// 调用接口
const sendData = async (id: number, num: number, loveNum: number) => {
  const { data } = await diaryLove({
    id,
    loveNum: num + loveNum,
  });
  newData.value.forEach((v) => {
    if (v.id == id) {
      v.loveNum = data.loveNum;
    }
  });
};

// 判断是否收藏
const getLove = () => {
  let getData = localStorage.getItem("myDraryLove");
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

onMounted(() => {
  getRightsList();
});
</script>

<style scoped lang="scss">
.diary {
  background: #fff;
  padding: 24px 10%;
  .diaryBox {
    margin-bottom: 40px;
  }
}
:deep(ul.ant-timeline) {
  width: 100%;
  margin: auto;
  padding: 40px 0;
}

:deep(.ant-timeline-item) {
  padding-bottom: 40px;
}

.content {
  color: #777;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 7px;
  line-height: 1.75em;
}

.bottom {
  padding-top: 0.7em;
  color: #8590a6;

  p {
    margin-right: 40px;
  }
}
</style>