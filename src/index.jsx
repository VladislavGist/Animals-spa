import React from "react";
import ReactDOM from "react-dom";

//react-router
import {Router, Route, IndexRoute} from "react-router";

//components
import NotFound from "./components/NotFound.jsx";
import PersonalArea from "./components/PersonalArea.jsx";
import WrapAnimalCard from "./components/categories/WrapAnimalCard.jsx";
import AnimalCard from "./components/categories/AnimalCard.jsx";
import PlaceAnAd from "./components/PlaceAnAd.jsx";

import App from "./App.jsx";

//redux
import {Provider} from "react-redux";

//store
import {store, history} from "./components/store.jsx";

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={WrapAnimalCard} />
				<Route path="/animals/:type/:advertisment" component={WrapAnimalCard}/>
				<Route path="/personalArea" component={PersonalArea} />
				<Route path="/placeAnAd" component={PlaceAnAd} />
			</Route>
			<Route path="*" component={NotFound} />
		</Router>
	</Provider>,
	document.getElementById("app")
);