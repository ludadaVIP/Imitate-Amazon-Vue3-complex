import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout';

export const useCategoryStore = defineStore('category', () => {

    const categoryList = ref([])         // 从后端拿数据, 渲染页面上的导航栏
    const getCategory = async ()=>{
      const res = await getCategoryAPI()
      // console.log('category.js',res.result);
      categoryList.value = res.result
    }
  return { getCategory, categoryList }
})
