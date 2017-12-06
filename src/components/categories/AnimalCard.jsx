import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import CardItems from './CardItems.jsx'
import { getCards } from '../../actions/getCards.jsx'

class AnimalCard extends Component {

	constructor(props) {
		super(props)
		this.path = _.compact(props.state.routing.locationBeforeTransitions.pathname.split('/'))
	}

	componentDidMount() {

		const { animal_type, handleGetCards, state, advertisment } = this.props

		//выводит объявлений на главной странице
		if (animal_type === undefined) {
			handleGetCards(process.env.URL + '/list-hot-adv/' + state.filterCity.cityTopHeader)
		} else {
			//выводит на остальных
			handleGetCards(process.env.URL + '/list-animals/animal_type/' + animal_type + '/advertisement_type/' + advertisment + '/city/' + state.filterCity.cityTopHeader + '/count/10')
		}
	}

	componentWillReceiveProps(next) {

		let path = _.compact(next.state.routing.locationBeforeTransitions.pathname.split('/'))

		if(this.path[1] !== path[1]) {

			this.path[1] = path[1]
			
			this.getCards(path)
		}
	}

	getCards = pathname => {
		//выводит на остальных
		this.props.handleGetCards(process.env.URL + '/list-animals/animal_type/' + pathname[1] + '/advertisement_type/' + pathname[2]  + '/city/' + this.props.state.filterCity.cityTopHeader + '/count/10')
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
	dispatch => ({
		handleUpdateStateLoading: e => {
			dispatch({ type: 'UPDATE_LOADING', payload: e })
		},
		handleGetCards: url => {
			dispatch(getCards(url))
		}
	}))(AnimalCard)