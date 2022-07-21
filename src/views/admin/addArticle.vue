<template>
  <div class="article">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="标题">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="分类">
        <a-select
          v-model:value="formState.types"
          show-search
          :options="options"
          :filter-option="filterOption"
        ></a-select>
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
        <a-tabs v-model:activeKey="activeKey" type="card">
          <a-tab-pane key="1" tab="markdown">
            <v-md-editor v-model="detail" height="800px"></v-md-editor>
          </a-tab-pane>
          <a-tab-pane key="2" tab="富文本编辑器">
            <TinymceEditor :value="detail" @change="handleChangeEditor($event)">
            </TinymceEditor>
          </a-tab-pane>
        </a-tabs>
      </a-form-item>
      <a-form-item label="   ">
        <a-button type="success" size="large" @click="onSubmit">提交</a-button>
        <a-button size="large" style="margin-left: 10px">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, UnwrapRef, onMounted } from "vue";
import TinymceEditor from "@/components/TinymceEditor/index.vue";
import { createArticle } from "../../common/axios";
import { message } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { mainStore } from "@/store/index";

const props = defineProps({
  newData: { type: Object, default: {} },
});

let detail = ref("");
let activeKey = ref("1");

const labelCol = reactive({ style: { width: "150px" } });
const wrapperCol = reactive({ span: 20 });

interface Articles {
  author: string;
  tags: string;
  types: string;
  title: string;
  description: string;
  content: string;
  activeKey: string;
  picture: string;
}
interface Options {
  label: string;
  value: string;
}

const formState: UnwrapRef<Articles> = reactive({
  author: "smile",
  tags: "",
  types: "",
  title: "",
  description: "",
  content: "",
  activeKey: activeKey.value,
  picture: "",
});

const onSubmit = async () => {
  let doms = document.querySelectorAll(".v-md-editor__preview-wrapper img");
  formState.picture = doms[0]?.getAttribute("src") || "";

  formState.content = detail.value;
  console.log("submit!", toRaw(formState));
  const data = await createArticle(formState);
  message.success("文章创建成功");
};

const handleChangeEditor = (content: any) => {
  detail.value = content;
};

let options:Array<Options> = reactive([]);
const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
onMounted(() => {
  const store = mainStore();
  const { types } = storeToRefs(store);
  store.types.forEach((v: any) => {
    let obj = { label: v, value: v };
    options.push(obj);
  });
});
</script>

<style scoped lang="scss">
.article {
  padding: 40px 20px;
  width: 100%;
  height: calc(100% - 60px);
  // background: url("../../assets/img/bg55.png") no-repeat;
  // background-position: bottom right;
  // background-size: 100% 100%;
  background-attachment: fixed;
  background-image: linear-gradient(#94dacc, #def3ee, #fff);
}
</style>