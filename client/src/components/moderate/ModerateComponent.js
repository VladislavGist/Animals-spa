import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import CardItem from '../categories/cardItem/CardItemComponent.js'
import { actions as actionsArticles } from '../../ducks/articles'

class Moderate extends Component {

	componentWillMount() {
		// this.props.getCards(`${ process.env.URL_PATH }/api/moderate`)
	}

	componentWillUnmount() {
		// this.props.onHandleClearState()
	}

	render() {
		const { serverReducer } = this.props

		return (
			<div>
				{
					serverReducer.advertisementList.length ? serverReducer.advertisementList.map(elem => <CardItem
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
						moderate={ true }
					/>) : <p>Объявлений на модерацию нет</p>
				}
			</div>
		)
	}
}

export default connect(
	state => ({ serverReducer: state.articles }),
	dispatch => bindActionCreators({ ...actionsArticles }, dispatch)
)(Moderate)