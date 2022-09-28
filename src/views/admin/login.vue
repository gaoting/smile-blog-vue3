<template>
  <div class="box">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="登  录">
        <a-form
          :model="formState"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 15 }"
          v-if="activeKey == 1"
        >
          <a-form-item
            label="用户名"
            name="userName"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <a-input v-model:value="formState.userName" size="large" />
          </a-form-item>

          <a-form-item
            label="密码"
            name="pwd"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password v-model:value="formState.pwd" size="large" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 1, span: 12 }">
            <a-checkbox v-model:checked="formState.remember">
              记住密码
            </a-checkbox>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 5, span: 15 }">
            <a-button type="success" @click="onFinish" block>登录</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="注  册">
        <a-form
          :model="formState1"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 15 }"
          v-if="activeKey == 2"
        >
          <a-form-item
            label="用户名"
            name="userName1"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <a-input v-model:value="formState1.userName1" size="large" />
          </a-form-item>

          <a-form-item
            label="密码"
            name="pwd1"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password v-model:value="formState1.pwd1" size="large" />
          </a-form-item>
          <a-form-item
            label="确认密码"
            name="pwd2"
            :rules="[{ required: true, message: '请再次输入密码' }]"
          >
            <a-input-password v-model:value="formState1.pwd2" size="large" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 5, span: 15 }">
            <a-button type="success" @click="registerFun" block>注册</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { message } from "ant-design-vue";
import { defineComponent, reactive, ref, inject, onMounted } from "vue";
import { login, register } from "../../common/axios";
import { mainStore } from "@/store/typeList";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

interface FormState {
  userName: string;
  pwd: string;
  remember: boolean;
}

interface FormState1 {
  userName1: string;
  pwd2: string;
  pwd1: string;
}
let activeKey = ref("1");

const formState = reactive<FormState>({
  userName: "",
  pwd: "",
  remember: true,
});

const formState1 = reactive<FormState1>({
  userName1: "",
  pwd1: "",
  pwd2: "",
});

// login
const store = mainStore();
const { token } = storeToRefs(store);
const route = useRouter();
const reload: any = inject("reload");

const onFinish = async () => {
  const { userName, pwd, remember } = formState;
  const res = await login({ userName, pwd });

  if (res.code === 200) {
    message.success(res.message);
    // store.$patch((state) =>{
    //   state.token = res.token
    // })
    store.changeToken(res.token);
    store.getLoginInfo({ userName, pwd });

    localStorage.setItem("token", res.token);
    localStorage.setItem("userName", res.userName);
    if (remember) {
      localStorage.setItem("userInfo", JSON.stringify({ userName, pwd }));
    }

    route.push({ path: "/" });
    reload();
  }
};

// 注册
const registerFun = async () => {
  const { userName1, pwd2, pwd1 } = formState1;

  if (pwd2 !== pwd1) {
    message.error("俩次输入的密码不一致，请重新输入");
    return;
  }

  const res = await register({ userName: userName1, pwd: pwd1 });
  if (res.code === 200) {
    message.success("注册成功！");
    formState.userName = userName1;
    formState.pwd = pwd1;

    onFinish();
  }
};

onMounted(() => {
  let getUserInfo = localStorage.getItem("userInfo");
  if (getUserInfo) {
    let data = JSON.parse(getUserInfo);
    formState.userName = data.userName;
    formState.pwd = data.pwd;
  }
  console.log(formState1);
});
</script>

<style lang="scss" scoped>
.box {
  :deep(.ant-tabs.ant-tabs-top.ant-tabs-card) {
    background: #fff;
    position: fixed;
    width: 500px;
    height: 360px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 7px 14px #ccc;
    border-radius: 12px;
  }
  :deep(.ant-tabs-nav-list) {
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
  }
  :deep(.ant-tabs-tab) {
    width: 50%;
  }
  :deep(.ant-tabs-tab-btn) {
    text-align: center;
    width: 100%;
    padding: 6px 0;
    font-size: 16px;
  }
  :deep(.ant-tabs-content-holder) {
    margin-top: 40px;
  }
  :deep(button.ant-btn.ant-btn-success.ant-btn-block) {
    height: 42px;
    font-size: 16px;
  }
}
</style>
