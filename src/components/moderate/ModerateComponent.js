import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import Card from '../cards/card/Card'
import { actions as actionsArticles } from '../../ducks/articles'
import { actions as actionsAllParamsUrl } from '../../ducks/allParamsUrl'

class Moderate extends Component {

	componentWillMount() {
		const { getCards } = this.props
		getCards({ moderate: false })
	}

	componentWillUnmount() {
		this.props.onHandleClearState()
	}

	render() {
		const { articlesList } = this.props

		return (
			<div>
				{
					articlesList.length > 0 ? articlesList.map(card => <Card
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
					/>) : <p>Объявлений на модерацию нет</p>
				}
			</div>
		)
	}
}

Moderate.propTypes = {
	removeCardsInDb: PropTypes.func.isRequired,
	articlesList: PropTypes.object
}

export default connect(
	state => ({ articlesList: state.auth.user.posts }),
	{ ...actionsArticles, ...actionsAllParamsUrl }
)(Moderate)