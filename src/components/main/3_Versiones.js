import React, { Component } from 'react'
import { Aside, Item, Input, Panel, Section, Well } from 'components'
import { action, focus } from 'actions'

export default class Versiones extends Component {
    constructor() {
		super()
		this.state = { total:0, limit:128, selected:32, vars:[], active:0, vt:[] }
		this.print = this.print.bind(this)
	}
	componentWillMount() {
		action.ver('COUNT', { code:this.props.code, update:(::this.setState) })
	}
	componentDidMount() {
		action.ver('GET', { code:this.props.code, update:(::this.setState), print:this.print })
		window.addEventListener('resize', this.print )
	}
	componentDidUpdate() {
		setTimeout(() => this.print(), 0)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.print )
	}
	render() {
		return (
        	<Section style="versiones" condition={true} {...this.props}>
        		<div class="row">
        			<Generate {...this.props} {...this.state} id={0} setState={::this.setState}/>
    				<Select {...this.state} code={this.props.code} versions={this.props.versions} setState={::this.setState}/>
        			<Preview answers={this.props.answers} functions={this.props.functions} feedback={this.props.feedback}/>
        		</div>
        	</Section>
        )
    }
	print() {
		action.exe('GET', { ...this.props, versions:this.state.vars, vt:false, path:'functions', container:'container-E' })
		action.exe('GET', { ...this.props, versions:this.state.vars, vt:false, path:'answers', container:'container-R' })
	}
}

class Preview extends Component {
	render() {
		return(
        	<Panel container="design">	
	        	<main class="device">
				{	
					this.props.functions.map((m, i) => 
						<div key={i} class={`col-md-${m.width.md} col-sm-${m.width.sm} col-sm-${m.width.xs} div-${m.tag} tags`}>
						{
							m.tag != 'general' ? 
							<canvas id={`container-E-${i}`} class="center-block" style={{background:m.params.background}}></canvas> :
							<div id={`container-E-${i}`} class="general"></div>
						}
						</div>
					)
				}
				{
					this.props.answers.map((m, i) => 
						<div key={i} class={`col-md-${m.width.md} col-sm-${m.width.sm} col-sm-${m.width.xs} div-${m.tag} tags`}>
						{
							m.tag != 'general' ? 
							<canvas id={`container-R-${i}`} class="center-block" style={{background:m.params.background}}></canvas> :
							<div id={`container-R-${i}`} class="general"></div>
						}
						</div>
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
						Versión <b>{m.id}</b> {m.id != 'vt' && <span class="glyphicon glyphicon-remove close" onClick={() => this.handleRemove(m, i)}/>}
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
		if (confirm('¿Quieres eliminar esta versión?')) {
			action.ver('REMOVE', { code:this.props.code, id:m.id })
			this.props.setState({ active:i - 1 })
		}
	}
}

class Generate extends Component {
	constructor() {
		super()
		this.state = { fns:[], rank:[] }
	}
	componentWillMount() {
		let fns = []
		this.props.variables.forEach(m => {
			if (m.type == 'funcion')
				fns.push(m); this.setState({ fns:fns })
		})
	}
	render() {
		const { total, limit, selected, setState } = this.props
        return(
			<Aside show={this.props.id == this.props.option} title="Versiones">
				<Item id={0} active={0} title="Generar">
					<Input id="total" default={total} prefix="máximo" update={setState} type="number"/>
					<Input id="limit" default={limit} prefix="intentos" update={setState} type="number"/>
					<Input id="selected" default={selected} prefix="selección" update={setState} type="number"/>
					<button class="btn" onClick={::this.handleGenerate}>Generar</button>
				</Item>
		    </Aside>
		)
	}
	handleGenerate(e) {
		e.preventDefault()
		action.ver('GEN', { ...this.props, fns:this.state.fns })
	}
}