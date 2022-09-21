<template>
  <div class="diary">
    <a-comment>
      <template #avatar>
        <a-avatar :src="photo" alt="smile" />
      </template>
      <template #content v-if="adminButton">
        <a-form-item>
          <a-textarea v-model:value="diaryContent" :rows="4" />
        </a-form-item>
        <a-form-item>
          <div class="flex-between">
            <a-typography-text type="secondary">
              已输入{{ diaryContent.length }}个字
            </a-typography-text>

            <a-button type="primary" size="large" @click="submit"
              >提交</a-button
            >
          </div>
        </a-form-item>
      </template>
    </a-comment>
    <a-list
      v-if="comments.length"
      :data-source="comments"
      :header="`${comments.length} ${
        comments.length > 1 ? 'replies' : 'reply'
      }`"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment
            :author="item.author"
            :avatar="item.avatar"
            :content="item.content"
            :datetime="dayjs(item.createTime).fromNow()"
          />
        </a-list-item>
      </template>
    </a-list>
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
  computed,
} from "vue";
import {
  messageboardList,
  messageboardAdd,
  messageboardLove,
} from "../../common/axios";
import Diary from "./../interface/diary";
import moment from "moment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import photo from "../../assets/img/photo.png";
import photo1 from "../../assets/img/photo1.png";
import { message } from "ant-design-vue";

const newData = ref([] as Array<Diary>);
const getRightsList = async () => {
  let params = {
    current: 1,
    pageSize: 20,
  };
  const data = await messageboardList(params);
  console.log(data);
  comments.value = data.list;
};

const adminButton = computed(() => {
  return localStorage.getItem("token") && localStorage.getItem("userName");
});

const diaryContent: string = ref("");

const submit = async () => {
  if (!diaryContent.value) {
    message.error("请先输入内容。。。");
    return;
  }
  const res = await messageboardAdd({
    content: diaryContent.value,
    avatar: localStorage.getItem("userName") === "admin" ? photo : photo1,
    userName: localStorage.getItem("userName")
      ? localStorage.getItem("userName")
      : "",
  });
  console.log(res);
  if (res.code == 200) {
    diaryContent.value = "";
    getRightsList();
  }
};

// 调用接口
const sendData = async (id: number, num: number, loveNum: number) => {
  const { data } = await messageboardLove({
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

const comments = ref([]);
const submitting = ref(false);
const value = ref("");

const handleSubmit = () => {
  if (!value.value) {
    return;
  }

  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: "Han Solo",
        avatar: "https://joeschmoe.io/api/v1/random",
        content: value.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    value.value = "";
  }, 1000);
};

onMounted(() => {
  getRightsList();
});
</script>

<style scoped lang="scss">
.diary {
  background: #fff;
  padding: 24px 10%;
}
:deep(ul.ant-timeline) {
  width: 80%;
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

:deep(.ant-comment-content-detail .ant-row.ant-form-item) {
  margin-bottom: 8px;
}
</style>