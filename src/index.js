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
            <Route path="/ejercicio" component={k.OnePage}/>
        </Route>
    </Router>
, $('app'))