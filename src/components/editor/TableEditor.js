import React, { Component } from 'react'

export default class TableEditor extends Component {
	render () {
		const { cols, rows } = this.props.params
		let arr = []
		for (let i = 0; i < rows; i++) {
			arr.push([])
			for (let j = 0; j < cols; j++)
				arr[i].push(<input class="form-control" type="text"></input>)
		}
		return (
			<table class="table table-condensed">
				<tbody>
				{
					arr.map((n, k) => 
						<tr key={k}>
						{ 
							arr[k].map((m, i) => <td key={i}>{m}</td>) 
						}
						</tr>
					)
				}
				</tbody>
			</table>
		)
	}
}