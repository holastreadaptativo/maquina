import React, { Component } from 'react'
import { action, show } from 'actions'
import { Aside, Item } from 'components'
import { LINKS } from 'stores'

export default class Download extends Component {
	constructor() {
		super()	
		this.state = { active:0, files:[], len:0, name:'' }
	}
	handleUpload(e) {
		e.preventDefault()
		action.ver('UPLOAD', { ...this.state, code:this.props.code, form:e.target.form, update:(::this.setState) })
	}
	onSelect(e) {
		const { files } = e.target
		this.setState({ len:files.length, files:files, name:files[0].name })
	}
	render() {
		const { len, name } = this.state; let k = 0
        return (
			<Aside id={this.props.id} option={this.props.option} title="Archivos JS y CSS">
				<Item id={k} title="Descargar" parent={this}>
					<a class="btn box" href={LINKS[2].url} download>JS</a>
					<a class="btn box" href={LINKS[1].url} download>CSS</a>
	        	</Item>
				<Item id={k} title="Actualizar" parent={this}>
					<a class="btn input" onClick={() => this.refs.input.click()}>Elegir archivos</a>
	        		<input ref="input" type="file" multiple required onChange={::this.onSelect} class="hidden"></input>
					<ol>
						<h6 class={show(len < 1)}>Ningún archivo seleccionado</h6>
						<h6 class={show(len == 1)}>{name}</h6>
						<h6 class={show(len > 1)}>{len} archivos</h6>
					</ol>
        			<button type="submit" onClick={::this.handleUpload}>Subir</button>
	        	</Item>
		    </Aside>
		)
	}
}