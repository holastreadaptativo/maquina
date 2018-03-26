import React, { Component } from 'react'
import { Aside, Item } from 'components'
import { src, LINKS } from 'stores'
import { show } from 'actions'

export default class Uploads extends Component {
	constructor(props) {
		super(props)	
		this.state = { files:[], len:0, name:'' }
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
	render() {
		const { len, name } = this.state; let k = 0
        return (
			<Aside show={this.props.condition} title="Archivos JS y CSS">
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
}