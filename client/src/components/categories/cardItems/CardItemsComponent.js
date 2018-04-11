import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import firebase from 'firebase'

import { store } from '../../../routing'
import CardItem from '../cardItem/CardItemComponent'
import { actions as actionsServerReducer } from '../../../ducks/serverReducer'
import { actions as actionsAllParamsUrl } from '../../../ducks/allParamsUrl'

if (process.env.BROWSER) {
	require('./CardItemsStyles.sass')
}

class CardItems extends Component {

	// constructor() {
	// 	super()
	// 	this.elem = store.getState().serverReducer
	// 	this.countMore = 20
	// 	this.topPosition = 0
	// }

	componentDidMount() {

		// смотрим расстояние от верха. Нужно для корректной работы "еще объявления"
		// window.onscroll = () => {
		// 	this.topPosition = document.documentElement.scrollTop
		// }

		// firebase.database().ref('/users')

		// this.props.onReplaceAllUrl(this.props.state.routing.locationBeforeTransitions && this.props.state.routing.locationBeforeTransitions.pathname)
	}

	componentWillUnmount() {
		// this.props.onHandleClearState()
		// this.countMore = 20
		// this.topPosition = 0
	}

	componentWillUpdate() {
		// при каждом изменении url будем скролится на то место на котором были
		// document.documentElement.scrollTop = this.topPosition
	}

	addMoreCards = () => {
		// const { state, getCards, allCards } = this.props

		// getCards(process.env.URL_PATH + '/api' + '/list-animals/animal_type/' + state.allParamsUrl.split('/')[2] + '/advertisement_type/' + state.allParamsUrl.split('/')[3]  + '/city/' + state.filterCity.cityTopHeader + '/count/' + this.countMore)

		// allCards(process.env.URL_PATH + '/api' + '/list-animals/animal_type/' + state.allParamsUrl.split('/')[2] + '/advertisement_type/' + state.allParamsUrl.split('/')[3]  + '/city/' + state.filterCity.cityTopHeader + '/count/' + this.countMore + '/allcount')

		// this.countMore += 10
	}

	render() {
		const { state, datas } = this.props

		return (
			<div className={
				classNames({
					wrapCardsContent: true,
					indexPageClassWrap: state.allParamsUrl === '/'
				})
			}
			>
				<article className={
					classNames({
						cardItems: true,
						indexPageClass: state.allParamsUrl === '/'
					})
				}>
					{
						datas.length > 0 ? datas.map(elem => <CardItem
							cardId={ elem.card_id }
							key={ elem.card_id }
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
							views={ elem.views }
						/>) : <p className='noCardsTitle'>Объявлений нет</p>
					}
					{ datas.length > 0 && state.allParamsUrl !== '/' ?
						(state.toggleAddMoreBtn ?
							<a href='javascript:void(0)' className='addMore button2' onClick={ this.addMoreCards }>Ещё объявления</a>
							: null) : null }
				</article>
				<aside className='cardsBanners'>
					Здесь будет реклама Яндекс.Директ
				</aside>
			</div>
		)
	}
}

export default connect(state => ({ state }),
	dispatch => bindActionCreators({ ...actionsServerReducer, ...actionsAllParamsUrl }, dispatch)
)(CardItems)