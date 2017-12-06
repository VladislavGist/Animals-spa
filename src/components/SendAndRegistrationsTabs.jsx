import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

import snackbar from '../actions/snackbar.jsx'
import { loginAction } from '../actions/login.jsx'
import { regAction } from '../actions/regAction.jsx'

import './SendAndRegistrationsTabs.sass'

class SendAndRegistrationsTabs extends Component {

	constructor(props) {
		super(props)
		this.state = {
			value: '0',
			slideIndex: 0
		}
	}

	handleChange = value => {
		this.setState({
			value: value,
		})
	}

	// функция валидации поля
	// аргументы: принимаемый элемент ввода, регулярное выражение, свойство состояния
	validate = (e, regexp, action) => {

		let el = e.target.value

		if (el.match(regexp)) {
			[action][0](true)

		} else if (el.length === 0) {
			[action][0](' ')

		} else {
			[action][0](false)
		}
	}

	// функция валидации password
	validatePassword = e => {
		let regexpName = /^[a-zA-Z0-9_-]{6,18}$/
		this.validate(e, regexpName, this.props.onValidatePassword)
	}

	// функция валидации инпута phoneNumber
	validateNumber = e => {
		let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
		this.validate(e, regexpName, this.props.onValidatePhoneNumber)
	}

	// кнопка отправить
	onHandleLogin = () => {

		const { sendData } = this.props.state
		const { loginTrue, onHandleSnackbar } = this.props

		// здесь будет запрос к серверу. если вернет true, то вызвать функцию loginTrue()
		if (sendData.login.password && sendData.login.phoneNumber) {

			let password = document.querySelector('input[name=password]').value,
				phoneNumber = document.querySelector('input[name=phoneNumber]').value

			loginTrue(`${ process.env.URL }/protected?password=${ password }&phone=${ phoneNumber }`)
		} else {
			// toolpit с ошибкой
			onHandleSnackbar('Заполните все поля')
		}
	}

	// reg name
	validateRegName = e => {
		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
		this.validate(e, regexpName, this.props.onValidateRegName)
	}

	// фамилия
	validateRegSurname = e => {
		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
		this.validate(e, regexpName, this.props.onValidateRegSurname)
	}

	// reg phoneNumber
	validateRegPhone = e => {
		let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
		this.validate(e, regexpName, this.props.onvalidateRegPhone)
	}

	// reg password
	validateRegPassword = e => {
		let regexpName = /^[a-zA-Z0-9_-]{6,18}$/
		this.password = e.target.value
		this.validate(e, regexpName, this.props.onRegValidatePassword)
	}

	// reg city
	validateRegCity = e => {
		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
		this.validate(e, regexpName, this.props.onValidateRegCity)
	}

	// reg email
	validateRegEmail = e => {
		let regexpName = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
		this.validate(e, regexpName, this.props.onValidateRegEmail)
	}

	// reg submit btn
	handleRegBtn = () => {

		const { sendData } = this.props.state
		const { onHandleReg, onHandleSnackbar } = this.props

		let name = sendData.registration.name,
			phoneNumber = sendData.registration.phoneNumber,
			surname = sendData.registration.surname,
			password = sendData.registration.password,
			city = sendData.registration.city,
			email = sendData.registration.email

		// если все поля true
		if (name === true && surname === true && phoneNumber === true && password === true && city === true && email === true) {

			// параметры
			let params = {
				inpName: document.querySelector('input[name=nameReg]').value,
				inpSurname: document.querySelector('input[name=surnameReg]').value,
				inpNumberReg: document.querySelector('input[name=phoneNumberReg]').value,
				inpPasswordReg: document.querySelector('input[name=passwordReg]').value,
				inpCityReg: document.querySelector('input[name=cityReg]').value,
				inpEmailReg: document.querySelector('input[name=emailReg]').value
			}

			// если все поля true, то зарегистрировать
			onHandleReg(`${process.env.URL}/registr`, params)

			//очистить инпуты
			document.querySelector('input[name=nameReg]').value = ''
			document.querySelector('input[name=surnameReg]').value = ''
			document.querySelector('input[name=phoneNumberReg]').value = ''
			document.querySelector('input[name=passwordReg]').value = ''
			document.querySelector('input[name=cityReg]').value = ''
			document.querySelector('input[name=emailReg]').value = ''
		} else {
			// toolpit с ошибкой
			onHandleSnackbar('Заполните все поля')
		}
	}

	componentWillUnmount() {
		this.props.onHandleRegStatusClear()
	}

	render() {

		const styles = {
			inkBarStyle: {
				backgroundColor: false
			},
			default_tab: {
				backgroundColor: 'white',
				color: '#add1ed',
				height: 'auto'
			},
			active_tab:{
				backgroundColor: '#2397f3',
				color: 'white'
			},
			tabItemContainerStyle: {
				minHeight: '100px'
			},
			tabTemplateStyle: {
				
			}
		}

		const { sendData, loginUser, regReducer } = this.props.state

		styles.tab = []
		styles.tab[0] = styles.default_tab
		styles.tab[1] = styles.default_tab
		styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[this.state.slideIndex], styles.active_tab)
		
		let handleActive = e => {
			this.setState({
				slideIndex: e.props.value
			})
		}

		return (
			<Tabs
				value={ this.state.value }
				onChange={ this.handleChange }
				className='sendAndRegTabs'
				inkBarStyle={ styles.inkBarStyle }
				contentContainerStyle={ styles.tabTemplateStyle }
			>

				<Tab label='Войти' value='0' className='tabBtn' style={ styles.tab[0] } onActive={ handleActive }>
					<div>
						<form id='sendForm'>
							<div className='wrapInputs'>
								<TextField
									className='inputField'
									type='tel'
									floatingLabelText='Номер телефона'
									name='phoneNumber'
									onChange={ this.validateNumber }
									errorText={ sendData.login.phoneNumber || sendData.login.phoneNumber === ' ' ? '' : ' ' }
								/>

								<TextField
									className='inputField'
									type='password'
									floatingLabelText='Пароль'
									name='password'
									onChange={ this.validatePassword }
									errorText={ sendData.login.password || sendData.login.password === ' ' ? '' : ' ' }
								/>
							</div>
							<div>
								{
									loginUser.error !== undefined ?
										<p className='loginFormErrMess'>
											{
												this.props.state.loginUser.error
											}
										</p> : null
								}
							</div>
							<div>
								<input type='button' value='Войти' className='button2' onClick={ this.onHandleLogin } />
							</div>
							
						</form>
					</div>
				</Tab>

				<Tab label='Регистрация' value='1' className='tabBtn' style={ styles.tab[1] } onActive={ handleActive }>
					<div>
						<form id='registrationForm'>
							<div className='wrapInputs'>

								<TextField
									className='inputField'
									type='text'
									floatingLabelText='Имя'
									name='nameReg'
									onChange={ this.validateRegName }
									errorText={ sendData.registration.name || sendData.registration.name === ' ' ? '' : ' ' }
								/>

								<TextField
									className='inputField'
									type='text'
									floatingLabelText='Фамилия'
									name='surnameReg'
									onChange={ this.validateRegSurname }
									errorText={ sendData.registration.surname || sendData.registration.surname === ' ' ? '' : ' ' }
								/>

								<TextField
									className='inputField'
									type='tel'
									floatingLabelText='Номер телефона'
									name='phoneNumberReg'
									onChange={ this.validateRegPhone }
									errorText={ sendData.registration.phoneNumber || sendData.registration.phoneNumber === ' ' ? '' : ' ' }
								/>

								<TextField
									className='inputField'
									type='password'
									floatingLabelText='Пароль'
									name='passwordReg'
									onChange={ this.validateRegPassword }
									errorText={ sendData.registration.password || sendData.registration.password === ' ' ? '' : ' ' }
								/>

								<TextField
									className='inputField'
									type='text'
									floatingLabelText='Город'
									name='cityReg'
									onChange={ this.validateRegCity }
									errorText={ sendData.registration.city || sendData.registration.city === ' ' ? '' : ' ' }
								/>

								<TextField
									className='inputField'
									type='text'
									floatingLabelText='Email'
									name='emailReg'
									onChange={ this.validateRegEmail }
									errorText={ sendData.registration.email || sendData.registration.email === ' ' ? '' : ' ' }
								/>
							
							</div>

							{
								regReducer !== '' ?
									<p className='codeInfo'>
										{ this.props.state.regReducer.message }
									</p> : null
							}

							<div>
								<input
									type='button'
									value='Зарегистрироваться'
									className='btnReg button2'
									onClick={ this.handleRegBtn }
								/>
							</div>
			
						</form>
					</div>
				</Tab>

			</Tabs>
		)
	}
}

export default connect(
	state => ({ state }),
	dispatch => ({
		onHandleSnackbar: data => {
			dispatch(snackbar(data))
		},
		loginTrue: url => {
			dispatch(loginAction(url))
		},
		onHandleReg: (url, param) => {
			dispatch(regAction(url, param))
		},
		onHandleRegStatusClear: () => {
			dispatch({ type: 'REG_STATUS_CLEAR' })
		},
		onValidatePassword: e => {
			dispatch({ type: 'VALIDATE_PASSWORD', payload: e })
		},
		onValidatePhoneNumber: e => {
			dispatch({ type: 'VALIDATE_PNUMBER', payload: e })
		},
		onValidateRegName: e => {
			dispatch({ type: 'VALIDATE_REG_NAME', payload: e })
		},
		onValidateRegSurname: e => {
			dispatch({ type: 'VALIDATE_REG_SURNAME', payload: e })
		},
		onvalidateRegPhone: e => {
			dispatch({ type: 'VALIDATE_REG_PHONENUMBER', payload: e })
		},
		onRegValidatePassword: e => {
			dispatch({ type: 'VALIDATE_REG_PASSWORD', payload: e })
		},
		onValidateRegCity: e => {
			dispatch({ type: 'VALIDATE_REG_CITY', payload: e })
		},
		onValidateRegEmail: e => {
			dispatch({ type: 'VALIDATE_REG_EMAIL', payload: e })
		}
	})
)(SendAndRegistrationsTabs)

// <div>
// 	<p>Регистрируясь вы соглашаетесь с <a href="/">политикой сайта</a></p>
// </div>