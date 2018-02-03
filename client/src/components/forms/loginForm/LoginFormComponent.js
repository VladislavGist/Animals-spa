import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Form, Field, reduxForm } from 'redux-form'

import { actions as loginUserActions } from '../../../ducks/loginUser'

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
			values.username &&
			values.password.match(validateInputs.password) &&
			values.username.match(validateInputs.phoneNumber)) {
			this.setState({ disabledButton: false })
		} else {
			this.setState({ disabledButton: true })
		}
	}

	handleLogin = event => {
		event.preventDefault()
		const { loginForm: { values }, loginAction } = this.props
		loginAction(`${ process.env.URL_PATH }/api/protected?password=${ values.password }&phone=${ values.phoneNumber }`)
	}

	render() {
		return (
			<Form onSubmit={ this.handleLogin } className='sendForm'>
				<div className='wrapInputs'>
					<Field
						name='username'
						type='tel'
						label='Номер телефона'
						normalize={ normilizeNumber }
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
						value='Войти'
						className={ classNames({
							'button2': true,
							'disabledButton': this.state.disabledButton
						}) }
						disabled={ this.state.disabledButton }
					/>
				</div>
			</Form>
		)
	}
}

LoginFormComponent = reduxForm({
	form: 'loginForm',
	validate
})(LoginFormComponent)

export default connect(state => ({ state, loginForm: state.form.loginForm }),
	dispatch => bindActionCreators({ ...loginUserActions }, dispatch)
)(LoginFormComponent)