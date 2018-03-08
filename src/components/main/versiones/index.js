import React, { Component } from 'react'
import { Section } from 'components'
import { data } from 'stores'
//import $ from 'actions'

export class Versiones extends Component {
    constructor() {
		super()
		this.state = { total:0, limit:100, selected:20 }
	}
	componentWillMount() {
		data.child(`${this.props.code}/versions`).on('value', v => {
			this.setState({ total:v.val().total, limit:v.val().limit, selected:v.val().selected })
		})
	}
	handleChange(e) {
		let update = { [e.target.id.split('-')[1]]:e.target.value }
		this.setState(update)
	}
	sort(m) {
		return m.sort((a, b) => (a.var.charCodeAt(0) - b.var.charCodeAt(0)) )
	}
	render() {
		const { option, variables, versions } = this.props
		const { selected } = this.state
        return(
        	<Section style="versiones" condition={false} {...this.props}>
        		<div class="row">
        			<div class="preview">		
	        			<table class="table">
	        				<thead>
	        					<tr>
	        						<th>#</th>
	        						{
	        							variables.map((m, i) => <th key={i}>{m.var}</th> )
	        						}
	        					</tr>
	        				</thead>
	        				<tbody>
	        				{
	        					versions.slice(0, selected).map((m, i) => 
	        						<tr key={i}><td>{i + 1}</td>
        							{
        								this.sort(m).map((n, j) => <td key={j}>{n.val}</td> )
        							}
	        						</tr>
	        					)
	        				}
	        				</tbody>
	        			</table>
	        			<Generate {...this.props} {...this.state} condition={option == 0} onChange={(e) => this.handleChange(e)}/>
        			</div>
        		</div>
        	</Section>
        )
    }
}

import Generate from './5_Generate'

/*

	        			*/

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