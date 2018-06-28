import React, { Component } from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components'
import * as repeticionPic from 'actions'
import { COLORS } from 'stores'
import $ from 'actions'
import { show } from 'actions'

export default class RepeticionPictoricos extends Component {
  constructor(props) {
    super(props)
    
    this.state = props.push ? { 
      active:0, 
      // General
      pictoricType: 'billetes y monedas', height:450, width:720, background:COLORS['background'],
      // Borde
      borderWidth:0, borderColor:'#E58433', borderStyle:'solid', borderRadius:20,
      // Título
      titleValue: 'EL Título', titleColor: '#8B1013', titleSize: 18, titleWeight: 'bold',
      // Padding
      canvasPadding: '0,0,0,0', containerPadding: '20,20,20,20', chartPadding: '30,10,10,10',
      // Fuente
      fontColor: '#8B1013', fontSize:14, fontFamily: 'Larke Neue Thin', fontWeight: 'normal',
      // Valores
      maxCantElem: 10,
      cantElem: 1,
      elemData: []
    } : props.params
  }

  componentWillMount() {
    let elemData = []
		if (this.props.push) {
      const { maxCantElem } = this.state
      for (let i = 0; i < maxCantElem; i++) {
        elemData.push({
          ['repetElem'+ (i+1)]: 0,
          ['elemType'+ (i+1)]: 'moneda 1'
        })
      }
    }
    this.setState({elemData})
	}
  
  componentDidUpdate() {
    repeticionPic.repeticionPic({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }

  handleChange(e, i) {
		let elemData = this.state.elemData
		elemData[i][e.target.name] = e.target.value
		this.setState({ elemData })
	}

  render() {
    const { cantElem, maxCantElem, pictoricType, elemData } = this.state
    
    let k = 0, fontWeightOptions = ['normal', 'bold'], borderCanvas = ['solid','dashed','dotted','double'], 
        fontFamilyOptions = ['Larke Neue Thin', 'Arial', 'Montserrat'],/*, arrInputs = []*/  
        imgSelec = pictoricType === 'billetes y monedas' ? ['moneda 1', 'moneda 5','moneda 10', 'moneda 50', 'moneda 100', 'moneda 500', 'billete 1000'] : ['bloque unidad', 'bloque decena', 'bloque centena', 'bloque mil'],
        pictoricTypeOptions = ['billetes y monedas','bloque base'], cantElemArr = []

    let aux1 = [maxCantElem]
    aux1.forEach(el=>{
      for (let i = 0; i < el; i++) {cantElemArr.push(i+1)}
    })

    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Select id="pictoricType" prefix="tipo" options={pictoricTypeOptions} parent={this}/>
          <Input id="height" prefix="alto" postfix="px" type="number" parent={this}/>	
          <Input id="width" prefix="ancho" postfix="px" type="number" parent={this}/>	
          <Input id="background" prefix="fondo" type="color" parent={this}/>
        </Item>
        <Item id={k++} title="Borde" parent={this}>
          <Input id="borderWidth" prefix="ancho" postfix="px" type="number" parent={this}/>	
          <Input id="borderColor" prefix="color" type="color" parent={this}/>
          <Select id="borderStyle" prefix="estilo" options={borderCanvas} parent={this}/>
          <Input id="borderRadius" prefix="radio" postfix="px" type="number" parent={this}/>
        </Item>
        <Item id={k++} title="Títulos" parent={this}>
          <Input id="titleValue" prefix="título" placeholder={'Título'} parent={this}/>
          <Input id="titleColor" type="color" parent={this}/>
          <Input id="titleSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
          <Select id="titleWeight" prefix="estilo" options={fontWeightOptions} parent={this}/>
        </Item>
        <Item id={k++} title="padding" parent={this}>
          <Input id="canvasPadding" prefix="canvas" postfix="px" parent={this} placeholder={'top,right,bottom,left'} />
          <Input id="containerPadding" prefix="container" postfix="px" parent={this} placeholder={'top,right,bottom,left'} />
          <Input id="chartPadding" prefix="chart" postfix="px" parent={this} placeholder={'top,right,bottom,left'} />
        </Item>
        <Item id={k++} title="Fuente" parent={this}>
          <Input id="fontColor" type="color" parent={this}/>
          <Input id="fontSize" prefix="tamaño" postfix="px" type="number" parent={this}/>
          <Select id="fontFamily" prefix="tipo" options={fontFamilyOptions} parent={this}/>
          <Select id="fontWeight" prefix="estilo" options={fontWeightOptions} parent={this}/>
        </Item>
        <Item id={k++} title="Imágenes" parent={this}>
          <Select id="cantElem" prefix={'cantidad'} options={cantElemArr} parent={this}/>
          {
            [maxCantElem].map( el => {
              let arrInputsSelects = []
              for (let i = 0; i < el; i++) {
                arrInputsSelects.push(
                  <div class={show(cantElem > (i), 'form-config')}>
                    <div class="input-group">
                      <span class="input-group-addon prefix">imagen {(i+1)}</span>
                      <input name={`repetElem${i+1}`} type="number" defaultValue={elemData[i][`repetElem${i+1}`]} class="form-control"
                        onChange={e => ::this.handleChange(e, i)}>
                      </input>
                      <select name={`elemType${i+1}`} defaultValue={elemData[i][`elemType${i+1}`]} class="form-control"
                        onChange={e => ::this.handleChange(e, i)}>
                        {
                          imgSelec.map( (el,index) => {
                            return(
                              <option key={index} value={el}>{el}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div>
                  // <div key={i}>
                  //   <Select id={elemData[i]['elemType' + (i+1)]} prefix={'imagen ' + (i+1)} options={imgSelec} hide={cantElem < (i+1)} parent={this}/>
                  //   <Input id={'repetElem' + (i+1)} prefix={'repetir img ' + (i+1)} type="number" placeholder={''} hide={cantElem < (i+1)} parent={this}/>
                  // </div>
                )
              }
              return arrInputsSelects
            })
          }
        </Item>
      </Editor>
    )
  }
}