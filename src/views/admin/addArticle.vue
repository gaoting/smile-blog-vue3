<template>
  <div class="article">
    <a-row>
      <a-col :span="8">
        <a-input size="large" v-model:value="formState.title" placeholder="标题" />
      </a-col>
      <a-col :span="6">
        <a-select
        size="large"
          placeholder="标签"
          v-model:value="formState.tags"
          show-search
          :options="options"
          :filter-option="filterOption"
        ></a-select>
      </a-col>
      <a-col :span="5">
        <a-radio-group v-model:value="formState.types" button-style="solid" size="large">
          <a-radio-button value="前端">前端</a-radio-button>
          <a-radio-button value="后端">后端</a-radio-button>
          <a-radio-button value="阅读">阅读</a-radio-button>
        </a-radio-group>
      </a-col>
      <a-col :span="5" class="flex-row-end">
        <a-button @click="router.go(-1)" size="large">返回</a-button>
        <a-button type="primary" @click="onSubmit" style="margin-left: 10px" size="large"
          >提交</a-button
        >
      </a-col>
    </a-row>
    <v-md-editor
      v-model="formState.content"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      height="800px"
    ></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, UnwrapRef, onMounted } from "vue";
// import TinymceEditor from "@/components/TinymceEditor/index.vue";
import { createArticle, findById, updateArticle } from "../../common/axios";
import { message } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { mainStore } from "@/store/typeList";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  newData: { type: Object, default: {} },
});

let detail = ref("");
let activeKey = ref("1");

const labelCol = reactive({ style: { width: "150px" } });
const wrapperCol = reactive({ span: 20 });

interface Articles {
  author: string;
  tags: number;
  types: string;
  title: string;
  description: string;
  content: string;
  activeKey: string;
  picture: string;
}
interface Options {
  label: string;
  value: number;
}

let formState: UnwrapRef<Articles> = ref({
  author: "smile",
  tags: null,
  types: "前端",
  title: "",
  description: "",
  content: "",
  activeKey: activeKey.value,
  picture: "",
});

const handleUploadImage = (event, insertImage, files) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  console.log(event, insertImage, files);
};

const onSubmit = async () => {
  if (route.query.id) {
    const res = await updateArticle(formState.value);
    message.success("文章更新成功");
  } else {
    let doms = document.querySelectorAll(".v-md-editor__preview-wrapper img");
    formState.value.picture = doms[0]?.getAttribute("src") || "";

    formState.value.content = detail.value;
    const res = await createArticle(formState.value);
    message.success("文章创建成功");
    formState.value = {
      author: "smile",
      tags: null,
      types: "",
      title: "",
      description: "",
      content: "",
      activeKey: activeKey.value,
      picture: "",
    };
  }
};

const handleChangeEditor = (content: any) => {
  detail.value = content;
};

let options: Array<Options> = reactive([]);
const filterOption = (input: string, option: any) => {
  console.log(input, option);
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// 请求详情
const getDetail = async (id: number) => {
  const res = await findById({ id });
  formState.value = { ...formState.value, ...res.data };
};

const route = useRoute();
const store = mainStore();
const { types: any } = storeToRefs(store);

onMounted(() => {
  console.log(store.types);
  store.types.forEach((v: any) => {
    let obj = { label: v.name, value: v.id };
    options.push(obj);
  });

  if (route.query.id) {
    getDetail(route.query.id);
  }
});
</script>

<style scoped lang="scss">
.article {
  // padding: 40px 20px;
  width: 100%;
  height: calc(100% - 60px);
  // background: url("../../assets/img/bg55.png") no-repeat;
  // background-position: bottom right;
  // background-size: 100% 100%;
  // background-attachment: fixed;
  // background-image: linear-gradient(#94dacc, #def3ee, #fff);
}
:deep(.ant-row) {
  justify-content: space-around;
}
:deep(.ant-form-item) {
  margin-bottom: 0;
}
:deep(.ant-select.ant-select-single.ant-select-show-arrow.ant-select-show-search) {
  width: 100%;
}
.flex-row-end {
  display: flex;
  justify-content: end;
}
:deep(label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked),
:deep(button.ant-btn.ant-btn-primary) {
  border: 1px solid #019997;
  background: #02bfbb;
  &:hover {
    border: 1px solid #019997;
    background: #019997;
    color: #fff;
  }
}

</style>