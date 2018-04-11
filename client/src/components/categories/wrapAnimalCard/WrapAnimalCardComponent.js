import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { actions } from '../../../ducks/serverReducer'
// import { actions as preloaderReducer } from '../../../ducks/preloader'
import { actions as serverReducer } from '../../../ducks/serverReducer'

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
	dispatch => bindActionCreators({ ...actions, ...serverReducer }, dispatch)
)(connectDataFetches(WrapAnimalCard, [serverReducer.getCards]))