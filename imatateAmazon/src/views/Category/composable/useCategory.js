import { ref, onMounted } from 'vue';
import { getCategoryAPI } from '@/apis/category';
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    // 这个地方用的方法非常好, 原来没有传参数, 后面用的是 route.params.id
    // 后来在别的地方也要调用这个函数, 但是要传参数, 于是就把这里添加了一个默认参数
    // 如果别的地方调用的时候传参, 就用那个参数, 如果不传参, 就用默认. 妙
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        // console.log('Category index.vue', res);
        categoryData.value = res.result
    }

    onMounted(() => {
        getCategory()
    })

    // 监视 route.params.id 的变化，只有在其变化时才调用 getCategory 函数
    // watch(() => route.params.id, (newId, oldId) => {
    //   if (newId !== oldId) {
    //     getCategory(newId);
    //   }
    // });
    // 老师的办法是在 Layout/index.vue 中 RouterView 中添加了 :key
    // watch 也好, 也不请求 不变的 banner

    // 这是第三种办法, 用钩子函数, 好处是, 请求的时候, 不变的 banner 就不请求了
    onBeforeRouteUpdate((to) => {
        // console.log('category/index.vue', "route changed");
        // console.log('category index.vue', to);
        getCategory(to.params.id)
    })

    return {
        categoryData,
    }
}