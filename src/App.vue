<script setup lang="ts">
import Header from "./views/home/header.vue";
import Footer from "./views/home/footer.vue";

import { ref, provide, nextTick } from "vue";
const isRouterActive = ref(true);
provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});
</script>

<template>
  <Header></Header>
  <div class="continaer">
    <router-view v-if="isRouterActive"></router-view>
  </div>

  <Footer></Footer>
</template>

<style lang="scss" scoped>
.continaer {
    min-height: calc(100vh - 98px);
}
</style>
