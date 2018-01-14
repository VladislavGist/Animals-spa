import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App.js'
import { store, history } from './store'
import Conf from './components/conf/ConfComponent.js'
import NotFound from './components/notFound/NotFoundComponent.js'
import Moderate from './components/moderate/ModerateComponent.js'
import Contacts from './components/contacts/ContactsComponent.js'
// import PlaceAnAd from './components/placeAnAd/PlaceAnAdComponent.js'
import AddCardFormComponent from './components/forms/addCardForm/AddCardFormComponent'
import PersonalArea from './components/personalArea/PersonalAreaComponent.js'
import WrapAnimalCard from './components/categories/wrapAnimalCard/WrapAnimalCardComponent.js'

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
				<Route path='/contacts' component={ Contacts } />
				<Route path='/conf' component={ Conf } />
			</Route>
			<Route path='*' component={ NotFound } />
		</Router>
	</Provider>,
	document.getElementById('app')
)