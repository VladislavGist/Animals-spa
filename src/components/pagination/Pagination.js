import React, { Component } from 'react'
import PaginationUI from 'material-ui-pagination'
import { connect } from 'react-redux'

if (process.env.BROWSER) {
	require('./pagination.sass')
}

class Pagination extends Component {

	handleChangePage = pageNumber => {
		console.log({ pageNumber })
	}

	render() {
		return (
			<div className='centeringElement Pagination__mTop'>
				<PaginationUI
					total = { 10 }
					current = { 1 }
					display = { 10 }
					onChange = { this.handleChangePage }
				/>
			</div>
		)
	}
}

export default connect(() => {})(Pagination)

