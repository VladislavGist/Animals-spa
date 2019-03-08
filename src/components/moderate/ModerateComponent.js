import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Card from '../cards/card/Card'

import { actions as actionsArticles } from '../../ducks/articles'

import config from '../../../config'

class Moderate extends Component {

	componentWillMount() {
		const { getCards } = this.props
		getCards({ active: true, moderate: 'pending' })
	}

	componentWillUnmount() {
		this.props.onHandleClearState()
	}

	changeActiveStatusPost = (cardId, event) => {
		const {
			moderateCard
		} = this.props

		const status = event.target.getAttribute('data-action')

		moderateCard(`${ config.payPetsApiUrl }/api/feed/moderatePost`, cardId, status)
	}

	render() {
		const { articlesList } = this.props

		return (
			<div>
				{ articlesList.length > 0 ? articlesList.map(card => <Card
					addDate={ card.createdAt }
					userId={ card.creatorId }
					cardId={ card._id }
					key={ card._id }
					title={ card.title }
					briefDescription={ card.content }
					city={ card.city }
					userName={ card.creatorName }
					phoneNumber={ card.phoneNumber }
					price={ card.price }
					imgPath={ card.imageUrl }
					advType={ card.postType }
					views={ null }
					rating={ null }
					userStatus={ null }
					moderate={ true }
					changeActiveStatusPost={ this.changeActiveStatusPost }
				/>) : <p>Объявлений на модерацию нет</p> }
			</div>
		)
	}
}

Moderate.propTypes = {
	articlesList: PropTypes.array,
	moderateCard: PropTypes.func.isRequired
}

export default connect(
	state => ({
		articlesList: state.articles.articlesList
	}),
	{
		...actionsArticles
	}
)(Moderate)