/**
 * Created by rengar on 2020/5/6.
 */
import { Watcher } from '@/observer/watcher'
import { observer } from '@/observer/index'

describe('Watcher', () => {
    let uid = 0
    const data = {
        a: 1,
        b: 2,
    }
    observer(data)

    describe('depIds', () => {
        it('避免重复注册', () => {
            const watch = new Watcher(
                {},
                function () {
                    data.a = 3
                    return data.a + data.b
                },
                null,
            )
            expect(data).toEqual({a: 3, b: 2})
            expect(watch.depIds).toEqual(new Set([
                uid + 1,
                uid + 2,
            ]))
        })
        it('动态注册', () => {
            let key = false
            const watch = new Watcher(
                {},
                () => {
                    if (key) {
                        return data.a
                    }
                    return data.b
                },
                null,
            )
            expect(watch.depIds).toEqual(new Set([
                uid + 2,
            ]))
            key = true
            data.b = 4
            expect(watch.depIds).toEqual(new Set([
                uid + 1,
            ]))
        })
    })

    describe('expOrFn', () => {
        it('数据表达式', () => {
            const vm = {a: 1}
            const callback = jest.fn()
            const watcher = new Watcher(data, 'a', callback)
            expect(watcher.depIds).toEqual(new Set([
                uid + 1,
            ]))
            expect(watcher.cb).toEqual(callback)
            data.a = 100
            expect(callback).toBeCalledTimes(1)
        })
    })
})