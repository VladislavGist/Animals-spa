import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

import combineReducers from '../reducers/index.jsx'

export const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(routerMiddleware(hashHistory), thunk)))
export const history = syncHistoryWithStore(hashHistory, store)