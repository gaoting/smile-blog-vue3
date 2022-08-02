module.exports = {
  privateKey: '/Users/smile/.ssh', // 本地私钥地址，位置一般在C:/Users/xxx/.ssh/id_rsa，非必填，有私钥则配置
  passphrase: '', // 本地私钥密码，非必填，有私钥则配置
  projectName: 'smile blog', // 项目名称
  prod: {  // 线上环境
    name: '线上环境',
    script: "npm run build", // 线上环境打包脚本
    host: '81.69.222.61', // 线上服务器地址
    port: 22, // ssh port，一般默认22
    username: 'root', // 登录服务器用户名
    password: 'gt1018..', // 登录服务器密码
    distPath: 'dist',  // 本地打包dist目录
    webDir: '/www/wwwroot/gaoting666' // 线上环境web目录
  }

}
