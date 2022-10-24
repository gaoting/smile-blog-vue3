<template>
  <div class="diary">
    <div class="diary-bg">
      <div class="diaryBox" v-if="adminButton">
        <a-textarea
          v-model:value="diaryContent"
          :rows="5"
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
            <span
              @click="sendData(item.id, item.loveNum)"
              style="cursor: pointer"
            >
              <heart-filled
                :style="{ color: !trasy && loveId == item.id ? 'hotpink' : '' }"
              />
              {{ item.loveNum }}
            </span>
          </div>
        </a-timeline-item>
      </a-timeline>
      <Pagination
        :page="page"
        class="right"
        @onShowSizeChange="onShowSizeChange"
      ></Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SmileOutlined, HeartFilled } from "@ant-design/icons-vue";
import Pagination from "../../components/Pagination.vue";
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
let page = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
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

let adminButton = computed(() => {
  return (
    localStorage.getItem("userName") &&
    localStorage.getItem("userName") === "admin"
  );
});

// 收藏 / 取消收藏
let love = ref(false);

watch(diaryContent.value, (newVal, oldVal) => {});

// 点赞接口
let trasy = ref(true);
let loveId = ref(0);
const sendData = async (id: number, loveNum: number) => {
  let newLoveNum = trasy.value ? loveNum + 1 : loveNum - 1;

  const res = await diaryLove({
    id,
    loveNum: newLoveNum,
  });
  console.log(res);
  if (res.code === 200) {
    loveId.value = res.list.id;
    getRightsList();
    trasy.value = !trasy.value;
  }
};
const onShowSizeChange = (data: any) => {
  page.pageSize = data.pageSize;
  page.current = data.current;
  getRightsList();
};
onMounted(() => {
  getRightsList();
});
</script>

<style scoped lang="scss">
.diary {
  background: url("../../assets/img/wuhou.png") no-repeat center;
  background-size: 1920px 844px;
  overflow-y: auto;
  height: calc(100vh - 98px);
  .diary-bg {
    // background: rgb(255 255 255 / 30%);
    width: 70%;
    min-width: 1000px;
    margin: 24px auto;
  }
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