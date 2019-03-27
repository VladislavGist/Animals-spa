import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { Form, Field, reduxForm } from 'redux-form'
import { SelectField } from 'redux-form-material-ui'
import CircularProgress from 'material-ui/CircularProgress'

import { actions as actionsAllParamsUrl } from '../../../ducks/allParamsUrl'
import { actions as actionsPhotosReducer } from '../../../ducks/photosReducer'
import { actions as actionsSnackbarReducer } from '../../../ducks/snackbarReducer'

import { renderField, validate } from '../formValidate'
import AddPhotoInputComponent from './addPhotoInput/AddPhotoInputComponent'
import { normilizeNumber, validateInputs } from '../validationsInputs'

if (process.env.BROWSER) {
	require('./PlaceAnAdStyles.sass')
}

class AddCardFormComponent extends Component {

	state = { disabledButton: true }

	componentWillUpdate(nextProps) {
		if (nextProps !== this.props) {
			this.disabledSubmitButton(nextProps)
		}
	}

	componentWillUnmount() {
		this.props.handleResetPlace()
	}

	disabledSubmitButton = nextProps => {
		const { addCardForm: { values }, addPhoto } = nextProps

		if (values &&
			values.animals &&
			values.category &&
			values.city &&
			(['gift', 'find'].includes(values.category) ? true : values.price) &&
			values.title &&
			values.phoneNumber &&
			values.textArea &&
			values.check &&
			values.title.match(validateInputs.title) &&
			values.textArea.match(validateInputs.textArea) &&
			values.phoneNumber.match(validateInputs.phoneNumber) &&
			addPhoto
		) { this.setState({ disabledButton: false }) }
		else { this.setState({ disabledButton: true }) }
	}

	handleChangeCity = (event, index, value) => this.setState({ city: { value } })

	menuItems01 = values => {
		if (['cat', 'dog', 'parrot', 'hare', 'champ', 'fish', 'chAnimals', 'rodents',
			'replites', 'other'].indexOf(values) !== -1) {
			return <MenuItem
				value={ 'buy' }
				primaryText='Продать'
				className='selectItem'
				name='selectItem'
				key='3ff3f3'
			/>
		}
	}

	menuItems02 = values => {
		if (['cat', 'dog', 'parrot', 'hare', 'champ', 'fish', 'chAnimals', 'rodents',
			'replites', 'other'].indexOf(values) !== -1) {
			return <MenuItem
				value={ 'gift' }
				primaryText='Даром'
				className='selectItem'
				name='selectItem'
				key='3ff3f3greg'
			/>
		}
	}

	menuItems03 = values => {
		if (['cat', 'dog', 'parrot', 'champ', 'chAnimals', 'replites', 'other'].indexOf(values) !== -1) {
			return <MenuItem
				value={ 'missing' }
				primaryText='Пропажа'
				className='selectItem'
				name='selectItem'
				key='3g343f3'
			/>
		}
	}

	menuItems04 = values => {
		if (['cat', 'dog', 'parrot', 'champ', 'rodents', 'replites', 'other'].indexOf(values) !== -1) {
			return <MenuItem
				value={ 'find' }
				primaryText='Находка'
				className='selectItem'
				name='selectItem'
				key='73gf3f3'
			/>
		}
	}

	handleSendForm = () => {
		const {
			addCardForm,
			addArticle,
			handleResetPlace,
			images
		} = this.props

		const file = []

		for (let i in images) {
			if ((typeof images[i] === 'object') && images[i]) {
				file.push(images[i])
			}
		}

		addArticle(
			handleResetPlace,
			{
				file,
				...addCardForm.values
			}
		)
	}

	render() {
		const {
			filterCity,
			addCardForm,
			addCard,
			user,
			handleAddPhoto_0,
			handleAddPhoto_1,
			handleAddPhoto_2,
			handleAddPhoto_3,
			handleAddPhoto_4,
			images,
			handleSnackbar,
			animalCategories
		} = this.props

		const style = {
			floatingLabelStyle: { 'color': '#b1adad' },
			labelStyle: { 'color': '#7c7c7c', top: '10px' },
			floatingLabelFocusStyle: { 'color': '#2396f1' },
			underlineFocusStyle: { 'borderColor': '#2396f1' },
			checkbox: { marginTop: '20px' }
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

									{ user && user.role === 'moderator' && <Field
										type='text'
										label='Имя пользователя'
										name='refreshName'
										component={ renderField }
									/> }

									<Field
										name='animals'
										component={ SelectField }
										floatingLabelStyle={ style.floatingLabelStyle }
										labelStyle={ style.labelStyle }
										floatingLabelText={ 'Животное' }
										floatingLabelFixed={ true }
										hintText='Кошки'
									>
										{ animalCategories && animalCategories.length > 0 ? (
											animalCategories.map((category, idx) => {
												return <MenuItem
													key={ idx }
													value={ category.type }
													primaryText={ category.translate }
												/>
											})
										) : <CircularProgress size={ 60 }/> }
									</Field>

									<Field
										name='category'
										component={ SelectField }
										floatingLabelStyle={ style.floatingLabelStyle }
										labelStyle={ style.labelStyle }
										floatingLabelText='Категория'
										floatingLabelFixed={ true }
										hintText={ addCardForm && addCardForm.values.category }
										selectedMenuItemStyle={ style.floatingLabelFocusStyle }
									>
										{ this.menuItems01(addCardForm && addCardForm.values.animals) }
										{ this.menuItems02(addCardForm && addCardForm.values.animals) }
										{ this.menuItems03(addCardForm && addCardForm.values.animals) }
										{ this.menuItems04(addCardForm && addCardForm.values.animals) }
									</Field>

									<Field
										name='city'
										component={ SelectField }
										floatingLabelStyle={ style.floatingLabelStyle }
										labelStyle={ style.labelStyle }
										floatingLabelText='Город'
										floatingLabelFixed={ true }
										hintText={ addCardForm && addCardForm.values.city }
										selectedMenuItemStyle={ style.floatingLabelFocusStyle }
									>
										{ filterCity && filterCity.cityList.length > 0
											? filterCity.cityList.map((elem, idx) => <MenuItem
												value={ elem.city }
												primaryText={ elem.city }
												key={ idx }
											/>) : (
												<CircularProgress size={ 60 }/>
											) }
									</Field>

									<Field
										type='text'
										label='Название объявления'
										name='title'
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
										type='textarea'
										label='Описание объявления'
										name='textArea'
										
										extra={ {
											multiLine: true,
											rows: 2,
											rowsMax: 4
										} }
										
										component={ renderField }
									/>

									{
										(addCardForm && addCardForm.values.category === 'gift') ||
										(addCardForm && addCardForm.values.category === 'find') ? '' : <Field
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
								<p className='photoDescpipt'>Добавьте минимум одну фотографию<br />. <b>Формат jpeg, jpg, png</b>. Макс. размер 3 мб</p>
								<div className='buttonsAddPhoto'>
									<AddPhotoInputComponent
										handleAddPhoto={ handleAddPhoto_0 }
										photo={ images.file_0 }
										handleSnackbar={ handleSnackbar }
									/>
									<AddPhotoInputComponent
										handleAddPhoto={ handleAddPhoto_1 }
										photo={ images.file_1 }
										handleSnackbar={ handleSnackbar }
									/>
									<AddPhotoInputComponent
										handleAddPhoto={ handleAddPhoto_2 }
										photo={ images.file_2 }
										handleSnackbar={ handleSnackbar }
									/>
									<AddPhotoInputComponent
										handleAddPhoto={ handleAddPhoto_3 }
										photo={ images.file_3 }
										handleSnackbar={ handleSnackbar }
									/>
									<AddPhotoInputComponent
										handleAddPhoto={ handleAddPhoto_4 }
										photo={ images.file_4 }
										handleSnackbar={ handleSnackbar }
									/>
								</div>
							</div>
						</div>
						<div>
							<button
								className={ classNames({
									btnPlace: true,
									disabledButton: this.state.disabledButton || (addCard.fetchingAddingArticle && !addCard.errorAddingArticle)
								}) }
								disabled={ this.state.disabledButton || (addCard.fetchingAddingArticle && !addCard.errorAddingArticle) }
								onClick={ this.handleSendForm }
							>
								{/* <i className='fa fa-cloud-upload' aria-hidden='true' />
								<br /> */}
								<span>{ addCard.fetchingAddingArticle && !addCard.errorAddingArticle ? <CircularProgress size={ 60 } thickness={ 7 } /> : 'Разместить' }</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

AddCardFormComponent.defaultProps = {
	animalCategories: [],
	user: {}
}

AddCardFormComponent.propTypes = {
	filterCity: PropTypes.object.isRequired,
	animalCategories: PropTypes.array.isRequired,
	addCardForm: PropTypes.object,
	addCard: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	handleAddPhoto_0: PropTypes.func.isRequired,
	handleAddPhoto_1: PropTypes.func.isRequired,
	handleAddPhoto_2: PropTypes.func.isRequired,
	handleAddPhoto_3: PropTypes.func.isRequired,
	handleAddPhoto_4: PropTypes.func.isRequired,
	handleSnackbar: PropTypes.func.isRequired,
	addArticle: PropTypes.func.isRequired,
	handleResetPlace: PropTypes.func.isRequired,
	images: PropTypes.object.isRequired
}

AddCardFormComponent = reduxForm({
	form: 'addCardForm',
	initialValues: { city: 'Москва', category: 'buy', animals: 'cat', check: true },
	validate
})(AddCardFormComponent)

export default connect(
	state => ({
		user: state.auth.user,
		filterCity: state.filterCity,
		animalCategories: state.menuReducer.categories,
		addCardForm: state.form.addCardForm,
		addPhoto: state.photosReducer.addPhoto,
		images: state.photosReducer,
		addCard: state.allParamsUrl,
	}),
	{
		...actionsAllParamsUrl,
		...actionsPhotosReducer,
		...actionsSnackbarReducer
	}
)(AddCardFormComponent)