import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import {connect} from "react-redux";
import $ from "jquery";

import "./PersonalArea.sass";

//store
import {store} from "./store.jsx";

//Блок с плитками
import CardItem from "./categories/CardItem.jsx";

import "./categories/CardItems.sass";

class PersonalDatasAccount extends Component {
	constructor() {
		super();
		this.state = {
			value: "0",
			slideIndex: 0
		};
		this.subs;
		this.elem = store.getState().userPersonalDatas;
	}

	handleChange = value => {
		this.setState({
			value: value,
		});
	}

	componentDidMount() {
		//отображение доп. полей по клику на "изменить"
		$(".toggleBtn").click(function() {
			$(this).parent().parent().next().toggleClass("active");
			$(this).parent().parent().next().slideToggle(0);

			if($(this).parent().parent().next()[0].className === "trToggle active") {
				$(this).text("Отменить");
			} else {
				$(this).text("Изменить");
			}
		});

		//подписался на определенную часть store
		//this.subs = store.subscribe(() => {
			//если новая часть Store не равна предыдущей, то выполнить код
			//if(store.getState().userPersonalDatas !== this.elem) {
				//фильтрация до 80 символа
				let el = $(".bottom .subTitle");
				for(let i = 0; i < el.length; i++) {
					let j = el[i].textContent.substring(0, 80);
					el[i].textContent = j;
				}

				//условие добавления многоточия
				el.each((idx, elem) => {
					if(elem.textContent.length >= 80) {
						elem.textContent += " ...";
					}
				});

				//reverse объявлений
				$(".cardItem").on("click", function() {
					//переключил класс
					$(this).toggleClass("verticalRotate");
					//отменил обработчики click для элемента
					$(this).off("click");
				});

				//нажал на кнопку reverse
				$(".btnReverse").on("click", function(e) {
					//перевернул card
					$(this).parents(".cardItem").removeClass("verticalRotate");
					//запретил всплытие событий (срабатывание событий на следующем уровне)
					e.stopPropagation();

					//назначил обработчик
					$(this).parents(".cardItem").on("click", function() {
						$(this).toggleClass("verticalRotate");
						$(this).off("click");
					});
				});

				//редактирование статусов category
				$(".categoty").each((idx, elem) => {
					switch($(elem).text()) {
						case "buy":
							$(elem).text("Продажа");
							break;
						case "sale":
							$(elem).text("Продать");
							break;
						case "gift":
							$(elem).text("Даром");
							break;
						case "missing":
							$(elem).text("Пропало животное");
							break;
						case "find":
							$(elem).text("Найдено животное");
							break;
						default:
							$(elem).text("");
					}
				});

				//иконки статусов
				$(".info .fa").each((idx, elem) => {
					switch($(elem).next().text()) {
						case "Продажа":
							$(elem).addClass("fa-eur");
							break;
						case "Продать":
							$(elem).addClass("fa-eur");
							break;
						case "Даром":
							$(elem).addClass("fa-globe");
							break;
						case "Пропало животное":
							$(elem).addClass("fa-exclamation-triangle");
							break;
						case "Найдено животное":
							$(elem).addClass("fa-bell-o");
							break;
						default:
							$(elem).addClass("");
					}
				});
				//сохранил текущую часть Store чтобы карточки корректно работали 
				//this.elem = store.getState().userPersonalDatas;

		//});
	}

	componentWillUnmount() {
		//this.subs();
		this.props.handleDataSentFalse();
	}

	//отправка данных на сервер
	onHandlePOSTName = () => {
		//если данные прошли валидацию, то разрешить передачу
		if(this.props.state.userPersonalDatas.validateRoles.name === true) {
			//отправка данных

			//скрыть сообщение об успешной отправке
			this.props.handleDataSentFalse();
			//показать сообщение об успешной отправке
			this.props.handleDataSentTrue();
		}
	}

	onHandlePOSTPhoneNumber = () => {
		if(this.props.state.userPersonalDatas.validateRoles.phoneNumber === true) {
			//отправка данных

			//скрыть сообщение об успешной отправке
			this.props.handleDataSentFalse();
			//показать сообщение об успешной отправке
			this.props.handleDataSentTrue();
		}
	}

	onHandlePOSTPhoneCity = () => {
		if(this.props.state.userPersonalDatas.validateRoles.city === true) {
			//отправка данных

			//скрыть сообщение об успешной отправке
			this.props.handleDataSentFalse();
			//показать сообщение об успешной отправке
			this.props.handleDataSentTrue();
		}
	}

	onHandlePOSTPhonePassword = () => {
		if(this.props.state.userPersonalDatas.validateRoles.password === true) {
			//отправка данных

			//скрыть сообщение об успешной отправке
			this.props.handleDataSentFalse();
			//показать сообщение об успешной отправке
			this.props.handleDataSentTrue();
		}
	}

	//validate function
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

	//name validate
	validateName = e => {
		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
		this.validate(e, regexpName, this.props.validateNameDispatch);

		//скрыть сообщение об успешной отправке
		this.props.handleDataSentFalse();
	}

	//phone number validate
	validatePhoneNumber = e => {
		let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		this.validate(e, regexpName, this.props.validatePhoneDispatch);

		//скрыть сообщение об успешной отправке
		this.props.handleDataSentFalse();
	}

	//city validate
	validateCity = e => {
		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
		this.validate(e, regexpName, this.props.validateCityDispatch);

		//скрыть сообщение об успешной отправке
		this.props.handleDataSentFalse();
	}

	//password validate
	validatePassword = e => {
		let regexpName = /^[a-z0-9_-]{6,18}$/;
		this.validate(e, regexpName, this.props.validatePasswordDispatch);

		//скрыть сообщение об успешной отправке
		this.props.handleDataSentFalse();
	}

	//sent message
	sentMessage = () => {
		return (
			<div className="sentMessage">
				<i className="fa fa-check" aria-hidden="true"></i>
				<p>Данные успешно изменены</p>
			</div>
		)
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
			<div className="personalDatasAccount">
				<div>
					<div className="titleBlock">
						<p>Персональные данные</p>
						{this.props.state.userPersonalDatas.dataSent === true ? this.sentMessage() : ""}
					</div>
					<table>
						<tbody>
							<tr>
								<tr>
									<td>Имя</td>
									<td>{this.props.state.loginUser.results[0].name || ""}</td>
									<td><a href="javascript:void(0)" className="toggleBtn">Изменить</a></td>
								</tr>
								<tr className="trToggle">
									<td>
										<TextField 
											hintText="Введите новое имя"
											onChange={this.validateName}
											errorText={this.props.state.userPersonalDatas.validateRoles.name === true || this.props.state.userPersonalDatas.validateRoles.name === " " ? "" : " "} 
											/>
										</td>
									<td><a href="javascript:void(0)" onClick={this.onHandlePOSTName}>Применить</a></td>
								</tr>
							</tr>
							<tr>
								<tr>
									<td>Номер телефона</td>
									<td>{this.props.state.loginUser.results[0].phoneNumber || ""}</td>
									<td><a href="javascript:void(0)" className="toggleBtn">Изменить</a></td>
								</tr>
								<tr className="trToggle">
									<td>
										<TextField 
											hintText="Введите новый номер"
											onChange={this.validatePhoneNumber}
											errorText={this.props.state.userPersonalDatas.validateRoles.phoneNumber === true || this.props.state.userPersonalDatas.validateRoles.phoneNumber === " " ? "" : " "} 
										/>
									</td>
									<td><a href="javascript:void(0)" onClick={this.onHandlePOSTPhoneNumber}>Применить</a></td>
								</tr>
							</tr>
							<tr>
								<tr>
									<td>Город</td>
									<td>{this.props.state.loginUser.results[0].city || ""}</td>
									<td><a href="javascript:void(0)" className="toggleBtn">Изменить</a></td>
								</tr>
								<tr className="trToggle">
									<td>
										<TextField 
											hintText="Введите название города"
											onChange={this.validateCity}
											errorText={this.props.state.userPersonalDatas.validateRoles.city === true || this.props.state.userPersonalDatas.validateRoles.city === " " ? "" : " "} 
										/>
									</td>
									<td><a href="javascript:void(0)" onClick={this.onHandlePOSTPhoneCity}>Применить</a></td>
								</tr>
							</tr>
							<tr>
								<tr>
									<td>Пароль</td>
									<td>{this.props.state.userPersonalDatas.password}</td>
									<td><a href="javascript:void(0)" className="toggleBtn">Изменить</a></td>
								</tr>
								<tr className="trToggle">
									<td>
										<TextField 
											hintText="Введите новый пароль"
											onChange={this.validatePassword}
											errorText={this.props.state.userPersonalDatas.validateRoles.password === true || this.props.state.userPersonalDatas.validateRoles.password === " " ? "" : " "} 
										/>
									</td>
									<td><a href="javascript:void(0)" onClick={this.onHandlePOSTPhonePassword}>Применить</a></td>
								</tr>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="tabsBlock">
					<p>Мои объявления</p>
					<Tabs value={this.state.value} onChange={this.handleChange} className="sendAndRegTabs" inkBarStyle={styles.inkBarStyle} contentContainerStyle={styles.tabTemplateStyle}>

						<Tab label={`Активные ${this.props.state.userPersonalDatas.cards.active.length}`} value="0" className="tabBtn" style={styles.tab[0]} onActive={handleActive}>
							<div>
								{
									this.props.state.userPersonalDatas.cards.active.length > 0 ?
									this.props.state.userPersonalDatas.cards.active.map((elem, idx) => {
										return (
											<CardItem 
												key={elem.id} 
												id={elem.id}
												title={elem.title} 
												briefDescription={elem.briefDescription}
												city={elem.city}
												userName={elem.userName}
												userStatus={elem.userStatus}
												phoneNumber={elem.phoneNumber}
												rating={elem.rating}
												price={elem.price}
												imgPath={elem.imgPath}
												advType={elem.advType}
												deleted={true}
											/>
										);
									}) : <p>Активных объявлений нет</p>
								}
							</div>
						</Tab>

						<Tab label={`Завершенные ${this.props.state.userPersonalDatas.cards.completed.length}`} value="1" className="tabBtn" style={styles.tab[1]} onActive={handleActive}>
							<div>
								{
									this.props.state.userPersonalDatas.cards.completed.length > 0 ?
									this.props.state.userPersonalDatas.cards.completed.map((elem, idx) => {
										return (
											<CardItem 
												key={elem.id} 
												id={elem.id}
												title={elem.title} 
												briefDescription={elem.briefDescription}
												city={elem.city}
												userName={elem.userName}
												userStatus={elem.userStatus}
												phoneNumber={elem.phoneNumber}
												rating={elem.rating}
												price={elem.price}
												imgPath={elem.imgPath}
												advType={elem.advType}
												deleted={true}
											/>
										);
									}) : <p>Завершенных объявлений нет</p>
								}
							</div>
						</Tab>

					</Tabs>
				</div>
			</div>
		);
	}
}

//страница загрузилась
/*
данные пришли
положили их в store
прошлись по ним циклом
вывели на клиенте
*/

export default connect(
	state => ({
		state: state
	}),
	dispatch => ({
		validateNameDispatch: e => {
			dispatch({type: "VALIDATE_NAME_USERDATA", payload: e});
		},
		validatePhoneDispatch: e => {
			dispatch({type: "VALIDATE_PHONENUMBER_USERDATA", payload: e});
		},
		validateCityDispatch: e => {
			dispatch({type: "VALIDATE_CITY_USERDATA", payload: e});
		},
		validatePasswordDispatch: e => {
			dispatch({type: "VALIDATE_PASSWORD_USERDATA", payload: e});
		},
		handleDataSentTrue: () => {
			dispatch({type: "DATASENT_TRUE", payload: true});
		},
		handleDataSentFalse: () => {
			dispatch({type: "DATASENT_FALSE", payload: false});
		}
	})
)(PersonalDatasAccount);