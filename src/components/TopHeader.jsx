import React, {Component} from "react";
import {Link} from "react-router";
import "./TopHeader.sass";
import $ from "jquery";

//redux
import {connect} from "react-redux";

//modal SendDialog
import LoginModal from "./SendDialog.jsx";

//mobile menu
import DrawerUndockedExample from "./DrawerUndockedExample.jsx";

class TopHeader extends Component {
	
	componentDidMount() {
		let elem = $(".needLogin");
		if(this.props.state.loginUser === false) {
			$(elem).click(function() {
				return false;
			});
		}
	}

	render() {
		const loginFalse = () => {
			if(this.props.state.loginUser.results[0].rules === null) {
				return (
					<div className="userBtns">
						<Link to="/personalArea" className="personalArea">Личный кабинет</Link>
					</div>
				)
			} else if(this.props.state.loginUser.results[0].rules === "moderator") {
				return (
					<div className="userBtns">
						<Link to="/moderation" className="personalArea">moderation</Link>
					</div>
				)
			}
		};
		return (
			<header>
				<div className="menuHeader">
					<div className="top_logo">
						<Link to="/">
							<img src="uploads/logo2.png" width="120" alt="logotype" />
						</Link>
						<h1 className="h1">Пройдай, купи, найди или размести объявление о пропаже животного.</h1>
					</div>
					<LoginModal titleBtn={this.props.state.filterCity.cityTopHeader} dialogModal="02" />
					{
						this.props.state.loginUser === false || this.props.state.loginUser.error !== undefined ? <LoginModal titleBtn="Вход / регистрация" dialogModal="01" /> : loginFalse()
					}

					{
						this.props.state.loginUser === false || this.props.state.loginUser.error !== undefined ? <LoginModal titleBtn="Подать объявление" classNameMobile="needLoginMobile" classesBtn="button2 needLoginMobile" dialogModal="01" /> : <Link to="/placeAnAd" className="button2 needLogin">Подать объявление</Link>
					}

					<DrawerUndockedExample />
					
				</div>
			</header>
		);
	}
}

// <div className="button3 repostBtn">
// 	<a href="javascript:void(0)" className="buttonCircle">
// 		<i className="fa fa-bullhorn" aria-hidden="true"></i>
// 	</a>
// 	<span>
// 		<a href="javascript:void(0)"><i className="fa fa-vk" aria-hidden="true"></i></a>
// 		<a href="javascript:void(0)"><i className="fa fa-odnoklassniki" aria-hidden="true"></i></a>
// 	</span>
// </div>

export default connect(
	state => ({state: state}),
	dispatch => ({

	})
)(TopHeader);