import { connect } from 'react-redux'
import React, { Component } from 'react'

import Card from '../cards/card/Card'
import { actions as actionsArticles } from '../../ducks/articles'

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
					articlesList.length ? articlesList.map(card => <Card
						addDate={ card.addDate }
						userId={ card.userId }
						cardId={ card.key }
						key={ card.key }
						title={ card.title }
						briefDescription={ card.textArea }
						city={ card.city }
						userName={ card.userName }
						phoneNumber={ card.phoneNumber }
						price={ card.price }
						imgPath={ card.images }
						advType={ card.advType }
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

export default connect(
	state => ({
		articlesList: state.articles.articlesList
	}),
	{ ...actionsArticles }
)(Moderate)