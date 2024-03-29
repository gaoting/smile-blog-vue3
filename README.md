## plop.js简介

一般用于快速生成模板、代码块等。例如每次新增一个页面都得配置vue页面、api、router等，那么就可封装一个模板自动而快速的生成这些文件或代码。官网 [plop.js](http://https://plopjs.com/documentation/#getting-started)

### 安装
```js
npm install --save-dev plop
```
或者全局安装
```js
// windows
npm install -g plop

// Mac
sudo npm install -g plop
```

### 使用
1. 在项目根目录下新建文件夹：`plop-template`   （用于存放模版文件）
2. 在plop-template下新建vue模板文件：`vue.hbs`

> 这里的`'{{}}'`是plop的模板语法;  `{{}}`是vue的模板语法
> `'{{ name }}'` 是plop命令行传递过来的参数 在下面的配置文件中配置
```html
<template>
  <div>
    
  </div>
</template>

<script setup lang="ts" name="{{name}}">

</script>

<style lang="scss" scoped>

</style>
```

3. 如果需要一并生成router，可新建router文件，再通过`append`添加路由代码块  
`testDemo/router.ts`
```js
// router.ts
import { mainStore } from "./../store/typeList";
import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import { storeToRefs } from "pinia";

const routes = [];

const routerConfig = {
  history: createWebHistory(),
  routes,
};

const router = createRouter(routerConfig);

declare module "vue-router" {
  interface RouteMeta {
    isAdmin?: boolean;
    requiresAuth: boolean;
  }
}

export default router;
```

5. 根目录新建文件 `plopfile.js`
```js
module.exports = function (plop) {
  plop.setGenerator("controller", {
    description: "new template", //描述 可选
    prompts: [
      //需要用户输入的参数
      {
        type: "input", //命令行交互类型 input number confirm...
        name: "name", //参数名
        message: "输入文件名", //提示信息
      },
      {
        type: "input",
        name: "path",
        message: "输入文件路径",
      },
      {
        type: "input",
        name: "api",
        message: "输入api地址模块名",
      },
      {
        type: 'input',
        name: 'menu',
        message: '输入路由名称',
      }
    ],
    actions: (data) => {
      const name = "{{name}}";
      const path = "{{path}}";
      const text = "{{text}}";
      const api = "{{api}}";
      const menu = "{{menu}}";


      const actions = [
        {
          type: "add", //操作类型 add modify addMany etc
          path: `testDemo/views/${path}/${name}.vue`, //文件生成目录及文件名
          templateFile: "plop-templates/vue.hbs", //对应的模板文件地址
          data: {
            //传递给模板的参数
            name,
          },
        },
        {
          //api模块
          type: "add",
          path: `testDemo/api/${path}/${name}.js`,
          templateFile: "plop-templates/api.hbs",
          data: {
            name,
            api,
          },
        },
        {
          //router模块
          type: "append",
          path: `testDemo/router.ts`,
          pattern: /\[/,
          templateFile: "plop-templates/router.hbs",
          data: {
            name,
            path,
            menu
          },
        },
      ];
      return actions;
    },
  });
};
```













