/**
 * Created by rengar on 2020/4/22.
 */

let uid = 0;

// 筐
export class Dep {
    // 指定当前生效的触发器，表达式执行时才能触发依赖收集;
    // - 在指定的表达式执行期间收集依赖;
    // - 这个是唯一的，因为一次只能执行一个触发器;
    static target;
    // 当前筐的ID;
    // - 避免触发器重复将;
    id;
    // 当前筐的触发器列表，用以筐对应的值变动时触发回调;
    subs;

    constructor() {
        this.id = uid++;
        this.subs = [];
    }

    /**
     * 添加触发器实例
      * @param sub
     */
    addSub(sub) {
        this.subs.push(sub)
    }

    /**
     * 向当前观察对象引用的 dep 中添加其触发器实例
     */
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }
}

Dep.target = null
// 指定当前的触发器实例
export function pushTarget(target) {
    Dep.target = target
}
// 消除触发器实例
export function popTarget() {
    Dep.target = null
}