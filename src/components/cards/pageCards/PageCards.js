import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import { moduleName } from '../../../ducks/articles'
import { actions as actionsArticles } from '../../../ducks/articles'

import CardsList from '../cardsList/CardsList'

class PageCards extends Component {

	componentDidMount() {
		const { getCards, filterCity } = this.props

		getCards({
			city: filterCity,
			animalType: '',
			postType: '',
			page: 1
		})
	}

	componentWillReceiveProps(next) {
		const {
			pathName,
			filterCity
		} = this.props

		const {
			pathName: nextPathName,
			filterCity: nextFilterCity,
			getCards,
			params
		} = next

		if ((nextPathName !== pathName) || (nextFilterCity !== filterCity)) {
			getCards({
				animalType: params.type,
				postType: params.advertisment,
				city: next.filterCity,
				page: 1
			})
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