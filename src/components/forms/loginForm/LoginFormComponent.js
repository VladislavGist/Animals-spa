import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Form, Field, reduxForm } from 'redux-form'

import { actions as authActions } from '../../../ducks/auth'

import { renderField, validate } from '../formValidate'
import { normilizeNumber, validateInputs } from '../validationsInputs'

class LoginFormComponent extends Component {

	state = { disabledButton: true }

	componentWillUpdate(nextProps) {
		if (nextProps !== this.props) {
			this.disabledSubmitButton(nextProps)
		}
	}

	disabledSubmitButton = nextProps => {

		const { loginForm: { values } } = nextProps

		if (values &&
			values.password &&
			values.email &&
			values.password.match(validateInputs.password) &&
			values.email.match(validateInputs.email)) {
			this.setState({ disabledButton: false })
		} else {
			this.setState({ disabledButton: true })
		}
	}

	handleLogin = event => {
		event.preventDefault()
		const { loginForm: { values }, loginAction } = this.props

		loginAction({ email: values.email, password: values.password })
	}

	render() {
		const { auth: { userLoading, userError } } = this.props

		return (
			<Form onSubmit={ this.handleLogin } className='sendForm'>
				<div className='wrapInputs'>
					<Field
						name='email'
						type='text'
						label='Email'
						component={ renderField }
					/>
					<Field
						name='password'
						type='password'
						label='Пароль'
						component={ renderField }
					/>
				</div>
				<div>
					<input
						type='submit'
						value={ userLoading && !userError ? 'Загрузка' : 'Войти' }
						className={ classNames({
							'button2': true,
							'disabledButton': this.state.disabledButton || (userLoading && !userError)
						}) }
						disabled={ this.state.disabledButton || (userLoading && !userError) }
					/>
				</div>
			</Form>
		)
	}
}

LoginFormComponent.propTypes = {
	loginForm: PropTypes.object,
	auth: PropTypes.object
}

LoginFormComponent = reduxForm({
	form: 'loginForm',
	validate
})(LoginFormComponent)

export default connect(state => ({
	loginForm: state.form.loginForm,
	auth: state.auth
}), { ...authActions })(LoginFormComponent)