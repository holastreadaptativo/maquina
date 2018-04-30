export function $(id) { return document.getElementById(id) }

export function compare(a, b) { return a.localeCompare(b) == 0 }

export function date() { return (new Date()).toLocaleString() }

export function focus(b, c) { return `${b ? c : ''}` }

export function glyph(i) { return `glyphicon glyphicon-${i}` }

export function money(m) {
    return '$' + parseInt(m).toFixed(0).replace(/./g, (c, i, a) => {
        return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
    })
}

export function random(i, f) { return Math.floor(Math.random(0, 1) * (f - i) + i) }

export function replace(i, v, t) {
	for (let k = 0; k < 10; k++)
		v.forEach(m => { i = i.toString().replace(`$${m.var}`, `${t ? m.vt : m.val}`) })
	return i
}

export function show(b, c) { return `${b ? c ? c : '' : 'hidden'}` }

export function shuffle(a, t = 10) {
    for (let i = 0; i < t; i++)
        a = a.sort(() => (.5 - Math.random()))
    return a
}

export function stringify(t) { return JSON.stringify(t).replace(/[\"]/g,'\'') }