import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import CardItems from './CardItems.jsx'
import { actions as serverReducer } from '../../ducks/serverReducer'
import { actions as preloaderReducer } from '../../ducks/preloader'

class AnimalCard extends Component {

	constructor(props) {
		super(props)
		this.path = _.compact(props.state.routing.locationBeforeTransitions.pathname.split('/'))
	}

	componentDidMount() {

		const { animal_type, getCards, state, advertisment } = this.props

		//выводит объявлений на главной странице
		if (animal_type === undefined) {
			getCards(process.env.URL + '/list-hot-adv/' + state.filterCity.cityTopHeader)
		} else {
			//выводит на остальных
			getCards(process.env.URL + '/list-animals/animal_type/' + animal_type + '/advertisement_type/' + advertisment + '/city/' + state.filterCity.cityTopHeader + '/count/10')
		}
	}

	componentWillReceiveProps(next) {

		const { getCards } = this.props
		const { filterCity } = this.props.state

		let path = _.compact(next.state.routing.locationBeforeTransitions.pathname.split('/'))

		if (this.path[1] !== path[1]) {

			this.path[1] = path[1]

			getCards(process.env.URL + '/list-animals/animal_type/' + path[1] + '/advertisement_type/' + path[2]  + '/city/' + filterCity.cityTopHeader + '/count/10')
		}
	}

	render() {

		const { animal_type, state } = this.props

		return (
			<div>
				{
					animal_type === undefined ? <h2 className='newCardsTitle'>Новые объявления</h2> : null
				}
				<CardItems datas={ state.serverReducer.advertisementList } />
			</div>
		);
	}
}

export default connect(state => ({ state }),
	dispatch => bindActionCreators({ ...serverReducer, ...preloaderReducer }, dispatch)
)(AnimalCard)