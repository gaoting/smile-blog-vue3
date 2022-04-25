<template>
  <div class="article">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="标题">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="分类">
        <a-input v-model:value="formState.types" />
      </a-form-item>
      <a-form-item label="标签">
        <a-input v-model:value="formState.tags" />
      </a-form-item>
      <a-form-item label="作者">
        <a-input v-model:value="formState.author" />
      </a-form-item>
      <a-form-item label="文章描述">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>
      <a-form-item label="编辑内容">
        <editor :value="detail" @change="handleChangeEditor($event)"> </editor>
      </a-form-item>
      <a-form-item label="   ">
        <a-button type="success" size="large" @click="onSubmit">提交</a-button>
        <a-button size="large" style="margin-left: 10px">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  ref,
  toRefs,
  toRaw,
} from "vue";
import Editor from "@/components/TinymceEditor/index.vue";
import type { UnwrapRef } from "vue";
import { createArticle } from "../../common/axios";
import { message } from "ant-design-vue";

let detail = ref("");

const labelCol = reactive({ style: { width: "150px" } });
const wrapperCol = reactive({ span: 20 });

interface Articles {
  author: string;
  tags: string;
  types: string;
  title: string;
  description: string;
  content: string;
}

const formState: UnwrapRef<Articles> = reactive({
  author: "smile",
  tags: "vue",
  types: "前端",
  title: "dsaasss",
  description: "达士大夫撒；唠嗑",
  content: "",
});
const onSubmit = async () => {
  formState.content = detail.value;
  console.log("submit!", toRaw(formState));
  const data = await createArticle(formState);
  console.log(data);
  message.success("文章创建成功");
};

const handleChangeEditor = (content: any) => {
  detail.value = content;
};
</script>

<style scoped lang="scss">
.article {
  padding: 40px 20px;
  width: 100%;
  height: calc(100% - 60px);
  background: url("../../assets/img/bg55.png") no-repeat;
  // background-position: bottom right;
  background-size: 100% 100%;
  background-attachment: fixed;
}
</style>