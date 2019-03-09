import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Field, reduxForm } from 'redux-form'
import _ from 'lodash'

import { renderField, validate } from './formValidate'
import { validateInputs } from './validationsInputs'

import { actions as actionsAuthReducer } from '../../ducks/auth'

import config from '../../../config'

class AddNewPassword extends Component {

	state = { disabledButton: true }

	componentWillUpdate(nextProps) {
		if (nextProps !== this.props) {
			this.disabledSubmitButton(nextProps)
		}
	}

	disabledSubmitButton = nextProps => {

		const { addNewPasswordForm: { values } } = nextProps

		if (_.get(values, 'password') && values.password.match(validateInputs.password)) {
			this.setState({ disabledButton: false })
		} else {
			this.setState({ disabledButton: true })
		}
	}

	handleSubmitForm = event => {
		event.preventDefault()
		const { password, addNewPassword, token } = this.props

		addNewPassword({
			url: `${ config.payPetsApiUrl }/api/auth/addNewPassword`,
			password,
			token
		})
	}

	render() {
		const { disabledButton } = this.state

		return (
			<div>
				<h1>Сброс пароля</h1>
				<Form onSubmit={ this.handleSubmitForm } className='sendForm'>
					<div className='wrapInputs'>
						<Field
							name='password'
							type='password'
							label='Введите новый пароль'
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

AddNewPassword = reduxForm({
	form: 'addNewPasswordForm',
	validate
})(AddNewPassword)

export default connect((state, other) => {
	const { form } = state

	return {
		addNewPasswordForm: form.addNewPasswordForm,
		password: _.get(form, 'addNewPasswordForm.values.password'),
		token: _.get(other, 'params.token')
	}
}, {
	...actionsAuthReducer
})(AddNewPassword)