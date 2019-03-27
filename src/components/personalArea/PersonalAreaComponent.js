import React from 'react'

import AccountType from '../accountType/AccountType.js'
import PersonalDatasAccount from '../personalDatasAccount/PersonalDatasAccountComponent.js'

if (process.env.BROWSER) {
	require('./PersonalAreaStyles.sass')
}

const PersonalArea = () => <div className='personalArea'>
	<PersonalDatasAccount />
	{/* <AccountType /> */}
</div>

export default PersonalArea