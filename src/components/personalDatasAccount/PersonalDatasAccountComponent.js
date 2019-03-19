import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import _ from 'lodash'

import Card from '../cards/card/Card'
import TableRowsComponent from './tableRows/TableRowsComponent'

if (process.env.BROWSER) {
	require('../personalArea/PersonalAreaStyles.sass')
	require('../cards/cardsList/cardsList.sass')
}
class PersonalDatasAccount extends Component {

	state = { value: '0', slideIndex: 0 }

	handleChange = value => this.setState({ value: value })

	handleActive = e => this.setState({ slideIndex: e.props.value })

	render() {
		const {
			resolveCards,
			rejectedCards,
			moderatingCards
		} = this.props

		const styles = {
			inkBarStyle: { backgroundColor: false },
			default_tab: {
				backgroundColor: 'white',
				color: '#add1ed',
				height: 'auto'
			},
			active_tab: {
				backgroundColor: '#2397f3',
				color: 'white'
			},
			tabItemContainerStyle: { minHeight: '100px' },
		}

		styles.tab = []
		styles.tab[0] = styles.default_tab
		styles.tab[1] = styles.default_tab
		styles.tab[2] = styles.default_tab
		styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[ this.state.slideIndex ], styles.active_tab)

		console.log({moderatingCards})

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
							label={ `Активные ${ resolveCards && resolveCards.length }` }
							value='0'
							className='tabBtn'
							style={ styles.tab[0] }
							onActive={ this.handleActive }
						>
							<div>
								{ resolveCards && resolveCards.length > 0 ?
									resolveCards.map(card => <Card
										key={ card._id }
										addDate={ card.createdAt }
										city={ card.city }
										cardId={ card._id }
										title={ card.title }
										price={ card.price }
										imgPath={ card.imageUrl }
										advType={ card.postType }
										userName={ card.creatorName }
										deleteDate={ card.stopDate }
										phoneNumber={ card.phoneNumber }
										briefDescription={ card.content }
										views={ null }
										rating={ null }
										userStatus={ null }
										stopped={ true }
										stoppedInfo={ true }
									/>) : <p>Активных объявлений нет</p> }
							</div>
						</Tab>

						<Tab
							label={ `Заверш./Отклон. ${ rejectedCards && rejectedCards.length }` }
							value='1'
							className='tabBtn'
							style={ styles.tab[1] }
							onActive={ this.handleActive }
						>
							<div>
								{ rejectedCards && rejectedCards.length > 0 ?
									rejectedCards.map(card => <Card
										key={ card._id }
										addDate={ card.createdAt }
										city={ card.city }
										cardId={ card._id }
										title={ card.title }
										price={ card.price }
										imgPath={ card.imageUrl }
										advType={ card.postType }
										userName={ card.creatorName }
										phoneNumber={ card.phoneNumber }
										briefDescription={ card.content }
										views={ null }
										rating={ null }
										userStatus={ null }
										deleted={ true }
									/>) : <p>Завершенных объявлений нет</p>}
							</div>
						</Tab>

						<Tab
							label={ `На модерации ${ moderatingCards && moderatingCards.length }` }
							value='2'
							className='tabBtn'
							style={ styles.tab[2] }
							onActive={ this.handleActive }
						>
							<div>
								{ moderatingCards && moderatingCards.length > 0 ?
									moderatingCards.map(card => <Card
										key={ card._id }
										addDate={ card.createdAt }
										city={ card.city }
										cardId={ card._id }
										title={ card.title }
										price={ card.price }
										imgPath={ card.imageUrl }
										advType={ card.postType }
										userName={ card.creatorName }
										phoneNumber={ card.phoneNumber }
										briefDescription={ card.content }
										views={ null }
										rating={ null }
										deleted={ true }
										stopped={ null }
									/>) : <p>Активных объявлений нет</p> }
							</div>
						</Tab>

					</Tabs>
				</div>
			</div>
		)
	}
}

PersonalDatasAccount.propTypes = {
	resolveCards: PropTypes.array,
	rejectedCards: PropTypes.array,
	moderatingCards: PropTypes.array
}

export default connect(
	state => {
		let articles = _.get(state, 'auth.user.posts')

		return {
			resolveCards: articles && articles.filter(card => card.moderate === 'resolve' && card.active),
			rejectedCards: articles && articles.filter(card => (card.moderate === 'reject' || !card.active) || (card.moderate === 'resolve' && !card.active)),
			moderatingCards: articles && articles.filter(card => card.moderate === 'pending' && card.active)
		}
	}
)(PersonalDatasAccount)