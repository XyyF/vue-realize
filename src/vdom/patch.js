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
 * 核心Diff，对比children，双端比较法
 */
function updateChildren(oldVnode, vnode) {
    const oldCh = oldVnode.children
    const ch = vnode.children
    let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1, newEndIdx = ch.length - 1

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (sameVnode(oldCh[oldStartIdx], ch[newStartIdx])) {
            // 首端节点相同
            pathVnode(oldCh[oldStartIdx], ch[newStartIdx])
            oldStartIdx++
            newStartIdx++
        } else if (sameVnode(oldCh[oldEndIdx], ch[newEndIdx])) {
            // 尾端节点相同
            pathVnode(oldCh[oldEndIdx], ch[newEndIdx])
            oldEndIdx--
            newEndIdx--
        } else if (sameVnode(oldCh[oldStartIdx], ch[newEndIdx])) {
            // old首端 === new尾端
            pathVnode(oldCh[oldStartIdx], ch[newEndIdx])
            // TODO 转移节点
            oldStartIdx++
            newEndIdx--
        } else if (sameVnode(oldCh[oldEndIdx], ch[newStartIdx])) {
            // old尾端 === new首端
            pathVnode(oldCh[oldEndIdx], ch[newStartIdx])
            // TODO 转移节点
            oldEndIdx--
            newStartIdx++
        } else {
            // TODO 查看可复用节点
            // TODO 转移 || 新增节点
            newStartIdx++
        }
    }
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
            updateChildren(oldVnode, vnode)
        } else if (isDef(ch)) {
            // TODO 添加节点
        } else if (isDef(ch)) {
            // TODO 删除节点
        } else if (isDef(oldVnode.text)) {
            // TODO 清空文本节点内容
        }
    }
}

export default function(oldVnode, vnode) {
    if (sameVnode(oldVnode, vnode)) {
        pathVnode(oldVnode, vnode)
    }

    return vnode.elm
}