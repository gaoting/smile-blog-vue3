<template>
  <div class="RelationGraph">
    <div>{{ num }}</div>
    <div class="addNum"></div>
    <a-button color="#626aef" @click="clickHandler">Default</a-button>
  </div>
</template>

<script lang="ts" setup>
import { testStore } from "@/store/test";
import { ref } from "vue";

const num = ref<number>(0);
const store = testStore()
const clickHandler = () => {
  num.value += 100;
 
 store.changeState(num.value)


  console.log(store.count, "ssssssssss");
};
</script>

<style scoped lang="scss">
.RelationGraph {
  padding-top: 160px;
}
</style>

