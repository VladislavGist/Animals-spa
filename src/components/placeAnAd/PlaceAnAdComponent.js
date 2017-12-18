import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'

import { actions as actionsAllParamsUrl } from '../../ducks/allParamsUrl'
import { actions as actionsPhotosReducer } from '../../ducks/photosReducer'
import { actions as actionsSnackbarReducer } from '../../ducks/snackbarReducer'
import { actions as actionsValidatePlaceAnAd } from '../../ducks/validatePlaceAnAd'

import AddPhotoInputComponent from './AddPhotoInput/AddPhotoInputComponent'

import './PlaceAnAdStyles.sass'
import '../contacts/ContactsStyles.sass'

class PlaceAnAd extends Component {

	state = {
		animal: {
			value: 'cat'
		},
		category: {
			value: 'buy'
		},
		city: {
			value: 'Москва'
		},
		checked: true
	}

	componentWillUnmount() {
		this.props.handleResetPlace()
		this.props.onResetMessage()
	}

	handleChangeAnimalType = (event, index, value) => this.setState({ animal: { value } })

	handleChangeCategory = (event, index, value) => this.setState({ category: { value } })

	handleChangeCity = (event, index, value) => this.setState({ city: { value } })

	// функция валидации поля
	// аргументы: принимаемый элемент ввода, регулярное выражение, свойство состояния
	validate = (e, regexp, action) => {
		let el = e.target.value

		if (el.match(regexp)) {
			[action][0](true)

		} else if(el.length === 0) {
			[action][0](' ')

		} else {
			[action][0](false)
		}
	}

	// validateTitleName
	validateTitleName = e => {
		let regexpName = /^[а-яА-Я0-9-_\s]{10,50}$/
		this.validate(e, regexpName, this.props.onValidateTitleName)
		this.props.onResetMessage()
	}

	// validatePhoneNumber
	validateTitlePhoneNumber = e => {
		let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
		this.validate(e, regexpName, this.props.onValidatePhoneNumber)
		this.props.onResetMessage()
	}

	// validatePlaceText
	validatePlaceText = e => {
		let regexpName = /^.{10,200}$/
		this.validate(e, regexpName, this.props.onValidatePlaceText)
		this.props.onResetMessage()
	}

	// validatePlacePrice
	validatePlacePrice = e => {
		let regexpName = /^[0-9]{2,6}$/
		this.validate(e, regexpName, this.props.onValidatePlacePrice)
		this.props.onResetMessage()
	}

	// у каких животных какие категории будут доступны
	// хотел сделать одной функцией. но из за врапинга всех элементов селекты materialui работают не корректно
	menuItems01 = values => {
		if (['cat', 'dog', 'parrot', 'hamster', 'mouse', 'hare',
			'guineapig', 'champ', 'snak', 'iguana', 'turtle', 'snail', 'fish',
			'insects', 'horse', 'cow', 'pig', 'goat', 'sheep', 'domesticbird'].indexOf(values) !== -1) {
			return <MenuItem value={ 'buy' } primaryText='Продать' />
		}
	}

	menuItems02 = values => {
		if (['cat', 'dog', 'parrot', 'hamster', 'mouse', 'hare', 'guineapig',
			'champ', 'snak', 'iguana', 'turtle', 'snail', 'fish', 'insects', 'horse', 'cow',
			'pig', 'goat', 'sheep', 'domesticbird'].indexOf(values) !== -1) {
			return <MenuItem value={ 'gift' } primaryText='Даром' />
		}
	}

	menuItems03 = values => {
		if (['cat', 'dog', 'parrot', 'guineapig', 'champ', 'snak', 'iguana', 'turtle',
			'horse', 'cow', 'goat', 'sheep'].indexOf(values) !== -1) {
			return <MenuItem value={ 'missing' } primaryText='Пропажа' />
		}
	}

	menuItems04 = values => {
		if (['cat', 'dog', 'parrot', 'guineapig', 'champ', 'snak', 'iguana', 'turtle',
			'horse', 'cow', 'goat', 'sheep'].indexOf(values) !== -1) {
			return <MenuItem value={ 'find' } primaryText='Находка' />
		}
	}

	handleCheckCheckbox = () => {
		this.setState({
			checkbox: !this.state.checked
		})
	}

	handleSendForm = () => {

		const { postMethodAddCard, handleResetPlace } = this.props

		postMethodAddCard(this.props.state, this.state, handleResetPlace)
	}

	render() {

		const style = {
			floatingLabelStyle: {
				'color': '#b1adad'
			},
			labelStyle: {
				'color': '#7c7c7c'
			},
			floatingLabelFocusStyle: {
				'color': '#2396f1'
			},
			underlineFocusStyle: {
				'borderColor': '#2396f1'
			},
			checkbox: {
				marginTop: '20px'
			}
		}

		const {
			pTitleName,
			validatePlaceAnAd,
			pTextContent,
			pPlacePrice,
			filterCity,
		} = this.props.state
		
		return (
			<div className='placeAnAd'>
				<div className='placeTop'>
					<p className='modifyTitle'>Разместить объявление</p>
					{
						validatePlaceAnAd.messagePlace && pTitleName === ' ' && pTextContent === ' ' && pPlacePrice === ' '
							? (<div className='mesagePlace'>
								<i className='fa fa-check-circle' aria-hidden='true' />
								<p>Объявление отправлено на модерацию</p>
							</div>)
							: null
					}
				</div>
				<div className='placeContent'>
					<div>
						<div className='wrapForm'>
							<p className='subtitle'>Данные</p>
							<form id='newAnimalForm'>

								<SelectField
									floatingLabelStyle={ style.floatingLabelStyle }
									labelStyle={ style.labelStyle }
									floatingLabelText='Животное'
									value={ this.state.animal.value }
									onChange={ this.handleChangeAnimalType }
									selectedMenuItemStyle={ style.floatingLabelFocusStyle }>
									<MenuItem value={ 'cat' } primaryText='Кошки' />
									<MenuItem value={ 'dog' } primaryText='Собаки' />
									<MenuItem value={ 'parrot' } primaryText='Попугаи' />
									<MenuItem value={ 'hamster' } primaryText='Хомяки' />
									<MenuItem value={ 'mouse' } primaryText='Мыши / крысы' />
									<MenuItem value={ 'hare' } primaryText='Зайцы / кролики' />
									<MenuItem value={ 'guineapig' } primaryText='Морские свинки' />
									<MenuItem value={ 'champ' } primaryText='Хорьки' />
									<MenuItem value={ 'snak' } primaryText='Змеи' />
									<MenuItem value={ 'iguana' } primaryText='Игуаны' />
									<MenuItem value={ 'turtle' } primaryText='Черепахи' />
									<MenuItem value={ 'snail' } primaryText='Улитки' />
									<MenuItem value={ 'fish' } primaryText='Рыбки' />
									<MenuItem value={ 'insects' } primaryText='Насекомые' />
									<MenuItem value={ 'horse' } primaryText='Лошади' />
									<MenuItem value={ 'cow' } primaryText='Коровы / быки' />
									<MenuItem value={ 'pig' } primaryText='Свиньи' />
									<MenuItem value={ 'goat' } primaryText='Козы'  />
									<MenuItem value={ 'sheep' } primaryText='Овцы' />
									<MenuItem value={ 'domesticbird' } primaryText='Домашняя птица' />
								</SelectField>

								<SelectField
									floatingLabelStyle={ style.floatingLabelStyle }
									labelStyle={ style.labelStyle }
									floatingLabelText='Категория'
									value={ this.state.category.value }
									onChange={ this.handleChangeCategory }
									selectedMenuItemStyle={ style.floatingLabelFocusStyle }>
									{
										this.menuItems01(this.state.animal.value)
									}
									{
										this.menuItems02(this.state.animal.value)
									}
									{
										this.menuItems03(this.state.animal.value)
									}
									{
										this.menuItems04(this.state.animal.value)
									}
								</SelectField>

								<SelectField
									floatingLabelStyle={ style.floatingLabelStyle }
									labelStyle={ style.labelStyle }
									floatingLabelText='Город'
									value={ this.state.city.value }
									onChange={ this.handleChangeCity }
									selectedMenuItemStyle={ style.floatingLabelFocusStyle }
								>
									{
										filterCity.citys.map((elem, idx) => <MenuItem value={ elem } primaryText={ elem } key={ idx } />)
									}
								</SelectField>
								
								<TextField
									hintText='Максимум 50 символов'
									onChange={ this.validateTitleName }
									floatingLabelText='Название объявления'
									name='title'
									underlineFocusStyle={ style.underlineFocusStyle }
									floatingLabelStyle={ style.labelStyle }
									floatingLabelFocusStyle={ style.floatingLabelFocusStyle }
									errorText={ validatePlaceAnAd.titleName || validatePlaceAnAd.titleName === ' ' ? '' : ' ' } />

								<TextField
									hintText='+7 *** *** ** **'
									onChange={ this.validateTitlePhoneNumber }
									floatingLabelText='Номер телефона'
									name='phoneNumber'
									underlineFocusStyle={ style.underlineFocusStyle }
									floatingLabelStyle={ style.labelStyle }
									floatingLabelFocusStyle={ style.floatingLabelFocusStyle }
									errorText={ validatePlaceAnAd.phoneNumber || validatePlaceAnAd.phoneNumber === ' ' ? '' : ' ' } />

								<TextField
									hintText='Максимум 200 символов'
									onChange={ this.validatePlaceText }
									underlineFocusStyle={ style.underlineFocusStyle }
									floatingLabelStyle={ style.labelStyle }
									floatingLabelFocusStyle={ style.floatingLabelFocusStyle }
									floatingLabelText='Описание объявления'
									multiLine={ true }
									rows={ 1 }
									className='briefDescription'
									errorText={ validatePlaceAnAd.textContent || validatePlaceAnAd.textContent === ' ' ? '' : ' ' }
								/>

								{
									this.state.category.value === 'gift' || this.state.category.value === 'find' ? '' : <TextField
										hintText='Число без пробелов'
										onChange={ this.validatePlacePrice }
										underlineFocusStyle={ style.underlineFocusStyle }
										floatingLabelText='Цена'
										name='price'
										floatingLabelStyle={ style.labelStyle }
										floatingLabelFocusStyle={ style.floatingLabelFocusStyle }
										errorText={ validatePlaceAnAd.placePrice || validatePlaceAnAd.placePrice === ' ' ? '' : ' ' }
									/>
								}
							</form>

							<Checkbox
								label='Даю согласие на обработку персональных данных'
								style={ style.checkbox }
								className='checkBoxLink'
								defaultChecked={ true }
								onChange={ this.handleCheckCheckbox }
							/>
							<Link to='conf' className='linkConf'>Политика конфиденциальности</Link>
						</div>
					</div>
					<div>
						<div className='wrapPhotos'>
							<p className='subtitle'>Фотографии</p>
							<p className='photoDescpipt'>Добавьте минимум одну фотографию <br /> Минимальное разрешение 1280 x 768 <br /> <b>Формат jpeg, jpg</b> </p>

							<div className='buttonsAddPhoto'>

								<AddPhotoInputComponent />

								<AddPhotoInputComponent />

								<AddPhotoInputComponent />

								<AddPhotoInputComponent />

								<AddPhotoInputComponent />

							</div>

						</div>
					</div>
					<div>
						<a href='javascript:void(0)' className='btnPlace' onClick={ this.handleSendForm }>
							<i className='fa fa-cloud-upload' aria-hidden='true' />
							<span>Разместить</span>
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => ({ state }),
	dispatch => bindActionCreators({
		...actionsSnackbarReducer,
		...actionsPhotosReducer,
		...actionsValidatePlaceAnAd,
		...actionsAllParamsUrl
	}, dispatch)
)(PlaceAnAd)