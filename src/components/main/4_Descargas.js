import React, { Component } from 'react'
import { Aside, Item, Section } from 'components'
import { show, stringify } from 'actions'
import { data, src, LINKS } from 'stores'

export default class Descargas extends Component {
	constructor() {
		super()
		this.state = { url:'https://www.youtube.com/embed/755MWeNQ34g' }
	}
    componentDidMount() {
    	data.child(`${this.props.code}/variables`).once('value').then(snap => {
			let vars = []
			snap.forEach(v => {
				vars.push({ var:v.val().var, val:v.val().vt })
				this.setState({ vt:{ id:'vt', vars:vars } })
			})
		})
	}
	render() {
		return (
			<Section style="descargas" condition={true} {...this.props} download={::this.download}>    	
	        	<Upload id={0} {...this.props} {...this.state}/>
	        	<div class="row hidden" ref="iframe">
					<iframe src={this.state.url} width="100%" height="420px" allowFullScreen></iframe>
					<input type="text" onChange={::this.onChange} class="form-control"/>
				</div>
	       	</Section>
        )
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
	onChange(e) {
		this.setState({ url:e.target.value })
	}
}

class Upload extends Component {
	constructor(props) {
		super(props)	
		this.state = { files:[], len:0, name:'' }
	}
	render() {
		const { len, name } = this.state; let k = 0
        return (
			<Aside show={this.props.id == this.props.option} title="Archivos JS y CSS">
				<Item id={k} active={k} title="Descargar">
					<a class="btn box" href={LINKS[2].url} download>JS</a>
					<a class="btn box" href={LINKS[1].url} download>CSS</a>
	        	</Item>
				<Item id={k} active={k} title="Actualizar">
					<a class="btn input" onClick={() => this.refs.input.click()}>Elegir archivos</a>
	        		<input ref="input" type="file" multiple required onChange={::this.onSelect} class="hidden"></input>
					<ol>
						<h6 class={show(len < 1)}>Ningún archivo seleccionado</h6>
						<h6 class={show(len == 1)}>{name}</h6>
						<h6 class={show(len > 1)}>{len} archivos</h6>
					</ol>
        			<button type="submit" onClick={::this.upload}>Subir</button>
	        	</Item>
		    </Aside>
		)
	}
	onSelect() {
		const { files } = this.refs.input
		this.setState({ len:files.length, files:files, name:files[0].name })
	}
	upload(e) {
		e.preventDefault()
		const { files, len } = this.state
		if (len) {
			Array.from(files).forEach(m => {
				src.child(m.name).put(m).then(() => { 
					alert('¡Archivos actualizados!'); this.reset()
				})
			})
		} else {
			alert('No hay archivos seleccionados')
		}
	}
	reset(e) {
		e.preventDefault()
		this.refs.input.form.reset()
		this.setState({ len:0, files:[], name:'' })
	}
}