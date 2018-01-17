import $ from 'jquery'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import AccountType from '../accountType/AccountType.js'
import PersonalDatasAccount from '../personalDatasAccount/PersonalDatasAccountComponent.js'

import './PersonalAreaStyles.sass'

class PersonalArea extends Component {

	componentDidMount() {
		$('.personalArea').parents('.spaContent').css({
			'background': 'none',
			'padding': '0',
			'height': '100%'
		})
	}

	componentWillReceiveProps(nextState) {
		if (!nextState.state.loginUser) {
			location.hash = '/'
		}
	}

	componentWillUnmount() {
		$('.personalArea').parents('.spaContent').css({
			'background': 'white',
			'padding': '47px 30px',
			'height': 'auto'
		})
	}

	render() {
		return (
			<div className='personalArea'>
				<PersonalDatasAccount />
				<AccountType />
			</div>
		)
	}
}

export default connect(state => ({ state }))(PersonalArea)