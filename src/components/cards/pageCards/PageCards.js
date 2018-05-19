import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import { moduleName } from '../../../ducks/articles'
import { actions as actionsArticles } from '../../../ducks/articles'

import CardsList from '../cardsList/CardsList'

class PageCards extends Component {

	componentDidMount() {
		const { getCards, params, filterCity } = this.props

		// index page cards
		if (!params.type) getCards({ moderate: 'resolve', filterCity })

		// all pages cards
		getCards({ moderate: 'resolve', type_cards: params.type, advertisment_cards: params.advertisment, filterCity })
	}

	componentWillReceiveProps(next) {
		const { pathName, filterCity } = this.props

		// all pages cards
		if ((next.pathName !== pathName) || (next.filterCity !== filterCity)) {
			next.getCards({ moderate: 'resolve', type_cards: next.params.type, advertisment_cards: next.params.advertisment, filterCity: next.filterCity })
		}
	}

	render() {
		const { articlesList, pathName } = this.props

		return (
			<div>
				{ pathName === '/' && <h2 className='newCardsTitle'>Новые объявления</h2> }
				<CardsList cardsList={ articlesList } />
			</div>
		)
	}
}

PageCards.propTypes = {
	getCards: PropTypes.func.isRequired,
	params: PropTypes.object.isRequired,
	filterCity: PropTypes.string.isRequired,
	pathName: PropTypes.string.isRequired,
	articlesList: PropTypes.array
}

PageCards.defaultProps = {
	filterCity: 'Все регионы',
	pathName: '/',
	articlesList: []
}

export default connect(state => ({
	pathName: state.routing.locationBeforeTransitions.pathname,
	articlesList: state[moduleName].articlesList,
	filterCity: state.filterCity.cityTopHeader
}), { ...actionsArticles })(PageCards)