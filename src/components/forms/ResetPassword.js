import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Field, reduxForm } from 'redux-form'
import _ from 'lodash'

import { renderField, validate } from './formValidate'
import { validateInputs } from './validationsInputs'

import { actions as actionsAuthReducer } from '../../ducks/auth'

import config from '../../../config'

class ResetPassword extends Component {

	state = { disabledButton: true }

	componentWillUpdate(nextProps) {
		if (nextProps !== this.props) {
			this.disabledSubmitButton(nextProps)
		}
	}

	disabledSubmitButton = nextProps => {

		const { resetForm: { values } } = nextProps

		if (_.get(values, 'email') && values.email.match(validateInputs.email)) {
			this.setState({ disabledButton: false })
		} else {
			this.setState({ disabledButton: true })
		}
	}

	handleSubmitForm = event => {
		event.preventDefault()
		const { email, resetPassword } = this.props

		resetPassword(`${ config.payPetsApiUrl }/api/auth/resetPassword?email=${ email }`)
	}

	render() {
		const { disabledButton } = this.state

		return (
			<div>
				<h1>Сброс пароля</h1>
				<Form onSubmit={ this.handleSubmitForm } className='sendForm'>
					<div className='wrapInputs'>
						<Field
							name='email'
							type='text'
							label='Email Вашей учетной записи'
							component={ renderField }
						/>
					</div>
					<br />
					<div>
						<input
							type='submit'
							value={ 'Отправить' }
							className={ classNames({
								'button2': true,
								'disabledButton': disabledButton
							}) }
							disabled={ disabledButton }
						/>
					</div>
				</Form>
			</div>
		)
	}
}

ResetPassword = reduxForm({
	form: 'resetPasswordForm',
	validate
})(ResetPassword)

export default connect(state => {
	const { form } = state

	return {
		resetForm: form.resetPasswordForm,
		email: _.get(form, 'resetPasswordForm.values.email')
	}
}, {
	...actionsAuthReducer
})(ResetPassword)