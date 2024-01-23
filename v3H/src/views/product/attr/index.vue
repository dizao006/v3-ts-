<template>
  <div>
    <!-- 三级分类 -->
    <category :scene="add"></category>
    <el-card style="margin: 10px 0">
      <div v-show="add == 0">
        <!-- 二选一，点击按钮的时候 -->
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="thereId ? false : true"
          @click="changeAdd"
          >添加属性</el-button
        >
        <el-table border style="margin: 10px 0" :data="particular">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="180px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, index }">
              <el-tag
                style="margin: 5px 10px"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220px">
            <template #="{ row, indx }">
              <el-button
                type="primary"
                size="default"
                icon="Edit"
                @click="change(row)"
                >修改</el-button
              >
              <el-popconfirm title="你确定要删除吗" @confirm="remove(row)">
                <template #reference>
                  <el-button type="primary" size="default" icon="Delete"
                    >删除</el-button
                  >
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="add == 1">
        <!-- 展示添加页面 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!attrParams.attrName"
          @click="addTable"
          >添加属性</el-button
        >
        <el-button size="default" @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 10px 3px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                ref="valueNameInput"
                v-if="row.flag"
                @blur="changeFlag(row)"
                placeholder="请输入属性名称"
                v-model="row.valueName"
              ></el-input>
              <div v-if="!row.flag" @click="changeFlag2(row)">
                <!-- 展示 -->
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ row, index }">
              <el-button
                style="margin: 10px 0"
                type="danger"
                size="default"
                icon="Delete"
                @click="deleteValueName(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          size="default"
          @click="saves"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          >保存</el-button
        >
        <el-button type="primary" size="default" @click="cancel"
          >取消</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import category from "@/components/category/index.vue";
import catageory from "@/store/modules/catageory";

import { storeToRefs } from "pinia";
import { watch, ref, reactive, nextTick } from "vue";
import { ElMessage, ElNotification } from "element-plus";
const store = catageory();
let { thereId, particular } = storeToRefs(store);
let { getList, addList, removes } = store;
const valueNameInput = ref(); // 获取属性值输入框的dom节点
let add = ref(0); //ture显示tabe，fasel展示添加
let attrParams = reactive({
  attrName: "",
  attrValueList: [],
  categoryId: "", //三级分类的id
  categoryLevel: 3, //三级分类
}); //收集新增的对象
watch(
  //监控三级id，发生变化获取详细展示
  () => thereId.value,
  () => {
    // 获取三级id
    getList();
  }
);
const deleteValueName = (row: any) => {
  attrParams.attrValueList = attrParams.attrValueList.filter(
    (item: any) => item !== row
  );
};
async function saves() {
  attrParams.categoryId = thereId.value as string;
  let result = await addList(attrParams);
  if (result.code === 200) {
    ElNotification({
      title: "Success",
      message: "操作成功",
      type: "success",
    });
    await getList();
    add.value = 0;
  } else {
    ElNotification({
      title: "error",
      message: "操作失败",
      type: "error",
    });
  }
}
function addTable() {
  attrParams.attrValueList.push({
    valueName: "",
    flag: true,
  });
  nextTick(() => {
    // dom渲染完成后使input聚焦
    valueNameInput.value.focus();
  });
}
function changeFlag(row) {
  if (row.valueName.trim() == "") {
    ElNotification({
      message: "不能为空",
      type: "error",
    });
    return;
  }
  let repect = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  });
  if (repect) {
    ElMessage({
      type: "error",
      message: "属性值不能重复",
    });
    return;
  }
  row.flag = !row.flag;
}
function changeFlag2(row) {
  row.flag = !row.flag;
}
function cancel() {
  //取消按钮
  add.value = 0;
}
function changeAdd() {
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [],
    categoryId: "", //三级分类的id
    categoryLevel: 3, //三级分类
  });
  add.value = 1;
}
function change(row) {
  add.value = 1;
  //修改商品
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
}
async function remove(row) {
  // 删除商品
  const result = await removes(row.id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    await getList();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
}
</script>

<style>
</style>