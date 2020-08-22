/**
 * Created by rengar on 2020/8/22.
 */
import { nextTick } from '@/util/next-tick'

describe('nextTick', () => {
    describe('Dep target', () => {
        it('target single', () => {
            let result = []
            nextTick(() => {
                result.push(2)
            })
            result.push(1)
            Promise.resolve().then(() => {
                expect(result[0]).toBe(1)
                expect(result[1]).toBe(2)
            })
        })
    })
})
