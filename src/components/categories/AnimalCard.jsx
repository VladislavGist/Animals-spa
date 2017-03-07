import React, {Component} from "react";
import {Link} from "react-router";

import $ from "jquery";

//родительский блок плиток
import CardItems from "./CardItems.jsx";

//redux
import {connect} from "react-redux";

//store
import {store} from "../store.jsx";

class AnimalCard extends Component {
	componentDidMount() {
		$.ajax({
			url: "http://localhost:8091/list-animals?animal_type=" + this.props.animal_type + "&advertisement_type=" + this.props.advertisment,
			dataType: "json",
			success: data => {
				this.props.getServerData(data);
			}
		});
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
		getServerData: e => {
			dispatch({type: "GET_DATA_SERVER", payload: e});
		}
	}))(AnimalCard);