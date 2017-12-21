import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { DEFAULT } from 'components'
import $ from 'actions'

export class Home extends Component {
	constructor(props) {
		super(props); this.state = { length:0, temp:0, code:DEFAULT, search:[] }
	}
	checkLength(e) {
		let n = e.target.value, l = n.length, m = parseInt(n.substring(l - 1, l))
		if (!Number.isInteger(m)) {
			n = e.target.value = n.substring(0, l - 1)
		}
		this.setState({ length:n.length, temp:n })
		if (n.length == 0) {
			this.setState({ code:DEFAULT })
			this.props.setCode(DEFAULT)
		}
	}
	random(n) {
		return Math.floor(Math.random(0, 1) * n)
	}
	complete(n) {
		let aux = '' + n
		while (aux.length < 15) {
			aux += this.random(10)
		} return aux
	}
	handlerClear(e) {
		e.preventDefault()
		this.setState({ code:DEFAULT, search:[] })
		$('search-id-code').value = ''
	}
	handlerSubmit(e) {
		e.preventDefault()
		let code = $('search-id-code').value, search = [], count = 0
		
		if (code.length == 15) {
			this.props.setActive(1)
			browserHistory.push('/variables')
		}
		else
			for (let i = 0; i < this.random(20) + 1; i++)
				search.push({ id:++count })

		this.setState({ code:code, search:search })
		this.props.setCode(code)
	}
	render() {
		const { temp, length, search, code } = this.state
		return (
			<div class="home">
				<h3 style={{paddingTop:`${code == DEFAULT || code.length < 3 ? '28vh' : '0vh'}`}}>Buscar por código</h3>
				<form>
					<div class="input-group">
						<span class="input-group-addon"><span class="glyphicon glyphicon-search"/></span>
						<input id="search-id-code" type="text" class="form-control" placeholder="15 caracteres" 
							onChange={this.checkLength.bind(this)} maxLength="15"></input>
						<span class="input-group-btn">
							<button class="btn btn-default" onClick={this.handlerSubmit.bind(this)}>Buscar</button>
						</span>
					</div>
					<div>
						<h6 class="search-count">{length}/15 {length == 15 ? <span class="glyphicon glyphicon-ok"/> : ''}</h6>
						<div class="row">
							<h6>Nivel: {length >= 2 ? temp.substring(0,2) : '-' }</h6>
							<h6>Eje: {length >= 4 ? temp.substring(2,4) : '-' }</h6>
							<h6>OA: {length >= 6 ? temp.substring(4,6) : '-' }</h6>
							<h6>IE: {length >= 8 ? temp.substring(6,8) : '-' }</h6>
							<h6>Tipo: {length >= 10 ? temp.substring(8,10) : '-' }</h6>
							<h6>Ejercicio: {length >= 15 ? temp.substring(10,15) : '-' }</h6>
						</div>
					</div>
					{ 
						code != '000000000000000' && code.length > 2 ? 
						<div>
							<table class="table table-condensed table-striped table-hover">
								<thead>
									<tr>
										<th>#</th>
										<th>Código del Ejercicio</th>
										<th>Versiones</th>
										<th>Estado</th>
									</tr>
								</thead>
								<tbody>
								{
									search.map(m => { return (
										<tr key={m.id} onClick={() => { this.props.setCode($(`${m.id}-code`).innerText); browserHistory.push('/variables') }}>
											<td>{m.id}</td>
											<td id={`${m.id}-code`}>{this.complete(code, 15)}</td>
											<td>{this.random(15) + 5}</td>
											<td>-</td>
										</tr>
									)})
								}
								</tbody>
							</table>
							<div class="clean">
								<button class="btn btn-default clean" onClick={this.handlerClear.bind(this)}>Limpiar</button>
							</div>
						</div>
						: ''
					}
				</form>
			</div>
		)
	}
}

export * from './variables'
export * from './ejercicios'
export * from './respuestas'
export * from './versiones'
export * from './descargas'