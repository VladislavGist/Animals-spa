export default function fetchComponentsData(dispatch, components, params, query) {

	console.log({ components })

	const promises = components.map(current => {

		console.log({ current })

		const component = current.WrappedComponent ? current.WrappedComponent : current

		return component.fetchData() ? component.fetchData(dispatch, params, query) : null
	})

	return Promise.all(promises)
}