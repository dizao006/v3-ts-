<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <top></top>
      </div>
      <div class="bottom">
        <div class="left">
          <tourist class="tourist"></tourist>
          <sex class="sex"></sex>
          <age class="age"></age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Channel class="channel"></Channel>
          <Rank class="rank"></Rank>
          <Visitor class="visitor"></Visitor>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import top from "@/components/top/index.vue";

import tourist from "@/components/tourist/index.vue";
import age from "@/components/age/index.vue";
import sex from "@/components/sex/index.vue";
import Map from "@/components/Map/index.vue";
import Line from "@/components/Line/index.vue";
import Channel from "@/components/bottom_right/Channel.vue";
import Rank from "@/components/bottom_right/Rank.vue";
import Visitor from "@/components/bottom_right/Visitor.vue";
import { onMounted, ref } from "vue";
let screen = ref();
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});

//缩放比例
function getScale(w = 1920, h = 1080) {
  console.log("ces");
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>

<style lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/image/screen-bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    transform-origin: left top;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        .rank {
          flex: 1.1;
        }

        .visitor {
          flex: 1.3;
          margin: 20px 0;
        }

        .channel {
          flex: 1.6;
        }
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.5;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
        }
        .line {
          flex: 1;
        }
      }
    }
  }
}
</style>