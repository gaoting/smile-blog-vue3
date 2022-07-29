<template>
  <Context :data="data" @close="close"></Context>
  <input type="text" v-model="name">
  <Child ref="childRef">
    <template v-slot:content="data">
      <div>5555 {{ data.str }}</div>
    </template>

    <!-- 匿名插槽 -->
    <span>我是默认插槽</span>
    <!-- 具名插槽 -->
    <template #title>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
    </template>
    <!-- 作用域插槽 -->
    <template #footer="{ scope }">
      <footer>作用域插槽——姓名：{{ scope.name }}，年龄{{ scope.age }}</footer>
    </template>
  </Child>
</template>

<script lang="ts">
export default defineComponent({
  name: "Test",
});
</script>

<script setup lang="ts">
import Child from "./child.vue";
import Context from "./context.vue";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
} from "vue";

import { watch, nextTick,provide } from "vue";
import { useRouter, useRoute } from "vue-router";

const arr = [
  { id: 1, name: "css" },
  { id: 2, name: "html" },
  { id: 3, name: "js" },
];

const data = reactive({
  id: 99,
  name: "gaoting",
});
const close = (e: any) => {
  console.log(e);
};

const arrList: any = ref([]);

const removeRow = (id: number) => {
  const idx = arrList.value.findIndex((x: any) => x.id == id);
  arrList.value.splice(idx, 1);
};

let route = useRoute();
let router = useRouter();

  let name = ref('Jerry')
  // 声明provide
  provide('provideState', {
    name,
    changeName: () => {
      name.value = 'Tom'
    }
  })

  // 监听name改变
  watch(name, () => {
    console.log(`name变成了${name.value}`)
    setTimeout(() => {
      console.log(name.value) // Tom
    }, 1000)
  })


watch(router, (route) => {
  console.log("最新的", route, route.currentRoute);
});


onMounted(() => {
  console.log("--------Router---------");

  console.log(useRouter());

  console.log("--------route---------");

  console.log(useRoute());

  if (getCurrentInstance() && getCurrentInstance()?.proxy) {
    console.log(
      getCurrentInstance()?.proxy,
      "console.log(getCurrentInstance());"
    );
  }
});
</script>

<style scoped>
</style>