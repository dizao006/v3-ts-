<template>
  <div class="top_container">
    <div class="top_left">
      <div class="nav" @click="goHome">首页</div>
    </div>
    <div class="top_center">智慧旅游可视化大数据展示平台</div>
    <div class="top_right">
      <div class="nav">统计报告</div>
      <div>{{ now }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
let timer = ref();
const $router = useRouter();
let now = ref(moment().format("YYYY年MM月DD日hh时mm分ss秒"));
onMounted(() => {
  timer.value = setInterval(() => {
    now.value = moment().format("YYYY年MM月DD日hh时mm分ss秒");
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer.value);
});
// 跳转首页
const goHome = () => {
  $router.push({ name: "home" });
};
</script>

<style scoped lang="scss">
.top_container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  height: 60px;
  position: relative;
  z-index: 999;

  .nav {
    width: 150px;
    height: 40px;
    background: url(@/assets/image/screen_header_left.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 40px;
    color: #29fcff;
    cursor: pointer;
    font-size: 15px;
    transition: all 0.2s linear;

    &:hover {
      background-color: rgba(#29fcff, 0.2);
    }
  }

  .top_left {
    display: flex;
    justify-content: end;
    height: 40px;
    width: 576px;
    background: url(@/assets/image/screen_header_bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .top_center {
    height: 74px;
    width: 768px;
    background: url(@/assets/image/screen_header_center.png) no-repeat;
    background-size: 100% 100%;
    color: #29fcff;
    cursor: pointer;
    text-align: center;
    line-height: 74px;
    font-size: 30px;
  }

  .top_right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 140px;
    height: 40px;
    width: 576px;
    background: url(@/assets/image/screen_header_bg.png) no-repeat;
    background-size: 100% 100%;
    color: #29fcff;
    font-size: 14px;
  }
}
</style>