import { defineStore } from "pinia";
import { ref } from "vue";

import { reqGetCategory1, reqGetCategory2, reqGetCategory3, reqGetAttrList, reqSaveAttrInfo, reqDeleteAttr } from "@/api/product/attr/index";
import { reqGetSpuList, } from "@/api/product/spu/index";
const catageory = defineStore("catageory", {
    state: () => {
        return {
            oneList: ref<any>([]),
            onId: ref<number | string>(""),
            twoId: ref<number | string>(''),
            thereId: ref<number | string>(''),
            twoList: ref<any>([]),
            thereList: ref<any>([]),
            particular: ref<any>([]),
            // spu
            spuList: ref<any>([]),
        }
    },
    actions: {
        // 品牌管理
        async oneLists() {
            const result = await reqGetCategory1();
            this.$state.oneList = result.data
        },
        async twoLists() {
            const result = await reqGetCategory2(this.$state.onId as number);
            this.$state.twoList = result.data
        },
        async thereLists() {
            const result = await reqGetCategory2(this.$state.twoId as number);
            this.$state.thereList = result.data
        },
        async getList() {
            const result = await reqGetAttrList(this.onId as number, this.twoId as number, this.thereId as number);
            this.$state.particular = result.data
        },
        async addList(attrParams) {
            const result = await reqSaveAttrInfo(attrParams);
            return result
        },
        async removes(id) {
            const result = await reqDeleteAttr(id)
            return result
        },
        // spu模块
        async getSpu() {
            const result = await reqGetSpuList(this.onId as number, this.twoId as number, this.thereId as number);
            this.spuList = result.data
        }
    }
});
export default catageory