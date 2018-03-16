import { render } from 'react-dom'

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

export function money(amount) {
    return '$' + parseInt(amount).toFixed(0).replace(/./g, (c, i, a) => {
        return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
    })
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

export function clone(e) {
    e.preventDefault()

    let copy = $(this.state.drag).cloneNode(true), count = this.state.count + 1
    copy.id = `fnx-${count}`; copy.draggable = false;

    if (!e.target.id.includes('fn')) {
        $('ex-selected').appendChild( copy )
        render( <span>{copy.innerText} <span class="glyphicon glyphicon-info-sign" onClick={() => alert(`abrir un modal ${copy.id}`)}/></span>, $(copy.id))
        this.setState({ count:count })
    }
}