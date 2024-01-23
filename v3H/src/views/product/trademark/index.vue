<template>
  <el-card class="box-card">
    <!-- 添加品牌的按钮 -->
    <el-button type="primary" size="default" icon="Plus" @click="addMark"
      >添加品牌</el-button
    >
    <!-- 表格组件 -->
    <el-table style="margin: 10px" border :data="tradenarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index">
      </el-table-column>
      <el-table-column label="品牌" align="center">
        <template #="{ row, $index }">
          <pre style="color: rgb(180, 127, 255)"> {{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="LOGO">
        <template #="{ row, $index }" align="center">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updataMark(row)"
            >修改</el-button
          >
          <el-popconfirm
            title="确定要删除吗"
            @confirm="remove(row)"
            icon="Delete"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      @size-change="changePage"
      v-model:current-page="pgeNoe"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="  prev, pager, next,sizes, ->,total,jumper"
      :total="total"
    />
  </el-card>
  <!-- 对话框组件 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="traId !== 0 ? '修改品牌' : '添加品牌'"
  >
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="trademarkRules"
      ref="formRef"
    >
      <el-form-item label="品牌" label-width="80px" prop="tmName">
        <el-input
          v-model="trademarkParams.tmName"
          placeholder="请输入品牌名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="LOGO" label-width="80px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 确定取消 -->
    <template #footer>
      <el-button type="primary" size="default" @click="sure">确定</el-button>
      <el-button type="primary" size="default" @click="noSure">取消</el-button>
    </template>
  </el-dialog>
</template>
  
  <script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { ElMessage } from "element-plus";
import {
  reqGetTrademarkList,
  reqAddTrademark,
  reqEditTrademark,
  reqDeleteTrademark,
} from "../../../api/product/trademark/index";

let pgeNoe = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let traId = ref(0);
let formRef = ref();
//表单校验规则
const trademarkRules = {
  tmName: [{ required: true, message: "品牌名称不能为空", trigger: "change" }],
  logoUrl: [{ required: true, message: "上传图片不能为空", trigger: "change" }],
};
// 收集新增
let trademarkParams = reactive<any>({
  tmName: "",
  logoUrl: "",
});
let dialogFormVisible = ref(false);
// 品牌
let tradenarkArr = ref<any>([]);
const getHasTrademark = async () => {
  const result = await reqGetTrademarkList(pgeNoe.value, limit.value);
  if (result.code == 200) {
    // 总个数
    total.value = result.data.total;
    tradenarkArr.value = result.data.records;
  }
};
onMounted(() => {
  getHasTrademark();
});
function changePage() {
  getHasTrademark();
}
function addMark() {
  formRef.value?.clearValidate("logoUrl");
  formRef.value?.clearValidate("tmName");
  dialogFormVisible.value = true;
  //清空数据
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
}
function updataMark(row) {
  dialogFormVisible.value = true;
  traId.value = row.id;
  trademarkParams.tmName = row.tmName;
  trademarkParams.logoUrl = row.logoUrl;
}
const sure = async () => {
  //触发表单验证,必须通过才能执行后面的语句
  await formRef.value.validate();
  //确定按钮
  if (traId.value !== 0) {
    const data = {
      tmName: trademarkParams.tmName,
      logoUrl: trademarkParams.logoUrl,
      id: traId.value,
    };
    try {
      await reqEditTrademark(data); // 携参向服务器发送请求添加品牌
      ElMessage.success("修改成功");
      dialogFormVisible.value = false; // 弹出对话框
      traId.value = 0;
      getHasTrademark();
    } catch (error) {
      ElMessage.error(error);
    }
  } else {
    const result = await reqAddTrademark(trademarkParams);
    if (result.code == 200) {
      dialogFormVisible.value = false;
      ElMessage.success("操作成功");
      getHasTrademark();
    } else {
      ElMessage.error("上传失败");
      dialogFormVisible.value = false;
    }
  }
};
function noSure() {
  dialogFormVisible.value = false;
}
async function remove(row) {
  //删除，传入对应的id删除
  const result = await reqDeleteTrademark(row.id);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getHasTrademark();
  } else {
    ElMessage.error("删除失败");
  }
}
//图片上传限制
const handleAvatarSuccess = (res: any) => {
  // 将上传到服务器的图片地址赋值给本地的logoUrl
  trademarkParams.logoUrl = res.data;
};
const beforeAvatarUpload = (file: any) => {
  //图片上传成功之前触发
  formRef.value.clearValidate("logoUrl");
  const isJPG = file.type === "image/jpeg" || file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 4;

  if (!isJPG) {
    ElMessage.error("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 4MB!");
  }
  return isJPG && isLt2M;
};
</script>
  
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>