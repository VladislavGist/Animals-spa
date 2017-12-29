import React, { Component } from 'react'

import '../src/styles/styles.sass'

export default class Wrapper extends Component {
	render() {
		return <div>
			{ this.props.children }
		</div>
	}
}