import { createApp } from 'vue'
//@ts-ignore
import App from '@/App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
//element
import router from './router'
import '@/styles/index.scss' // 引入全局样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Search from '@/components/Search.vue' // 引入搜索组件
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import pinia from './store'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia)
app.use(router)
app.component('Search', Search) // 将搜索注册为全局组件
app.mount('#app')
