import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App.js'
import configureStore from './store'

import Conf from './components/conf/ConfComponent'
import NotFound from './components/notFound/NotFoundComponent'
import Moderate from './components/moderate/ModerateComponent'
import PersonalArea from './components/personalArea/PersonalAreaComponent'
import AddCardFormComponent from './components/forms/addCardForm/AddCardFormComponent'
import ContactsForm from './components/forms/contactsForm/ContactsFormComponent'
import WrapPageCards from './components/cards/wrapPageCards/WrapPageCards'

import { moduleName } from '../src/ducks/auth'

const initialState = process.env.BROWSER ? window.__INITIAL_STATE__ : {}

export const store = configureStore(initialState)

const onEnterFunc = (nextState, replaceState) => !store.getState()[moduleName].user && replaceState('/')

export const routes = <Route component={ App } >
	<Route path='/' component={ WrapPageCards } />
	<Route path='/conf' component={ Conf } />
	<Route path='/contacts' component={ ContactsForm } />
	<Route path='/animals/:type/:advertisment' component={ WrapPageCards }/>
	<Route path='/moderation' component={ Moderate } onEnter={ onEnterFunc } />
	<Route path='/personalArea' component={ PersonalArea } onEnter={ onEnterFunc } />
	<Route path='/placeAnAd' component={ AddCardFormComponent } onEnter={ onEnterFunc } />
	<Route path='*' component={ NotFound } />
</Route>
