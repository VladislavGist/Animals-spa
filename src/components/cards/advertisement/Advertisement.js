import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { actions as articlesActions } from '../../../ducks/articles'

class Advertisement extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired
	}

	static defaultProps = {
		id: ''
	}

	componentWillMount() {
		const { id, getOpenedCard } = this.props

		getOpenedCard(id)
	}

	render() {
		const {
			
		} = this.props

		return (
			<div>
				my text
			</div>
		)
	}
}

export default connect(
	(state, ownProps) => {
		const { params: { id } } = ownProps

		return { id }
	},
	{ ...articlesActions }
)(Advertisement)