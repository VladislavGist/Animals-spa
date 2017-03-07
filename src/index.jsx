import React from "react";
import ReactDOM from "react-dom";

//react-router
import {Router, Route, IndexRoute} from "react-router";

//components
import NotFound from "./components/NotFound.jsx";
import Home from "./components/Home.jsx";

import WrapAnimalCard from "./components/categories/WrapAnimalCard.jsx";
import AnimalCard from "./components/categories/AnimalCard.jsx";

import App from "./App.jsx";

//redux
import {Provider} from "react-redux";

//store
import {store, history} from "./components/store.jsx";

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/animals/:type/:advertisment" component={WrapAnimalCard}/>
			</Route>
			<Route path="*" component={NotFound} />
		</Router>
	</Provider>,
	document.getElementById("app")
);