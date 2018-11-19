import React from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'

export default class Recta extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,
      _altoCanvas: 400,
      _anchoCanvas: 900,
      _anchoReacta: 4,
      _largoLineasFlechas: 20,
      _posiciones: 10,
      _marcarPosiciones: 'inicial y final', //'todas', 'especificas'
      _altoPosiciones: 20,
      _ponerObjeto: 'si',
      _posicionObjeto: '',
      _tipoObjeto: 'cono',
      _leyenda: 'si',
      _proporcion: '0',
      _limite: '0',
      _dibujaFlechas: 'no',
      _escalaFlechas: 'principal',
      _dibujaFlechasHasta: '',
      _dibujaRango: 'no',
      _rangoCorchete: '0',
      _textoRango: '',
      _fraccion: '0'
    } : props.params;
  }
  componentDidUpdate() {
    acciones.recta({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    const {
      _altoCanvas,
      _anchoCanvas,
      _anchoReacta,
      _largoLineasFlechas,
      _posiciones,
      _marcarPosiciones,
      _altoPosiciones,
      _ponerObjeto,
      _posicionObjeto,
      _tipoObjeto,
      _leyenda,
      _proporcion,
      _limite,
      _dibujaFlechas,
      _escalaFlechas,
      _dibujaFlechasHasta,
      _dibujaRango,
      _rangoCorchete,
      _textoRango,
      _fraccion } = this.state;
    let k = 0, 
    marcarPosicionesOpc = ['no','inicial y final', 'todas', 'especificas', 'proporcional'],
    siNo = ['si', 'no'],
    escalas = ['principal', 'secundaria'],
    tipoObjetoOpc = ['cono'];
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="General" parent={this}>
          <Input id="_altoCanvas" type="text" prefix="Alto Canvas" parent={this} value={_altoCanvas} />
          <Input id="_anchoCanvas" type="text" prefix="Ancho Canvas" parent={this} value={_anchoCanvas} />
          <Input id="_anchoReacta" type="text" prefix="Ancho Reacta" parent={this} value={_anchoReacta} />
          <Input id="_largoLineasFlechas" type="text" prefix="Flechas" parent={this} value={_largoLineasFlechas} />
        </Item>
        <Item id={k++} title="Contenido" parent={this}>
          <Select id="_marcarPosiciones" prefix="Marcar Posiciones" options={marcarPosicionesOpc} parent={this} value={_marcarPosiciones}/>
          { _marcarPosiciones !== 'no' && <Input id="_posiciones" type="text" prefix="Posiciones" parent={this} value={_posiciones} /> }
          { _marcarPosiciones !== 'no' && <Input id="_altoPosiciones" type="text" prefix="Alto Posiciones" parent={this} value={_altoPosiciones} /> }
          { _marcarPosiciones === 'proporcional' && <Input id="_proporcion" type="text" prefix="Proporcion" parent={this} value={_proporcion} /> }
          { _marcarPosiciones === 'proporcional' && <Input id="_limite" type="text" prefix="Limite" parent={this} value={_limite} /> }
          <Select id="_ponerObjeto" prefix="Poner Objeto" options={siNo} parent={this} value={_ponerObjeto}/>
          { _ponerObjeto !== 'no' && <Input id="_posicionObjeto" type="text" prefix="Posicion Objeto" parent={this} value={_posicionObjeto} /> }
          { _ponerObjeto !== 'no' && <Select id="_tipoObjeto" type="text" prefix="Tipo Objeto" options={tipoObjetoOpc} parent={this} value={_tipoObjeto} /> }
          <Select id="_leyenda" prefix="Leyeda" options={siNo} parent={this} value={_leyenda}/>
          <Select id="_dibujaFlechas" type="text" prefix="Dibuja Flechas" options={siNo} parent={this} value={_dibujaFlechas} />
          { _dibujaFlechas !== 'no' && <Select id="_escalaFlechas" type="text" prefix="Escala" options={escalas} parent={this} value={_escalaFlechas} /> }
          { _dibujaFlechas !== 'no' && <Input id="_dibujaFlechasHasta" prefix="Limite Flechas" parent={this} value={_dibujaFlechasHasta} /> }
          <Select id="_dibujaRango" type="text" prefix="Dibuja Rango" options={siNo} parent={this} value={_dibujaRango} />
          { _dibujaRango !== 'no' && <Input id="_rangoCorchete" prefix="Rango Corchete" parent={this} value={_rangoCorchete} /> }
          { _dibujaRango !== 'no' && <Input id="_textoRango" prefix="Texto Rango" parent={this} value={_textoRango} /> }
          <Input id="_fraccion" type="text" prefix="FRACCION" parent={this} value={_fraccion} />
        </Item>
      </Editor>
    );
  }
}