/**
 * Created by rengar on 2020/4/17.
 */

let callbacks = []
let timerFunc

function flushCallbacks() {
    // tips 避免在copies执行中添加nextTick失败;
    const copies = callbacks.slice(0)
    callbacks = []
    for (let i = 0, l = copies.length; i < l; i++) {
        copies[i]()
    }
}

if (typeof Promise !== 'undefined') {
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks)
    }
} else if (typeof MutationObserver !== 'undefined') {
    let counter = 1
    const observer = new MutationObserver(flushCallbacks)
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
        characterData: true
    })
    timerFunc = () => {
        // tips: 只需要监听变动即可，累加有风险
        counter = (counter + 1) % 2
        textNode.data = String(counter)
    }
} else if (typeof setImmediate !== 'undefined') {
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}

/**
 *
 * @param cb 回调
 * @param ctx? 回调执行上下文
 */
export function nextTick(cb, ctx) {
    callbacks.push(() => {
        if (cb) {
            cb.call(ctx)
        }
    })
    timerFunc()
}