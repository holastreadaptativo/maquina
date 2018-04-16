import React, { Component } from 'react'
import $, { action, glyph, focus, show } from 'actions'
import { DEFAULT, LABELS } from 'stores'

export default class Buscador extends Component {
	constructor() {
		super()
		this.state = DEFAULT.SEARCH
	}
	render() {
		return (
			<section class="code">
				<Search {...this.state} setCode={this.props.setCode} setState={::this.setState}/>
				<Table {...this.state} setCode={this.props.setCode} setState={::this.setState}/>
			</section>
		)
	}
}

class Table extends Component {
	render() {
		return (
			<table class={show(this.props.selected, 'table search table-condensed table-striped table-hover')}>
				<thead>
					<tr>
						<th>#</th>
						<th>Código del Ejercicio</th>
						<th>Versiones</th>
						<th>Generados</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
				{
					this.props.search.map((m, i) => 
						<tr key={i} onClick={() => this.props.setCode(m.id)}>
							<td>{i + 1}</td>
							<td>{ m.id }</td>
							<td>{ m.versions }/{ m.limit }</td>
							<td>{ m.total }</td>
							<td>-</td>
						</tr>
					)
				}
				</tbody>
				<tfoot>
					<tr>
						<td>
							<button class="btn btn-default clean" onClick={::this.handleClear}>Limpiar</button>
						</td>
					</tr>
				</tfoot>
			</table>
		)
	}
	handleClear(e) {
		e.preventDefault()
		this.props.setState(DEFAULT.SEARCH)
		$('search-code').value = ''
	}
}

class Search extends Component {
	render() {
		const { selected, length, temp } = this.props
		return (
			<center>
				<h3 class={focus(selected, 'selected')}>Buscar por código</h3>
				<form class="search">
					<div class="input-group" onKeyPress={::this.handleKeyPress}>
						<span class="input-group-addon">
							<span class={glyph('search')}/>
						</span>
						<input id="search-code" type="text" class="form-control" placeholder="15 caracteres" 
							onChange={::this.onChange} maxLength="15"></input>
						<span class="input-group-btn">
							<button class="btn btn-default" onClick={::this.handleSubmit}>Buscar</button>
						</span>
					</div>
					<div class="color-line"/>
				</form>
				<summary>
					<h5>
						{length}/15 { length == 15 && <span class={glyph('ok')}/> }
					</h5>
					<div class="row">
					{
						LABELS.CODE.map((m, i) => { let x = i < 5 ? 2 : 5; return (
							<h6 key={i}>{m}: {length >= 2*i + x ? temp.substring(2*i, 2*i + x) : '-' }</h6>
						)})
					}
					</div>
				</summary>
			</center>
		)
	}
	handleSubmit(e) {
		e.preventDefault()
		let code = $('search-code').value
		
		if (code.length == 15) {
			this.props.setCode(code)
			//this.props.setNotification(null, this.props.alert)
		}					

		this.props.setState({ code:code, selected:code != DEFAULT.CODE && code.length > 2 })
	}
	handleKeyPress(e) {
		if (e.charCode == 13)
			this.handleSubmit(e)
	}
	onChange(e) {
		const { setState } = this.props
		let n = e.target.value, l = n.length, 
			m = parseInt(n.substring(l - 1, l))

		if (!Number.isInteger(m)) 
			n = e.target.value = n.substring(0, l - 1)
		
		setState({ length:n.length, temp:n })

		if (n.length == 0)
			setState(DEFAULT.SEARCH)

		else if (n.length > 2)
			action.var('CODE', { code:'', target:n, update:setState })
		
		else
			setState({ selected:false })
	}
}