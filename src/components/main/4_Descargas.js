import React, { Component } from 'react'
import { Aside, Item, Section } from 'components'
import { action, show } from 'actions'
import { LINKS } from 'stores'

export default class Descargas extends Component {
	constructor() {
		super()
		this.state = { url:'https://www.youtube.com/embed/755MWeNQ34g' }
	}
    componentDidMount() {
    	action.ver('CHECK', { code:this.props.code, update:(::this.setState) })
	}
	render() {
		return (
			<Section style="descargas" condition={true} {...this.props} download={::this.download}>    	
	        	<Upload id={0} {...this.props} {...this.state}/>
	        	<div class="row hidden" ref="iframe">
					<iframe src={this.state.url} width="100%" height="420px" allowFullScreen></iframe>
					<input type="text" onChange={e => { this.setState({ url:e.target.value }) }} class="form-control"/>
				</div>
	       	</Section>
        )
    }
	download() {
		action.ver('DOWNLOAD', { ...this.props, vt:this.state.vt })
	}
}

class Upload extends Component {
	constructor() {
		super()	
		this.state = { files:[], len:0, name:'' }
	}
	render() {
		const { len, name } = this.state; let k = 0
        return (
			<Aside id={this.props.id} option={this.props.option} title="Archivos JS y CSS">
				<Item id={k} active={k} title="Descargar">
					<a class="btn box" href={LINKS[2].url} download>JS</a>
					<a class="btn box" href={LINKS[1].url} download>CSS</a>
	        	</Item>
				<Item id={k} active={k} title="Actualizar">
					<a class="btn input" onClick={() => this.refs.input.click()}>Elegir archivos</a>
	        		<input type="file" multiple required onChange={::this.onSelect} class="hidden"></input>
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
	handleUpload(e) {
		e.preventDefault()
		action.ver('UPLOAD', { ...this.state, code:this.props.code, e })
	}
	onSelect(e) {
		const { files } = e.target
		this.setState({ len:files.length, files:files, name:files[0].name })
	}
}