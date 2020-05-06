/**
 * Created by rengar on 2020/4/22.
 */
import {popTarget, pushTarget} from './dep'
import {queueWatcher} from './scheduler'

/**
 * 观察者 -- 针对表达式触发 get 从而达到依赖收集
 */
export class Watcher {
    vm;
    cb;
    getter;
    deps;
    depIds;
    newDeps;
    newDepIds;

    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.cb = cb
        this.deps = []
        this.depIds = new Set()
        this.newDeps = []
        this.newDepIds = new Set()
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
        // 清除无用的依赖
        this.cleanupDeps()
        return value
    }

    addDep(dep) {
        // 避免重复收集依赖 tips: 为什么要定义一个 dep 一个 newDep
        // newDepIds 一次getter的重复收集
        //   {{ name }} {{ name }}
        // depIds 多次getter的重复收集
        //   还包含了 依赖剔除 的场景(所以每次getter执行完都会交换两者值 & 清空newDep)
        if (!this.newDepIds.has(dep.id)) {
            this.newDepIds.add(dep.id)
            this.newDeps.push(dep)
            if (!this.depIds.has(dep.id)) {
                dep.addSub(this)
            }
        }
    }

    cleanupDeps() {
        for (let i = 0, l = this.newDeps.length; i < l; i++) {
            const dep = this.newDeps[i]
            if (!this.depIds.has(dep.id)) {
                // 移除dep中的依赖
                // dep.removeSubs(this)
            }
        }
        [this.depIds, this.newDepIds] = [this.newDepIds, this.depIds];
        this.newDepIds.clear();
        [this.deps, this.newDeps] = [this.newDeps, this.deps];
        this.newDeps.length = 0
    }

    // 监听到变动，准备执行更新
    update() {
        // 将监听者推入执行队列中，等待在异步队列执行
        queueWatcher(this)
    }

    run() {
        const value = this.get()
        const oldValue = this.value
        this.value = value
        if (this.cb) {
            this.cb.call(this.vm, this.value, oldValue)
        }
    }
}

function parsePath() {

}