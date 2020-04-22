/**
 * Created by rengar on 2020/4/22.
 */

/**
 * 依附于观察对象上的观察者类，将观察对象的get和set替换为依赖收集项;
 */
class Observer {
    value;
    dep;

    constructor(value) {
        this.value = value
        Object.defineProperty(this.value, '__ob__', {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        })
        this.walk()
    }

    walk() {
        const keys = Object.keys(this.value)
        for (let i = 0, l = keys.length; i < l; i++) {
            defineReactive(this.value, keys[i])
        }
    }
}

/**
 * 建立依附于观察对象上的观察者类
 * @param value 观察对象
 * 将会在该对象及其下层对象中定义 get set 修饰器;
 * 当调用 get 时，会收集当前的watch;
 * 调用 set 时，触发更新;
 */
export function observer(value) {
    if (Object.prototype.toString.call(value) !== '[object Object]') return
    let ob = null
    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}

/**
 * 定义容器收集器
 * @param value
 * @param key
 */
function defineReactive(value, key) {
    Object.defineProperty(value, key, {
        get() {

        },
        set() {

        },
    })
}