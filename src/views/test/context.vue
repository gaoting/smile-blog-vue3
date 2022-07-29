<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2" force-render
      >Content of Tab Pane 2</a-tab-pane
    >
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
</template>

<script setup="props,context" lang="ts">
import { onMounted, ref } from "vue";

const activeKey = ref("1");

const props = defineProps({ data: { type: Object, default: {} } });

const test = () => {
  console.log(props.data);
};


onMounted(() => {
  test();
});
</script>

