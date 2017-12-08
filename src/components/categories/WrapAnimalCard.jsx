import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { actions } from '../../ducks/serverReducer'

import AnimalCard from './AnimalCard.jsx'

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
				/>
			</div>
		)
	}
}

export default connect(
	state => ({ state }),
	dispatch => bindActionCreators(actions, dispatch)
)(WrapAnimalCard)