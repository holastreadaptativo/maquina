import React, { Component } from 'react'
import { Aside, Item, Input, Panel, Section, Well } from 'components'
import { action, glyph, focus } from 'actions'
import { LABELS } from 'stores'

export default class Versiones extends Component {
    constructor() {
		super()
		this.state = { active:0, limit:128, selected:32, total:0, vars:[], vt:[] }
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
		const { code, option, versions, variables } = this.props
		return (
        	<Section style="versiones" condition={true} {...this.props}>
        		<div class="row">
        			<Generate {...this.state} id={0} option={option} code={code} variables={variables} setState={::this.setState}/>
    				<Select {...this.state} code={code} versions={versions} setState={::this.setState}/>
        			<Preview {...this.props}/>
        		</div>
        	</Section>
        )
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
		const { id, limit, option, selected, setState, total } = this.props
        return(
			<Aside id={id} option={option} title="Versiones">
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
		const { code, limit, selected, variables } = this.props, { fns } = this.state
		action.ver('CREATE', { code, fns, limit, selected, variables })
	}
}