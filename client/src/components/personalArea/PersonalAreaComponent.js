import React, { Component } from 'react'

import AccountType from '../accountType/AccountType.js'
import PersonalDatasAccount from '../personalDatasAccount/PersonalDatasAccountComponent.js'

if (process.env.BROWSER) {
	require('./PersonalAreaStyles.sass')
}

class PersonalArea extends Component {

	// componentWillReceiveProps(nextState) {
	// 	if (!nextState.state.loginUser) location.hash = '/'
	// }

	render() {
		return (
			<div className='personalArea'>
				<PersonalDatasAccount />
				<AccountType />
			</div>
		)
	}
}

export default PersonalArea