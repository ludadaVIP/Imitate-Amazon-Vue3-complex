<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

import { useCategoryStore } from '@/stores/categoryStore'
const categoryStore = useCategoryStore()
import { onMounted } from 'vue';

onMounted(()=>{
  categoryStore.getCategory()
})
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加 key, 破坏复用机制 强制销毁重建 // 我这里其实不需要, 因为我在 category那儿用了watch-->   
  <!-- <RouterView :key="$route.fullPath"/> -->
  <RouterView />    
  <LayoutFooter />
</template>

<style scoped>

</style>@/stores/categoryStore