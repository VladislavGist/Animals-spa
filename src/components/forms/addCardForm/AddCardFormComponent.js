import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import MenuItem from 'material-ui/MenuItem'
import { Form, Field, reduxForm } from 'redux-form'

import { actions as actionsAllParamsUrl } from '../../../ducks/allParamsUrl'
import { actions as actionsPhotosReducer } from '../../../ducks/photosReducer'
import { actions as actionsSnackbarReducer } from '../../../ducks/snackbarReducer'
import { actions as actionsValidatePlaceAnAd } from '../../../ducks/validatePlaceAnAd'

import { renderField, validate } from '../formValidate'
import { normilizeNumber, normilizeText, validateInputs } from '../validationsInputs'
import AddPhotoInputComponent from './addPhotoInput/AddPhotoInputComponent'

import './PlaceAnAdStyles.sass'
import '../../contacts/ContactsStyles.sass'

class AddCardFormComponent extends Component {

	componentWillUnmount() {
		// this.props.handleResetPlace()
		// this.props.onResetMessage()
	}

	// handleChangeAnimalType = (event, index, value) => this.setState({ animal: { value } })
	handleChangeCity = (event, index, value) => this.setState({ city: { value } })

	menuItems01 = values => {

		if (['cat', 'dog', 'parrot', 'hamster', 'mouse', 'hare',
			'guineapig', 'champ', 'snak', 'iguana', 'turtle', 'snail', 'fish',
			'insects', 'horse', 'cow', 'pig', 'goat', 'sheep', 'domesticbird'].indexOf(values) !== -1) {
			return <MenuItem
				value={ 'buy' }
				primaryText={ <option value={ 'buy' }>Продать</option> }
				className='selectItem'
				name='selectItem'
				key='3ff3f3'
			/>
		}
	}

	menuItems02 = values => {
		if (['cat', 'dog', 'parrot', 'hamster', 'mouse', 'hare', 'guineapig',
			'champ', 'snak', 'iguana', 'turtle', 'snail', 'fish', 'insects', 'horse', 'cow',
			'pig', 'goat', 'sheep', 'domesticbird'].indexOf(values) !== -1) {
			return <MenuItem
				value={ 'gift' }
				primaryText={ <option value={ 'gift' }>Даром</option> }
				className='selectItem'
				name='selectItem'
				key='3ff3f3greg'
			/>
		}
	}

	menuItems03 = values => {
		if (['cat', 'dog', 'parrot', 'guineapig', 'champ', 'snak', 'iguana', 'turtle',
			'horse', 'cow', 'goat', 'sheep'].indexOf(values) !== -1) {
			return <MenuItem
				value={ 'missing' }
				primaryText={ <option value={ 'missing' }>Пропажа</option> }
				className='selectItem'
				name='selectItem'
				key='3g343f3'
			/>
		}
	}

	menuItems04 = values => {
		if (['cat', 'dog', 'parrot', 'guineapig', 'champ', 'snak', 'iguana', 'turtle',
			'horse', 'cow', 'goat', 'sheep'].indexOf(values) !== -1) {
			return <MenuItem
				value={ 'find' }
				primaryText={ <option value={ 'find' }>Находка</option> }
				className='selectItem'
				name='selectItem'
				key='73gf3f3'
			/>
		}
	}

	handleCheckCheckbox = () => this.setState({ checkbox: !this.state.checked })

	handleSendForm = () => {

	}

	render() {

		const { filterCity } = this.props.state
		const { addCardForm } = this.props

		const style = {
			floatingLabelStyle: {
				'color': '#b1adad'
			},
			labelStyle: {
				'color': '#7c7c7c',
				top: '21px'
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

		return (
			<div className='placeAnAd'>
				<div className='placeTop'>
					<p className='modifyTitle'>Разместить объявление</p>
				</div>
				<div className='placeContent'>
					<div>
						<div>
							<div className='wrapForm'>
								<p className='subtitle'>Данные</p>
								<Form onSubmit={ this.handleSendForm } className='newAnimalForm'>

									<Field
										name='animals'
										component={ renderField }
										type='select'
										extra={ {
											floatingLabelStyle: style.floatingLabelStyle,
											labelStyle: style.labelStyle,
											floatingLabelText: 'Животное',
											floatingLabelFixed: true,
											hintText: 'Кошки'
										} }
									>
										<MenuItem
											value={ 'cat' }
											primaryText={ <option value='cat' >Кошки</option> }
										/>
										<MenuItem
											value={ 'dog' }
											primaryText={ <option value='dog' >Собаки</option> }
										/>
										<MenuItem
											value={ 'parrot' }
											primaryText={ <option value='parrot' >Попугаи</option> }
										/>
										<MenuItem
											value={ 'hamster' }
											primaryText={ <option value='hamster' >Хомяки</option> }
										/>
										<MenuItem
											value={ 'mouse' }
											primaryText={ <option value='mouse' >Мыши / крысы</option> }
										/>
										<MenuItem
											value={ 'hare' }
											primaryText={ <option value='hare' >Зайцы / кролики</option> }
										/>
										<MenuItem
											value={ 'guineapig' }
											primaryText={ <option value='guineapig' >Морские свинки</option> }
										/>
										<MenuItem
											value={ 'champ' }
											primaryText={ <option value='champ' >Хорьки</option> }
										/>
										<MenuItem
											value={ 'snak' }
											primaryText={ <option value='snak' >Змеи</option> }
										/>
										<MenuItem
											value={ 'iguana' }
											primaryText={ <option value='iguana' >Игуаны</option> }
										/>
										<MenuItem
											value={ 'turtle' }
											primaryText={ <option value='turtle' >Черепахи</option> }
										/>
										<MenuItem
											value={ 'snail' }
											primaryText={ <option value='snail' >Улитки</option> }
										/>
										<MenuItem
											value={ 'fish' }
											primaryText={ <option value='fish' >Рыбки</option> }
										/>
										<MenuItem
											value={ 'insects' }
											primaryText={ <option value='insects' >Насекомые</option> }
										/>
										<MenuItem
											value={ 'horse' }
											primaryText={ <option value='horse' >Лошади</option> }
										/>
										<MenuItem
											value={ 'cow' }
											primaryText={ <option value='cow' >Коровы / быки</option> }
										/>
										<MenuItem
											value={ 'pig' }
											primaryText={ <option value='pig' >Свиньи</option> }
										/>
										<MenuItem
											value={ 'goat' }
											primaryText={ <option value='goat' >Козы</option> }
										/>
										<MenuItem
											value={ 'sheep' }
											primaryText={ <option value='sheep' >Овцы</option> }
										/>
										<MenuItem
											value={ 'domesticbird' }
											primaryText={ <option value='domesticbird' >Домашняя птица</option> }
										/>
									</Field>

									<Field
										name='category'
										component={ renderField }
										type='select'
										extra={ {
											floatingLabelStyle: style.floatingLabelStyle,
											labelStyle: style.labelStyle,
											floatingLabelText: 'Категория',
											floatingLabelFixed: true,
											hintText: this.props.addCardForm.values.category,
											selectedMenuItemStyle: style.floatingLabelFocusStyle
										} }
									>
										{ this.menuItems01(this.props.addCardForm.values.animals) }
										{ this.menuItems02(this.props.addCardForm.values.animals) }
										{ this.menuItems03(this.props.addCardForm.values.animals) }
										{ this.menuItems04(this.props.addCardForm.values.animals) }
									</Field>

									<Field
										name='city'
										component={ renderField }
										type='select'
										extra={ {
											floatingLabelStyle: style.floatingLabelStyle,
											labelStyle: style.labelStyle,
											floatingLabelText: 'Город',
											floatingLabelFixed: true,
											hintText: this.props.addCardForm.values.city,
											selectedMenuItemStyle: style.floatingLabelFocusStyle
										} }
									>
										{
											filterCity.citys.map((elem, idx) => <MenuItem
												value={ elem }
												primaryText={ <option value={ elem } >{ elem }</option> }
												key={ idx }
											/>)
										}
									</Field>

									<Field
										type='text'
										label='Название объявления'
										name='title'
										normalize={ normilizeText }
										component={ renderField }
									/>

									<Field
										type='tel'
										label='Номер телефона'
										name='phoneNumber'
										normalize={ normilizeNumber }
										component={ renderField }
									/>

									<Field
										type='text'
										label='Описание объявления'
										name='textArea'
										normalize={ normilizeText }
										component={ renderField }
									/>

									{
										addCardForm.values.category === 'gift' ||
										addCardForm.values.category === 'find' ? '' : <Field
											type='text'
											label='Цена'
											name='price'
											normalize={ normilizeNumber }
											component={ renderField }
										/>
									}

									<Field
										type='checkbox'
										label='Даю согласие на обработку персональных данных'
										name='check'
										component={ renderField }
										className='checkBoxLink'
										extra={ { style: style.checkbox } }
									/>

								</Form>
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
			</div>
		)
	}
}

AddCardFormComponent = reduxForm({
	form: 'addCardForm',
	initialValues: { city: 'Москва', category: 'buy', animals: 'cat', check: true },
	validate
})(AddCardFormComponent)

export default connect(
	state => ({ state, addCardForm: state.form.addCardForm }),
	dispatch => bindActionCreators({ }, dispatch)
)(AddCardFormComponent)