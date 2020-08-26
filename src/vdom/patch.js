/**
 * Created by rengar on 2020/8/26.
 */
import {isDef, isUnDef} from '../util'

/**
 * 对比节点是否是相同节点
 * @param a
 * @param b
 * @return {boolean}
 */
function sameVnode(a, b) {
    return a.key === b.key && (
        a.tag === b.tag &&
        a.isComment === b.isComment
    )
}

/**
 * 对比子节点
 * @param oldVnode
 * @param vnode
 */
function pathVnode(oldVnode, vnode) {
    // oldVnode 文本节点 无children children
    // vnode 文本节点 无children children
    if (isDef(vnode.text)) {

    }
}

export default function(oldVnode, vnode) {
    if (sameVnode(oldVnode, vnode)) {
        pathVnode(oldVnode, vnode)
    }

    return vnode.elm
}