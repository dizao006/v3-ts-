<template>
  <el-card>
    <el-table border style="margin: 10px 0" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px">
      </el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="190px">
        <template #="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100%; height: 100%"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        width="150px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格"
        width="150px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale == 1 ? 'bottom' : 'Top'"
            @click="updataSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="msg"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="infoFilled"
            @click="finde(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Delete"
            @click="remove(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize4"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout=" prev, pager, next, jumper,->total, sizes,"
        :total="total"
        @current-change="handleSizeChange"
        @size-change="changeSize"
      />
    </div>
    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>详细</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuListInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuListInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuListInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 0px 55"
              v-for="(item, index) in skuListInfo.skuAttrValueList"
              :key="item.id"
              >{{ item.attrName }}</el-tag
            ></el-col
          >
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 0px 55"
              v-for="(item, index) in skuListInfo.skuSaleAttrValueList"
              :key="item.id"
              >{{ item.saleAttrName }}</el-tag
            ></el-col
          >
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuListInfo.skuImageList"
                :key="item.id"
              >
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </el-carousel-item> </el-carousel
          ></el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>
  g
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  reqGetSkuList,
  reqOnSale,
  reqCancelSale,
  reqGetSku,
  reqDeleteSku,
} from "@/api/product/sku/index";
import { ElMessage } from "element-plus";
let pageNo = ref<number>(1);
let pageSize4 = ref(10);
let total = ref(0);
let skuArr = ref([]);
let drawer = ref(false);
let skuListInfo = ref([]);
onMounted(() => {
  getSku();
});
async function getSku() {
  const result = await reqGetSkuList(pageNo.value, pageSize4.value);
  if (result.code === 200) {
    total.value = result.data.total;
    skuArr.value = result.data.records;
  }
}
function handleSizeChange(num: number) {
  pageNo.value = num;
  getSku(pageNo.value);
}
function changeSize(num: any) {
  pageSize4.value = num;
  getSku();
}
async function updataSale(row) {
  if (row.isSale == 1) {
    await reqCancelSale(row.id);
    ElMessage({
      type: "success",
      message: "操作成功",
    });
    getSku(pageNo.value);
  } else {
    await reqOnSale(row.id);
    ElMessage({
      type: "success",
      message: "操作成功",
    });
    getSku(pageNo.value);
  }
}
function msg() {
  ElMessage({
    type: "message",
    message: "功能还未开发",
  });
}
async function finde(row) {
  drawer.value = true;
  //获取信息
  let result = await reqGetSku(row.id);
  skuListInfo.value = result.data;
}
async function remove(row) {
  let result = await reqDeleteSku(row.id);
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getSku(pageNo.value);
  }
}
</script>
  
  <style  scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>