import React, { Component } from 'react'

if (process.env.BROWSER) {
	require('./ContactsStyles.sass')
}

export default class ContactsForm extends Component {
	render() {
		return (
			<div className='contacts'>
				<p className='conTitle'>
					По всем интересующим вас вопросам вы можете связаться с нами написав на email: studio_kseven@mail.ru
				</p>
			</div>
		)
	}
}
