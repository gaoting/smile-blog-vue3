// 导入所有组件
// 以 "dialog-" 开头,以".vue"结尾
const allComponents = require.context('./test', false, /^\.vue$/)
let res_components = {}
allComponents.keys().forEach(fileName => {
  let comp = allComponents(fileName)
  res_components[fileName.replace(/^\.\/(.*)\.\w+$/, '$1')] = comp.default
  console.log(res_components, "res_components res_components");
})
export default res_components
