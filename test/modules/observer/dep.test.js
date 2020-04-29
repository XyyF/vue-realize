/**
 * Created by rengar on 2020/4/29.
 */
import { Dep, pushTarget, popTarget } from '@/observer/dep'

const dep = new Dep()

describe('Dep', () => {
    describe('instance', () => {
        it('should be created with correct properties', () => {
            expect(1).toBe(1)
        })
    })
})
