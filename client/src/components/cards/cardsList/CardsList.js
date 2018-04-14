import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { actions as actionsArticles } from '../../../ducks/articles'
import { actions as actionsAllParamsUrl } from '../../../ducks/allParamsUrl'

import Card from '../card/Card'

if (process.env.BROWSER) {
	require('./cardsList.sass')
}

class CardsList extends Component {

	render() {
		const { cardsList, pathName } = this.props

		return (
			<div className={ classNames({ wrapCardsContent: true, indexPageClassWrap: pathName === '/' }) }>
				<article className={ classNames({ cardItems: true, indexPageClass: pathName === '/' }) }>
					{
						cardsList.length ? cardsList.map(card => <Card
							cardId={ card.key }
							key={ card.key }
							title={ card.title }
							briefDescription={ card.textArea }
							city={ card.city }
							userName={ card.userName }
							phoneNumber={ card.phoneNumber }
							price={ card.price }
							imgPath={ card.images }
							advType={ card.category }
							rating={ null }
							userStatus={ null }
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

export default connect(mapStateToProps, { ...actionsArticles, ...actionsAllParamsUrl })(CardsList)