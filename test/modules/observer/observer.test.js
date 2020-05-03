/**
 * Created by rengar on 2020/5/3.
 */
import { observer } from '@/observer/index'

describe('Observer', () => {
    describe('observer', () => {
        it('注册服务', () => {
            const data = {
                a: 1,
                b: 2,
            }
            const ob = observer(data)
            expect(data).toEqual({
                a: 1,
                b: 2,
            })
            expect(data['__ob__']).toEqual(ob)
            expect(data['__ob__']).toEqual({
                value: {a: 1, b: 2},
                dep: {
                    id: 0,
                    subs: [],
                },
            })
        })
        it('返回__ob__', () => {
            const data = {a: 1}
            const ob = observer(data)
            expect(data['__ob__']).toEqual(ob)
        })
        it('已经注册服务后不会再次注册', () => {
            const data = {
                a: 1,
            }
            const ob = observer(data)
            expect(ob.dep).toEqual({
                id: 5,
                subs: [],
            })
            observer(data)
            const data2 = {
                a: 1,
            }
            const ob2 = observer(data2)
            expect(ob2.dep).toEqual({
                id: 7,
                subs: [],
            })
        })
    })
})