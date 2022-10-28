//plopfile.js

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
