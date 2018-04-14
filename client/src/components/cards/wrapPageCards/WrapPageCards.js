import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions as actionsArticles } from '../../../ducks/articles'

import PageCards from '../pageCards/PageCards'

class WrapPageCards extends Component {

	componentWillUnmount() {
		this.props.onHandleClearState()
	}

	render() {
		const { params } = this.props

		return (
			<div>
				<PageCards animal_type={ params.type } animal_advertisment={ params.advertisment } />
			</div>
		)
	}
}

export default connect(null, { ...actionsArticles })(WrapPageCards)