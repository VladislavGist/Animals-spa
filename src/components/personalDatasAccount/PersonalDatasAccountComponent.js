import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Tabs, Tab } from 'material-ui/Tabs'

import { store } from '../../store'
import CardItem from '../categories/cardItem/CardItemComponent'
import TableRowsComponent from './tableRows/TableRowsComponent'

import { actions as actionsLoginUser } from '../../ducks/loginUser'
import { actions as actionsServerReducer } from '../../ducks/serverReducer'
import { actions as actionsUserPersonalDatas } from '../../ducks/userPersonalDatas'
import { actions as actionsReducerCardsComplAndRej } from '../../ducks/reducerCardsComplAndRej'

import 'whatwg-fetch'
import '../personalArea/PersonalAreaStyles.sass'
import '../categories/cardItems/CardItemsStyles.sass'

class PersonalDatasAccount extends Component {

	constructor() {
		super()
		this.state = {
			value: '0',
			slideIndex: 0
		}
		this.elem = store.getState().serverReducer
		this.elem2 = store.getState().reducerCardsComplAndRej
	}

	handleChange = value => {
		this.setState({
			value: value,
		})
	}

	componentWillMount() {

		const {
			loadCardsComplAndRej,
			getCards,
			state,
			updateDatasTrue
		} = this.props

		loadCardsComplAndRej(`${ process.env.URL }/userCardsComplAndRejected?userid=${ state.loginUser.results[0].user_id }`)
		getCards(`${ process.env.URL }/userCardsAccepted?userid=${ state.loginUser.results[0].user_id }`)

		// запрашивать от сервера последние данные по аккаунту
		updateDatasTrue(`${ process.env.URL }/updateDatasAccount?userid=${ state.loginUser.results[0].user_id }`)
	}

	componentWillUnmount() {
		this.props.onHandleClearState()
		this.props.handleDataSentFalse()
		this.props.clearReducerCardsComplAndRej()
	}

	// отправка данных на сервер
	onHandlePOSTName = () => {

		const { state, updateUserDatas } = this.props

		// если данные прошли валидацию, то разрешить передачу
		if (state.userPersonalDatas.validateRoles.name) {

			let inputData = document.querySelector('input[name="nameUpdate"]').value

			// отоправка изменений
			updateUserDatas(`${ process.env.URL }/updateUserData?userId='${ state.loginUser.results[0].user_id }'&parametr=name&value='${ inputData }'`)
		}
	}

	onHandlePOSTPhoneNumber = () => {

		const { state, updateUserDatas } = this.props

		if (state.userPersonalDatas.validateRoles.phoneNumber) {
			
			let inputData = document.querySelector('input[name="phoneUpdate"]').value

			// отоправка изменений
			updateUserDatas(`${ process.env.URL }/updateUserData?userId=${ state.loginUser.results[0].user_id }&parametr=phoneNumber&value=${ inputData }`)
		}
	}

	onHandlePOSTPhoneCity = () => {

		const { state, updateUserDatas } = this.props

		if (state.userPersonalDatas.validateRoles.city) {

			let inputData = document.querySelector('input[name="cityUpdate"]').value

			// отоправка изменений
			updateUserDatas(`${ process.env.URL }/updateUserData?userId=${ state.loginUser.results[0].user_id }&parametr=city&value=${ inputData }`)
		}
	}

	onHandlePOSTPhonePassword = () => {

		const { state, updateUserDatas } = this.props

		if (state.userPersonalDatas.validateRoles.password === true) {

			let inputData = document.querySelector('input[name="passwordUpdate"]').value

			// отоправка изменений
			updateUserDatas(`${ process.env.URL }/updateUserData?userId=${ state.loginUser.results[0].user_id }&parametr=password&value=${ inputData }`)
		}
	}

	//validate function
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

	// name validate
	validateName = e => {

		const { validateNameDispatch, handleDataSentFalse } = this.props

		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
		this.validate(e, regexpName, validateNameDispatch)

		// скрыть сообщение об успешной отправке
		handleDataSentFalse()
	}

	// phone number validate
	validatePhoneNumber = e => {

		let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
		this.validate(e, regexpName, this.props.validatePhoneDispatch)

		// скрыть сообщение об успешной отправке
		this.props.handleDataSentFalse()
	}

	// city validate
	validateCity = e => {

		let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
		this.validate(e, regexpName, this.props.validateCityDispatch)

		// скрыть сообщение об успешной отправке
		this.props.handleDataSentFalse()
	}

	// password validate
	validatePassword = e => {

		let regexpName = /^[a-z0-9_-]{6,18}$/
		this.validate(e, regexpName, this.props.validatePasswordDispatch)

		// скрыть сообщение об успешной отправке
		this.props.handleDataSentFalse()
	}

	// sent message
	sentMessage = () => {
		return (
			<div className='sentMessage'>
				<i className='fa fa-check' aria-hidden='true' />
				<p>Данные успешно изменены</p>
			</div>
		)
	}

	sentMessageError = () => {
		return (
			<div className='sentMessage'>
				<i className='fa fa-check' aria-hidden='true' />
				<p>Ошибка</p>
			</div>
		)
	}

	render() {

		const styles = {
			inkBarStyle: { backgroundColor: false },
			default_tab: {
				backgroundColor: 'white',
				color: '#add1ed',
				height: 'auto'
			},
			active_tab:{
				backgroundColor: '#2397f3',
				color: 'white'
			},
			tabItemContainerStyle: { minHeight: '100px' }
		}

		styles.tab = []
		styles.tab[0] = styles.default_tab
		styles.tab[1] = styles.default_tab
		styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[ this.state.slideIndex ], styles.active_tab)
		
		const handleActive = e => {
			this.setState({
				slideIndex: e.props.value
			})
		}

		const { state } = this.props

		return (
			<div className='personalDatasAccount'>
				<div>
					<div className='titleBlock'>
						<p>Персональные данные</p>
						{ state.userPersonalDatas.dataSent ? this.sentMessage() : null}
						{ state.userPersonalDatas.dataSent === 'Ошибка' ? this.sentMessageError() : null }
					</div>
					<table>
						<tbody>

							<TableRowsComponent
								name='Имя'
								resultsElem='name'
								state={ state }
								hintText='Введите новое имя'
								changeFunc={ this.validateName }
								nameText='nameUpdate'
								errorElem='name'
								submitFunc={ this.onHandlePOSTName }
							/>

							<TableRowsComponent
								name='Номер телефона'
								resultsElem='phoneNumber'
								state={ state }
								hintText='Введите новый номер'
								changeFunc={ this.validatePhoneNumber }
								nameText='phoneUpdate'
								errorElem='phoneNumber'
								submitFunc={ this.onHandlePOSTPhoneNumber }
							/>

							<TableRowsComponent
								name='Город'
								resultsElem='city'
								state={ state }
								hintText='Введите название города'
								changeFunc={ this.validateCity }
								nameText='cityUpdate'
								errorElem='city'
								submitFunc={ this.onHandlePOSTPhoneCity }
							/>

							<TableRowsComponent
								name='Пароль'
								resultsElem='password'
								state={ state }
								hintText='Введите новый пароль'
								changeFunc={ this.validatePassword }
								nameText='passwordUpdate'
								errorElem='password'
								submitFunc={ this.onHandlePOSTPhonePassword }
							/>

						</tbody>
					</table>
				</div>
				<div className='tabsBlock'>
					<p>Мои объявления</p>

					<Tabs
						value={ this.state.value }
						onChange={ this.handleChange }
						className='sendAndRegTabs'
						inkBarStyle={ styles.inkBarStyle }
					>

						<Tab
							label={ `Активные ${ state.serverReducer.advertisementList.length }` }
							value='0'
							className='tabBtn'
							style={ styles.tab[0] }
							onActive={ handleActive }
						>
							<div>
								{
									state.serverReducer.advertisementList.length > 0 ?
										state.serverReducer.advertisementList.map(elem => <CardItem
											key={ elem.card_id }
											id={ elem.card_id }
											title={ elem.title }
											briefDescription={ elem.briefDescription }
											city={ elem.city }
											userName={ elem.userName }
											userStatus={ elem.userStatus }
											phoneNumber={ elem.phoneNumber }
											rating={ elem.rating }
											price={ elem.price }
											imgPath={ elem.imgPath }
											advType={ elem.advType }
											deleted={ true }
											dataDelete={ elem.data_delete }
											deleteInfo={ true }
											onClick={ this.handleClickCard }
										/>) : <p>Активных объявлений нет</p>
								}
							</div>

						</Tab>

						<Tab
							label={ `Завершенные/Отклоненные ${ state.reducerCardsComplAndRej.length }` }
							value='1'
							className='tabBtn'
							style={ styles.tab[1] }
							onActive={ handleActive }
						>
							<div>
								{
									state.reducerCardsComplAndRej.length > 0 ?
										state.reducerCardsComplAndRej.map(elem => <CardItem
											key={ elem.card_id }
											id={ elem.card_id }
											title={ elem.title }
											briefDescription={ elem.briefDescription }
											city={ elem.city }
											userName={ elem.userName }
											userStatus={ elem.userStatus }
											phoneNumber={ elem.phoneNumber }
											rating={ elem.rating }
											price={ elem.price }
											imgPath={ elem.imgPath }
											advType={ elem.advType }
											deleted={ false }
											dataDelete={ elem.data_delete }
											deleteInfo={ true }
										/>) : <p>Завершенных объявлений нет</p>
								}
							</div>
						</Tab>

					</Tabs>
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({ state }),
	dispatch => bindActionCreators({
		...actionsUserPersonalDatas,
		...actionsReducerCardsComplAndRej,
		...actionsServerReducer,
		...actionsLoginUser
	}, dispatch)
)(PersonalDatasAccount)