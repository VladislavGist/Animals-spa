import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { actions } from '../../../ducks/serverReducer'
// import { actions as preloaderReducer } from '../../../ducks/preloader'
import { actions as serverReducer } from '../../../ducks/serverReducer'

import connectDataFetches from '../../../../HOCS/connectDataFetches'

import AnimalCard from '../animalCard/AnimalCardComponent'


class WrapAnimalCard extends Component {

	constructor() {
		super()
		this.animal_type
		this.advertisment
	}

	componentWillUnmount() {
		this.props.onHandleClearState()
	}

	render() {

		const { params } = this.props

		this.animal_type = params.type
		this.advertisment = params.advertisment

		return (
			<div>
				<AnimalCard
					key={ params.advertisment }
					animal_type={ this.animal_type }
					advertisment={ this.advertisment }
					getCards={ this.props.getCards }
				/>
			</div>
		)
	}
}

export default connect(
	state => ({ state }),
	dispatch => bindActionCreators({ ...actions, ...serverReducer }, dispatch)
)(connectDataFetches(WrapAnimalCard, [serverReducer.getCards]))