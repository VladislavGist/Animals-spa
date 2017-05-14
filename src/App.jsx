import React, {Component} from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import "./styles/styles.sass";
import "./styles/base.sass";
import "./App.sass";

import $ from "jquery";

//redux
import {connect} from "react-redux";

//my modules
import LinearProgressExampleDeterminate from "./components/ProgressBar.jsx";
import TopHeader from "./components/TopHeader.jsx";
import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import SnackbarExampleSimple from "./components/SnackbarExampleSimple.jsx";

class App extends Component {

	componentDidMount() {
		//запрет переворота объявление по клику на кнопку
		$(".button3").each((idx, elem) => {
			$(elem).click(function(e) {
				e.stopPropagation();
			});
		});
	}

	componentWillUpdate(data) {
		if(this.props.state.loginUser === false) {
			if(location.hash == "#/personalArea") {
				location.pathname = "/";
			}

			if(location.hash == "#/placeAnAd") {
				location.pathname = "/";
			}
		}
	}

	render() {
		return (
			<MuiThemeProvider>
				<div className="wrapApp">
					{this.props.state.preloader.loading > 0 &&  this.props.state.preloader.loading != 100 ? <LinearProgressExampleDeterminate className="progressBar" /> : ""}
					<div className="container">
						<TopHeader />
						<div className="wrapBackground">
							<div className="wrapper">
								<Menu />
								<div className={`spaContent ${location.hash == "#/personalArea" ? "modileModificator" : ""}`}>
									{this.props.children}
								</div>
							</div>
							<Footer />
						</div>
					</div>
					<SnackbarExampleSimple />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default connect(
	state => ({
		state: state
	}),
	dispatch => ({

	})
	)(App);