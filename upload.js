
'use strict'
// 引入scp2
const client = require('scp2');
// 下面三个插件是部署的时候控制台美化所用 可有可无
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');

// import inquirer from 'inquirer'
// import client from 'scp2'
// import ora from 'ora'
// import chalk from 'chalk'

//服务器链接信息
const server_list = {
  //这是生产环境
  prod: {
    host: '81.69.222.61', // 服务器的IP地址
    port: '22',            // 服务器端口， 一般为 22
    username: 'root', // 服务器登录用户名
    password: 'gt1018..', // 服务器登录密码
    distPath: 'dist', // 本地打包生成目录
    path: '/www/wwwroot/gaoting666'
    // 项目部署的服务器目标位置
  }
};

inquirer.prompt().then(function (answers) {
  if (answers.choose == 99) {
    console.log('取消上传');
  } else {

    //开启loading
    const spinner = ora(chalk.green(ora_chalk));
    spinner.start();
    //链接服务器
    client.scp('./dist/', server_list.prod, err => {
      spinner.stop();
      if (!err) {
        console.log(chalk.green("项目发布完毕!"))
      } else {
        console.log(chalk.red("上传失败:"), err);
      }
    })
  }
})





