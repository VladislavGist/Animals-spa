import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import $ from "jquery";

//redux
import {connect} from "react-redux";

//actions
import {loginAction} from "../actions/login.jsx";
import {regAction} from "../actions/regAction.jsx";
import snackbar from "../actions/snackbar.jsx";

//components
import SnackbarExampleSimple from "./SnackbarExampleSimple.jsx";


//style
import "./SendAndRegistrationsTabs.sass";

const styles = {
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400
	},
};

class SendAndRegistrationsTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "0",
			slideIndex: 0
		};
	}

	handleChange = value => {
		this.setState({
			value: value,
		});
	}

	//функция валидации поля
	//аргументы: принимаемый элемент ввода, регулярное выражение, свойство состояния
	validate = (e, regexp, action) => {
		let el = e.target.value;

		if(el.match(regexp)) {
			[action][0](true);

		} else if(el.length === 0) {
			[action][0](" ");

		} else {
			[action][0](false);
		}
	}

	//функция валидации password
	validatePassword = e => {
		let regexpName = /^[a-zA-Z0-9_-]{6,18}$/;
		this.validate(e, regexpName, this.props.onValidatePassword);
	}

	//функция валидации инпута phoneNumber
	validateNumber = e => {
		let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		this.validate(e, regexpName, this.props.onValidatePhoneNumber);
	}

	//кнопка отправить
	onHandleLogin = (e) => {
		//здесь будет запрос к серверу. если вернет true, то вызвать функцию loginTrue()
		if(this.props.state.sendData.login.password === true && this.props.state.sendData.login.phoneNumber === true) {

			let password = document.querySelector("input[name=password]").value, phoneNumber = document.querySelector("input[name=phoneNumber]").value;

			this.props.loginTrue(`${process.env.URL}/protected?password=${password}&phone=${phoneNumber}`);
		} else {
			//toolpit с ошибкой
			this.props.onHandleSnackbar("Заполните все поля");
		}
	}

	//reg name
	validateRegName = e => {
		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
		this.validate(e, regexpName, this.props.onValidateRegName);
	}

	//фамилия
	validateRegSurname = e => {
		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
		this.validate(e, regexpName, this.props.onValidateRegSurname);
	}

	//reg phoneNumber
	validateRegPhone = e => {
		let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		this.validate(e, regexpName, this.props.onvalidateRegPhone);
	}

	//reg password
	validateRegPassword = e => {
		let regexpName = /^[a-zA-Z0-9_-]{6,18}$/;
		this.password = e.target.value;
		this.validate(e, regexpName, this.props.onRegValidatePassword);
	}

	//reg city
	validateRegCity = e => {
		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
		this.validate(e, regexpName, this.props.onValidateRegCity);
	}

	//reg email
	validateRegEmail = e => {
		let regexpName = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
		this.validate(e, regexpName, this.props.onValidateRegEmail);
	}

	//reg submit btn
	handleRegBtn = () => {
		let name = this.props.state.sendData.registration.name,
				phoneNumber = this.props.state.sendData.registration.phoneNumber,
				surname = this.props.state.sendData.registration.surname,
				password = this.props.state.sendData.registration.password,
				city = this.props.state.sendData.registration.city,
				email = this.props.state.sendData.registration.email;

		//если все поля true
		if(name === true && surname === true && phoneNumber === true && password === true && city === true && email === true) {
			//параметры
			let params = {
				inpName: document.querySelector("input[name=nameReg]").value,
				inpSurname: document.querySelector("input[name=surnameReg]").value,
				inpNumberReg: document.querySelector("input[name=phoneNumberReg]").value,
				inpPasswordReg: document.querySelector("input[name=passwordReg]").value,
				inpCityReg: document.querySelector("input[name=cityReg]").value,
				inpEmailReg: document.querySelector("input[name=emailReg]").value
			} 
			//если все поля true, то зарегистрировать
			this.props.onHandleReg(`${process.env.URL}/registr`, params);

			//очистить инпуты
			document.querySelector("input[name=nameReg]").value = "";
			document.querySelector("input[name=surnameReg]").value = "";
			document.querySelector("input[name=phoneNumberReg]").value = "";
			document.querySelector("input[name=passwordReg]").value = "";
			document.querySelector("input[name=cityReg]").value = "";
			document.querySelector("input[name=emailReg]").value = "";
		} else {
			//toolpit с ошибкой
			this.props.onHandleSnackbar("Заполните все поля");
		}
	}

	//handle code
	handleCode = () => {
		if(this.props.state.sendData.registration.code === true) {

			//запрос к серверу
			//если код верный, то
			if(5 > 4) {
				this.props.onCodeTrue();
				$(".codeBtn").addClass("offActiveCodeBtn");
				$(".codeBtn").click(function() {
					return false;
				})
				//а если нет
			} else {
				this.props.onCodeFalse();
			}
		}
	}

	componentWillUnmount() {
		this.props.onHandleRegStatusClear();
	}

	render() {

		const styles = {
			inkBarStyle: {
				backgroundColor: false
			},
			default_tab: {
				backgroundColor: "white",
				color: "#add1ed",
				height: "auto"
			},
			active_tab:{
				backgroundColor: "#2397f3",
				color: "white"
			},
			tabItemContainerStyle: {
				minHeight: "100px"
			},
			tabTemplateStyle: {
				
			}
		}

		styles.tab = [];
		styles.tab[0] = styles.default_tab;
		styles.tab[1] = styles.default_tab;
		styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[this.state.slideIndex], styles.active_tab);
		
		let handleActive = e => {
			this.setState({
				slideIndex: e.props.value
			});
		};

		return (
			<Tabs value={this.state.value} onChange={this.handleChange} className="sendAndRegTabs" inkBarStyle={styles.inkBarStyle} contentContainerStyle={styles.tabTemplateStyle}>

				<Tab label="Войти" value="0" className="tabBtn" style={styles.tab[0]} onActive={handleActive}>
					<div>
						<form id="sendForm">
							<div className="wrapInputs">
								<TextField
									className="inputField"
									type="tel" 
									floatingLabelText="Номер телефона" 
									name="phoneNumber" 
									onChange={this.validateNumber}
									errorText={this.props.state.sendData.login.phoneNumber === true || this.props.state.sendData.login.phoneNumber === " " ? "" : " "} 
								/>

								<TextField
									className="inputField"
									type="password"
									floatingLabelText="Пароль" 
									name="password" 
									onChange={this.validatePassword}
									errorText={this.props.state.sendData.login.password === true || this.props.state.sendData.login.password === " " ? "" : " "} 
								/>
							</div>
							<div>
								{
									 this.props.state.loginUser.error !== undefined ? <p className="loginFormErrMess">{this.props.state.loginUser.error}</p> : ""
								}
							</div>
							<div>
								<input type="button" value="Войти" className="button2" onClick={this.onHandleLogin} />
							</div>
							
						</form>
					</div>
				</Tab>

				<Tab label="Регистрация" value="1" className="tabBtn" style={styles.tab[1]} onActive={handleActive}>
					<div>
						<form id="registrationForm"> 
							<div className="wrapInputs">
								<TextField 
									className="inputField"
									type="text" 
									floatingLabelText="Имя" 
									name="nameReg"
									onChange={this.validateRegName}
									errorText={this.props.state.sendData.registration.name === true || this.props.state.sendData.registration.name === " " ? "" : " "} 
								/>

								<TextField 
									className="inputField"
									type="text" 
									floatingLabelText="Фамилия" 
									name="surnameReg"
									onChange={this.validateRegSurname}
									errorText={this.props.state.sendData.registration.surname === true || this.props.state.sendData.registration.surname === " " ? "" : " "} 
								/>

								<TextField
									className="inputField"
									type="tel"
									floatingLabelText="Номер телефона" 
									name="phoneNumberReg" 
									onChange={this.validateRegPhone}
									errorText={this.props.state.sendData.registration.phoneNumber === true || this.props.state.sendData.registration.phoneNumber === " " ? "" : " "} 
								/>

								<TextField 
									className="inputField"
									type="password" 
									floatingLabelText="Пароль" 
									name="passwordReg" 
									onChange={this.validateRegPassword}
									errorText={this.props.state.sendData.registration.password === true || this.props.state.sendData.registration.password === " " ? "" : " "} 
								/>

								<TextField 
									className="inputField"
									type="text" 
									floatingLabelText="Город" 
									name="cityReg" 
									onChange={this.validateRegCity}
									errorText={this.props.state.sendData.registration.city === true || this.props.state.sendData.registration.city === " " ? "" : " "} 
								/>

								<TextField 
									className="inputField"
									type="text" 
									floatingLabelText="Email" 
									name="emailReg"
									onChange={this.validateRegEmail}
									errorText={this.props.state.sendData.registration.email === true || this.props.state.sendData.registration.email === " " ? "" : " "} 
								/>
							
							</div>
							{ this.props.state.regReducer !== "" ? <p className="codeInfo">{this.props.state.regReducer.message}</p> : " " }
							<div>
								<input type="button" value="Зарегистрироваться" className="btnReg button2" onClick={this.handleRegBtn} />
							</div>
			
						</form>
					</div>
				</Tab>

			</Tabs>
		);
	}
}

export default connect(
	state => ({state: state}),
	dispatch => ({
		onHandleSnackbar: data => {
			dispatch(snackbar(data));
		},
		loginTrue: url => {
			dispatch(loginAction(url));
		},
		onHandleReg: (url, param) => {
			dispatch(regAction(url, param));
		},
		onHandleRegStatusClear: () => {
			dispatch({type: "REG_STATUS_CLEAR"});
		},
		onValidatePassword: e => {
			dispatch({type: "VALIDATE_PASSWORD", payload: e});
		},
		onValidatePhoneNumber: e => {
			dispatch({type: "VALIDATE_PNUMBER", payload: e});
		},
		onValidateRegName: e => {
			dispatch({type: "VALIDATE_REG_NAME", payload: e});
		},
		onValidateRegSurname: e => {
			dispatch({type: "VALIDATE_REG_SURNAME", payload: e});
		},
		onvalidateRegPhone: e => {
			dispatch({type: "VALIDATE_REG_PHONENUMBER", payload: e});
		},
		onRegValidatePassword: e => {
			dispatch({type: "VALIDATE_REG_PASSWORD", payload: e});
		},
		onValidateRegCity: e => {
			dispatch({type: "VALIDATE_REG_CITY", payload: e});
		},
		onValidateRegEmail: e => {
			dispatch({type: "VALIDATE_REG_EMAIL", payload: e});
		}
	}))(SendAndRegistrationsTabs);

// <div>
// 	<p>Регистрируясь вы соглашаетесь с <a href="/">политикой сайта</a></p>
// </div>