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
			"margin-top": "0",
			"padding": "0",
			"height": "100%"
		});

		//скрыть меню на этой странице
		$(".menu, .moreInfo").css({
			"display": "none"
		});
	}

	componentWillUnmount() {
		$(".personalArea").parents(".spaContent").css({
			"background": "white",
			"margin-top": "30px",
			"padding": "47px 30px",
			"height": "auto"
		});

		$(".menu, .moreInfo").css({
			"display": "flex"
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