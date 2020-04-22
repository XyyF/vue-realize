/**
 * Created by rengar on 2020/4/22.
 */

// 筐
export class Dep {
    static target;
    subs = [];

    /**
     * 添加观察者实例
      * @param sub
     */
    addSub(sub) {
        this.subs.push(sub)
    }

    /**
     * 触发当前观察者向 Dep 中添加其观察者实例
     */
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }
}

Dep.target = null
export function pushTarget(target) {
    Dep.target = target
}

export function popTarget() {
    Dep.target = null
}