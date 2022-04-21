<template>
  <child>
    <template v-slot:default="slotProps">
      接收所有传递的数据{{ slotProps }}
    </template>

    <template v-slot:title>
      <div>44444</div>
    </template>

    <template v-slot:content="data">
      <div>5555 {{ data.str }}</div>
    </template>

    <!-- <template #default="{ id }">
      <button @click="removeRow(id)">delete</button>
    </template> -->
  </child>
</template>

<script setup lang="ts">
import Child from "./child.vue";

import { ref } from "vue";

const arr = [
  { id: 1, name: "css" },
  { id: 2, name: "html" },
  { id: 3, name: "js" },
];

const arrList: any = ref([]);

const removeRow = (id: number) => {
  const idx = arrList.value.findIndex((x: any) => x.id == id);
  arrList.value.splice(idx, 1);
};
</script>

<style scoped>
</style>