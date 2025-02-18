import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app){
        app.directive('img-lazy', {  // 自定义指令, 让图片进入 view 时才加载 (懒加载)
            mounted(el, binding) {
                // console.log('main.js img-lazy',el,binding.value);
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }])=>{
                    // console.log('main.js img-lazy directive',isIntersecting);
                    if(isIntersecting){
                        el.src = binding.value
                        stop()
                    }}
                )
            }
        })
    }
}