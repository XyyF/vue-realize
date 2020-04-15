/**
 * Created by rengar on 2020/4/15.
 */

export function stateMixin(Vue) {
    const dataDef = {}
    dataDef.get = function() {return this._data}
    const propsDef = {}
    propsDef.get = function() {return this._props}
    dataDef.set = propsDef.set = function() {
        console.warn('rengar log warn do not set data or props')
    }
    Object.defineProperty(Vue.prototype, '$data', dataDef)
    Object.defineProperty(Vue.prototype, '$props', propsDef)

    Vue.prototype.$set = function() {}
    Vue.prototype.$delete = function() {}
    Vue.prototype.$watch = function() {}
}