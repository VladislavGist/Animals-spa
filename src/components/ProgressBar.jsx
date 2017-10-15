import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import {connect} from "react-redux";

//store
import {store} from "./store.jsx";

class LinearProgressExampleDeterminate extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			completed: props.state.preloader.loading
		};
		this.subs;
		this.elem = store.getState().serverReducer;
	}

	componentDidMount() {
		this.subs = store.subscribe(() => {

			if(store.getState().serverReducer !== this.elem) {
				
				this.setState({
					completed: this.props.state.preloader.loading
				});
			}

			//сохранил текущую часть Store чтобы прелоадер корректно работал
			this.elem = store.getState().serverReducer;
		});
	}

	componentWillUnmount() {
		this.subs();
	}

	render() {
		const style = {
			progress: {
				"position":"fixed",
				"zIndex": 1000,
				"backgroundColor":"transparent"
			}
		};

		return (
			<LinearProgress mode="determinate" value={this.state.completed} style={style.progress} color="#2196f3"  />
		);
	}
}

export default connect(
	state => ({
		state: state
	}),
	dispatch => ({})
)(LinearProgressExampleDeterminate);