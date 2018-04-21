import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import history from './history'
import { routes, store } from './routing'

const hist = syncHistoryWithStore(history, store)

ReactDOM.render(<Provider store={ store }>
	<Router history={ hist } >{ routes }</Router>
</Provider>, document.getElementById('app'))