import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import combineReducers from '../reducers/index.jsx'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(routerMiddleware(hashHistory), thunk)))
export const history = syncHistoryWithStore(hashHistory, store)