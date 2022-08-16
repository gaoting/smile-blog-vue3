<template>
  <div class="flex">
    <span>单价</span>
    <span @click="add('price')">+</span>
    <span>{{ price }}</span>
    <span @click="minus('price')">-</span>
  </div>

  <div class="flex">
    <span>数量</span>
    <span @click="add('num')">+</span>
    <span>{{ num }}</span>
    <span @click="minus('num')">-</span>
  </div>

  <div class="flex">
    <span>合计</span>
    <span @click="compute">=</span>
    <span>{{ count }}</span>
  </div>

  <hr />
  <Test1></Test1>
</template>

<script setup lang="ts">
import { testStore } from "@/store/test";
import { storeToRefs } from "pinia";
import Test1 from "./../test1/index.vue";
import { ref, toRefs, reactive, useSlots, onMounted, inject } from "vue";

const store = testStore();
const { count, num, price } = storeToRefs(store);

const add = (type: string) => {
  type == "price" ? store.price++ : store.num++;
};
const minus = (type: string) => {
  type == "num" ? store.price-- : store.num--;
};

const onFun = () => {
  store.$patch({
    count: store.count,
    price: store.price,
    num: store.num,
  });
};
const state1 = reactive({
  name: "张三",
  age: "25岁",
});
onMounted(() => {
  const slots = useSlots();
  // 匿名插槽使用情况
  const defaultSlot = ref(slots.default && slots.default().length);
  console.log(defaultSlot.value); // 1
  // 具名插槽使用情况
  const titleSlot = ref(slots.title && slots.title().length);
  console.log(titleSlot.value); // 3
});

// 注入
const provideState: any = inject("provideState");

// 子组件触发name改变
provideState.changeName();

// 声明state
const state = reactive({
  name: "Jerry",
});

// 将方法、变量暴露给父组件使用，父组件才可通过ref API拿到子组件暴露的数据
defineExpose({
  // 解构state
  ...toRefs(state),
  // 声明方法
  changeName() {
    state.name = "Tom";
  },
});

const compute = () => {
  store.count = store.price * store.num;
  onFun();
};
</script>

<style scoped lang="scss">
span {
  border: 1px solid #ccc;
  display: inline-block;
  min-width: 28px;
  // height: 28px;
  text-align: center;
  margin: 20px;
  padding: 8px 16px;
  &:first-child {
    border: 0;
  }
}
</style>