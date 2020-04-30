/**
 * Created by rengar on 2020/4/29.
 */
import { Dep, pushTarget, popTarget } from '@/observer/dep'

describe('Dep', () => {
    let dep = null
    beforeEach(() => {
        dep = new Dep()
    })

    describe('Dep target', () => {
        it('target single', () => {
            const target = {}
            pushTarget(target)
            expect(Dep.target).toEqual(target)
            popTarget()
            expect(Dep.target).toEqual(undefined)
        })

        /**
         * 需要使用targetQueue，因为在push - pop的过程中可能产生新的 push - pop
         */
        it('target multi', () => {
            const target = {}
            pushTarget(target)
            expect(Dep.target).toEqual(target)
            const target2 = {a: 2}
            pushTarget(target2)
            expect(Dep.target).toEqual(target2)
            popTarget()
            expect(Dep.target).toEqual(target)
            popTarget()
            expect(Dep.target).toEqual(undefined)
        })
    })

    describe('constructor', () => {
        it('id and subs', () => {
            expect(dep.subs).toEqual([])
            expect(new Dep().id).toBe(dep.id + 1)
        })
    })

    describe('addSub', () => {
        it('add watcher', () => {
            const watcher = {}
            dep.addSub(watcher)
            expect(dep.subs).toEqual([watcher])
        })
    })

    describe('depend', () => {
        it('should have Dep.target', () => {
            dep.depend()
            expect(dep.subs).toEqual([])
            const target = {
                addDep: jest.fn(),
            }
            pushTarget(target)
            dep.depend()
            expect(target.addDep).toHaveBeenCalled()
            popTarget()
        })
    })

    describe('notify', () => {
        it('notify subs', () => {
            const watcher = {update: jest.fn()}
            dep.addSub(watcher)
            dep.notify()
            expect(watcher.update).toHaveBeenCalled()
        })
    })
})
