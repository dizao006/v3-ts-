<template>
  <div class="box4" ref="map"></div>
</template>
  
  <script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import * as chinaJSON from "./china.json";
let map = ref();
const planePath = ref(
  "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z"
);
const points = ref([
  { value: [116.405285, 39.904989], itemStyle: { color: "#FFFA00" } },
  { value: [113.665412, 34.757975], itemStyle: { color: "#00EEFF" } },
  { value: [113.54909, 22.198951], itemStyle: { color: "#00EEFF" } },
  { value: [91.132212, 29.660361], itemStyle: { color: "#00EEFF" } },
  { value: [126.642464, 45.756967], itemStyle: { color: "#00EEFF" } },
  { value: [87.617733, 43.792818], itemStyle: { color: "#00EEFF" } },
  { value: [121.472644, 31.231706], itemStyle: { color: "#00EEFF" } },
  { value: [117.283042, 31.86119], itemStyle: { color: "#00EEFF" } },
]);
echarts.registerMap("china", chinaJSON as any);
onMounted(() => {
  let myEcharts = echarts.init(map.value);
  myEcharts.setOption({
    geo: {
      map: "china",
      roam: true,
      left: 180,
      top: 140,
      label: {
        show: true,
        color: "#fff",
        fontSize: 12,
      },
      itemStyle: {
        areaColor: "#12235c",
        borderColor: "#2ab8ff",
        borderWidth: 0.5,
        shadowColor: "rgba(0,54,255, 0.4)",
        shadowBlur: 100,
      },
      emphasis: {
        //区域激活时的样式
        itemStyle: {
          areaColor: "#02102b",
        },
        label: {
          color: "#fff",
          fontSize: 16,
        },
      },
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    series: [
      {
        type: "lines",
        data: [
          {
            coords: [
              [113.665412, 34.757975],
              [113.54909, 22.198951],
            ],
          },
          {
            coords: [
              [113.665412, 34.757975],
              [91.132212, 29.660361],
            ],
          },
          {
            coords: [
              [113.665412, 34.757975],
              [126.642464, 45.756967],
            ],
          },
          {
            coords: [
              [113.665412, 34.757975],
              [87.617733, 43.792818],
            ],
          },
          {
            coords: [
              [113.665412, 34.757975],
              [121.472644, 31.231706],
            ],
          },
          {
            coords: [
              [113.665412, 34.757975],
              [117.283042, 31.86119],
            ],
          },
          {
            coords: [
              [113.54909, 22.198951],
              [117.283042, 31.86119],
            ],
          },
          /////
          {
            coords: [
              [113.665412, 34.757975],
              [110.33119, 20.031971],
            ],
          },
          {
            coords: [
              [113.665412, 34.757975],
              [126.642464, 45.756967],
            ],
          },
          {
            coords: [
              [110.33119, 20.031971],
              [104.065735, 30.659462],
            ],
          },
          {
            coords: [
              [104.065735, 30.659462],
              [108.948024, 34.263161],
            ],
          },
        ],
        effect: {
          show: true,
          period: 5, //箭头指向速度，值越小速度越快
          trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: planePath.value,
          symbolSize: 15, //图标大小
        },
        lineStyle: {
          color: "#00eaff",
          width: 4, //尾迹线条宽度
          opacity: 0.7, //尾迹线条透明度
          curveness: 0.3, //尾迹线条曲直度
        },
      },
      {
        // 带有涟漪特效动画的散点（气泡）图
        type: "effectScatter",
        coordinateSystem: "geo",
        showEffectOn: "render",
        zlevel: 1,
        rippleEffect: {
          number: 3, // 波纹的数量。
          period: 5, // 动画的周期，秒数。
          scale: 17, // 动画中波纹的最大缩放比例。
          brushType: "fill", // 波纹的绘制方式，可选 'stroke' 和 'fill'。
        },
        symbolSize: 2,
        data: points.value,
      },
    ],
  });
});
</script>
  
  <style lang="scss" scoped>
</style>