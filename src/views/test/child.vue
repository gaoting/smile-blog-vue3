<template>
  <div>
    <p>111111</p>
    <p>222</p>
    <slot name="title"></slot>
    <slot name="content" :str="str">
      默认内容 {{str}}
    </slot>

    <p>333</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";

const str = ref("this is test data");
</script>

<style scoped>
</style>