/**
 * Created by rengar on 2020/4/15.
 */

export function eventsMixin(Vue) {
    Vue.prototype.$on = function(event, fn) {
        const vm = this
        if (Object.prototype.toString.call(event) === '[object Array]') {
            for (let i = 0, l = event.length; i < l; i++) {
                vm.$on(event[i], fn)
            }
        }
        (vm._events[event] || (vm._events[event] = [])).push(fn)
        return vm
    }
    Vue.prototype.$once = function(event, fn) {
        const vm = this
        function once() {
            vm.$off(event, once)
            fn.apply(vm, arguments)
        }
        vm.$on(event, once)
        return vm
    }
    Vue.prototype.$off = function(event, fn) {
        const vm = this
        if (Object.prototype.toString.call(event) === '[object Array]') {
            for (let i = 0, l = event.length; i < l; i++) {
                vm.$off(event[i], fn)
            }
        }
        const cbs = vm._events[event]
        if (!cbs) return vm
        if (!fn) {
            vm._events[event] = Object.create(null)
            return vm
        }
        let i = cbs.length - 1
        while(i >= 0) {
            if (cbs[i] === fn) {
                vm._events[event].splice(i, 1)
                break
            }
        }
        return vm
    }
    Vue.prototype.$emit = function(event, ...args) {
        const vm = this
        const cbs = vm._events[event]
        if (cbs) {
            const params = Array.from(args)
            for (let i = 0, l = cbs.length; i < l; i++) {
                cbs[i].apply(vm, params)
            }
        }
        return vm
    }
}