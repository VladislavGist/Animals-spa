import React, {Component} from "react";
import {Link} from "react-router";

import $ from "jquery";

//родительский блок плиток
import CardItems from "./CardItems.jsx";

//redux
import {connect} from "react-redux";

//store
import {store} from "../store.jsx";

//actions
import {getCards} from "../../actions/getCards.jsx";

class AnimalCard extends Component {

	componentDidMount() {

		//выводит объявлений на главной странице
		if(this.props.animal_type === undefined) {
			this.props.handleGetCards(process.env.URL + "/list-hot-adv/" + this.props.state.filterCity.cityTopHeader);
		} else {
			//выводит на остальных
			this.props.handleGetCards(process.env.URL + "/list-animals/animal_type/" + this.props.animal_type + "/advertisement_type/" + this.props.advertisment + "/city/" + this.props.state.filterCity.cityTopHeader + "/count/10");
		}
	}

	render() {
		return (
			<div>
				<CardItems datas={this.props.state.serverReducer.advertisementList} />
			</div>
		);
	}
}

export default connect(state => ({
		state: state
	}),
	dispatch => ({
		handleUpdateStateLoading: e => {
			dispatch({type: "UPDATE_LOADING", payload: e});
		},
		handleGetCards: url => {
			dispatch(getCards(url));
		}
	}))(AnimalCard);