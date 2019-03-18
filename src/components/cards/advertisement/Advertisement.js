import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Advertisement extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired
	}

	static defaultProps = {
		id: ''
	}

	render() {
		const { id } = this.props

		return (
			!id ? (
				<p>Такого объявления нет</p>
			) : (
				<div>
					{ id }
				</div>
			)
		)
	}
}

export default connect(
	(state, ownProps) => {
		const { params: { id } } = ownProps

		return {
			id
		}
	}
)(Advertisement)