/**
 * Created by rengar on 2020/4/27.
 */
import {nextTick} from '../util/next-tick'

const queue = []

// 清空当前队列的监听器列表
function flushScheduler() {
    const copies = queue.slice()
    for(let l = copies.length, i = 0; i < l; i++) {
        const watcher = copies[i]
        watcher.run()
    }
}

export function queueWatcher(watcher) {
    queue.push(watcher)
    nextTick(flushScheduler())
}