/**
 * Created by rengar on 2020/4/22.
 */

import {Dep} from './dep'

/**
 * 注册服务，将观察对象的get和set替换为依赖收集项;
 */
class Observer {
    // 当前注册服务的对象
    value;
    // 当前观测对象的父级触发者收集筐
    // - 当前属性有增、删时，会执行父级属性的观察者
    dep;

    constructor(value) {
        this.value = value
        this.dep = new Dep()
        console.log('rengar log class dep', this.dep.id)
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
 * @param obj
 * @param key
 */
function defineReactive(obj, key) {
    // 此处的筐是用来收集 value[key] 的触发器的
    const dep = new Dep()
    console.log('rengar log dep', dep.id, key)
    const property = Object.getOwnPropertyDescriptor(obj, key)
    const getter = property && property.get
    const setter = property && property.set
    // 不要再get中调用 obj[key] 会循环
    let val = obj[key]
    // 深层次注册服务
    const childOb = observer(val)
    Object.defineProperty(obj, key, {
        get() {
            const value = getter ? getter() : val
            if (Dep.target) {
                dep.depend()
            }
            return value
        },
        set(newVal) {
            const value = getter ? getter() : val
            // 值相同的话，就不用更新
            if (newVal === value) return
            if (setter) setter.call(obj, newVal)
            else val = newVal
            dep.notify()
        },
    })
}