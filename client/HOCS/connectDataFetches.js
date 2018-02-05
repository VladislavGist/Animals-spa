import React  from 'react'
import Promise from 'bluebird'

export default function connectDataFetches(Component, actionCreators) {

	return class DataFetchesWrapper extends React.Component {

		static fetchData(dispatch, params = {}, query={}) {

			return dispatch ? Promise.all(
				actionCreators.map(actionCreator => {
					// console.log('actionCreator: ', actionCreator)
					return dispatch(actionCreator(params, query))
				})
			) : null
		}

		componentDidMount() {

			DataFetchesWrapper.fetchData(
				this.props.dispatch,
				this.props.params,
				this.props.location && this.props.location.query
			)
		}

		render() {
			return <Component { ...this.props } />
		}

	}
}