<template>
  <div class="diary">
    <div class="diary-bg">
      <a-comment v-if="adminButton">
        <template #avatar>
          <a-avatar :src="adminButton ? photo : photo1" alt="smile" />
        </template>
        <template #content>
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
        header="留言板"
        item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment
              :author="item.userName"
              :avatar="item.avatar"
              :content="item.content"
              :datetime="dayjs(item.createTime).fromNow()"
            />
          </a-list-item>
        </template>
      </a-list>
    </div>
    <Pagination
      :page="page"
      class="right"
      @onShowSizeChange="onShowSizeChange"
    ></Pagination>
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
  const res = await messageboardList(page);
  if (res.code === 200) {
    console.log(res);
    page.total = res.total;
    comments.value = res.list;
  }
};

let page = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const adminButton: string = computed(() => {
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
  background: #fff;
  background: url("../../assets/img/sea.jpg") no-repeat center;
  background-size: 100% 100%;
  background-position: 0 0;
  height: calc(100vh - 98px);
  overflow-y: auto;
}
.diary-bg {
  background: rgb(255 255 255 / 30%);
  width: 70%;
  min-width: 1000px;
  margin: 24px auto;
}
:deep(ul.ant-timeline) {
  width: 80%;
  margin: auto;
  padding: 40px 0;
}

:deep(.ant-timeline-item) {
  padding-bottom: 40px;
  border-bottom: 1px solid #fff;
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
:deep(.ant-list.ant-list-split) {
  width: 90%;
  margin: auto;
}
:deep(.ant-comment) {
  padding: 12px 24px 0;
  margin-bottom: 24px;
}
:deep(.ant-comment-content-detail .ant-row.ant-form-item) {
  margin-bottom: 8px;
}
:deep(.ant-list-split) {
  .ant-list-item,
  .ant-list-header {
    border-bottom: 1px solid #fff;
  }
  .ant-list-header {
    font-size: 18px;
    font-weight: 600;
    color: #777;
  }
}
:deep(ul.ant-pagination.right) {
  margin: 32px 7% 60px 0;
}
:deep(span.ant-avatar.ant-avatar-circle.ant-avatar-image) {
  width: inherit;
  height: inherit;
  margin-top: 8px;
  img {
    width: 64px;
    height: 64px;
  }
}
:deep(.ant-comment-content-author-name) {
  color: #4b4949;
}
:deep(.ant-comment-content-author-time) {
  color: #8c9796;
}
</style>