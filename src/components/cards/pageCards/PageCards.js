import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import { moduleName } from '../../../ducks/articles'
import { actions as actionsArticles } from '../../../ducks/articles'
import { actions as actionsMenu } from '../../../ducks/menuReducer'

import CardsList from '../cardsList/CardsList'

class PageCards extends Component {

	componentDidMount() {
		const {
			getCards,
			filterCity,
			currentPagePagination,
			params,
			changePage,
			getCategories
		} = this.props

		const animalKind = _.get(params, 'type')
		const postType = _.get(params, 'advertisment')

		getCards({
			city: filterCity,
			animalType: animalKind ? animalKind : '',
			postType: postType ? postType : '',
			page: currentPagePagination
		})

		changePage(1)
		getCategories(filterCity)
	}

	componentWillReceiveProps(next) {
		const {
			pathName,
			params,
			filterCity,
			currentPagePagination,
			changePage,
			getCategories
		} = this.props

		const {
			pathName: nextPathName,
			filterCity: nextFilterCity,
			getCards,
			params: nextParams,
			currentPagePagination: nextCurrentPagePagination
		} = next

		if (
			(nextPathName !== pathName)
			|| (nextFilterCity !== filterCity)
			|| (nextCurrentPagePagination !== currentPagePagination)
		) {
			getCards({
				animalType: params.type,
				postType: params.advertisment,
				city: next.filterCity,
				page: nextCurrentPagePagination
			})

			if (nextParams.type !== params.type) {
				getCategories(nextFilterCity)
			}

			if (nextCurrentPagePagination === currentPagePagination) {
				changePage(1)
			}
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
	articlesList: PropTypes.array,
	currentPagePagination: PropTypes.number.isRequired
}

PageCards.defaultProps = {
	filterCity: 'Все регионы',
	pathName: '/',
	articlesList: []
}

export default connect(state => ({
	pathName: state.routing.locationBeforeTransitions.pathname,
	articlesList: state[moduleName].articlesList,
	filterCity: state.filterCity.cityTopHeader,
	currentPagePagination: state.articles.currentPagePagination
}), {
	...actionsArticles,
	...actionsMenu
})(PageCards)