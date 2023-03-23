<template>
  <div>

  </div>
  <div class="flex">
  <a-input v-model="msg" />
  <a-button>发送</a-button>
  </div>
</template>

<script setup>
import {
  messageboardList,
  messageboardAdd,
  messageboardLove,
} from "../../common/axios";

const getRightsList = async () => {
  const res = await messageboardList({
    pageSize: page.pageSize,
    current: page.current,
  });
  if (res.code === 200) {
    console.log(res);
  }
};

import { io } from 'socket.io-client'

let socket = null
onMounted(() => {
  socket = io('')
})

</script>

<style lang="scss" scoped>


</style>