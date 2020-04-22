/**
 * Created by rengar on 2020/4/17.
 */

export function lifecycleMixin(Vue) {
    // 把 vm._render 函数生成的虚拟节点渲染成真正的 DOM 挂在到$el上;
    Vue.prototype._update = function() {}

    Vue.prototype.$forceUpdate = function() {}

    Vue.prototype.$destroy = function() {}
}