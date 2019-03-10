import React from 'react'
import { Input, Item, Select, Editor/*, Switch*/ } from 'components' // Editor => '../../editor/index'
import * as acciones from 'actions'
import $ from 'actions'

export default class TablaPosicional extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.push ? { 
      active:0,_width:'500',_tipoTabla:'miles', /*puede ser 'centenas' o 'miles'*/_pisosTabla:'1', /*pueden ser 'uno', 'dos', 'tres'*/_separacionElementos:'20',_titulo:'',
_tipoPisoUno:'numerico',_repeticionPictoricaPisoUno:'',_mostrarNumeroCompletoUno:'no',_numeroCompletoPisoUno:'',_umilPisoUno:'0',_centenaPisoUno:'0',_decenaPisoUno:'0',_unidadPisoUno:'0',_altoTextoPisoUno:'0',
_altoImgMilesPisoUno:'0',_altoImgCentPisoUno:'0',_altoImgDecPisoUno:'0',_altoImgUniPisoUno:'0',//fin datos piso uno
_tipoPisoDos:'numerico',_repeticionPictoricaPisoDos:'',_mostrarNumeroCompletoDos:'no',_numeroCompletoPisoDos:'',_umilPisoDos:'0',_centenaPisoDos:'0',_decenaPisoDos:'0',_unidadPisoDos:'0',_altoTextoPisoDos:'0',
_altoImgMilesPisoDos:'0',_altoImgCentPisoDos:'0',_altoImgDecPisoDos:'0',_altoImgUniPisoDos:'0',//fin datos piso dos
_tipoPisoTres:'numerico',_repeticionPictoricaPisoTres:'',_mostrarNumeroCompletoTres:'no',_numeroCompletoPisoTres:'',_umilPisoTres:'0',_centenaPisoTres:'0',_decenaPisoTres:'0',_unidadPisoTres:'0',_altoTextoPisoTres:'0',
_altoImgMilesPisoTres:'0',_altoImgCentPisoTres:'0',_altoImgDecPisoTres:'0',_altoImgUniPisoTres:'0',//fin datos piso tres
_dibujaValorPosicional1:'no',_mostrarSignoMasVP1:'no',_altoTextoValorPosicional1:'30',_umilVP1:'0',_centenaVP1:'0',_decenaVP1:'0',_unidadVP1:'0',
_tipoUmilVP1:'texto',_tipoCentenaVP1:'texto',_tipoDecenaVP1:'texto',_tipoUnidadVP1:'texto',_altoumilvp1:'0',_altocentenavp1:'0',_altodecenavp1:'0',_altounidadvp1:'0',
_dibujaValorPosicional2:'no',_mostrarSignoMasVP2:'no',_altoTextoValorPosicional2:'30',_umilVP2:'0',_centenaVP2:'0',_decenaVP2:'0',_unidadVP2:'0',
_tipoUmilVP2:'texto',_tipoCentenaVP2:'texto',_tipoDecenaVP2:'texto',_tipoUnidadVP2:'texto',_altoumilvp2:'0',_altocentenavp2:'0',_altodecenavp2:'0',_altounidadvp2:'0',
_dibujaTextoResultado:'no',_altoTextoResultado:'0',_resultado:'',
errFrec: "", feed: ""} : props.params;
  }
  componentDidUpdate() {
    acciones.tablaPosicional({ container:$('container'), params:this.state, variables:this.props.variables, vt:true })
  }
  render() {
    const {
      _width,_tipoTabla,_pisosTabla,_separacionElementos,_titulo,
      //datos piso uno
      _tipoPisoUno,_repeticionPictoricaPisoUno,_mostrarNumeroCompletoUno,_numeroCompletoPisoUno,_umilPisoUno,_centenaPisoUno,_decenaPisoUno,_unidadPisoUno,_altoTextoPisoUno,
      _altoImgMilesPisoUno,_altoImgCentPisoUno,_altoImgDecPisoUno,_altoImgUniPisoUno,
      //datos piso dos
      _tipoPisoDos,_repeticionPictoricaPisoDos,_mostrarNumeroCompletoDos,_numeroCompletoPisoDos,_umilPisoDos,_centenaPisoDos,_decenaPisoDos,_unidadPisoDos,_altoTextoPisoDos,
      _altoImgMilesPisoDos,_altoImgCentPisoDos,_altoImgDecPisoDos,_altoImgUniPisoDos,
      //datos piso tres
      _tipoPisoTres,_repeticionPictoricaPisoTres,_mostrarNumeroCompletoTres,_numeroCompletoPisoTres,_umilPisoTres,_centenaPisoTres,_decenaPisoTres,_unidadPisoTres,_altoTextoPisoTres,
      _altoImgMilesPisoTres,_altoImgCentPisoTres,_altoImgDecPisoTres,_altoImgUniPisoTres,
      //datos valor posicional 1
      _dibujaValorPosicional1,_mostrarSignoMasVP1,_altoTextoValorPosicional1,_umilVP1,_centenaVP1,_decenaVP1,_unidadVP1,
      _tipoUmilVP1,_tipoCentenaVP1,_tipoDecenaVP1,_tipoUnidadVP1,_altoumilvp1,_altocentenavp1,_altodecenavp1,_altounidadvp1,
      //datos valor posicional 2
      _dibujaValorPosicional2,_mostrarSignoMasVP2,_altoTextoValorPosicional2,_umilVP2,_centenaVP2,_decenaVP2,_unidadVP2,
      _tipoUmilVP2,_tipoCentenaVP2,_tipoDecenaVP2,_tipoUnidadVP2,_altoumilvp2,_altocentenavp2,_altodecenavp2,_altounidadvp2,
      //datos resultado :D
      _dibujaTextoResultado,_altoTextoResultado,_resultado
    } = this.state;
    var tipoPisos = ['numerico' , 'imagenes', 'repeticion'];
    var opcionesUno = _tipoPisoUno === 'repeticion' ? ['bloques', 'monedas y billetes'] : ['pelotas', 'circulo y cuadrado'];
    var opcionesDos = _tipoPisoDos === 'repeticion' ? ['bloques', 'monedas y billetes'] : ['pelotas', 'circulo y cuadrado'];
    var opcionesTres = _tipoPisoTres === 'repeticion' ? ['bloques', 'monedas y billetes'] : ['pelotas', 'circulo y cuadrado'];
    let k = 0;
    const grid = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    let mostrarAltoTextoVP1 = _tipoUmilVP1 == 'texto' || _tipoCentenaVP1 == 'texto' || _tipoDecenaVP1 == 'texto' || _tipoUnidadVP1 == 'texto';
    let mostrarAltoTextoVP2 = _tipoUmilVP2 == 'texto' || _tipoCentenaVP2 == 'texto' || _tipoDecenaVP2 == 'texto' || _tipoUnidadVP2 == 'texto';
    return (
      <Editor params={this.state} store={this.props} parent={this}>
        <Item id={k++} title="Dimension" parent={this}>
          <Input id="_width" prefix="Ancho" parent={this} value={_width}/>
          <Select id="_tipoTabla" prefix="Tipo tabla" parent={this} options={['centenas','miles']} value={_tipoTabla}/>
          <Select id="_pisosTabla" prefix="Pisos Tabla" parent={this} options={['1','2','3']} value={_pisosTabla}/>
          <Input id="_separacionElementos" prefix="Separacion" parent={this} value={_separacionElementos}/>
          <Input id="_titulo" prefix="Titulo" parent={this} value={_titulo}/>
        </Item>
        <Item id={k++} title="Piso Uno" parent={this}>
          <Select id="_tipoPisoUno" parent={this} options={tipoPisos} prefix="Tipo" value={_tipoPisoUno}/>
          { (_tipoPisoUno === 'repeticion' || _tipoPisoUno === 'imagenes') && 
            <Select id="_repeticionPictoricaPisoUno" prefix="Tipo Rep" options={opcionesUno} parent={this} value={_repeticionPictoricaPisoUno} /> }
          <Select id="_mostrarNumeroCompletoUno" prefix="N Comp P1" options={['si','no']} parent={this} value={_mostrarNumeroCompletoUno} />
          { _mostrarNumeroCompletoUno === 'si' && <Input id="_numeroCompletoPisoUno" prefix="Numero P1" parent={this} value={_numeroCompletoPisoUno} /> }
          { _mostrarNumeroCompletoUno === 'no' && <Input id="_umilPisoUno" prefix="u mil" parent={this} value={_umilPisoUno} /> }
          { _mostrarNumeroCompletoUno === 'no' && <Input id="_centenaPisoUno" prefix="centenas" parent={this} value={_centenaPisoUno} /> }
          { _mostrarNumeroCompletoUno === 'no' && <Input id="_decenaPisoUno" prefix="decenas" parent={this} value={_decenaPisoUno} /> }
          { _mostrarNumeroCompletoUno === 'no' && <Input id="_unidadPisoUno" prefix="unidades" parent={this} value={_unidadPisoUno} /> }
          { _tipoPisoUno === 'numerico' && <Input id="_altoTextoPisoUno" prefix="Alto Texto" parent={this} value={_altoTextoPisoUno} />  }
          { _tipoPisoUno === 'repeticion' && <Input id="_altoImgMilesPisoUno" prefix="Alt.Img Mil" parent={this} value={_altoImgMilesPisoUno} /> }
          { _tipoPisoUno === 'repeticion' && <Input id="_altoImgCentPisoUno" prefix="Alt.Img Cent" parent={this} value={_altoImgCentPisoUno} /> }
          { _tipoPisoUno === 'repeticion' && <Input id="_altoImgDecPisoUno" prefix="Alt.Img Dec" parent={this} value={_altoImgDecPisoUno} /> }
          { _tipoPisoUno === 'repeticion' && <Input id="_altoImgUniPisoUno" prefix="Alt.Img Uni" parent={this} value={_altoImgUniPisoUno} /> }
        </Item> 
        {(_pisosTabla === '2' || _pisosTabla === '3') && 
          <Item id={k++} title="Piso Dos" parent={this}>
            <Select id="_tipoPisoDos" prefix="Tipo" options={tipoPisos} parent={this} value={_tipoPisoDos}/>
            { (_tipoPisoDos === 'repeticion' || _tipoPisoDos === 'imagenes') && 
              <Select id="_repeticionPictoricaPisoDos" prefix="Tipo Rep" parent={this} options={opcionesDos} value={_repeticionPictoricaPisoDos} /> }
            <Select id="_mostrarNumeroCompletoDos" prefix="N. Comp P2" options={['si','no']} parent={this} value={_mostrarNumeroCompletoDos} />
            { _mostrarNumeroCompletoDos === 'si' && <Input id="_numeroCompletoPisoDos" prefix="Numero P2" parent={this} value={_numeroCompletoPisoDos} /> }
            { _mostrarNumeroCompletoDos === 'no' && <Input id="_umilPisoDos" prefix="u mil" parent={this} value={_umilPisoDos} /> }
            { _mostrarNumeroCompletoDos === 'no' && <Input id="_centenaPisoDos" prefix="centenas"  parent={this} value={_centenaPisoDos} /> }
            { _mostrarNumeroCompletoDos === 'no' && <Input id="_decenaPisoDos" prefix="decenas"  parent={this} value={_decenaPisoDos} /> }
            { _mostrarNumeroCompletoDos === 'no' && <Input id="_unidadPisoDos" prefix="unidades"  parent={this} value={_unidadPisoDos} /> }
            { _tipoPisoDos === 'numerico' && <Input id="_altoTextoPisoDos" prefix="Alto Texto" parent={this} value={_altoTextoPisoDos} /> }
            { _tipoPisoDos === 'repeticion' && <Input id="_altoImgMilesPisoDos" prefix="Alt.Img Mil" parent={this} value={_altoImgMilesPisoDos} /> }
            { _tipoPisoDos === 'repeticion' && <Input id="_altoImgCentPisoDos" prefix="Alt.Img Cent" parent={this} value={_altoImgCentPisoDos} /> }
            { _tipoPisoDos === 'repeticion' && <Input id="_altoImgDecPisoDos" prefix="Alt.Img Dec" parent={this} value={_altoImgDecPisoDos} /> }
            { _tipoPisoDos === 'repeticion' && <Input id="_altoImgUniPisoDos" prefix="Alt.Img Uni" parent={this} value={_altoImgUniPisoDos} /> }
          </Item> }
        {_pisosTabla === '3' && 
          <Item id={k++} title="Piso Tres" parent={this}>
            <Select id="_tipoPisoTres" parent={this} options={tipoPisos} prefix="Tipo" value={_tipoPisoTres}/>
            { (_tipoPisoTres === 'repeticion' || _tipoPisoTres === 'imagenes') && 
              <Select id="_repeticionPictoricaPisoTres" prefix="Tipo Rep" parent={this} options={opcionesTres} value={_repeticionPictoricaPisoTres} /> }
            <Select id="_mostrarNumeroCompletoTres" prefix="N. Comp P3" options={['si','no']} parent={this} value={_mostrarNumeroCompletoTres} />
            { _mostrarNumeroCompletoTres === 'si' && <Input id="_numeroCompletoPisoTres" prefix="Numero P3" parent={this} value={_numeroCompletoPisoTres} /> }
            { _mostrarNumeroCompletoTres === 'no' && <Input id="_umilPisoTres" prefix="u mil"  parent={this} value={_umilPisoTres} /> }
            { _mostrarNumeroCompletoTres === 'no' && <Input id="_centenaPisoTres" prefix="centenas"  parent={this} value={_centenaPisoTres} /> }
            { _mostrarNumeroCompletoTres === 'no' && <Input id="_decenaPisoTres" prefix="decenas"  parent={this} value={_decenaPisoTres} /> }
            { _mostrarNumeroCompletoTres === 'no' && <Input id="_unidadPisoTres" prefix="unidades"  parent={this} value={_unidadPisoTres} /> }
            { _tipoPisoTres === 'numerico' && <Input id="_altoTextoPisoTres" prefix="Alto Texto" parent={this} value={_altoTextoPisoTres}/> }
            { _tipoPisoTres === 'repeticion' && <Input id="_altoImgMilesPisoTres" prefix="Alt.Img Mil" parent={this} value={_altoImgMilesPisoTres} /> }
            { _tipoPisoTres === 'repeticion' && <Input id="_altoImgCentPisoTres" prefix="Alt.Img Cent" parent={this} value={_altoImgCentPisoTres} /> }
            { _tipoPisoTres === 'repeticion' && <Input id="_altoImgDecPisoTres" prefix="Alt.Img Dec" parent={this} value={_altoImgDecPisoTres} /> }
            { _tipoPisoTres === 'repeticion' && <Input id="_altoImgUniPisoTres" prefix="Alt.Img Uni" parent={this} value={_altoImgUniPisoTres} /> }
          </Item> }
        <Item id={k++} title="Valor Posicional Uno" parent={this}>
          <Select id="_dibujaValorPosicional1" prefix="Dibujar" parent={this} options={['si','no']} value={_dibujaValorPosicional1} />
          <Select id="_mostrarSignoMasVP1" prefix="Signo mas" parent={this} options={['si','no']} value={_mostrarSignoMasVP1} />
          <Select id="_tipoUmilVP1" prefix="Tipo Umil" parent={this} options={['texto','imagen']} value={_tipoUmilVP1} />
          <Input id="_umilVP1" prefix="u mil" parent={this} value={_umilVP1} />
          { _tipoUmilVP1 === 'imagen' && <Input id="_altoumilvp1" prefix="alto u mil" parent={this} value={_altoumilvp1} /> }
          <Select id="_tipoCentenaVP1" prefix="Tipo Umil" parent={this} options={['texto','imagen']} value={_tipoCentenaVP1} />
          <Input id="_centenaVP1" prefix="centenas" parent={this} value={_centenaVP1} />
          { _tipoCentenaVP1 === 'imagen' && <Input id="_altocentenavp1" prefix="alto centena" parent={this} value={_altocentenavp1} /> }
          <Select id="_tipoDecenaVP1" prefix="Tipo Umil" parent={this} options={['texto','imagen']} value={_tipoDecenaVP1} />
          <Input id="_decenaVP1" prefix="decenas" parent={this} value={_decenaVP1} />
          { _tipoDecenaVP1 === 'imagen' && <Input id="_altodecenavp1" prefix="alto decena" parent={this} value={_altodecenavp1} /> }
          <Select id="_tipoUnidadVP1" prefix="Tipo Umil" parent={this} options={['texto','imagen']} value={_tipoUnidadVP1} />
          <Input id="_unidadVP1" prefix="unidades" parent={this} value={_unidadVP1} />
          { _tipoUnidadVP1 === 'imagen' && <Input id="_altounidadvp1" prefix="alto decena" parent={this} value={_altounidadvp1} /> }
          { mostrarAltoTextoVP1 && <Input id="_altoTextoValorPosicional1" prefix="Alto Texto"  parent={this} value={_altoTextoValorPosicional1} /> }
        </Item>
        <Item id={k++} title="Valor Posicional Dos" parent={this}>
        <Select id="_dibujaValorPosicional2" prefix="Dibujar" parent={this} options={['si','no']} value={_dibujaValorPosicional2} />
          <Select id="_mostrarSignoMasVP2" prefix="Signo mas" parent={this} options={['si','no']} value={_mostrarSignoMasVP2} />
          <Select id="_tipoUmilVP2" prefix="Tipo Umil" parent={this} options={['texto','imagen']} value={_tipoUmilVP2} />
          <Input id="_umilVP2" prefix="u mil" parent={this} value={_umilVP2} />
          { _tipoUmilVP2 === 'imagen' && <Input id="_altoumilvp2" prefix="alto u mil" parent={this} value={_altoumilvp2} /> }
          <Select id="_tipoCentenaVP2" prefix="Tipo Umil" parent={this} options={['texto','imagen']} value={_tipoCentenaVP2} />
          <Input id="_centenaVP2" prefix="centenas" parent={this} value={_centenaVP2} />
          { _tipoCentenaVP2 === 'imagen' && <Input id="_altocentenavp2" prefix="alto centena" parent={this} value={_altocentenavp2} /> }
          <Select id="_tipoDecenaVP2" prefix="Tipo Umil" parent={this} options={['texto','imagen']} value={_tipoDecenaVP2} />
          <Input id="_decenaVP2" prefix="decenas" parent={this} value={_decenaVP2} />
          { _tipoDecenaVP2 === 'imagen' && <Input id="_altodecenavp2" prefix="alto decena" parent={this} value={_altodecenavp2} /> }
          <Select id="_tipoUnidadVP2" prefix="Tipo Umil" parent={this} options={['texto','imagen']} value={_tipoUnidadVP2} />
          <Input id="_unidadVP2" prefix="unidades" parent={this} value={_unidadVP2} />
          { _tipoUnidadVP2 === 'imagen' && <Input id="_altounidadvp2" prefix="alto decena" parent={this} value={_altounidadvp2} /> }
          { mostrarAltoTextoVP2 && <Input id="_altoTextoValorPosicional2" prefix="Alto Texto"  parent={this} value={_altoTextoValorPosicional2} /> }
        </Item>
        <Item id={k++} title="Resultado" parent={this}>
          <Select id="_dibujaTextoResultado" prefix="Dibuja Texto" parent={this} options={['si', 'no']} value={_dibujaTextoResultado} />
          <Input id="_altoTextoResultado" prefix="Alto texto" parent={this} value={_altoTextoResultado} />
          <Input id="_resultado" prefix="Resultado" parent={this} value={_resultado} />
        </Item>
        { this.props.section === 'answers' && <Item id="k++" title="Valores Respuesta" parent={this}>
          <Input id="errFrec" prefix="Error Frecte." type="text" parent={this} value={this.state.errFrec} />
          <Input id="feed" prefix="Feedback" type="text" parent={this} value={this.state.feed} />
          <Select id="col" prefix="Ancho Mobil" parent={this} value={this.state.col} options={grid}/>
					<Select id="colsm" prefix="Ancho Tablet" parent={this} value={this.state.colsm} options={grid}/>
					<Select id="colmd" prefix="Ancho Escritorio" parent={this} value={this.state.colmd} options={grid}/>
        </Item> }
      </Editor>
    );
  }
}