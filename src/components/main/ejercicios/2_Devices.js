import React, { Component } from 'react'
import { DEVICES, LABELS } from 'stores'

export default class Devices extends Component {
	render() {
		const { devices, onChange } = this.props
		return (
			<div>
				<h6>Devices:</h6>
				{
					DEVICES.map((n, j) => 
						<h6 key={j}>
							<i>{n.icon}</i>
							<select id={n.col} defaultValue={devices[j]} onChange={onChange}>
							{
								LABELS.SIZE.map((m, i) =>
									<option key={i} value={m}>{Math.round(250/3*m, 2)/10+'%'}</option>
								)
							}	
							</select>
						</h6>
					)
				}
			</div>
		)
	}
}