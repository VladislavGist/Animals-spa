import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Tabs, Tab } from 'material-ui/Tabs'

import CardItem from '../categories/cardItem/CardItemComponent'
import TableRowsComponent from './tableRows/TableRowsComponent'

import { actions as actionsLoginUser } from '../../ducks/loginUser'
import { actions as actionsServerReducer } from '../../ducks/serverReducer'
import { actions as actionsReducerCardsComplAndRej } from '../../ducks/reducerCardsComplAndRej'

if (process.env.BROWSER) {
	require('../personalArea/PersonalAreaStyles.sass')
	require('../categories/cardItems/CardItemsStyles.sass')
}

class PersonalDatasAccount extends Component {

	state = { value: '0', slideIndex: 0 }

	handleChange = value => this.setState({ value: value })

	componentWillMount() {

		const {
			loadCardsComplAndRej,
			getCards,
			state,
			updateDatasTrue
		} = this.props

		loadCardsComplAndRej(`${ process.env.URL }/api/userCardsComplAndRejected?userid=${ state.loginUser.user_id }`)
		getCards(`${ process.env.URL }/api/userCardsAccepted?userid=${ state.loginUser.user_id }`)

		// запрашивать от сервера последние данные по аккаунту
		updateDatasTrue(`${ process.env.URL }/api/updateDatasAccount?userid=${ state.loginUser.user_id }`)
	}

	componentWillUnmount() {
		this.props.onHandleClearState()
		this.props.handleDataSentFalse()
		this.props.clearReducerCardsComplAndRej()
	}

	handleActive = e => this.setState({ slideIndex: e.props.value })

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
			tabItemContainerStyle: { minHeight: '100px' },
		}

		styles.tab = []
		styles.tab[0] = styles.default_tab
		styles.tab[1] = styles.default_tab
		styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[ this.state.slideIndex ], styles.active_tab)

		const { state } = this.props

		return (
			<div className='personalDatasAccount'>
				<div>
					<div className='titleBlock'>
						<p>Персональные данные</p>
					</div>
					<TableRowsComponent />
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
							onActive={ this.handleActive }
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
							onActive={ this.handleActive }
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
		...actionsReducerCardsComplAndRej,
		...actionsServerReducer,
		...actionsLoginUser
	}, dispatch)
)(PersonalDatasAccount)