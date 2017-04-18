import React, {Component} from "react";
import {Link} from "react-router";

import $ from "jquery"

import "./Menu.sass";

//redux
import {connect} from "react-redux";

class MaterialLink extends Component {
	render() {
		return (
			<Link to={this.props.valueLink} className="button4">{this.props.children}
				<i className={this.props.icons} aria-hidden="true"></i>
			</Link>
		);
	}
}

class Menu extends Component {
	constructor() {
		super();
	}
	componentDidMount() {
		$(".moreInfo").click(() => {
			$(".accordionContent").slideToggle(300);
			$(".accordionContent").toggleClass("visible");
		});

		$(".accordionContent a").click(() => {
			$(".accordionContent").slideToggle(300);
			$(".accordionContent").toggleClass("visible");
		});
	}

	handleCat = () => {
		this.props.onHandleCat();
		this.props.getUpdateState();
	}

	handleDog = () => {
		this.props.onHandleDog();
	}

	handleAnother01 = () => {
		this.props.onHandleAnother01();
	}

	componentWillUpdate() {
		//убирает линию над кнопкой разворота меню на опр. страницах при обновлении компонента
		if(location.hash == "#/placeAnAd" || location.hash == "#/personalArea") {
			$(".moreInfo").css({"border-top": "none"});
		} else {
			$(".moreInfo").css({"border-top": "1px solid rgba(0,0,0,.1)"});
		}
	}

	//убирает линию над кнопкой разворота меню на опр. страницах по клику
	handleOpenMenu() {
		if(location.hash == "#/placeAnAd" || location.hash == "#/personalArea") {
			if($(".accordionContent").hasClass("visible")) {
				$(".moreInfo").css({"border-top":"1px solid rgba(0,0,0,.1)"});
			
			} else {
				$(".moreInfo").css({"border-top": "none"});
				
			}
		}
	}

	render() {
		let lin = this.props.state.menuReducer[0].categoryNames.myLinks,
			name = this.props.state.menuReducer[0].categoryNames.names,
			icons = this.props.state.menuReducer[0].categoryNames.icons,
			key = this.props.state.menuReducer[0].categoryNames.key;

		return (
			<div>
				<div className={`menu ${location.hash == "#/placeAnAd" || location.hash == "#/personalArea" ? "hidden" : ""}`}>
					<div className="img">
						<img src={this.props.state.menuReducer[0].img} />
					</div>
					<div className="menuText">
						<h2>{this.props.state.menuReducer[0].title}</h2>
						<p>{this.props.state.menuReducer[0].text}</p>
					</div>
					<nav className="buttons">
						{
							this.props.state.menuReducer[0].categoryNames.myLinks.map((elem, idx) => {
								return <MaterialLink valueLink={lin[idx]} icons={icons[idx]} key={key[idx]}> {name[idx]} </MaterialLink>
							})
						}
					</nav>
				</div>
				<div className={`accordionContent ${this.border === false ? "hiddenBorder" : ""}`}>
					<div>
							<Link to="/animals/cat/buy" onClick={this.handleCat}>
								<img src="uploads/catMenu.jpg" className="img" />
								<h3>Кошки</h3>
							</Link>
							<Link to="/" onClick={this.handleDog}>
								<img src="uploads/dogMenu.jpg" className="img" />
								<h3>Собаки</h3>
							</Link>
							<Link to="/" onClick={this.handleAnother01}>
								<img src="uploads/anotherMenu.jpg" className="img" />
								<h3>Попугаи</h3>
							</Link>
					</div>
				</div>
				<a href="javascript:void(0)" className="moreInfo" onClick={this.handleOpenMenu}>Все животные
					<i className="fa fa-angle-down" aria-hidden="true"></i>
				</a>
			</div>
		);
	}
}

export default connect(
	state => ({
		state: state
	}), 
	dispatch => ({
		onHandleCat: () => {
			let data = [
				{
					img: "uploads/catMenu.jpg",
					title: "Кошки",
					text: "Текст описания категории кошек",
					categoryNames: {
						myLinks: ["/animals/cat/buy", "/animals/cat/find", "/animals/cat/missing", "/animals/cat/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e123r2e3", "2f3f32", "f4f34", "4r4f34"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data})
		},
		onHandleDog: () => {
			let data = [
				{
					img: "uploads/dogMenu.jpg",
					title: "Собаки",
					text: "Текст описания категории собак",
					categoryNames: {
						myLinks: ["/", "/", "/", "/"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e123e3", "2f3ewf2", "f434f", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data})
		},
		onHandleAnother01: () => {
			let data = [
				{
					img: "uploads/anotherMenu.jpg",
					title: "Другая категория",
					text: "Текст описания категории другой",
					categoryNames: {
						myLinks: ["/", "/", "/"],
						names: ["Купить", "Находка", "Пропажа"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data})
		},
		getUpdateState: () => {
			dispatch({type: "UPDATE_STATE", payload: ""});
		}

	}))(Menu);