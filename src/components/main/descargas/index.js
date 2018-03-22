import React, { Component } from 'react'
import { Section, Upload } from 'components'
import { stringify } from 'actions'
import { data, LINKS } from 'stores'

export class Descargas extends Component {
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
	render() {
		const { option } = this.props
		return (
			<Section style="descargas" condition={true} {...this.props} download={::this.download}>    	
	        	<Upload condition={option == 0} {...this.props} {...this.state}/>
	        	<div class="row" ref="iframe">
					<iframe src={this.state.url} width="100%" height="420px" allowFullScreen></iframe>
					<input type="text" onChange={::this.onChange} class="form-control"/>
				</div>
	       	</Section>
        )
    }
}

export Upload from './6_Upload'