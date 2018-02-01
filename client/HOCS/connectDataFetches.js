import React, { Component } from 'react'
import Promise from 'bluebird'

export default function connectDataFetches(Component, actionCreators) {

	return class DataFetchesWrapper extends Component {

		static propTypes = {
			dispatch: React.PropTypes.func.isRequired,
			params: React.PropTypes.object.isRequired,
			location: React.PropTypes.object.isRequired
		}

		static fetchData(dispatch, params = {}, query={}) {
			return Promise.all(
				actionCreators.map(actionCreator => dispatch(actionCreator(params, query)))
			)
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
			return <Component { ...this.props } />
		}

	}
}