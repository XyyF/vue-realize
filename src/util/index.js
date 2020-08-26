/**
 * Created by rengar on 2020/5/8.
 */

export function isDef(val) {
    return val !== undefined && val !== null
}

export function isUnDef(val) {
    return val === undefined && val === null
}

export * from './lang'
export * from './next-tick'