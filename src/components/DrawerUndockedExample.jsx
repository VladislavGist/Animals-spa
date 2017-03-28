import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {Link} from "react-router";

//redux
import {connect} from "react-redux";

//modal SendDialog
import LoginModal from "./SendDialog.jsx";

class DrawerUndockedExample extends React.Component {

	constructor(props) {
		super(props);
		this.state = {open: false};
	}

	handleToggle = () => this.setState({open: !this.state.open});

	handleClose = () => this.setState({open: false});

	render() {
		const loginFalse = () => {
			return (
				<div className="userBtns">
					<Link to="/personalArea" className="personalArea accountBtnMobile">Личный кабинет</Link>
				</div>
			);
		};

		let style = {
			RaisedBtn: {
				"minWidth":"50px",
				"maxWidth":"50px"
			},
			RaisedBtnButton: {
				"height":"40px"
			}
		}

		return (
			<div>
				<RaisedButton
					label={<i className="fa fa-bars"></i>}
					onTouchTap={this.handleToggle}
					className="mobileMenuBtn shadowMaterial1"
					backgroundColor="#2196f3"
					labelColor="white"
					style={
						style.RaisedBtn
					}
					buttonStyle={
						style.RaisedBtnButton
					}
				/>
				<Drawer
					docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
				>
					<MenuItem>
						<LoginModal titleBtn={this.props.state.filterCity.cityTopHeader} classNameMobile="regionsBtnMobile" dialogModal="02" />
					</MenuItem>

					<MenuItem onTouchTap={this.handleClose}>
						{
							this.props.state.loginUser === false && localStorage.getItem("user") == null ? <LoginModal classesBtn="accountBtnMobile" classNameMobile="mobileSign" titleBtn="Вход / регистрация" dialogModal="01" /> : loginFalse()
						}
					</MenuItem>

					<MenuItem onTouchTap={this.handleClose}>
						<a href="javascript:void(0)" className="mobileRepost">Репост в Вконтакте</a>
					</MenuItem>

					<MenuItem onTouchTap={this.handleClose}>
						{
							this.props.state.loginUser === false ? <LoginModal titleBtn="Подать объявление" classesBtn="button2 mobileBtnPersonalArea" classNameMobile="mobilePersonal" dialogModal="01" /> : <Link to="/placeAnAd" className="button2 mobileBtnPersonalArea">Подать объявление</Link>
						}
					</MenuItem>
				</Drawer>
			</div>
		);
	}
}

export default connect(
	state => ({
		state: state
	})
)(DrawerUndockedExample);