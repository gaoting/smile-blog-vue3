<script setup lang="ts">
import HeaderCom from "./views/home/header.vue";
import FooterCom from "./views/home/footer.vue";

import { ref, provide, nextTick, onMounted, watch } from "vue";

const isRouterActive = ref(true);

provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});


</script>

<template>
  <HeaderCom v-if="isRouterActive"></HeaderCom>
  <div class="continaer">
    <router-view v-if="isRouterActive"></router-view>
  </div>

  <FooterCom></FooterCom>
</template>

<style lang="scss" scoped>
.continaer {
  min-height: calc(100vh - 98px);
}
</style>
