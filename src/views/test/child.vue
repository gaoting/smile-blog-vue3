<template>
  <div>
    {{ data }}
  </div>
</template>

<script setup name="testChild">
import { onMounted, reactive } from "vue";

const data = reactive({
  a: 1,
  b: 2,
  c: [1, 2, 3, 4],
  d: { a: "sdfa", b: "safas" },
});
console.log("child1");

const send = () => {
  data.b = 9999
};

onMounted(() => {
  console.log("child");
});

defineExpose({
  data,
  send
});
</script>

<style lang="scss" scoped></style>
