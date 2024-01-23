<template>
  <el-card>
    <el-form inline="ture">
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene === 0 ? false : true"
          v-model="onId"
          @change="handel"
        >
          <el-option
            v-for="(item, index) in oneList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene === 0 ? false : true"
          v-model="twoId"
          @change="handelThere"
        >
          <el-option
            v-for="(item, index) in twoList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="scene === 0 ? false : true" v-model="thereId">
          <el-option
            v-for="(item, index) in thereList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
// import { onMounted, ref } from "vue";
import catageory from "@/store/modules/catageory";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
let stores = catageory();
let { oneList, onId, twoList, twoId, thereList, thereId } = storeToRefs(stores);
let { oneLists, twoLists, thereLists } = stores;
defineProps(["scene"]);

onMounted(async () => {
  oneLists();
});
function handel() {
  twoId.value = "";
  thereId.value = "";
  twoList.value = [];
  thereList.value = [];
  twoLists();
}
function handelThere() {
  thereLists();
}
</script>

<style>
</style>