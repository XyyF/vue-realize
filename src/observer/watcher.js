/**
 * Created by rengar on 2020/4/22.
 */
import {pushTarget, popTarget} from './dep'

/**
 * 观察者 -- 针对表达式触发 get 从而达到依赖收集
 */
export class Watcher {
    vm;
    cb;
    getter;
    depIds;

    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.cb = cb
        this.depIds = new Set()
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
        }

        this.value = this.get()
    }

    get() {
        pushTarget(this)
        const value = this.getter.call(this.vm)
        popTarget()
        return value
    }

    addDep(dep) {
        if (!this.depIds.has(dep.id)) {
            this.depIds.add(dep.id)
            dep.addSub(this)
        }
    }
}

function parsePath() {

}