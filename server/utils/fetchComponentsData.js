export default function fetchComponentsData(dispatch, components, params, query) {

	const promises = components.map(current => {

		const component = current.WrappedComponent ? current.WrappedComponent : current

		return component.fetchData ? component.fetchData(dispatch, params, query) : null
	})

	// console.log('promises: ', promises)

	return Promise.all(promises)
}