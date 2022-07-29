基础知识简介：
script setup 是vue3的语法糖，简化了以往的组合式API必须return的写法，并且有更好的运行性能

1. 属性和方法无需返回，直接写在script
2. 自动注册：组件无需在components注册，引入即可
3. 组件数据传递 props
```js
<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    data: { type: Object, default: () => {} },
  },
  setup(props, context) {
    const { a, b } = toRefs(props);
    return {
      a,
      b,
    };
  },
});
</script>
```

// 语法糖  [defineProps方法获取]

<script setup lang="ts">
import {toRets} from "vue" 
  
const props = defineProps({ a: String,b: String}) 
const {a, b} = toRefs(props) 
</script>

4. 获取attrs、slots、emits
setip(props,context) 2个参数:
1. props：组件传值
2. context：上下文环境，包含了属性、插槽、⾃定义事件三部分
<script>
setup(props,context){
  const ( attrs, slots, emit ) = context
    // attrs获取组件传递过来的属性值
    // slots组件内的插槽
    // emit 自定义事件 子组件
  }
</script>


# 使用 script setup 语法糖时

// • useAttrs 方法 获取 attrs 属性
// • useSlots 方法获取 slots 插槽
// • defineEmits 方法获取 emit 自定义事件

<script setup lang="ts">
  import {useAttrs, useSlots} from 'vue' 
  const slots = useSlots();
  const attrs = useAttrs();
  const emits = defineEmits(['getChild']);
</script>
 
5. 对外暴露属性 defineExpose
script setup语法糖的组件默认不会对外暴露任何内部声明的属性。如果有部分属性要暴露出去,可以使用defineExpose。
// 子组件

<script setup lang="ts">
// defineExpose无需导入,直接使用
// 声明state
const state = reactive({
  name: "Jerry",
});
// 声明方法
const changeName = () => {
    state.name = "Tom";
  }

// 将方法、变量暴露给父组件使用，父组件才可通过ref API拿到子组件暴露的数据
defineExpose({
  // 解构state
  ...toRefs(state),
  changeName,
});
</script>


// 父组件引用
<script setup lang="ts">
import Child from "./child.vue";
import { watch ,nextTick} from "vue";

  interface sonData {
    changeName: () => void,
    name: string
  }
    
const childRef = ref<InstanceType<typeof Child> & sonData>();
  
// nextTick
nextTick(() => {
  // 获取子组件name
  if (childRef.value && childRef.value.name) {
    console.log(childRef.value.name);   // Jerry
    // 执行子组件方法
    childRef.value.changeName();
    console.log(childRef.value.name);   // Tom
  }
});  
</script>  

6. slot
// 子组件
<template>
<!--  匿名插槽 -->
  <slot />
   <!-- 具名插槽 -->
  <slot name="title" />
   <!-- 作用域插槽 -->
  <slot name="footer" :scope="state" />
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, useSlots, onMounted } from "vue";
  
const state = reactive({
    name: '张三',
    age: '25岁'
  })
onMounted(() => {
  const slots = useSlots();
  // 匿名插槽使用情况
  const defaultSlot = ref(slots.default && slots.default().length);
  console.log(defaultSlot.value); // 1
  // 具名插槽使用情况
  const titleSlot = ref(slots.title && slots.title().length);
  console.log(titleSlot.value); // 3
});
</script>


// 父组件

<template>
 <!-- 匿名插槽 -->
    <span>我是默认插槽</span>
     <!-- 具名插槽 -->
    <template #title>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
    </template>
     <!-- 作用域插槽 -->
    <template #footer="{ scope }">
      <footer>作用域插槽——姓名：{{ scope.name }}，年龄{{ scope.age }}</footer>
    </template>
</template>

<script setup lang="ts">
import Child from "./child.vue";
</script>
7. 路由useRoute和useRouter
● 如果提供了path， params会回被忽略
<script setup>
import {useRoute,useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()

route.query   // 路由信息
router.push('/home')  // 路由跳转

 // 带查询参数，变成 /home?id=3
router.push({path:'/home',query:{id:1}})  
 // 接收参数: route.query.id
  
 // 命名的路由 
router.push({name:'/home',params:{id:1}})   // /home
//  接收参数: route.params.id
</script>
8. 路由导航守卫
<script setup>
  import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
	
  // 添加一个导航守卫，在当前组件将要离开时触发。
  onBeforeRouteLeave((to, from, next) => {
    next()
  })

  // 添加一个导航守卫，在当前组件更新时触发。
  // 在当前路由改变，但是该组件被复用时调用。
  onBeforeRouteUpdate((to, from, next) => {
    next()
  })
</script>

9. 原型绑定与使用
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 获取原型
const prototype = app.config.globalProperties

// 绑定参数
prototype.name = 'Jerry'

<script setup lang="ts">
  import { getCurrentInstance } from 'vue'

  console.log(getCurrentInstance()?.proxy.name)
</script>

10. v-bind() css变量注入
<script setup lang="ts">
  import {ref,reactive} from 'vue'
  // props接收样式
  const props = defineProps({
    border: {
      type: String,
      default: '1px solid yellow'
    }
  })
  
  const color = ref('blue')
  const style = reactive({
    opacity: '0.8'
  })
</script>

<style lang="scss" scoped>
  *{
    color: v-bind(color);
    opacity: v-bind('state.opacity');
    border: v-bind('props.border');
  }
</style>
11. provide和inject
<template>
  <input v-model="name"/>
  <child/>
</template>

<script setup>
  import { provide } from 'vue'
  import { ref, watch } from 'vue'
  // 引入子组件
  import child from './child.vue'

  let name = ref('Jerry')
  // 声明provide
  provide('provideState',{
    name,
    changeName: () => {
      name.value = 'Tom'
    }
  })
  
  // 监听name变化
  watch(name,()=>{
    console.log(`name变成了${name.value}`)
    setTimeout(() => {
      console.log(name.value) // Tom
    }, 1000)
  })
</script>
<script setup lang="ts">
import { inject } from "vue";
// 注入
const provideState: any = inject("provideState");

// 子组件触发name改变
provideState.changeName();
</script>
12. 对 await 的支持
不必再配合 async 就可以直接使用 await 了，这种情况下，组件的 setup 会自动变成 async setup 。
<script setup>
  const post = await fetch('/api').then(() => {}) 
</script> 
13.定义组件的name
用单独的<script>块来定义
<script>
  export default {
    name: 'ComponentName'
  } 
</script>
<script setup>
  // ...
</script>  


setup：
● 参数一：props
● 参数二： context —— js对象，暴露组件的3个property
// 1. Attribute属性 非响应式对象  【useAttrs方法获取】
context.attrs

// 2. slot插槽 非响应式对象		【useSlots方法获取】
context.slots
  
  context.slots.default()   // 获取插槽内容，得到一个类数组

// 3.自定义事件  方法  【defineEmits方法获取】
context.emit
