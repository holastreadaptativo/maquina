import React, { Component } from 'react'
import { Section } from 'components'
//import $ from 'actions'

export class Versiones extends Component {
    constructor() {
		super()
		this.state = { matrix:[], fns:[] }
		this.recursion = this.recursion.bind(this)
		this.evalf = this.evalf.bind(this)
	}
	componentDidMount() {
		let fns = []
		this.props.variables.forEach(m => {
			if (m.type == 'funcion') {
				fns.push(m)
				this.setState({ fns:fns })
			}
		})
	}
	genVersiones() {
		const { variables } = this.props
		let aux = variables.slice(0), vars = []

		while (aux.length) {
			let m = aux.shift()	
			switch (m.type) {
				case 'numero': {
					if (m.val.includes(',')) {
						let x = m.val.split(','), y = []
						x.forEach(m => { y.push(Number(m)) })
						vars.push({ var:m.var, val:y })
					}
					else if (m.val.includes('..')) {
						let x = m.val.split('..'), y = []	
						for (let i = Number(x[0]); i <= Number(x[1]); i++) {
							y.push(Number(i))
						}
						vars.push({ var:m.var, val:y })
					}
					else
					{
						vars.push({ var:m.var, val:[Number(m.val)] })
					}
					break
				}
				case 'texto': {
					if (m.val.includes(',')) {
						let x = m.val.split(','), y = []
						x.forEach(m => { y.push(m.trim()) })
						vars.push({ var:m.var, val:y })
					}
					else
					{
						vars.push({ var:m.var, val:[m.val] })
					}
				}
			}
		}
		this.recursion(vars, [], [])
	}
	recursion(vars, matrix, n) {
		let values = vars[0].val, size = vars.length
		for (let i = 0; i < values.length; i++) {
			let item = { var:vars[0].var, val:values[i] }
			if (size > 1)
				this.recursion(vars.slice(1, size), matrix, [...n, item])
			else if (size == 1) {	
				matrix.push(this.evalf( [...n, item] ))
				this.setState({ matrix:matrix })	
			}
		}
	}
	evalf(elem) {
		const { fns } = this.state
		let aux = fns.slice(0), stop = Math.pow(aux.length, 2), copy = elem.slice(0)

		while (aux.length && stop) 
		{
			stop--
			let m = aux.shift(), xy = m.val
			copy.forEach(n => {
				xy = xy.replace(n.var, n.val)
			})
			if (!xy.match(/[a-zA-Z]/))
				copy.push({ var:m.var, val:Number(eval(xy)) })
			else {
				m.val = xy
				aux.push(m)
			}
		}
		return copy
	}
	render() {
		let v = 50
        return(
        	<Section style="versiones" condition={true} {...this.props}>
        		<div class="row">
        			<div class="preview" onClick={::this.genVersiones}>		
        			<h3>versiones: {v}/{this.state.matrix.length}</h3>
        			{
    					this.state.matrix.sort(() => { return 0.5 - Math.random() }).slice(0, v).map((m, i) => { return (
    						<ul key={i}>
    						<a>{i+1} = </a>
    						{
    							m.map((n, j) => { return (
    								<a key={j}>{n.var}.{n.val}&nbsp;</a>
    							)})
    						}
    						</ul>
    					)})
    				}
        			</div>
        		</div>
        	</Section>
        )
    }
}

/*{JSON.stringify(this.props.variables)}



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
	})})
    				}



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