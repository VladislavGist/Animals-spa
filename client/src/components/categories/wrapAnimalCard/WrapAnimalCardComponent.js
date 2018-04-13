import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { actions as actionsArticles } from '../../../ducks/articles'
// import { actions as preloaderReducer } from '../../../ducks/preloader'

import connectDataFetches from '../../../../HOCS/connectDataFetches'

import AnimalCard from '../animalCard/AnimalCardComponent'


class WrapAnimalCard extends Component {

	componentWillUnmount() {
		this.props.onHandleClearState()
	}

	render() {
		const { params } = this.props

		return (
			<div>
				<AnimalCard
					key={ params.advertisment }
					animal_type={ params.type }
					advertisment={ params.advertisment }
					getCards={ this.props.getCards }
				/>
			</div>
		)
	}
}

export default connect(
	state => ({ state }),
	{ ...actionsArticles }
)(WrapAnimalCard)