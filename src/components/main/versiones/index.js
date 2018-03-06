import React, { Component } from 'react'
import { Section } from 'components'
import { versiones } from 'actions'
import { data } from 'stores'
//import $ from 'actions'

export class Versiones extends Component {
    constructor() {
		super()
		this.state = { matrix:[], fns:[], limit:100 }
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
	generar() {
		let matrix = versiones('GEN', { ...this.props, fns:this.state.fns })
		matrix = matrix.sort(() => (0.5 - Math.random()) ).slice(0, this.state.limit)
		data.child(`${this.props.code}/versions`).set({ ...matrix })
		this.setState({ matrix:matrix })
	}
	sort(m) {
		return m.sort((a, b) => (a.var.charCodeAt(0) - b.var.charCodeAt(0)) )
	}
	render() {
		const { limit, matrix } = this.state
        return(
        	<Section style="versiones" condition={true} {...this.props}>
        		<div class="row">
        			<div class="preview">		
	        			<h4>versiones: {limit}/{matrix.length}</h4>
	        			<button onClick={::this.generar}>Generar</button>
	        			<table class="table">
	        				<thead>
	        					<tr>
	        						<th>#</th>
	        						{
	        							this.props.variables.map((m, i) => <th key={i}>{m.var}</th> )
	        						}
	        					</tr>
	        				</thead>
	        				<tbody>
	        				{
	        					matrix.map((m, i) => 
	        						<tr key={i}><td style={{maxWidth:'15px'}}>{i + 1}</td>
        							{
        								this.sort(m).map((n, j) => <td key={j}>{n.val}</td> )
        							}
	        						</tr>
	        					)
	        				}
	        				</tbody>
	        			</table>
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