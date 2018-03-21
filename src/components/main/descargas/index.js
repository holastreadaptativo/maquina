import React, { Component } from 'react'
import { Section, Upload } from 'components'
import { data, LINKS } from 'stores'
import { stringify } from 'actions'

export class Descargas extends Component {
    componentDidMount() {
		data.child(`${this.props.code}/variables`).once('value').then(snap => {
			snap.forEach(v => {
				this.setState({ vt:{ id:'vt', vars:[{ var:v.val().var, val:v.val().vt }] } })
			})
		})
	}
	download() {
		const { vt } = this.state
		const { code, functions, versions } = this.props

		let v = [...versions, vt], f = stringify(functions), s = code.substring(10, 15)
		v.forEach(m => {
			let doc = '<!doctype html>', name=`${s}_${m.id}`
			
			doc += `<html lang="es"><head><meta charset="utf-8"><title>${name}</title>`
			LINKS.forEach(m => {
				switch (m.type) {
					case 'script': { doc += `<script type="text/javascript" src="${m.url}"></script>`; break }
					case 'link': { doc += `<link rel="stylesheet" type="text/css" href="${m.url}">`; break }
				}
			})
			doc += `<body id="${name}" data-content="${f}" data-version="${stringify(m)}">`
			doc += '<div id="content" class="design"></div></body></html>'

			let a = document.createElement('a'), url = URL.createObjectURL(new Blob([doc], {type:'text/html'}))
			a.href = url; a.download = `${name}.html`; document.body.appendChild(a); a.click()
			setTimeout(() => { document.body.removeChild(a); window.URL.revokeObjectURL(url) }, 0)
		})
	}
	render() {
		const { option } = this.props
		return (
			<Section style="descargas" condition={true} {...this.props} download={::this.download}>    	
	        	<Upload condition={option == 0} {...this.props} {...this.state}/>
	       	</Section>
        )
    }
}

export Upload from './6_Upload'
export Iframe from './6_Iframe'
/*

let variables = [{var:'a', val:6}, {var:'a1', val:5}, {var:'a2', val:4}, {var:'e', val:3}]
let fn = 'a * a1 + Math.pow(e, a2 + 1) + 30'
let xy = []
for (let i = 0, k = 0; i < fn.length; i++) {
	if (fn[i].match(/[*+()-,]/)) {
		xy.push(fn.substring(k, i))
		xy.push(fn[i])
		k = i + 1
	} else if (i + 1 == fn.length) {
		xy.push(fn.substring(k, fn.length))
	}
}
for (let i = 0; i < xy.length; i++) {
	for (let j = 0; j < variables.length; j++) {
		if (xy[i].toString().trim() == variables[j].var) {
			xy[i] = variables[j].val
		}
	}
}
let a = xy.join(''), b = eval(a), c = JSON.stringify(a)

constructor() {
	super()
	this.state = { radius:100, color:'red', x:-100, y:-100 }
}
onMouseMove(e) {
	const { radius, x, y } = this.state
	this.setState({ x:(e.clientX-radius/2), y:(e.clientY-radius/2), color:`rgb(${x%192+64}, ${y%192+64}, ${(x+y)%192+64})` })
}
changeRadius(r) {
	this.setState({ radius:this.state.radius*r })
}
render() {
	const { radius, color, x, y } = this.state

	return (
    	<div class="descargas" onMouseMove={::this.onMouseMove}>
    		<div class="hidden">
				<div>
					<div id="circle-css" style={{ height:`${radius}px`, width:`${radius}px`, backgroundColor:color, top:`${y}px`, left:`${x}px` }}></div>
					<button class="hidden" onClick={this.changeRadius.bind(this, 1.1)}><span class="glyphicon glyphicon-plus"/></button>
					<button class="b hidden" onClick={this.changeRadius.bind(this, 0.9)}><span class="glyphicon glyphicon-minus"/></button>
				</div>
    		</div>
    	</div>
    )
}

*/