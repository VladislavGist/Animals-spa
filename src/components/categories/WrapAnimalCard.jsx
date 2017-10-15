import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

//родительский блок плиток
import AnimalCard from "./AnimalCard.jsx";

class WrapAnimalCard extends Component {
	constructor() {
		super();
		this.animal_type;
		this.advertisment;
	}

	componentWillUnmount() {
		this.props.onHandleClearState();
	}

	render() {
		this.animal_type = this.props.params.type;
		this.advertisment = this.props.params.advertisment;

		return (
			<div>
				<AnimalCard key={this.props.params.advertisment} animal_type={this.animal_type} advertisment={this.advertisment} />
			</div>
		);
	}
}

export default connect(
	state => ({
		state: state
	}),
	dispatch => ({
		onHandleClearState: () => {
			dispatch({type: "CLEAR_STATE", payload: {advertisementList: []}})
		},
	})
)(WrapAnimalCard);