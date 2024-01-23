<template>
  <div class="box">
    <div class="top">
      <p class="title">游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量 <span>99999</span></p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="chats" ref="chats"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import "echarts-liquidfill";
import { onMounted, ref } from "vue";
let people = ref("216980人");
let chats = ref();
onMounted(() => {
  let myChart = echarts.init(chats.value);
  let option = {
    series: [
      {
        type: "liquidFill",
        radius: "70%", // 控制中间圆球的尺寸（此处可以理解为距离外圈圆的距离控制）
        center: ["50%", "50%"],
        data: [
          0.6,
          {
            value: 0.6,
            direction: "left", //波浪方向
          },
        ], // data个数代表波浪数
        backgroundStyle: {
          borderWidth: 1,
          color: "rgba(62, 208, 255, 1)", // 球体本景色
        },
        amplitude: "6%", //波浪的振幅
        // 修改波浪颜色
        // color: ['#0286ea', 'l#0b99ff'], // 每个波浪不同颜色，颜色数组长度为对应的波浪个数
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: "#6CDEFC",
              },
              {
                offset: 0,
                color: "#429BF7",
              },
            ],
            globalCoord: false,
          },
        ],
        label: {
          normal: {
            formatter: "预留量/60%",
            fontSize: 14,
            color: "rgba(255,255,255,1)",
            position: ["50%", "20%"],
            fontWeight: 400,
          },
        },
        outline: {
          show: false,
        },
      },
      {
        type: "pie",
        z: 1,
        center: ["50%", "50%"],
        radius: ["72%", "73.5%"], // 控制外圈圆的粗细
        hoverAnimation: false,
        data: [
          {
            name: "",
            value: 500,
            labelLine: {
              show: false,
            },
            itemStyle: {
              color: "#00AFFF",
            },
            emphasis: {
              labelLine: {
                show: false,
              },
              itemStyle: {
                color: "#00AFFF",
              },
            },
          },
        ],
      },
      {
        //外发光
        type: "pie",
        z: 1,
        zlevel: -1,
        radius: ["70%", "90.5%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          normal: {
            borderWidth: 20,
            color: "rgba(224,242,255,.05)",
          },
        },
        label: {
          show: false,
        },
        data: [100],
      },
      {
        //底层外发光
        type: "pie",
        z: 1,
        zlevel: -2,
        radius: ["70%", "100%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          normal: {
            borderWidth: 20,
            color: "rgba(224,242,255,.05)",
          },
        },
        data: [100],
      },
      {
        type: "pie",
        zlevel: 0,
        silent: true,
        radius: ["78%", "80%"],
        z: 1,
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: pie(),
      },
    ],
  };
  myChart.setOption(option);
});

const pie = () => {
  let dataArr = [];
  for (var i = 0; i < 150; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 50,
        itemStyle: {
          normal: {
            color: "#00AFFF",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)",
          },
        },
      });
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 100,
        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)",
          },
        },
      });
    }
  }
  return dataArr;
};
</script>

<style lang="scss" scoped>
.box {
  background: url(@/assets/image/screen_main_IB.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 5px;
  margin-left: 20px;
  .top {
    .title {
      color: white;
      font-size: 20px;
      transform: translate(60px, 35px);
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(@/assets/image/screen_title_tag.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
      transform: translate(60px, 35px);
    }
    .right {
      float: right;
      color: white;
      font-size: 30px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;
    span {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background: url(@/assets/image/screen_tourist_num_bg.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      text-align: center;
    }
  }
  .chats {
    margin-top: 15px;
    width: 100%;
    height: 240px;
  }
}
</style>