import React, {Component} from "react";
import {Link} from "react-router";

import $ from "jquery";

//родительский блок плиток
import CardItems from "./CardItems.jsx";

//redux
import {connect} from "react-redux";

//store
import {store} from "../store.jsx";

class AnimalCard extends Component {
	getXMLHttpRequest = () => {
		if(window.XMLHttpRequest) {			
			try{ return new XMLHttpRequest(); }
			catch(e) {}

		} else if(window.ActiveXObject) {
			try{ return new ActiveXObject("Microsoft.XMLHTTP"); }	
			catch(e) {}

			try{ return new ActiveXObject("Msxml2.XMLHTTP"); }	
			catch(e) {}
		}
		return null;
	};

	componentDidMount() {

		//выводит объявлений на главной странице
		if(this.props.animal_type === undefined) {
			let req = this.getXMLHttpRequest();
			req.onreadystatechange = () => {
				this.props.handleUpdateStateLoading(req.readyState * 25);
				if(req.readyState !== 4) {
				
				} else {
					let obj = new Object();
					obj = JSON.parse(req.responseText);
					this.props.getServerData(obj);
				}
			};
			req.open("GET", "http://localhost:8080/list-hot-adv", true);
			req.send(null);

		} else {
			//вывод объявлений на всех других страницах
			let req = this.getXMLHttpRequest();
			req.onreadystatechange = () => {
				this.props.handleUpdateStateLoading(req.readyState * 25);
				if(req.readyState !== 4) {
					
				} else {
					let obj = new Object();
					obj = JSON.parse(req.responseText);
					this.props.getServerData(obj);
				}
			};

			//let url = "http://localhost:8091/list-animals?animal_type=" + this.props.animal_type + "&advertisement_type=" + this.props.advertisment;
			let url = "http://localhost:8080/list-animals?animal_type=" + this.props.animal_type + "&advertisement_type=" + this.props.advertisment;
			req.open("GET", url, true);
			req.send(null);
		}
	}

	render() {
		return (
			<div>
				<CardItems datas={this.props.state.serverReducer.advertisementList} />
			</div>
		);
	}
}

export default connect(state => ({
		state: state
	}),
	dispatch => ({
		getServerData: e => {
			dispatch({type: "GET_DATA_SERVER", payload: e});
		},
		updateJsonDatas: () => {
			dispatch({type: "UPDATE_JSONDATAS"});
		},
		handleUpdateStateLoading: e => {
			dispatch({type: "UPDATE_LOADING", payload: e});
		}
	}))(AnimalCard);