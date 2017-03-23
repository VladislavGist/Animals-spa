import React, {Component} from "react";
import {connect} from "react-redux";
import $ from "jquery";

import "./PersonalArea.sass";

//components
import PersonalDatasAccount from "./PersonalDatasAccount.jsx";
import AccountType from "./AccountType.jsx";

class PersonalArea extends Component {

	componentDidMount() {
		$(".personalArea").parents(".spaContent").css({
			"background": "none",
			"padding": "0",
			"height": "100%"
		});

	}

	componentWillUnmount() {
		$(".personalArea").parents(".spaContent").css({
			"background": "white",
			"padding": "47px 30px",
			"height": "auto"
		});


	}

	render() {
		return (
			<div className="personalArea">
				<PersonalDatasAccount />
				<AccountType />
			</div>
		)
	}
}

export default connect(
	state => ({
		state: state
	}),
	dispatch => ({
		
	})
)(PersonalArea);