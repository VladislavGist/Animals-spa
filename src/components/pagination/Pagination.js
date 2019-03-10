import React, { Component, PropTypes } from 'react'
import PaginationUI from 'material-ui-pagination'
import { connect } from 'react-redux'

import { actions as actionsArticlesReducer } from '../../ducks/articles'

if (process.env.BROWSER) {
	require('./pagination.sass')
}

class Pagination extends Component {

	static defaultProps = {
		allPages: 10
	}

	static propTypes = {
		changePage: PropTypes.func.isRequired,
		allPages: PropTypes.number
	}

	handleChangePage = pageNumber => {
		const { changePage } = this.props

		changePage(pageNumber)
	}

	render() {
		const { allPages } = this.props

		return (
			<div className='centeringElement Pagination__mTop'>
				<PaginationUI
					total = { allPages }
					current = { 1 }
					display = { allPages }
					onChange = { this.handleChangePage }
				/>
			</div>
		)
	}
}

export default connect(null, actionsArticlesReducer)(Pagination)

