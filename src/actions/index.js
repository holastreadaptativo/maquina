import { render } from 'react-dom'

export * from './design'
export * from './main'
export * from './global'

export default function $(id) { return document.getElementById(id) }

export function print(component, id) { render(component, $(id)) }

export function display(show) { return { display:show ? 'initial' : 'none' } }

export function errorAlert(e) { if (e) alert(e.message) }

export function check(input, name) {
	if (input.length < 4) { alert(`Por favor ingrese su ${name}.`) } return input.length >= 4
}

export function money(amount) {
    return '$' + parseInt(amount).toFixed(0).replace(/./g, (c, i, a) => {
        return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
    })
}

export function dateReverse(date) {
	let reverse = date.split('-')
	return reverse[2] + '-' + reverse[1] + '-' + reverse[0]
}

export function random(s, e) {
    return Math.floor(Math.random(0, 1) * (e - s) + s)
}

export function show(bool, tags) {
    return `${bool ? tags : 'hidden'}`
}

export function focus(bool, active) {
    return `${bool ? active : ''}`
}

export function allowDrop(e) {
    e.preventDefault()
}   
export function drag(e) {
    this.setState({ drag:e.target.id })
    e.dataTransfer.setData('text', $(e.target.id))
}
export function drop(e) {
    e.preventDefault()

    let copy = $(this.state.drag).cloneNode(true), count = this.state.count + 1
    copy.id = `fnx-${count}`; copy.draggable = false;

    if (!e.target.id.includes('fn')) {
        $('ex-selected').appendChild( copy )
        render( <span>{copy.innerText} <span class="glyphicon glyphicon-info-sign" onClick={() => alert(`abrir un modal ${copy.id}`)}/></span>, $(copy.id))
        this.setState({ count:count })
    }
}