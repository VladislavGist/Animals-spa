import _ from 'underscore'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { actions as articlesActions } from '../../../ducks/articles'

import { moduleName } from '../../../ducks/articles'

import CardItems from '../cardItems/CardItemsComponent'

class AnimalCard extends Component {

	// constructor(props) {
	// 	super(props)
	// 	this.path = _.compact(props.state.routing.locationBeforeTransitions && props.state.routing.locationBeforeTransitions.pathname.split('/'))
	// }

	componentDidMount() {
		const { getCards } = this.props

		//выводит объявлений на главной странице
		// if (animal_type === undefined) {
		getCards()
		// } else {
		// 	//выводит на остальных
		// 	getCards(`${ process.env.URL_PATH }/api/list-animals?animal_type=${ animal_type }&advertisement_type=${ advertisment }&city=${ state.filterCity.cityTopHeader }&count=10`)
		// }
	}

	componentWillReceiveProps(next) {

		// const { getCards } = this.props
		// const { filterCity } = this.props.state

		// let path = _.compact(next.state.routing.locationBeforeTransitions && next.state.routing.locationBeforeTransitions.pathname.split('/'))

		// if (this.path[1] !== path[1]) {

		// 	this.path[1] = path[1]

		// 	getCards(`${ process.env.URL_PATH }/api/list-animals/animal_type/${ path[1] }/advertisement_type/${ path[2] }/city/${ filterCity.cityTopHeader }/count/10`)
		// }
	}

	render() {
		const { articlesList, pathName } = this.props

		return (
			<div>
				{ pathName === '/' && <h2 className='newCardsTitle'>Новые объявления</h2> }
				<CardItems datas={ articlesList } />
			</div>
		)
	}
}

export default connect(state => ({
	pathName: state.routing.locationBeforeTransitions.pathname,
	articlesList: state[moduleName].articlesList
}), { ...articlesActions })(AnimalCard)