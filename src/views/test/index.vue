<template>
  <div>
    <keep-alive>
      <Child ref="childs"></Child>
    </keep-alive>

    <button @click="send">click</button>
    <home-outlined />
  </div>
</template>

<script setup lang="ts" name="test">
// import { onMounted, ref, nextTick } from "vue";
import Child from "./child.vue";
import { mainStore } from "@/store/typeList";
import { storeToRefs } from "pinia";

const childs = ref(null);
const send = () => {
  childs.value.send();
  console.log(childs.value.data);
};

const store = mainStore();
const { types: any } = storeToRefs(store);

let arr: Array<Options> = reactive([]);
interface Options {
  label: string;
  value: number;
}
onMounted(() => {
  nextTick(() => {
    childs.value.data = 2;
    console.log(childs.value.data);

    store.types.forEach((v: any) => {
      arr.push(v);
    });
  });
});
</script>

<style lang="scss" scoped></style>
