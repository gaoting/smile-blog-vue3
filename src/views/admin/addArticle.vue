<template>
  <div class="article">
    <a-row>
      <a-col :span="8">
        <a-input
          size="large"
          v-model:value="formState.title"
          placeholder="标题"
        />
      </a-col>
      <a-col :span="6">
        <a-select
          size="large"
          placeholder="标签"
          v-model:value="formState.tags"
          show-search
          :options="tagsOptions"
          :filter-option="filterTagsOption"
        ></a-select>
      </a-col>
      <a-col :span="5">
        <a-select
          size="large"
          placeholder="分类"
          v-model:value="formState.types"
          show-search
          :options="typeOptions"
          :filter-option="filterTypesOption"
        ></a-select>
      </a-col>
      <a-col :span="5" class="flex-row-end">
        <a-button @click="router.go(-1)" size="large">返回</a-button>
        <a-button
          type="primary"
          @click="onSubmit"
          style="margin-left: 10px"
          size="large"
          >提交</a-button
        >
      </a-col>
    </a-row>

    <v-md-editor
      v-model="formState.content"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      height="800px"
    >
    </v-md-editor>
  </div>
</template>

<script setup lang="ts">
import {
  createArticle,
  findById,
  updateArticle,
  upload,
} from "../../common/axios";
import { message } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { mainStore } from "@/store/typeList";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  newData: { type: Object, default: {} },
});

let detail = ref("");

const labelCol = reactive({ style: { width: "150px" } });
const wrapperCol = reactive({ span: 20 });

interface Articles {
  author: string;
  tags: number;
  types: number;
  title: string;
  description: string;
  content: string;
  picture: string;
}
interface Options {
  label: string;
  value: number;
}

let formState: UnwrapRef<Articles> = ref({
  author: "smile",
  tags: null,
  types: null,
  title: "",
  description: "",
  content: "",
  picture: "",
});

const route = useRoute();
const router = useRouter();
const store = mainStore();
const { types: any } = storeToRefs(store);

const API = ref("");

onMounted(() => {
  API.value =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3300/"
      : "http://gaoting666.cn:3300/";
  store.types.forEach((v: any) => {
    let obj = { label: v.name, value: v.id };
    if (obj.value) {
      typeOptions.push(obj);
    }
  });
  store.tags.forEach((v: any) => {
    let obj = { label: v.name, value: v.id };

    tagsOptions.push(obj);
  });

  if (route.query.id) {
    getDetail(route.query.id);
  }
});

const handleUploadImage = async (event, insertImage, files) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  console.log(files);
  // console.log('[ files.file ] >', files[0])
  // // 构建FormData对象,通过该对象存储要上传的文件
  const formData = new FormData();
  formData.append("file", files[0]);
  console.log("[ formData ] >", formData);
  const res = await upload(formData);
  if (res.code === 200) {
    insertImage({
      url: API.value + res.result.url,
    });
  }
};

const onSubmit = async () => {
  const imgs = document.querySelector(".vuepress-markdown-body img");

  formState.value.picture = imgs ? imgs.src : "";

  const doms = document.querySelector(".vuepress-markdown-body p");
  formState.value.description = doms ? doms.innerText : "";

  if (route.query.id) {
    const res = await updateArticle(formState.value);
    if (res.code == 200) {
      message.success("文章更新成功");
      router.go(-1);
    }
  } else {
    // let doms = document.querySelectorAll(".v-md-editor__preview-wrapper img");
    // formState.value.picture = doms[0]?.getAttribute("src") || "";

    const res = await createArticle(formState.value);
    if (res.code === 200) {
      message.success("文章创建成功");
      formState.value = {
        author: "smile",
        tags: null,
        types: null,
        title: "",
        description: "",
        content: "",

        picture: "",
      };
    }
  }
};

const handleChangeEditor = (content: any) => {
  detail.value = content;
};

let tagsOptions: Array<Options> = reactive([]);
let typeOptions: Array<Options> = reactive([]);

const filterTagsOption = (input: string, option: any) => {
  console.log(input, option);
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const filterTypesOption = (input: string, option: any) => {
  console.log(input, option);
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// 请求详情
const getDetail = async (id: number | string) => {
  const res = await findById({ id: +id });
  formState.value = { ...formState.value, ...res.data };
};
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
:deep(
    .ant-select.ant-select-single.ant-select-show-arrow.ant-select-show-search
  ) {
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
