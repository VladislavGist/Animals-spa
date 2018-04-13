import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import firebase from 'firebase'

import { store } from '../../../routing'
import CardItem from '../cardItem/CardItemComponent'
import { actions as actionsArticles } from '../../../ducks/articles'
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
		
	}

	render() {
		const { datas, pathName } = this.props

		return (
			<div className={
				classNames({
					wrapCardsContent: true,
					indexPageClassWrap: pathName === '/'
				})
			}
			>
				<article className={
					classNames({
						cardItems: true,
						indexPageClass: pathName === '/'
					})
				}>
					{
						datas.length > 0 ? datas.map(elem => <CardItem
							cardId={ elem.key }
							key={ elem.key }
							title={ elem.title }
							briefDescription={ elem.textArea }
							city={ elem.city }
							userName={ elem.userName }
							userStatus={ null }
							phoneNumber={ elem.phoneNumber }
							rating={ null }
							price={ elem.price }
							imgPath={ elem.images }
							advType={ elem.category }
							views={ null }
						/>) : <p className='noCardsTitle'>Объявлений нет</p>
					}
					{/* { datas.length > 0 && pathName !== '/' ?
						(state.toggleAddMoreBtn ?
							<a href='javascript:void(0)' className='addMore button2' onClick={ this.addMoreCards }>Ещё объявления</a>
							: null) : null } */}
				</article>
				<aside className='cardsBanners'>
					Здесь будет реклама Яндекс.Директ
				</aside>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	pathName: state.routing.locationBeforeTransitions.pathname,
})

export default connect(mapStateToProps, { ...actionsArticles, ...actionsAllParamsUrl })(CardItems)