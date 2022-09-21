<template>
  <div class="diary">
    <a-comment>
      <template #avatar>
        <a-avatar :src="photo" alt="smile" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" />
        </a-form-item>
        <a-form-item style="text-align: left">
          <a-button
            html-type="submit"
            :loading="submitting"
            type="primary"
            @click="handleSubmit"
          >
            Add Comment
          </a-button>
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
import { reactive, onMounted, ref, nextTick, getCurrentInstance } from "vue";
import { diaryAll, diaryAdd, diaryLove } from "../../common/axios";
import Diary from "./../interface/diary";
import moment from "moment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import photo from "../../assets/img/photo.png";

const newData = ref([] as Array<Diary>);
const getRightsList = async () => {
  let params = {
    current: 1,
    pageSize: 20,
  };
  const data = await diaryAll(params);
  console.log(data);
  // newData.value = data.list;

  data.list.forEach((v) => {
    let obj = {
      author: "smile",
      avatar: photo,
      ...v,
    };
    comments.value.push(obj);
  });
};

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
</style>