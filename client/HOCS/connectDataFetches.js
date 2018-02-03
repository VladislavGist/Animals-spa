import React  from 'react'
import Promise from 'bluebird'

import _ from 'underscore'

export default function connectDataFetches(Components, actionCreators) {

	return class DataFetchesWrapper extends React.Component {

		static propTypes = {
			dispatch: React.PropTypes.func.isRequired,
			params: React.PropTypes.object.isRequired,
			location: React.PropTypes.object.isRequired
		}

		static fetchData(dispatch, params = {}, query={}) {

			const obj = actionCreators[0]

			return Promise.all(
				_.mapObject(obj, val => {
					dispatch(val(params, query))
				})
			)

			// return Promise.all(
			// 	for (let i in obj) {
			// 		console.log(obj[i])
			// 		dispatch(obj[i](params, query))
			// 	}
			// )

			// return Promise.all(
			// 	actionCreators.map(item => {
			//
			// 		// console.log('item: ', item)
			// 		dispatch(item(params, query))
			// 	})
			// )
		}

		componentDidMount() {

			const { dispatch, params, location: { query } } = this.props

			DataFetchesWrapper.fetchData(
				dispatch,
				params,
				query
			)
		}

		render() {

			return <Components { ...this.props } />
		}

	}
}