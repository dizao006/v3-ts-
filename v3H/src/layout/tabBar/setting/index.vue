<template>
  <div class="right">
    <el-button size="default" icon="Refresh" circle @click="changeFlshow">
    </el-button>
    <el-button size="default" icon="FullScreen" circle @click="full">
    </el-button>
    <el-popover
      placement="top-start"
      title="主题切换"
      :width="250"
      trigger="hover"
      size="small"
    >
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            @change="changeColor"
            :predefine="predefineColors"
          />
        </el-form-item>
        <el-form-item label="夜间模式">
          <el-switch
            @change="tochangeDuck"
            v-model="toblack"
            inline-prompt
            size="default"
            active-icon="Moon"
            inactive-icon="Sunny"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button size="default" icon="Setting" circle> </el-button>
      </template>
    </el-popover>
    <img src="../../../../image/user.jpg" alt="" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人详情</el-dropdown-item>
          <el-dropdown-item @click="remove">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useSetting } from "../../../store/modules/setting";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { ref } from "vue";
export default {};
</script>

<script lang="ts" setup>
let set = useSetting();
let userName = localStorage.getItem("nickname");
let { changeFlshow } = set;
const router = useRouter();
const open1 = () => {
  ElNotification({
    title: "Success",
    message: "退出登录成功，正在转跳登录页面",
    type: "success",
  });
};
function remove() {
  localStorage.removeItem("token");
  localStorage.removeItem("nickname");
  localStorage.removeItem("time");
  localStorage.removeItem("TOKEN");
  open1();
  setTimeout(() => {
    router.push({
      name: "login",
    });
  }, 300);
}
function full() {
  //dom属性，判断是否全屏
  let fu = document.fullscreenElement;
  if (!fu) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

//主题
const color = ref("rgba(255, 69, 0, 0.68)");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);

let toblack = ref(false);

function tochangeDuck() {
  let html = document.documentElement;
  if (toblack.value === true) {
    html.className = "dark";
  } else {
    html.className = "";
  }
}
function changeColor() {
  const el = document.documentElement;

  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`);

  // 设置 css 变量
  el.style.setProperty("--el-color-primary", color.value);
}
</script>

<style scoped lang="scss">
img {
  margin: 0px 8px 0 18px;
  width: 45px;
  height: auto;
  border-radius: 45%;
}
.right {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  font-size: 30px;
  display: flex;
  align-items: center;
}
</style>