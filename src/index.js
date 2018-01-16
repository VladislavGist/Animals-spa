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
	if (store.getState().loginUser === false || store.getState().loginUser.results[0].error !== undefined) {
		replaceState('/')
	}
}

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ history }>
			<Route path='/' component={ App }>
				<IndexRoute component={ WrapAnimalCard } />
				<Route path='/animals/:type/:advertisment' component={ WrapAnimalCard }/>
				<Route path='/personalArea' component={ PersonalArea } onEnter={ onEnterFunc } />
				<Route path='/moderation' component={ Moderate } onEnter={ onEnterFunc } />
				<Route path='/placeAnAd' component={ AddCardFormComponent } onEnter={ onEnterFunc } />
				<Route path='/contacts' component={ ContactsFormComponent } />
				<Route path='/conf' component={ Conf } />
			</Route>
			<Route path='*' component={ NotFound } />
		</Router>
	</Provider>,
	document.getElementById('app')
)