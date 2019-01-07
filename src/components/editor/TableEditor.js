import React, { Component } from 'react';
import { regex } from '../../actions/global/tools';

export default class TableEditor extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		const { table } = this.props.params
		const { variables, versions, vt } = this.props.store;
		var vars = vt ? variables : versions;
		return (
			<table class="table">
				<tbody>
				{
					table.map((m, i) => 
						<tr key={i}>
						{ 
							m.map((n, j) => 
								<td key={j}>
									{n.type === 'text' ? 			<p>{regex(n.value.text, vars, vt)}</p> :
										n.type === 'image' ? 		<img src={regex(n.value.url, vars, vt)} height={n.value.height} width={n.value.width}/> :
											n.type === 'input' ? 	<input 
																							class={`form-control ${n.type}`} 
																							type="text" 
																							placeholder={'La coorrecta es: ' + regex(n.value.value1, vars, vt)}
																						/> : 
																						<p>{regex(n.value.text, vars, vt)}</p>
									}
								</td>
							)
						}
						</tr>
					)
				}
				</tbody>
			</table>
		)
	}
}