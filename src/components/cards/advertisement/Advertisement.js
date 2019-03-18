import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return {

	};
}

class Advertisement extends Component {
	render() {
		return (
			<div>
				Hello
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
)(Advertisement);