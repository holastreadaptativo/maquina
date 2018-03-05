import React, { Component } from 'react'
import { Section } from 'components'
import $ from 'actions'

export class Versiones extends Component {
    constructor() {
		super()
		this.state = { drag:'', versions:[], selection:[], vars:[] }
	}
	componentDidMount() {
		let versions = []
		for (let i = 0; i < 25; i++) {
			versions.push({ id:`version-${i}`, count:i })
		} 
		versions.sort(() => { return 0.5 - Math.random() })

		this.setState({ selection:versions.slice(0, 10) , versions:versions.slice(10, versions.length) })
	}
	allowDrop(e) {
    	e.preventDefault()
	}	
	drag(e) {
		this.setState({ drag:e.target.id })
		e.dataTransfer.setData('text', $(e.target.id))
	}
	drop(e) {
	    e.preventDefault()
	    if (!e.target.id.includes('version'))
		   	$(e.target.id).appendChild($(this.state.drag))
	}
	genVersion() {
		const { variables } = this.props
		let vars = [], aux = variables.slice(0), stop = Math.pow(variables.length, 2)

		while (aux.length && stop) {
			let m = aux.shift()
				console.log(stop)
			stop--
			
			switch (m.type) {
				case 'numero': {
					if (m.val.includes(',')) {
						let x = m.val.split(',')
						vars.push({ var:m.var, val:x[Math.floor(Math.random(0, 1) * x.length)] })
					}
					else if (m.val.includes('..')) {
						let x = m.val.split('..'), y = Number(x[0]), z = Number(x[1])					
						vars.push({ var:m.var, val:y + Math.floor(Math.random(0, 1) * (z - y)) })
					}
					else
					{
						vars.push({ var:m.var, val:Number(m.val) })
					}
					this.setState({ vars:vars })
					break
				}
				case 'funcion': {
					let xy = m.val
					vars.forEach(n => {
						xy = xy.replace(n.var, n.val)
					})
					if (!xy.match(/[a-zA-Z]/))
						vars.push({ var:m.var, val:Number(eval(xy)) })
					else {
						m.val = xy
						aux.push(m)
					}
					this.setState({ vars:vars })
					break
				}
				case 'texto': {
					if (m.val.includes(',')) {
						let x = m.val.split(',')
						vars.push({ var:m.var, val:x[Math.floor(Math.random(0, 1) * x.length)] })
					}
					else
					{
						vars.push({ var:m.var, val:Number(m.val) })
					}
					this.setState({ vars:vars })
				}
			}
		} 
	}
	render() {
        return(
        	<Section style="versiones" condition={true} {...this.props}>
        		<div class="row">
        			<div class="preview" onClick={::this.genVersion}>		
    				{
    					this.state.vars.map((m, i) => { return (
    						<li key={i}>{m.var} => {m.val}</li>
    					)})
    				}
        			</div>
        		</div>
        	</Section>
        )
    }
}

/*{JSON.stringify(this.props.variables)}
<div class="row">
					<div class="col-md-3">
						<div id="options" class="combinaciones">
							<h5>Versiones:</h5>
							{
								this.state.versions.map((m, i) => { return (
									<h4 key={i} id={m.id} draggable="true" onDragStart={::this.drag}>Version {m.count + 1}</h4>
								)})
							}
						</div>
					</div>	
					<div class="col-md-3">
						<div id="selection" class="seleccion" onDrop={::this.drop} onDragOver={this.allowDrop}>
							<h5>Selección:</h5>
							{
								this.state.selection.map((m, i) => { return (
									<h4 key={i} id={m.id} draggable="true" onDragStart={::this.drag}>Version {m.count + 1}</h4>
								)})
							}
						</div>
					</div>	
					<div class="col-md-6">
						<div class="preview">
							<h5>Vista previa:</h5>
						</div>
					</div>	
				</div>
*/