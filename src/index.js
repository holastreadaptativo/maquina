import 'core-js/fn/object/assign'
import 'styles/app.less'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import * as components from 'components'
import $ from 'actions'

render(
	<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
        <Route path="/" component={components.App}>
            <IndexRoute component={components.Buscador}/>
            <Route path="/design" component={components.OnePage}/>
        	<Route path="/signin" component={components.SignIn}/>
        	<Route path="/config" component={components.Config}/>
        </Route>
    </Router>
, $('app'))