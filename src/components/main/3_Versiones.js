import React, { Component } from 'react'
import { Aside, Item, Input, Panel, Section, Well } from 'components'
import { action, glyph, focus, show } from 'actions'
import { LABELS, LINKS } from 'stores'

export default class Versiones extends Component {
    constructor() {
		super()
		this.state = { active:0, limit:128, selected:32, total:8192, vars:[], vt:[] }
		this.print = this.print.bind(this)
	}
	componentWillMount() {
		action.ver('CHECK', { code:this.props.code, update:(::this.setState) })
	}
	componentDidMount() {
		window.addEventListener('resize', this.print )
		this.print()
	}
	componentDidUpdate() {
		setTimeout(() => this.print(), 0)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.print )
	}
	render() {
		const { answers, code, functions, option, versions, variables } = this.props
		return (
        	<Section style="versiones" condition={true} {...this.props} download={::this.download}>
        		<div class="row">
        			<Upload {...this.state} id={1} option={option} code={code}/>
        			<Generate {...this.state} id={0} option={option} code={code} variables={variables} setState={::this.setState}/>
    				<Select {...this.state} code={code} versions={versions} setState={::this.setState}/>
        			<Preview answers={answers} functions={functions}/>
        		</div>
        	</Section>
        )
    }
	download() {
		action.ver('DOWNLOAD', { ...this.props, vt:this.state.vt })
	}
	print() {
		action.ver('PRINT', { ...this.props, versions:this.state.vars, vt:false })
	}
}

class Preview extends Component {
	render() {
		return(
        	<Panel container="design">	
	        	<main class="device">
				{	
					['functions', 'answers'].map(n => 
						this.props[n].map((m, i) => 
							<div key={i} class={`col-md-${m.width.md} col-sm-${m.width.sm} col-sm-${m.width.xs} div-${m.tag} tags`}>
							{
								m.tag != 'general' ? 
								<canvas id={`${LABELS.CONT[n]}-${i}`} class="center-block" style={{background:m.params.background}}></canvas> :
								<div id={`${LABELS.CONT[n]}-${i}`} class="general"></div>
							}
							</div>
						)
					)					
				}		
				</main>
			</Panel>
        )
    }
}

class Select extends Component {
	render() {
		return (
        	<Well title="Selección">
			{
				[this.props.vt, ...this.props.versions].map((m, i) => 
					<h4 key={i} id={m.id} class={focus(this.props.active == i, 'active')} onClick={() => this.handleSelect(m, i)}>
						Versión <b>{m.id}</b> {m.id != 'vt' && <span class={glyph('remove close')} onClick={() => this.handleRemove(m, i)}/>}
					</h4>
				)
			}
			</Well>
        )
    }
	handleSelect(m, i) {
		this.props.setState({ vars:m.vars, active:i })
	}
	handleRemove(m, i) {
		const { code, versions } = this.props, { id } = m
		if (confirm('¿Quieres eliminar esta versión?')) {
			this.props.setState({ vars:versions[i - 2].vars, active:i - 1 })
			action.ver('DELETE', { code, id })
		}
	}
}

class Generate extends Component {
	constructor(props) {
		super(props)
		this.state = { active:0, limit:props.limit, selected:props.selected, total:props.total, fns:[], rank:[] }
	}
	componentWillMount() {
		let fns = []
		this.props.variables.forEach(m => {
			if (m.type == 'funcion') { fns.push(m); this.setState({ fns }) }
		})
	}
	render() {
		const { id, option, setState } = this.props
        return (
			<Aside id={id} option={option} title="Versiones">
				<Item id={0} title="Generar" parent={this}>
					<Input id="total" prefix="máximo" update={setState} type="number" parent={this} disabled/>
					<Input id="limit" prefix="intentos" update={setState} type="number" parent={this}/>
					<Input id="selected" prefix="selección" update={setState} type="number" parent={this}/>
					<button class="btn" onClick={::this.handleGenerate}>Generar</button>
				</Item>
		    </Aside>
		)
	}
	handleGenerate(e) {
		e.preventDefault()
		const { code, limit, selected, variables } = this.props, { fns } = this.state
		action.ver('CREATE', { code, fns, limit, selected, variables })
	}
}

class Upload extends Component {
	constructor() {
		super()	
		this.state = { active:0, files:[], len:0, name:'' }
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
	handleUpload(e) {
		e.preventDefault()
		action.ver('UPLOAD', { ...this.state, code:this.props.code, form:e.target.form, update:(::this.setState) })
	}
	onSelect(e) {
		const { files } = e.target
		this.setState({ len:files.length, files:files, name:files[0].name })
	}
}