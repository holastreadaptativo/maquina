import React, { Component } from 'react'
import { Editor, Input, Item, Select, Text } from 'components'
import { glyph } from 'actions'

export default class InsertImage extends Component {
	constructor(props) {
		super(props)
		this.state = props.push ? { 
			active:0, 
      src:'',
      display:'auto',
      height:'',
			width:'',
			col:'12',
			colsm:'6',
			colmd:'4',
			errFrec:'',
			feed:'',
			offsetsm:'0',
			offsetmd:'0'
		} : props.params;
	}
	render() {
		let k = 0;
		var { 
      src,
      display,
      width,
			height,
			col,
			colsm,
			colmd,
			offsetsm,
			offsetmd
    } = this.state;
		var displayOpc = ['auto', 'ancho exacto', 'alto exacto', 'alto y ancho exacto'];
		var cols = ['0','1','2','3','4','5','6','7','8','9','10','11','12'];
		return (
			<Editor params={this.state} store={this.props} parent={this}>
				<Item id={k++} title="Opciones" parent={this}>
          <Input id="src" prefix="src" type="text" parent={this} value={src} />
					<Select id="display" parent={this} prefix="Tipo" options={displayOpc} value={display}/>
					{ (display === 'alto exacto' || display === 'alto y ancho exacto') && 
            <Input id="height" parent={this} prefix="Alto" value={height} />}
					{ (display === 'ancho exacto' || display === 'alto y ancho exacto') && 
						<Input id="width" parent={this} prefix="Ancho" value={width} /> }
					{ display === 'auto' && <Select id="col" parent={this} prefix="col" options={cols} value={col}/> }
					{ display === 'auto' && <Select id="colsm" parent={this} prefix="col-sm" options={cols} value={colsm}/> }
					{ display === 'auto' && <Select id="offsetsm" parent={this} prefix="offsetsm" options={cols} value={offsetsm}/> }
					{ display === 'auto' && <Select id="colmd" parent={this} prefix="col-md" options={cols} value={colmd}/> }
					{ display === 'auto' && <Select id="offsetmd" parent={this} prefix="offsetmd" options={cols} value={offsetmd}/> }
				</Item>
			</Editor>
		)
	}
}