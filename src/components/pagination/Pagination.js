import React, { Component, PropTypes } from 'react'
import PaginationUI from 'material-ui-pagination'
import { connect } from 'react-redux'

import { actions as actionsArticlesReducer } from '../../ducks/articles'

if (process.env.BROWSER) {
	require('./pagination.sass')
}

class Pagination extends Component {

	static propTypes = {
		changePage: PropTypes.func.isRequired,
		totalItems: PropTypes.number.isRequired,
		currentPagePagination: PropTypes.number.isRequired,
	}

	handleChangePage = pageNumber => {
		const { changePage } = this.props

		changePage(pageNumber)
	}

	render() {
		const {
			totalItems,
			currentPagePagination
		} = this.props

		const pagesCounter = Math.ceil(totalItems / 10)

		return (
			<div className='centeringElement Pagination__mTop'>
				<PaginationUI
					total = { pagesCounter }
					current = { currentPagePagination }
					display = { pagesCounter }
					onChange = { this.handleChangePage }
				/>
			</div>
		)
	}
}

export default connect(state => {
	const { articles: {
		totalItems,
		currentPagePagination
	} } = state

	return {
		totalItems,
		currentPagePagination
	}
}, actionsArticlesReducer)(Pagination)

