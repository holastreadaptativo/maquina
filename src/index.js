import 'core-js/fn/object/assign'
import 'styles/app.less'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import * as k from 'components'
import $ from 'actions'

render(
	<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
        <Route path="/" component={k.App}>
            <IndexRoute component={k.Buscador}/>
            <Route path="/variables" component={k.Variables}/>
            <Route path="/ejercicios" component={k.Ejercicios}/>
            <Route path="/respuestas" component={k.Respuestas}/>
            <Route path="/glosa" component={k.Glosa}/>
            <Route path="/versiones" component={k.Versiones}/>
            <Route path="/descargas" component={k.Descargas}/>
            <Route path="/configuracion" component={k.Config}/>
        </Route>
    </Router>
, $('app'))