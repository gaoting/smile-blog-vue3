<template>
  <div>

    <a-timeline v-if="newData">
      <a-timeline-item color="green" v-for="item in newData" :key="item.id">
        <div class="content">
          {{ item.content }}
        </div>
        <div class="flex bottom">
          <p>{{ myTimeToLocal(item.createTime) }}</p>
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
import { reactive, onMounted, ref, nextTick } from "vue";
import { diaryAll, diaryAdd, diaryLove } from "../../common/axios";
import Diary from './../interface/diary'

const newData = ref([] as Array<Diary>)
const getRightsList = async () => {
  let params = {
    current: 1,
    pageSize: 20
  }
  const { data } = await diaryAll(params);
  console.log(data);
  newData.value = data.list
}

// 时间转年月日
const myTimeToLocal = (date: string | number) => {
  let time = new Date(date).toJSON();
  return new Date(+new Date(time) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
};

// 收藏 / 取消收藏
let love = ref(false);
let getId = ref(0);
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
    let arr = [];
    arr.push(newData.value);
    console.log(arr);
    localStorage.setItem("myDraryLove", JSON.stringify(arr));
    love.value = true;
    sendData(id, num, 1);
  }
};

// 调用接口
const sendData = async (id: number, num: number, loveNum: number) => {
  const { data } = await diaryLove({
    id,
    loveNum: num + loveNum,
  });
  newData.value.forEach(v => {
    if (v.id == id) {
      v.loveNum = data.loveNum
    }
  })
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
  getRightsList()
})
</script>

<style scoped lang="scss">
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
  background: #eee;
  padding: 16px;
  border-radius: 7px;
  line-height: 1.75em;
}

.bottom {
  padding-top: .7em;
  color: #8590a6;

  p {
    margin-right: 40px;
  }
}
</style>