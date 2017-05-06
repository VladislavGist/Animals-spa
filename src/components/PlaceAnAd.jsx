import React, {Component} from "react";
import $ from "jquery";
import {connect} from "react-redux";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import moment from "moment";

//libs
let _ = require("underscore");

//actions
import {placeAnAdCard} from "../actions/placeAnAdCard.jsx";
import {postImagesCard} from "../actions/postImagesCard.jsx";

//store
import {store} from "./store.jsx";

//styles
import "./PlaceAnAd.sass";

class PlaceAnAd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animal: {
				value: "cat"
			},
			category: {
				value: "buy"
			},
			city: {
				value: "Москва"
			}
		};
		this.timer0;
		this.timer1;
		this.timer2;
		this.timer3;
		this.timer4;
		this.thisFormData;
		this.myTimer;
	}

	//оптимизировать код ниже возможности нет по причине того, что чтобы увидеть было ли загружено изображение нужен таймер
	componentDidMount() {

		this.timer0 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[0].value !== undefined && document.querySelectorAll(".loadingPhoto input")[0].value !== "") {
				this.props.handlePhoto0();
				this.props.onValidatePlaceImage();
			}
		}, 500);

		this.timer1 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[1].value !== undefined && document.querySelectorAll(".loadingPhoto input")[1].value !== "") {
				this.props.handlePhoto1();
				this.props.onValidatePlaceImage();
			}
		}, 600);

		this.timer2 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[2].value !== undefined && document.querySelectorAll(".loadingPhoto input")[2].value !== "") {
				this.props.handlePhoto2();
				this.props.onValidatePlaceImage();
			}
		}, 700);

		this.timer3 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[3].value !== undefined && document.querySelectorAll(".loadingPhoto input")[3].value !== "") {
				this.props.handlePhoto3();
				this.props.onValidatePlaceImage();
			}
		}, 800);

		this.timer4 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[4].value !== undefined && document.querySelectorAll(".loadingPhoto input")[4].value !== "") {
				this.props.handlePhoto4();
				this.props.onValidatePlaceImage();
			}
		}, 900);

		//отправка изоражения
		let formData = new FormData();
		//проходим циклом по всем фото и добавляем в буфер формы
		let files;
		for(let i = 0; i < $(".formImg").length; i++) {
			$(`.p${i}`).on("change", function(e) {
				files = e.target.files[0];
				if(files.type == "image/jpeg") {
					formData.append("photo", files);
				}

				//console.log(document.querySelectorAll(".loadingPhoto input")[i].files[0].type);
			});
		}
		//форму кладем в переменную в state, чтобы использовать как аргумент в функции при передаче
		this.thisFormData = formData;
	}

	componentWillUnmount() {
		clearInterval(this.timer0);
		clearInterval(this.timer1);
		clearInterval(this.timer2);
		clearInterval(this.timer3);
		clearInterval(this.timer4);
		this.props.onResetPlace();
		this.props.onReletMessage();
	}

	//Добавление объявления
	postMethodAddCard = () => {
		let pSity = this.props.state.validarePlaceAnAd.city,
			pTitleName = this.props.state.validarePlaceAnAd.titleName,
			pPhoneNumber = this.props.state.validarePlaceAnAd.phoneNumber,
			pTextContent = this.props.state.validarePlaceAnAd.phoneNumber,
			pPlacePrice = this.props.state.validarePlaceAnAd.placePrice,
			pPlaceImage = this.props.state.validarePlaceAnAd.placeImage;

		//проверка изображений на jpeg формат
		let validateTypeImg = [],
			resultValidateTypeImg = "";

		for(let i = 0; i < 5; i++) {
			if(document.querySelectorAll(".loadingPhoto input")[i].files[0] == undefined || document.querySelectorAll(".loadingPhoto input")[i].files[0].type == "image/jpeg") {
				validateTypeImg.push(true);
			} else {
				validateTypeImg.push(false);
			}
		}

		_.each(validateTypeImg, elem => {
			if(elem === false) {
				resultValidateTypeImg = false;
			}
		});

		let toggleValidatePrice = () => {
			if(this.state.category.value === "gift" || this.state.category.value === "find") {
				console.log(this.state.category.value);
				return true;
			} else {
				console.log(this.state.category.value + " false");
				return pPlacePrice === true;
			}
		}

		//если все поля объявлени заполнены, то отправить данные
		if(pTitleName === true && pPhoneNumber === true && pTextContent === true && toggleValidatePrice() && pPlaceImage === true && resultValidateTypeImg !== false) {
			moment.locale("ru");
			let now = moment(), deleteDate = now.add(1, "month").format("ll");
			let paramsUrl = 
				"userName=" + this.props.state.loginUser.results[0].name + "&" +
				"animalType=" + this.state.animal.value + "&" +
				"advertisementType=" + this.state.category.value + "&" +
				"city=" + this.state.city.value + "&" +
				"title=" + $("input[name='title']")[0].value + "&" +
				"phoneNumber=" + $("input[name='phoneNumber']")[0].value + "&" +
				"briefDescription=" + $(".briefDescription")[0].childNodes[2].childNodes[1].value + "&" +
				`${this.state.category.value === "gift" || this.state.category.value === "find" ? "price=" + "" : "price=" + $("input[name='price']")[0].value}` + "&" +
				`userId=${this.props.state.loginUser.results[0].user_id}` + "&" +
				`status=${this.props.state.loginUser.results[0].accountType}` + "&" +
				`dataDelete=${deleteDate}`
				;

			//отправляем изображения объявления
			this.props.handlePostMethodAddImagesCard(process.env.URL + "/add-advertisement/img/animalType/" + this.state.animal.value + "/advertisementType/" + this.state.category.value, this.thisFormData);
			setTimeout(() => {
				//отправляем текстовые и числовые данные объявления
				this.props.handlePostMethodAddCard(process.env.URL + "/add-advertisement", paramsUrl);
			}, 2000);

			// let func = async () => {
			// 	console.log("start");
			// 	try {
			// 		await this.props.handlePostMethodAddImagesCard(process.env.URL + "/add-advertisement/img/animalType/" + this.state.animal.value + "/advertisementType/" + this.state.category.value, this.thisFormData);
			// 		await this.props.handlePostMethodAddCard(process.env.URL + "/add-advertisement", paramsUrl); 

			// 		console.log("Отправлено. try");
			// 	} catch(err) {
			// 		console.log(err);
			// 	}
			// };

			// func();
			
			//очистка данных формы
			this.props.onResetPlace();
			$("input[name='title']")[0].value = "";
			$("input[name='phoneNumber']")[0].value = "";
			$(".briefDescription")[0].childNodes[2].childNodes[1].nextSibling.value = "";
			this.state.category.value === "gift" || this.state.category.value === "find" ? "" : $("input[name='price']")[0].value = "";
			document.querySelectorAll(".loadingPhoto input")[0].value = "";
			document.querySelectorAll(".loadingPhoto input")[1].value = "";
			document.querySelectorAll(".loadingPhoto input")[2].value = "";
			document.querySelectorAll(".loadingPhoto input")[3].value = "";
			document.querySelectorAll(".loadingPhoto input")[4].value = "";
			//this.thisFormData = "";
			this.thisFormData.delete("photo");
		} else {
			
		}
	};

	handleChangeAnimalType = (event, index, value) => this.setState({animal: {value: value}});
	handleChangeCategory = (event, index, value) => this.setState({category: {value: value}});
	handleChangeCity = (event, index, value) => this.setState({city: {value: value}});

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

	//validateTitleName
	validateTitleName = e => {
		let regexpName = /^[а-яА-Я0-9-_\s]{10,50}$/;
		this.validate(e, regexpName, this.props.onValidateTitleName);
		this.props.onReletMessage();
	}

	//validatePhoneNumber
	validateTitlePhoneNumber = e => {
		let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		this.validate(e, regexpName, this.props.onValidatePhoneNumber);
		this.props.onReletMessage();
	} 

	//validatePlaceText
	validatePlaceText = e => {
		let regexpName = /^.{10,200}$/;
		this.validate(e, regexpName, this.props.onValidatePlaceText);
		this.props.onReletMessage();
	}

	//validatePlacePrice
	validatePlacePrice = e => {
		let regexpName = /^[0-9]{2,6}$/;
		this.validate(e, regexpName, this.props.onValidatePlacePrice);
		this.props.onReletMessage();
	}

	render() {
		let element = () => {
			let obj = this.props.state.photosReducer[0],
				idx = [0],
				mass = [];

			for(let i in obj) {
				mass.push(
					<div className={`loadingPhoto ${this.props.state.photosReducer[idx][i] === true ? "activeLabel" : ""}`} key={i}>
						<i className={`fa ${this.props.state.photosReducer[idx][i] === true ? "fa-check modifyColor" : "fa-plus"}`} aria-hidden="true"></i>
						<input type="file" accept="image/jpeg,image/png" className={`formImg ${i}`} />
					</div>
				);
			}

			return (
				<div className="buttonsAddPhoto">
					{
						mass
					}
				</div>
			);
		};

		let style = {
			floatingLabelStyle: {
				"color":"#b1adad"
			},
			labelStyle: {
				"color": "#7c7c7c"
			},
			floatingLabelFocusStyle: {
				"color": "#2396f1"
			},
			underlineFocusStyle: {
				"borderColor": "#2396f1"
			}
		};

		//сообщение об успешной отправке объявления
		let messagePlace = () => {
			return (
				<div className="mesagePlace">
					<i className="fa fa-check-circle" aria-hidden="true"></i>
					<p>Объявление отправлено на модерацию</p>
				</div>
			);
		};

		let pTitleName = this.props.state.validarePlaceAnAd.titleName,
			pPhoneNumber = this.props.state.validarePlaceAnAd.phoneNumber,
			pTextContent = this.props.state.validarePlaceAnAd.phoneNumber,
			pPlacePrice = this.props.state.validarePlaceAnAd.placePrice,
			pPlaceImage = this.props.state.validarePlaceAnAd.placeImage;
		
		return (
			<div className="placeAnAd">
				<div className="placeTop">
					<p className="modifyTitle">Разместить объявление</p>
					{this.props.state.validarePlaceAnAd.messagePlace === true && pTitleName === " " && pTextContent === " " && pPlacePrice === " " ? messagePlace() : "" }
				</div>
				<div className="placeContent">
					<div>
						<div className="wrapForm">
							<p className="subtitle">Данные</p>
							<form id="newAnimalForm">

								<SelectField
									floatingLabelStyle={style.floatingLabelStyle}
									labelStyle={style.labelStyle}
									floatingLabelText="Животное"
									value={this.state.animal.value}
									onChange={this.handleChangeAnimalType}
									selectedMenuItemStyle={style.floatingLabelFocusStyle}>
									<MenuItem value={"cat"} primaryText="Кошки" />
									<MenuItem value={"dog"} primaryText="Собаки" />
								</SelectField>

								<SelectField
									floatingLabelStyle={style.floatingLabelStyle}
									labelStyle={style.labelStyle}
									floatingLabelText="Категория"
									value={this.state.category.value}
									onChange={this.handleChangeCategory}
									selectedMenuItemStyle={style.floatingLabelFocusStyle}>
									<MenuItem value={"buy"} primaryText="Продать" />
									<MenuItem value={"gift"} primaryText="Даром" />
									<MenuItem value={"missing"} primaryText="Пропажа" />
									<MenuItem value={"find"} primaryText="Находка" />
								</SelectField>

								<SelectField
									floatingLabelStyle={style.floatingLabelStyle}
									labelStyle={style.labelStyle}
									floatingLabelText="Город"
									value={this.state.city.value}
									onChange={this.handleChangeCity}
									selectedMenuItemStyle={style.floatingLabelFocusStyle}>
									<MenuItem value={"Москва"} primaryText="Москва" />
									<MenuItem value={"Московская обл."} primaryText="Московская обл." />
									<MenuItem value={"Санкт-Петербург"} primaryText="Санкт-Петербург" />
									<MenuItem value={"Волгоград"} primaryText="Волгоград" />
									<MenuItem value={"Екатеринбург"} primaryText="Екатеринбург" />
									<MenuItem value={"Казань"} primaryText="Казань" />
									<MenuItem value={"Краснодар"} primaryText="Краснодар" />
									<MenuItem value={"Нижний Новгород"} primaryText="Нижний Новгород" />
									<MenuItem value={"Пермь"} primaryText="Пермь" />
									<MenuItem value={"Ростов-на-Дону"} primaryText="Ростов-на-Дону" />
									<MenuItem value={"Самара"} primaryText="Самара" />
									<MenuItem value={"Уфа"} primaryText="Уфа" />
									<MenuItem value={"Челябинск"} primaryText="Челябинск" />
									<MenuItem value={"Адыгея"} primaryText="Адыгея" />
									<MenuItem value={"Архангельская обл."} primaryText="Архангельская обл." />
									<MenuItem value={"Астраханская обл."} primaryText="Астраханская обл." />
									<MenuItem value={"Башкортостан"} primaryText="Башкортостан" />
									<MenuItem value={"Белгородская обл."} primaryText="Белгородская обл." />
									<MenuItem value={"Брянская обл."} primaryText="Брянская обл." />
									<MenuItem value={"Владимирская обл."} primaryText="Владимирская обл." />
									<MenuItem value={"Волгоградская обл."} primaryText="Волгоградская обл." />
									<MenuItem value={"Вологодская обл."} primaryText="Вологодская обл." />
									<MenuItem value={"Воронежская обл."} primaryText="Воронежская обл." />
									<MenuItem value={"Дагестан"} primaryText="Дагестан" />
									<MenuItem value={"Ивановская обл."} primaryText="Ивановская обл." />
									<MenuItem value={"Ингушетия"} primaryText="Ингушетия" />
									<MenuItem value={"Кабардино-Балкария"} primaryText="Кабардино-Балкария" />
									<MenuItem value={"Калининградская обл."} primaryText="Калининградская обл." />
									<MenuItem value={"Калмыкия"} primaryText="Калмыкия" />
									<MenuItem value={"Калужская обл."} primaryText="Калужская обл." />
									<MenuItem value={"Карачаево-Черкесия"} primaryText="Карачаево-Черкесия" />
									<MenuItem value={"Карелия"} primaryText="Карелия" />
									<MenuItem value={"Кировская обл."} primaryText="Кировская обл." />
									<MenuItem value={"Коми"} primaryText="Коми" />
									<MenuItem value={"Костромская обл."} primaryText="Костромская обл." />
									<MenuItem value={"Краснодарский край"} primaryText="Краснодарский край" />
									<MenuItem value={"Крым"} primaryText="Крым" />
									<MenuItem value={"Курганская обл."} primaryText="Курганская обл." />
									<MenuItem value={"Курская обл."} primaryText="Курская обл." />
									<MenuItem value={"Ленинградская обл."} primaryText="Ленинградская обл." />
									<MenuItem value={"Липецкая обл."} primaryText="Липецкая обл." />
									<MenuItem value={"Марий Эл"} primaryText="Марий Эл" />
									<MenuItem value={"Мордовия"} primaryText="Мордовия" />
									<MenuItem value={"Мурманская обл."} primaryText="Мурманская обл." />
									<MenuItem value={"Ненецкий АО"} primaryText="Ненецкий АО" />
									<MenuItem value={"Нижегородская обл."} primaryText="Нижегородская обл." />
									<MenuItem value={"Новгородская обл."} primaryText="Новгородская обл." />
									<MenuItem value={"Оренбургская обл."} primaryText="Оренбургская обл." />
									<MenuItem value={"Орловская обл."} primaryText="Орловская обл." />
									<MenuItem value={"Пензенская обл."} primaryText="Пензенская обл." />
									<MenuItem value={"Пермский край"} primaryText="Пермский край" />
									<MenuItem value={"Псковская обл."} primaryText="Псковская обл." />
									<MenuItem value={"Ростовская обл."} primaryText="Ростовская обл." />
									<MenuItem value={"Рязанская обл."} primaryText="Рязанская обл." />
									<MenuItem value={"Самарская обл."} primaryText="Самарская обл." />
									<MenuItem value={"Саратовская обл."} primaryText="Саратовская обл." />
									<MenuItem value={"Свердловская обл."} primaryText="Свердловская обл." />
									<MenuItem value={"Северная Осетия"} primaryText="Северная Осетия" />
									<MenuItem value={"Смоленская обл."} primaryText="Смоленская обл." />
									<MenuItem value={"Ставропольский край"} primaryText="Ставропольский край" />
									<MenuItem value={"Тамбовская обл."} primaryText="Тамбовская обл." />
									<MenuItem value={"Татарстан"} primaryText="Татарстан" />
									<MenuItem value={"Тверская обл."} primaryText="Тверская обл." />
									<MenuItem value={"Тульская обл."} primaryText="Тульская обл." />
									<MenuItem value={"Удмуртия"} primaryText="Удмуртия" />
									<MenuItem value={"Ульяновская обл."} primaryText="Ульяновская обл." />
									<MenuItem value={"Челябинская обл."} primaryText="Челябинская обл." />
									<MenuItem value={"Чеченская республика"} primaryText="Чеченская республика" />
									<MenuItem value={"Чувашия"} primaryText="Чувашия" />
									<MenuItem value={"Ярославская обл."} primaryText="Ярославская обл." />

								</SelectField>
								
								<TextField 
									hintText="Максимум 50 символов" 
									onChange={this.validateTitleName} 
									floatingLabelText="Название объявления"  
									name="title" 
									underlineFocusStyle={style.underlineFocusStyle} 
									floatingLabelStyle={style.labelStyle} 
									floatingLabelFocusStyle={style.floatingLabelFocusStyle}
									errorText={this.props.state.validarePlaceAnAd.titleName === true || this.props.state.validarePlaceAnAd.titleName === " " ? "" : " "} />

								<TextField 
									hintText="+7 *** *** ** **" 
									onChange={this.validateTitlePhoneNumber}
									floatingLabelText="Номер телефона" 
									name="phoneNumber" 
									underlineFocusStyle={style.underlineFocusStyle} 
									floatingLabelStyle={style.labelStyle} 
									floatingLabelFocusStyle={style.floatingLabelFocusStyle}
									errorText={this.props.state.validarePlaceAnAd.phoneNumber === true || this.props.state.validarePlaceAnAd.phoneNumber === " " ? "" : " "} />

								<TextField 
									hintText="Максимум 200 символов" 
									onChange={this.validatePlaceText}
									underlineFocusStyle={style.underlineFocusStyle} 
									floatingLabelStyle={style.labelStyle} 
									floatingLabelFocusStyle={style.floatingLabelFocusStyle} 
									floatingLabelText="Описание объявления" 
									multiLine={true} 
									rows={1} 
									className="briefDescription"
									errorText={this.props.state.validarePlaceAnAd.textContent === true || this.props.state.validarePlaceAnAd.textContent === " " ? "" : " "} />

									{
										this.state.category.value === "gift" || this.state.category.value === "find" ? "" 
										: <TextField 
											hintText="Число без пробелов" 
											onChange={this.validatePlacePrice}
											underlineFocusStyle={style.underlineFocusStyle} 
											floatingLabelText="Цена" 
											name="price" 
											floatingLabelStyle={style.labelStyle} 
											floatingLabelFocusStyle={style.floatingLabelFocusStyle}
											errorText={this.props.state.validarePlaceAnAd.placePrice === true || this.props.state.validarePlaceAnAd.placePrice === " " ? "" : " "} /> 
									}
					</form>
						</div>
					</div>
					<div>
						<div className="wrapPhotos">
							<p className="subtitle">Фотографии</p>
							<p className="photoDescpipt">Добавьте минимум одну фотографию <br /> Минимальное разрешение 1280 x 768 <br /> <b>Формат jpeg</b> </p>
							{
								element()
							}
						</div>
					</div>
					<div>
						<a href="javascript:void(0)" className="btnPlace" onClick={this.postMethodAddCard}>
							<i className="fa fa-cloud-upload" aria-hidden="true"></i>
							<span>Разместить</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		state: state
	}),
	dispatch => ({
		handlePhoto0: () => {
			dispatch({type: "ADD_PHOTO0", payload: true});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		handlePhoto1: () => {
			dispatch({type: "ADD_PHOTO1", payload: true});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		handlePhoto2: () => {
			dispatch({type: "ADD_PHOTO2", payload: true});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		handlePhoto3: () => {
			dispatch({type: "ADD_PHOTO3", payload: true});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		handlePhoto4: () => {
			dispatch({type: "ADD_PHOTO4", payload: true});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		onValidateRegCity: e => {
			dispatch({type: "VALIDATE_PLACE_CITY", payload: e});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		onValidateTitleName: e => {
			dispatch({type: "VALIDATE_PLACE_TITLENAME", payload: e});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		onValidatePhoneNumber: e => {
			dispatch({type: "VALIDATE_PLACE_PHONENUMBER", payload: e});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		onValidatePlaceText: e => {
			dispatch({type: "VALIDATE_PLACE_TEXT", payload: e});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		onValidatePlacePrice: e => {
			dispatch({type: "VALIDATE_PLCAE_PRICE", payload: e});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		onValidatePlaceImage: () => {
			dispatch({type: "VALIDATE_PLCAE_IMAGE", payload: true});
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		onResetPlace: () => {
			dispatch({type: "RESET_PLACE"});
			dispatch({type: "ADD_PHOTO0", payload: false});
			dispatch({type: "ADD_PHOTO1", payload: false});
			dispatch({type: "ADD_PHOTO2", payload: false});
			dispatch({type: "ADD_PHOTO3", payload: false});
			dispatch({type: "ADD_PHOTO4", payload: false});
		},
		onReletMessage: () => {
			dispatch({type: "PLACE_SUCCES_FALSE", payload: false});
		},
		handlePostMethodAddCard: (url, paramUrl) => {
			dispatch(placeAnAdCard(url, paramUrl));
		},
		handlePostMethodAddImagesCard: (url, thisFormData) => {
			dispatch(postImagesCard(url, thisFormData))
		}
	})
)(PlaceAnAd);