/**
 * Created by rengar on 2020/4/17.
 */

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function() {}

    Vue.prototype.$forceUpdate = function() {}

    Vue.prototype.$destroy = function() {}
}