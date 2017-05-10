import React, {Component} from "react";
import {Link} from "react-router";
import _ from "underscore";

import $ from "jquery"

import "./Menu.sass";

//redux
import {connect} from "react-redux";

//actions
import {getCards} from "../actions/getCards.jsx";

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
	constructor(props) {
		super(props);
		this.path = _.compact(props.state.routing.locationBeforeTransitions.pathname.split("/"));
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

	componentWillReceiveProps(next) {
		if($(".accordionContent").is(":visible") === true) {
			$(".accordionContent").css({"display": "none"});
		}

		let path = _.compact(next.state.routing.locationBeforeTransitions.pathname.split("/"));

		if(this.path[1] !== path[1]) {

			this.path[1] = path[1];
			
			this.getCards(path);
		}
	}

	getCards = pathname => {
		//выводит на остальных
		this.props.handleGetCards(process.env.URL + "/list-animals/animal_type/" + pathname[1] + "/advertisement_type/" + pathname[2]  + "/city/" + this.props.state.filterCity.cityTopHeader + "/count/10");
		
	}

	handleCat = () => {
		console.log(this.path);
		this.props.onHandleCat();
		// this.getCards();
	}

	handleDog = () => {
		console.log(this.path);
		this.props.onHandleDog();
		// this.getCards();
	}

	handleParrot = () => {
		this.props.onHandleParrot();
	}

	handleHamster = () => {
		this.props.onHandleHamster();
	}

	handleMouse = () => {
		this.props.onHandleMouse();
	}

	handleHare = () => {
		this.props.onHandleHare();
	}

	handleGuineapig = () => {
		this.props.onGuineapig();
	} 

	handleChamp = () => {
		this.props.onHandleChamp();
	} 

	handleSnak = () => {
		this.props.onHandleSnak();
	} 

	handleIguana = () => {
		this.props.onHandleIguana();
	}

	handleTurtle = () => {
		this.props.onHandleTurtle();
	}

	handleSnail = () => {
		this.props.onHandleSnail();
	}

	handleFish = () => {
		this.props.onHandleFish();
	}

	handleInsects = () => {
		this.props.onHandleInsects();
	}

	handleHorse = () => {
		this.props.onHandleHorse();
	}

	handleCow = () => {
		this.props.onHandleCow();
	}

	handlePig = () => {
		this.props.onHandlePig();
	}

	handleGoat = () => {
		this.props.onHandleGoat();
	}

	handleSheep = () => {
		this.props.onHandleSheep();
	}

	handleDomesticbird = () => {
		this.props.onHandleDomesticbird();
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
							<Link to="/animals/dog/buy" onClick={this.handleDog}>
								<img src="uploads/dogMenu.jpg" className="img" />
								<h3>Собаки</h3>
							</Link>
							<Link to="/animals/parrot/buy" onClick={this.handleParrot}>
								<img src="uploads/parrot.jpg" className="img" />
								<h3>Попугаи</h3>
							</Link>
							<Link to="/animals/hamster/buy" onClick={this.handleHamster}>
								<img src="uploads/hamster.jpg" className="img" />
								<h3>Хомяки</h3>
							</Link>
							<Link to="/animals/mouse/buy" onClick={this.handleMouse}>
								<img src="uploads/mouse.jpg" className="img" />
								<h3>Мыши / крысы</h3>
							</Link>
							<Link to="/animals/hare/buy" onClick={this.handleHare}>
								<img src="uploads/hare.jpg" className="img" />
								<h3>Зайцы / кролики</h3>
							</Link>
							<Link to="/animals/guineapig/buy" onClick={this.handleGuineapig}>
								<img src="uploads/guineapig.jpg" className="img" />
								<h3>Морские свинки</h3>
							</Link>
							<Link to="/animals/champ/buy" onClick={this.handleChamp}>
								<img src="uploads/champ.jpg" className="img" />
								<h3>Хорьки</h3>
							</Link>
							<Link to="/animals/snak/buy" onClick={this.handleSnak}>
								<img src="uploads/snak.jpg" className="img" />
								<h3>Змеи</h3>
							</Link>
							<Link to="/animals/iguana/buy" onClick={this.handleIguana}>
								<img src="uploads/iguana.jpg" className="img" />
								<h3>Игуаны</h3>
							</Link>
							<Link to="/animals/turtle/buy" onClick={this.handleTurtle}>
								<img src="uploads/turtle.jpg" className="img" />
								<h3>Черепахи</h3>
							</Link>
							<Link to="/animals/snail/buy" onClick={this.handleSnail}>
								<img src="uploads/snail.jpg" className="img" />
								<h3>Улитки</h3>
							</Link>
							<Link to="/animals/fish/buy" onClick={this.handleFish}>
								<img src="uploads/fish.jpg" className="img" />
								<h3>Рыбки</h3>
							</Link>
							<Link to="/animals/insects/buy" onClick={this.handleInsects}>
								<img src="uploads/insects.jpg" className="img" />
								<h3>Насекомые</h3>
							</Link>
							<Link to="/animals/horse/buy" onClick={this.handleHorse}>
								<img src="uploads/horse.jpg" className="img" />
								<h3>Лошади</h3>
							</Link>
							<Link to="/animals/cow/buy" onClick={this.handleCow}>
								<img src="uploads/cow.jpg" className="img" />
								<h3>Коровы / быки</h3>
							</Link>
							<Link to="/animals/pig/buy" onClick={this.handlePig}>
								<img src="uploads/pig.jpg" className="img" />
								<h3>Свиньи</h3>
							</Link>
							<Link to="/animals/goat/buy" onClick={this.handleGoat}>
								<img src="uploads/goat.jpg" className="img" />
								<h3>Козы</h3>
							</Link>
							<Link to="/animals/sheep/buy" onClick={this.handleSheep}>
								<img src="uploads/sheep.jpg" className="img" />
								<h3>Овцы</h3>
							</Link>
							<Link to="/animals/domesticbird/buy" onClick={this.handleDomesticbird}>
								<img src="uploads/domesticbird.jpg" className="img" />
								<h3>Домашняя птица</h3>
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

let mapStateToProps;

export default connect(
	mapStateToProps = (state, routing) => {
		return {
			state: state,
			routing: routing
		}
	}, 
	dispatch => ({
		handleGetCards: url => {
			dispatch(getCards(url));
		},
		getUpdateState: () => {
			dispatch({type: "UPDATE_STATE", payload: ""});
		},
		onHandleCat: () => {
			let data = [
				{
					img: "uploads/catMenu.jpg",
					title: "Кошки",
					text: "",
					categoryNames: {
						myLinks: ["/animals/cat/buy", "/animals/cat/find", "/animals/cat/missing", "/animals/cat/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e123r2e3", "2f3f32", "f4f34", "4r4f34"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleDog: () => {
			let data = [
				{
					img: "uploads/dogMenu.jpg",
					title: "Собаки",
					text: "",
					categoryNames: {
						myLinks: ["/animals/dog/buy", "/animals/dog/find", "/animals/dog/missing", "/animals/dog/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e123e3", "2f3ewf2", "f434f", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleParrot: () => {
			let data = [
				{
					img: "uploads/parrot.jpg",
					title: "Попугаи",
					text: "",
					categoryNames: {
						myLinks: ["/animals/parrot/buy", "/animals/parrot/find", "/animals/parrot/missing", "/animals/parrot/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data})
		},
		onHandleHamster: () => {
			let data = [
				{
					img: "uploads/hamster.jpg",
					title: "Хомяки",
					text: "",
					categoryNames: {
						myLinks: ["/animals/hamster/buy", "/animals/hamster/gift"],
						names: ["Купить", "Даром"],
						icons: ["fa fa-heart", "fa fa-globe"],
						key: ["e1f322e3", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleMouse: () => {
			let data = [
				{
					img: "uploads/mouse.jpg",
					title: "Мыши / крысы",
					text: "",
					categoryNames: {
						myLinks: ["/animals/mouse/buy", "/animals/mouse/gift"],
						names: ["Купить", "Даром"],
						icons: ["fa fa-heart", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleHare: () => {
			let data = [
				{
					img: "uploads/hare.jpg",
					title: "Зайцы / кролики",
					text: "",
					categoryNames: {
						myLinks: ["/animals/hare/buy", "/animals/hare/gift"],
						names: ["Купить", "Даром"],
						icons: ["fa fa-heart", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onGuineapig: () => {
			let data = [
				{
					img: "uploads/guineapig.jpg",
					title: "Морские свинки",
					text: "",
					categoryNames: {
						myLinks: ["/animals/guineapig/buy", "/animals/guineapig/find", "/animals/guineapig/missing", "/animals/guineapig/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleChamp: () => {
			let data = [
				{
					img: "uploads/champ.jpg",
					title: "Хорьки",
					text: "",
					categoryNames: {
						myLinks: ["/animals/champ/buy", "/animals/champ/find", "/animals/champ/missing", "/animals/champ/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleSnak: () => {
			let data = [
				{
					img: "uploads/snak.jpg",
					title: "Змеи",
					text: "",
					categoryNames: {
						myLinks: ["/animals/snak/buy", "/animals/snak/find", "/animals/snak/missing", "/animals/snak/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleIguana: () => {
			let data = [
				{
					img: "uploads/iguana.jpg",
					title: "Игуаны",
					text: "",
					categoryNames: {
						myLinks: ["/animals/iguana/buy", "/animals/iguana/find", "/animals/iguana/missing", "/animals/iguana/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleTurtle: () => {
			let data = [
				{
					img: "uploads/turtle.jpg",
					title: "Черепахи",
					text: "",
					categoryNames: {
						myLinks: ["/animals/turtle/buy", "/animals/turtle/find", "/animals/turtle/missing", "/animals/turtle/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleSnail: () => {
			let data = [
				{
					img: "uploads/snail.jpg",
					title: "Улитки",
					text: "",
					categoryNames: {
						myLinks: ["/animals/snail/buy", "/animals/snail/gift"],
						names: ["Купить", "Даром"],
						icons: ["fa fa-heart", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleFish: () => {
			let data = [
				{
					img: "uploads/fish.jpg",
					title: "Рыбки",
					text: "",
					categoryNames: {
						myLinks: ["/animals/fish/buy", "/animals/fish/gift"],
						names: ["Купить", "Даром"],
						icons: ["fa fa-heart", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleInsects: () => {
			let data = [
				{
					img: "uploads/insects.jpg",
					title: "Насекомые",
					text: "",
					categoryNames: {
						myLinks: ["/animals/insects/buy", "/animals/insects/gift"],
						names: ["Купить", "Даром"],
						icons: ["fa fa-heart", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleHorse: () => {
			let data = [
				{
					img: "uploads/horse.jpg",
					title: "Лошади",
					text: "",
					categoryNames: {
						myLinks: ["/animals/horse/buy", "/animals/horse/find", "/animals/horse/missing", "/animals/horse/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleCow: () => {
			let data = [
				{
					img: "uploads/cow.jpg",
					title: "Коровы / быки",
					text: "",
					categoryNames: {
						myLinks: ["/animals/cow/buy", "/animals/cow/find", "/animals/cow/missing", "/animals/cow/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandlePig: () => {
			let data = [
				{
					img: "uploads/pig.jpg",
					title: "Свиньи",
					text: "",
					categoryNames: {
						myLinks: ["/animals/pig/buy", "/animals/pig/gift"],
						names: ["Купить", "Даром"],
						icons: ["fa fa-heart", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleGoat: () => {
			let data = [
				{
					img: "uploads/goat.jpg",
					title: "Козы",
					text: "",
					categoryNames: {
						myLinks: ["/animals/goat/buy", "/animals/goat/find", "/animals/goat/missing", "/animals/goat/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleSheep: () => {
			let data = [
				{
					img: "uploads/sheep.jpg",
					title: "Овцы",
					text: "",
					categoryNames: {
						myLinks: ["/animals/sheep/buy", "/animals/sheep/find", "/animals/sheep/missing", "/animals/sheep/gift"],
						names: ["Купить", "Находка", "Пропажа", "Даром"],
						icons: ["fa fa-heart", "fa fa-bell-o", "fa fa-exclamation-circle", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2", "f43334", "4rf32434", "4r43442"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		},
		onHandleDomesticbird: () => {
			let data = [
				{
					img: "uploads/domesticbird.jpg",
					title: "Домашняя птица",
					text: "",
					categoryNames: {
						myLinks: ["/animals/domesticbird/buy", "/animals/domesticbird/gift"],
						names: ["Купить", "Даром"],
						icons: ["fa fa-heart", "fa fa-globe"],
						key: ["e1f322e3", "2ff33f2"]
					}
				}
			];
			dispatch({type: "SWITCH_MENU", payload: data});
		}

	}))(Menu);