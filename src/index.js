import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App.js'
import { store, history } from './store'
import Conf from './components/conf/ConfComponent'
import NotFound from './components/notFound/NotFoundComponent'
import Moderate from './components/moderate/ModerateComponent'
import PersonalArea from './components/personalArea/PersonalAreaComponent'
import AddCardFormComponent from './components/forms/addCardForm/AddCardFormComponent'
import ContactsFormComponent from './components/forms/contactsForm/ContactsFormComponent'
import WrapAnimalCard from './components/categories/wrapAnimalCard/WrapAnimalCardComponent'

const onEnterFunc = (nextState, replaceState) => {
	if (!store.getState().loginUser || store.getState().loginUser.error) replaceState('/')
}

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ history }>
			<Route path='/' component={ App }>
				<Route path='/conf' component={ Conf } />
				<IndexRoute component={ WrapAnimalCard } />
				<Route path='/contacts' component={ ContactsFormComponent } />
				<Route path='/animals/:type/:advertisment' component={ WrapAnimalCard }/>
				<Route path='/moderation' component={ Moderate } onEnter={ onEnterFunc } />
				<Route path='/personalArea' component={ PersonalArea } onEnter={ onEnterFunc } />
				<Route path='/placeAnAd' component={ AddCardFormComponent } onEnter={ onEnterFunc } />
			</Route>
			<Route path='*' component={ NotFound } />
		</Router>
	</Provider>,
	document.getElementById('app')
)