export default function fetchComponentsData(dispatch, components, params, query) {

	const promises = components.map(current => {

		const component = current !== undefined && current.WrappedComponent ? current.WrappedComponent : current

		return component && component.fetchData ? component(dispatch, params, query) : null
	})

	return Promise.all(promises)
}