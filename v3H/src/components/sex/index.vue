<template>
  <div class="box">
    <div class="title">
      <p>男女比例</p>
      <img src="@/assets/image/screen_title_tag.png" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="@/assets/image/screen_man.png" alt="" />
      </div>
      <div class="woman">
        <img src="@/assets/image/screen_woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <span class="siz">男士：58%</span>
      <span class="siz">女士：42%</span>
    </div>
    <div class="echarts" ref="echt"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
let echt = ref();
onMounted(() => {
  let myChart = echarts.init(echt.value);
  myChart.setOption({
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        name: "男女比例",
        type: "bar",
        data: [58],
        barWidth: 12, // 柱状图宽度
        color: "#007AFE",
        showBackground: true,
        backgroundStyle: {
          color: "#FF4B7A",
          borderRadius: 20,
        },
        itemStyle: {
          borderRadius: 20,
        },
      },
    ],

    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>

<style lang="scss" scope>
.box {
  width: 100%;
  height: 100%;
  background: url(@/assets/image/screen_main_IB.png) no-repeat;
  background-size: 100% 100%;
  margin: 6px 15px;
  padding-left: 5px;
  .title {
    transform: translate(38px);
    color: white;
    font-size: 20px;
  }
  .sex {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    .man {
      margin: 20px;
      width: 115px;
      height: 115px;
      background: url(@/assets/image/screen_man_bg.png);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      margin: 20px;
      background: url(@/assets/image/screen_woman_bg.png);
      width: 115px;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 80px;
    .siz{
        font-size: 20px;
    }
  }
  .echarts {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
    width: 100%;
    height: 12px;
  }
}
</style>