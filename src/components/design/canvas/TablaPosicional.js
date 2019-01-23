import React from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'

export default class TablaPosicional extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,_width:'500',_tipoTabla:'miles', /*puede ser 'centenas' o 'miles'*/_pisosTabla:'1', /*pueden ser 'uno', 'dos', 'tres'*/_separacionElementos:'20',
_tipoPisoUno:'numerico',_repeticionPictoricaPisoUno:'',_umilPisoUno:'0',_centenaPisoUno:'0',_decenaPisoUno:'0',_unidadPisoUno:'0',
_tipoPisoDos:'numerico',_repeticionPictoricaPisoDos:'',_umilPisoDos:'0',_centenaPisoDos:'0',_decenaPisoDos:'0',_unidadPisoDos:'0',
_tipoPisoTres:'numerico',_repeticionPictoricaPisoTres:'',_umilPisoTres:'0',_centenaPisoTres:'0',_decenaPisoTres:'0',_unidadPisoTres:'0',
_dibujaValorPosicional1:'no',_altoTextoValorPosicional1:'30',_umilVP1:'0',_centenaVP1:'0',_decenaVP1:'0',_unidadVP1:'0',
_dibujaValorPosicional2:'no',_altoTextoValorPosicional2:'30',_umilVP2:'0',_centenaVP2:'0',_decenaVP2:'0',_unidadVP2:'0',
_dibujaTextoResultado:'no',_altoTextoResultado:'0',_resultado:'',esCorrecta: false,
errFrec: ""} : props.params;
  }
  componentDidUpdate() {
    acciones.tablaPosicional({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    const {
      _width,_tipoTabla,_pisosTabla,_separacionElementos,
      _tipoPisoUno,_repeticionPictoricaPisoUno,_umilPisoUno,_centenaPisoUno,_decenaPisoUno,_unidadPisoUno,
      _tipoPisoDos,_repeticionPictoricaPisoDos,_umilPisoDos,_centenaPisoDos,_decenaPisoDos,_unidadPisoDos,
      _tipoPisoTres,_repeticionPictoricaPisoTres,_umilPisoTres,_centenaPisoTres,_decenaPisoTres,_unidadPisoTres,
      _dibujaValorPosicional1,_altoTextoValorPosicional1,_umilVP1,_centenaVP1,_decenaVP1,_unidadVP1,
      _dibujaValorPosicional2,_altoTextoValorPosicional2,_umilVP2,_centenaVP2,_decenaVP2,_unidadVP2,
      _dibujaTextoResultado,_altoTextoResultado,_resultado
    } = this.state;
    var tipoPisos = ['numerico' , 'imagenes', 'repeticion'];
    var opcionesUno = _tipoPisoUno === 'repeticion' ? ['bloques', 'monedas y billetes'] : ['pelotas', 'circulo y cuadrado'];
    var opcionesDos = _tipoPisoDos === 'repeticion' ? ['bloques', 'monedas y billetes'] : ['pelotas', 'circulo y cuadrado'];
    var opcionesTres = _tipoPisoTres === 'repeticion' ? ['bloques', 'monedas y billetes'] : ['pelotas', 'circulo y cuadrado'];
    let k = 0;
    console.log(this.state.esCorrecta);
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="Dimension" parent={this}>
          <Input id="_width" prefix="Ancho" parent={this} value={_width}/>
          <Select id="_tipoTabla" prefix="Tipo tabla" parent={this} options={['centenas','miles']} value={_tipoTabla}/>
          <Select id="_pisosTabla" prefix="Pisos Tabla" parent={this} options={['1','2','3']} value={_pisosTabla}/>
          <Input id="_separacionElementos" prefix="Separacion" parent={this} value={_separacionElementos}/>
        </Item>
        <Item id={k++} title="Piso Uno" parent={this}>
          <Select id="_tipoPisoUno" parent={this} options={tipoPisos} prefix="Tipo" value={_tipoPisoUno}/>
          { (_tipoPisoUno === 'repeticion' || _tipoPisoUno === 'imagenes') && 
            <Select id="_repeticionPictoricaPisoUno" prefix="Tipo Rep" options={opcionesUno} parent={this} value={_repeticionPictoricaPisoUno} /> }
          <Input id="_umilPisoUno" prefix="u mil" parent={this} value={_umilPisoUno} />
          <Input id="_centenaPisoUno" prefix="centenas" parent={this} value={_centenaPisoUno} />
          <Input id="_decenaPisoUno" prefix="decenas" parent={this} value={_decenaPisoUno} />
          <Input id="_unidadPisoUno" prefix="unidades" parent={this} value={_unidadPisoUno} />
        </Item> 
        {(_pisosTabla === '2' || _pisosTabla === '3') && 
          <Item id={k++} title="Piso Dos" parent={this}>
            <Select id="_tipoPisoDos" prefix="Tipo" options={tipoPisos} parent={this} value={_tipoPisoDos}/>
            { (_tipoPisoDos === 'repeticion' || _tipoPisoDos === 'imagenes') && 
              <Select id="_repeticionPictoricaPisoDos" prefix="Tipo Rep" parent={this} options={opcionesDos} value={_repeticionPictoricaPisoDos} /> }
            <Input id="_umilPisoDos" prefix="u mil" parent={this} value={_umilPisoDos} />
            <Input id="_centenaPisoDos" prefix="centenas"  parent={this} value={_centenaPisoDos} />
            <Input id="_decenaPisoDos" prefix="decenas"  parent={this} value={_decenaPisoDos} />
            <Input id="_unidadPisoDos" prefix="unidades"  parent={this} value={_unidadPisoDos} />
          </Item> }
        {_pisosTabla === '3' && 
          <Item id={k++} title="Piso Tres" parent={this}>
            <Select id="_tipoPisoTres" parent={this} options={tipoPisos} prefix="Tipo" value={_tipoPisoTres}/>
            { (_tipoPisoTres === 'repeticion' || _tipoPisoTres === 'imagenes') && 
              <Select id="_repeticionPictoricaPisoTres" prefix="Tipo Rep" parent={this} options={opcionesTres} value={_repeticionPictoricaPisoTres} /> }
            <Input id="_umilPisoTres" prefix="u mil"  parent={this} value={_umilPisoTres} />
            <Input id="_centenaPisoTres" prefix="centenas"  parent={this} value={_centenaPisoTres} />
            <Input id="_decenaPisoTres" prefix="decenas"  parent={this} value={_decenaPisoTres} />
            <Input id="_unidadPisoTres" prefix="unidades"  parent={this} value={_unidadPisoTres} />
          </Item> }
        <Item id={k++} title="Valor Posicional Uno" parent={this}>
          <Select id="_dibujaValorPosicional1" prefix="Dibujar" parent={this} options={['si','no']} value={_dibujaValorPosicional1} />
          <Input id="_altoTextoValorPosicional1" prefix="Alto Texto"  parent={this} value={_altoTextoValorPosicional1} />
          <Input id="_umilVP1" prefix="u mil" parent={this} value={_umilVP1} />
          <Input id="_centenaVP1" prefix="centenas" parent={this} value={_centenaVP1} />
          <Input id="_decenaVP1" prefix="decenas" parent={this} value={_decenaVP1} />
          <Input id="_unidadVP1" prefix="unidades" parent={this} value={_unidadVP1} />
        </Item>
        <Item id={k++} title="Valor Posicional Uno" parent={this}>
          <Select id="_dibujaValorPosicional2" prefix="Dibujar" parent={this} options={['si','no']} value={_dibujaValorPosicional2} />
          <Input id="_altoTextoValorPosicional2" prefix="Alto Texto" parent={this} value={_altoTextoValorPosicional2} />
          <Input id="_umilVP2" prefix="u mil" parent={this} value={_umilVP2} />
          <Input id="_centenaVP2" prefix="centenas" parent={this} value={_centenaVP2} />
          <Input id="_decenaVP2" prefix="decenas" parent={this} value={_decenaVP2} />
          <Input id="_unidadVP2" prefix="unidades" parent={this} value={_unidadVP2} />
        </Item>
        <Item id={k++} title="Resultado" parent={this}>
          <Select id="_dibujaTextoResultado" prefix="Dibuja Texto" parent={this} options={['si', 'no']} value={_dibujaTextoResultado} />
          <Input id="_altoTextoResultado" prefix="Alto texto" parent={this} value={_altoTextoResultado} />
          <Input id="_resultado" prefix="Resultado" parent={this} value={_resultado} />
        </Item>
        { this.props.section === 'answers' && <Item id="k++" title="Valores Respuesta" parent={this}>
          <Input id="errFrec" prefix="Error Frecte." type="text" parent={this} value={this.state.errFrec} />
        </Item> }
        
      </Editor>
    );
  }
}