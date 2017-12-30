import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Field, reduxForm } from 'redux-form'

import { renderField, validate, normilizePhone } from '../formValidate'

class LoginFormComponent extends Component {

	handleLogin = event => {
		event.preventDefault()

		console.log('login')
		// const { } = this.props.state

		// получить данные из формы

		// проверка что все поля заполнены
		// отправка формы
		// вывод в тултип ошибку
	}

	render() {

		const { loginUser } = this.props.state

		return (
			<Form onSubmit={ this.handleLogin } className='sendForm'>
				<Field
					name='phoneNumber'
					type='tel'
					label='Номер телефона'
					normalize={ normilizePhone }
					component={ renderField }
				/>
				<Field
					name='password'
					type='password'
					label='Пароль'
					component={ renderField }
				/>

				<div>
					{ loginUser.error ?
						<p className='loginFormErrMess'>{ loginUser.error }</p>
						: null }
				</div>

				<div>
					<input
						type='submit'
						value='Войти'
						className='button2'
						onClick={ this.handleLogin }
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

export default connect(state => ({ state }))(LoginFormComponent)