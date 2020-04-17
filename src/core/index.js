/**
 * Created by rengar on 2020/4/15.
 */
import {initMixin} from './init'
import {stateMixin} from './state'
import {eventsMixin} from './events'
import {lifecycleMixin} from './lifecycle'

function Vue() {
    if (!(this instanceof Vue)) {
        console.warn('Vue is a constructor and should be called with the `new` keyword')
    }

    this._init()
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
