import React, {Component} from "react";
import {Link} from "react-router";
import "./TopHeader.sass";

//redux
import {connect} from "react-redux";

//modal SendDialog
import LoginModal from "./SendDialog.jsx";

class TopHeader extends Component {
	componentWillMount() {
		if(localStorage.getItem("user") == "logining") {
			this.props.loginTrue();
		}
	}

	handleExit = () => {
		localStorage.removeItem("user");
		this.props.loginFalse();
	}

	render() {
		
		const loginFalse = () => {
			return (
				<div className="userBtns">
					<p className="userName">Константин</p>
					<Link to="/" className="personalArea">Личный кабинет</Link>
					<input type="button" value="выход" className="exitBtn" onClick={this.handleExit} />
				</div>
			);
		};
		return (
			<header>
				<div className="menu">
					<div className="top_logo">
						<Link to="/">
							<img src="uploads/logo2.png" width="120" alt="logotype" />
						</Link>
						<h1 className="h1">Сервис по продаже и покупке животных. Для частных лиц и постоянных продовцов</h1>
					</div>
					<a href="javascript:void(0)" className="button1">Ваш город</a>
					{
						this.props.state.loginUser === false && localStorage.getItem("user") == null ? <LoginModal /> : loginFalse()
					}
					<div className="button3">
						<a href="javascript:void(0)" className="buttonCircle">
							<i className="fa fa-bullhorn" aria-hidden="true"></i>
						</a>
						<span>
							<a href="javascript:void(0)"><i className="fa fa-vk" aria-hidden="true"></i></a>
							<a href="javascript:void(0)"><i className="fa fa-odnoklassniki" aria-hidden="true"></i></a>
						</span>
					</div>

					<a href="javascript:void(0)" className="button2">Подать объявление</a>
				</div>
				
			</header>
		);
	}
}

export default connect(
	state => ({state: state}),
	dispatch => ({
		loginTrue: () => {
	      dispatch({type: "LOGIN_TRUE", payload: true});
	    },
	    loginFalse: () => {
	    	dispatch({type: "LOGIN_FALSE", payload: false});
	    }
	})
	)(TopHeader);