/**
 * Created by rengar on 2020/5/8.
 */

export function parsePath(path) {
    const segments = path.split('.')
    return function (obj) {
        for (let l = segments.length, i = 0; i < l; i++) {
            // 如果不是对象的话，就直接返回
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}