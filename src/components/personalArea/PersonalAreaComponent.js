import { connect } from 'react-redux'
import React, { Component } from 'react'

import AccountType from '../accountType/AccountType.js'
import PersonalDatasAccount from '../personalDatasAccount/PersonalDatasAccountComponent.js'

import './PersonalAreaStyles.sass'

class PersonalArea extends Component {

	componentWillReceiveProps(nextState) {
		if (!nextState.state.loginUser) {
			location.hash = '/'
		}
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