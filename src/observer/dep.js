/**
 * Created by rengar on 2020/4/22.
 */

let uid = 0;

// 订阅者 - 筐
export class Dep {
    // 指定当前生效的观察者，表达式执行时才能触发依赖收集;
    // - 在指定的表达式执行期间收集依赖;
    // - 这个是唯一的，因为一次只能执行一个观察者;
    static target;
    // 当前订阅者的ID;
    // - 避免触发器重复将触发器收集;
    id;
    // 当前订阅器的观察者列表，用以订阅者对应的值变动时触发回调;
    // - 遇到没有收集过的观察者需要收集
    // - 遇到观察者移除了依赖需要同步移除收集
    subs;

    constructor() {
        this.id = uid++;
        this.subs = [];
    }

    removeSubs(sub) {
        const idx = this.subs.indexOf(sub)
        this.subs.splice(idx, 1)
    }

    /**
     * 添加观察者实例
      * @param sub
     */
    addSub(sub) {
        this.subs.push(sub)
    }

    /**
     * 向当前观察对象引用的 dep 中添加其观察者实例
     */
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    // 通知更新
    notify() {
        // 执行方法前拷贝一份
        const subs = this.subs.slice()
        for(let l = subs.length, i = 0; i < l; i++) {
            subs[i].update()
        }
    }
}

Dep.target = null
const targetQueue = []
// 指定当前的观察者实例
export function pushTarget(target) {
    targetQueue.push(target)
    Dep.target = target
}
// 消除观察者实例
export function popTarget() {
    targetQueue.pop()
    Dep.target = targetQueue[targetQueue.length - 1]
}