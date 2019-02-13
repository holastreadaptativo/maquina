import React, { Component } from 'react'
import { Editor, Item, Input, Select } from 'components'
import { show } from 'actions'

export default class InsertarTabla extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { active:0, cols:2, rows:2, x:null, y:null, encabezado:'arriba', cssclases:'tabla-bordes', lineasHorizontales:'', estiloLineaHorizontal:'2px solid #000' } : props.params
	}
	componentWillMount() {
		if (this.props.push) {
			const { cols, rows } = this.state
			let table = []
			for (let i = 0; i < rows; i++) {
				table[i] = [];
				for (let j = 0; j < cols; j++) {
					table[i][j] = { id:`${i}-${j}`, value:{ text:'-' }, type:'text' };
				}
			}
			console.log(table);
			this.setState({ table })
		}
	}
	changeType(e, i, j) {
		e.preventDefault()
		console.log(i, j);
		let table = this.state.table
		switch(table[i][j].type) {
			case 'image': {
				table[i][j].type = 'text-image'
				table[i][j].value = { text:'-',url:'-',height:20,width:20 }
				break
			}
			case 'input': {
				table[i][j].type = 'image'
				table[i][j].value = { url:'-', height:20, width:20 }
				break
			}
			case 'text': {
				table[i][j].type = 'text-input'
				table[i][j].value = { 
					text:'-',
					tipoInput:'numero',maxLength:'4',
					value1:'-',value2:'',value3:'',value4:'',
					error0:'',error2:'',error3:'',error4:'',defaultError:'',
					feed0:'',feed1:'',feed2:'',feed3:'',feed4:'',defaultFeed:''
				}
				break
			}
			case 'text-input': {
				table[i][j].type = 'input'
				table[i][j].value = { 
					tipoInput:'numero',maxLength:'4',
					value1:'-',value2:'',value3:'',value4:'',
					error0:'',error2:'',error3:'',error4:'',defaultError:'',
					feed0:'',feed1:'',feed2:'',feed3:'',feed4:'',defaultFeed:''
				}
				break
			}
			case 'text-image': {
				table[i][j].type = 'text'
				table[i][j].value = { text:'-', tachar: 'no' }
			}
		}
		this.setState({ table })
	}
	handleChange(e, i, j) {
		let table = this.state.table
		table[i][j].value[e.target.name] = e.target.value
		this.setState({ table })
	}
	handleSelect(i, j) {
		const { x, y } = this.state
		if (x != i || y != j)
			this.setState({ x:i, y:j })
		else
			this.setState({ x:null, y:null })
	}
	update(state, id) {
		let table = this.state.table, diff = state[id] - this.state[id]
		const { cols, rows } = this.state
		if (id == 'rows') {
			if (diff > 0) {
				for (let k = 0; k < diff; k++) {
					table[table.length+k] = [];
					for (let j = 0; j < cols; j++) {
						table[table.length+k-1][j] = { id:`${table.length+k-1}-${j}`, value: { text:'-' }, type:'text' };
					}
				}
			} else if(diff < 0) {
				table = table.slice(0, table.length + diff)
				console.log(table);
			}
		} else {
			if (diff > 0) {
				for (let i = 0; i < rows; i++) {
					for (let k = 0; k < diff; k++) {
						table[i][table[i].length+k] = { id:`${i}-${k}`, value:{ text:'-' }, type:'text' };
					}
				}
			} else if(diff < 0) {
				for (let i = 0; i < rows; i++) {
					table[i] = table[i].slice(0, table[i].length + diff);
				}
			}
		}
		this.setState({ ...state, table })
	}
	render() {
		const { x, y, table, cssclases, encabezado, lineasHorizontales, estiloLineaHorizontal } = this.state; let k = 0;
		const grid = ["1","2","3","4","5","6","7","8","9","10","11","12"];
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Clases" parent={this}>
					<Input id="cssclases" prefix="CSS Clases" parent={this} value={cssclases} />
					<Select id="encabezado" parent={this} prefix="Encabezado" options={['sin encabezado', 'arriba','izquierda']} value={encabezado}/>
					<Input id="lineasHorizontales" parent={this} prefix="Lin. Horizont" value={lineasHorizontales} />
					{ lineasHorizontales !== '' && <Input id="estiloLineaHorizontal" parent={this} prefix="Estilo Lineas" value={estiloLineaHorizontal} /> }
				</Item>
				<Item id={k++} title="Tabla" parent={this}>
					<Input id="rows" prefix="filas" type="number" update={s => ::this.update(s, 'rows')} parent={this}/>
					<Input id="cols" prefix="columnas" type="number" update={s => ::this.update(s, 'cols')} parent={this}/>
					<table class="table table-condensed config">
						<tbody>
						{
							table.map((m, i) => 
								<tr key={i}>
								{ 
									m.map((n, j) => 
										<td key={j}>
											<div class={`form-control ${n.type}`} onClick={() => ::this.handleSelect(i, j)} onContextMenu={e => ::this.changeType(e, i, j)}>
												<i class={show(x == i && y == j, 'nav')}>arrow_drop_up</i>
											</div>
											<div class={show(n.type == 'image' && x == i && y == j, 'form-config')}>
												<div class="input-group">
													<span class="input-group-addon">url</span>
													<input name="url" type="text" defaultValue={n.value.url} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">alto</span>
													<input name="height" type="number" defaultValue={n.value.height} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">ancho</span>
													<input name="width" type="number" defaultValue={n.value.width} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
											</div>
											<div class={show(n.type == 'text-image' && x == i && y == j, 'form-config')}>
												<div class="input-group">
													<span class="input-group-addon">Texto</span>
													<input name="text" type="text" defaultValue={n.value.text} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">url</span>
													<input name="url" type="text" defaultValue={n.value.url} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">alto</span>
													<input name="height" type="number" defaultValue={n.value.height} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">ancho</span>
													<input name="width" type="number" defaultValue={n.value.width} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
											</div>
											<div class={show(n.type == 'input' && x == i && y == j, 'form-config')}>
												<div class="input-group">
													<span class="input-group-addon">Tipo Input</span>
													<select name="tipoInput" defaultValue={n.value.tipoInput} class="form-control" onChange={e => ::this.handleChange(e, i, j)}>
														<option value="texto">texto</option>
														<option value="numero">numero</option>
														<option value="alfanumerico">alfanumerico</option>
													</select>
												</div>
												<div class="input-group">
													<span class="input-group-addon">max lenght</span>
													<input name="maxLength" class="form-control" type="number" defaultValue={n.value.maxLength} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">correcta</span>
													<input name="value1" class="form-control" type="text" defaultValue={n.value.value1} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">incorrecta 2</span>
													<input name="value2" class="form-control" type="text" defaultValue={n.value.value2} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">incorrecta 3</span>
													<input name="value3" class="form-control" type="text" defaultValue={n.value.value3} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">incorrecta 4</span>
													<input name="value4" class="form-control" type="text" defaultValue={n.value.value4} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">err generico</span>
													<input name="error0" class="form-control" type="text" defaultValue={n.value.error0} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">error 2</span>
													<input name="error2" class="form-control" type="text" defaultValue={n.value.error2} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">error 3</span>
													<input name="error3" class="form-control" type="text" defaultValue={n.value.error3} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">error 4</span>
													<input name="error4" class="form-control" type="text" defaultValue={n.value.error4} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">err Defecto</span>
													<input name="defaultError" class="form-control" type="text" defaultValue={n.value.defaultError} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed generico</span>
													<input name="feed0" class="form-control" type="text" defaultValue={n.value.feed0} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed 1</span>
													<input name="feed1" class="form-control" type="text" defaultValue={n.value.feed1} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed 2</span>
													<input name="feed2" class="form-control" type="text" defaultValue={n.value.feed2} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed 3</span>
													<input name="feed3" class="form-control" type="text" defaultValue={n.value.feed3} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed 4</span>
													<input name="feed4" class="form-control" type="text" defaultValue={n.value.feed4} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed defecto</span>
													<input name="defaultFeed" class="form-control" type="text" defaultValue={n.value.defaultFeed} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
											</div>
											<div class={show(n.type == 'text-input' && x == i && y == j, 'form-config')}>
												<div class="input-group">
													<span class="input-group-addon">texto</span>
													<input name="text" class="form-control" type="text" defaultValue={n.value.text} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">Tipo Input</span>
													<select name="tipoInput" defaultValue={n.value.tipoInput} class="form-control" onChange={e => ::this.handleChange(e, i, j)}>
														<option value="texto">texto</option>
														<option value="numero">numero</option>
														<option value="alfanumerico">alfanumerico</option>
													</select>
												</div>
												<div class="input-group">
													<span class="input-group-addon">max lenght</span>
													<input name="maxLength" class="form-control" type="number" defaultValue={n.value.maxLength} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">correcta</span>
													<input name="value1" class="form-control" type="text" defaultValue={n.value.value1} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">incorrecta 2</span>
													<input name="value2" class="form-control" type="text" defaultValue={n.value.value2} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">incorrecta 3</span>
													<input name="value3" class="form-control" type="text" defaultValue={n.value.value3} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">incorrecta 4</span>
													<input name="value4" class="form-control" type="text" defaultValue={n.value.value4} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">err generico</span>
													<input name="error0" class="form-control" type="text" defaultValue={n.value.error0} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">error 2</span>
													<input name="error2" class="form-control" type="text" defaultValue={n.value.error2} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">error 3</span>
													<input name="error3" class="form-control" type="text" defaultValue={n.value.error3} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">error 4</span>
													<input name="error4" class="form-control" type="text" defaultValue={n.value.error4} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">err Defecto</span>
													<input name="defaultError" class="form-control" type="text" defaultValue={n.value.defaultError} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed generico</span>
													<input name="feed0" class="form-control" type="text" defaultValue={n.value.feed0} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed 1</span>
													<input name="feed1" class="form-control" type="text" defaultValue={n.value.feed1} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed 2</span>
													<input name="feed2" class="form-control" type="text" defaultValue={n.value.feed2} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed 3</span>
													<input name="feed3" class="form-control" type="text" defaultValue={n.value.feed3} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed 4</span>
													<input name="feed4" class="form-control" type="text" defaultValue={n.value.feed4} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">feed defecto</span>
													<input name="defaultFeed" class="form-control" type="text" defaultValue={n.value.defaultFeed} 
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
											</div>
											<div class={show(n.type == 'text' && x == i && y == j, 'form-config')}>
												<div class="input-group">
													<span class="input-group-addon">Texto</span>
													<input name="text" type="text" defaultValue={n.value.text} class="form-control"
													onChange={e => ::this.handleChange(e, i, j)}></input>
												</div>
												<div class="input-group">
													<span class="input-group-addon">Tachar</span>
													<select name="tachar" defaultValue={n.value.tachar} class="form-control" onChange={e => ::this.handleChange(e, i, j)}>
															<option value="no">no</option>
															<option value="si">si</option>
													</select>
												</div>
											</div>
										</td>
									)
								}
								</tr>
							)
						}
						</tbody>
					</table>
				</Item>
				{ this.props.section === 'answers' && <Item id="k++" title="Valores Respuesta" parent={this}>
          <Input id="errFrec" prefix="Error Frecte." type="text" parent={this} value={this.state.errFrec} />
          <Input id="feed" prefix="Feedback" type="text" parent={this} value={this.state.feed} />
					<Select id="col" prefix="Ancho Mobil" parent={this} value={this.state.col} options={grid}/>
					<Select id="colsm" prefix="Ancho Tablet" parent={this} value={this.state.colsm} options={grid}/>
					<Select id="colmd" prefix="Ancho Escritorio" parent={this} value={this.state.colmd} options={grid}/>
        </Item> }
			</Editor>
		)
	}
}