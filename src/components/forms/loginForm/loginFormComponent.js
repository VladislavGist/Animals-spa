import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Field, reduxForm } from 'redux-form'

import { renderField, validate } from '../formValidate'

class LoginFormComponent extends Component {

	handleSubmit = event => {
		event.preventDefault()
	}

	render() {

		return (
			<Form onSubmit={ this.handleSubmit }>
				<Field
					name='username'
					type='file'
					label='username'
					component={ renderField }
				/>
				<button type='submit'>Send</button>
			</Form>
		)
	}
}

LoginFormComponent = reduxForm({
	form: 'newForm',
	validate
})(LoginFormComponent)

export default connect(state => ({ state }))(LoginFormComponent)
