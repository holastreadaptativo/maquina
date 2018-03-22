export * from './design'
export * from './main'
export * from './global'

export default function $(id) { return document.getElementById(id) }

export function show(bool, tags) {
    return `${bool ? tags : 'hidden'}`
}

export function focus(bool, active) {
    return `${bool ? active : ''}`
}

export function random(from, to) {
    return Math.floor(Math.random(0, 1) * (to - from) + from)
}

export function shuffle(array, times = 10) {
    for (let i = 0; i < times; i++)
        array = array.sort(() => (.5 - Math.random()))
    return array
}

export function stringify(json) {
    return JSON.stringify(json).replace(/[\"]/g,'\'')
}

export function date() {
    return (new Date()).toLocaleString()
}

export function money(amount) {
    return '$' + parseInt(amount).toFixed(0).replace(/./g, (c, i, a) => {
        return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
    })
}

import * as fn from 'actions'

export const action = { ejercicios:fn.ejercicios, versiones:fn.versiones }