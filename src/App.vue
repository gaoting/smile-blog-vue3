<script setup lang="ts">
import HeaderCom from "./views/home/header.vue";
import FooterCom from "./views/home/footer.vue";
// import res_components from "../src/test/";

import { ref, provide, nextTick, onMounted, watch } from "vue";

const isRouterActive = ref(true);

provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});

// onMounted(()=>{
//   console.log(res_components);
// })
</script>

<template>
  <HeaderCom v-if="isRouterActive"></HeaderCom>
  <div class="continaer">
    <router-view v-if="isRouterActive"></router-view>
  </div>
  <!-- <Index1 /> -->
  <FooterCom></FooterCom>
</template>

<style lang="scss" scoped>
.continaer {
  min-height: calc(100vh - 98px);
}
</style>
