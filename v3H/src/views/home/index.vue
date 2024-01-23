<template>
  <div class="container">
    <!-- 顶部区域 -->
    <Card></Card>
    <!-- 中部区域 -->
    <Sale></Sale>
    <!-- 底部区域 -->
  </div>
</template>

<script setup lang="ts">
import Card from "./Card/index.vue";
import Sale from "./Sale/index.vue";
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>