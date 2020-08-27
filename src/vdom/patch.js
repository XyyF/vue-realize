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
 * 核心Diff，对比children
 */
function updateChildren() {

}

/**
 * 对比子节点
 * @param oldVnode
 * @param vnode
 */
function pathVnode(oldVnode, vnode) {
    const ch = vnode.children, oldCh = oldVnode.children
    // oldVnode 文本节点 无children children
    // vnode 文本节点 无children children
    if (isDef(vnode.text)) {
        // 替换本文节点内容
    } else {
        if (isDef(ch) && isDef(oldCh)) {
            // 核心Diff
        } else if (isDef(ch)) {
            // 添加节点
        } else if (isDef(ch)) {
            // 删除节点
        } else if (isDef(oldVnode.text)) {
            // 清空文本节点内容
        }
    }
}

export default function(oldVnode, vnode) {
    if (sameVnode(oldVnode, vnode)) {
        pathVnode(oldVnode, vnode)
    }

    return vnode.elm
}