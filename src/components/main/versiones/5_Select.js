import React, { Component } from 'react'
import { focus } from 'actions'
import { data } from 'stores'

export default class Select extends Component {
    handleSelect(m, i) {
		this.props.setState({ vars:m.vars, active:i })
	}
	handleRemove(m, i) {
		const { code } = this.props
		if (confirm('¿Quieres eliminar esta versión?')) {
			let ref = data.child(`${code}/versions`)
			ref.child('gen').once('value').then(snap => {
				snap.forEach(v => {
					if (v.val().id == m.id) {
						ref.child(`gen/${v.key}`).remove().then(() => {
							ref.child('bup').orderByKey().limitToFirst(1).once('value').then(w => {	
								w.forEach(x => { 
									ref.child('gen').push( x.val() )
									ref.child(`bup/${x.key}`).remove()
								})
							})	
						})
					}					
				})
			})
			this.props.setState({ active:i-1 })
		}		
	}
	render() {
		const { versions, active, vt } = this.props
        return(
        	<div class="col-xs-3 seleccion">
				<h5><b>Selección</b></h5>
				<h4 class={focus(active == -1, 'active')} onClick={() => this.handleSelect(vt, -1)}>
					Versión VT
				</h4>
				{
					versions.map((m, i) => 
						<h4 key={i} id={m.id} class={focus(active == i, 'active')} onClick={() => this.handleSelect(m, i)}>
							Versión {m.id + 1}
							<span class="glyphicon glyphicon-remove close" onClick={() => this.handleRemove(m, i)}/>
						</h4>
					)
				}
			</div>
        )
    }
}