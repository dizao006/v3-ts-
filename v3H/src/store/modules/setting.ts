import { defineStore } from "pinia";
import { ref } from "vue";
export const useSetting = defineStore('setting', {
    state: () => {
        return {
            isShow: ref(false), //控制菜单展示
            reflshow: ref(false)//控制刷新
        }
    },
    actions: {
        changeIcon() {
            this.$state.isShow = !this.$state.isShow;
        },
        changeFlshow() {
            this.$state.reflshow = !this.$state.reflshow;
        }
    }
});