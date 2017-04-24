import React, {Component} from "react";
import {Link} from "react-router";
import $ from "jquery";

//redux
import {connect} from "react-redux";

//store
import {store} from "../store.jsx";

//actions
import {getCards} from "../../actions/getCards.jsx";
import {allCards} from "../../actions/allCards.jsx";

//Блок с плитками
import CardItem from "./CardItem.jsx";

import "./CardItems.sass";

class CardItems extends Component {
	constructor() {
		super()
		this.subs;
		this.elem = store.getState().serverReducer;
		this.countMore = 20;
	}

	//подписаться на store -
	//если пришли новые данные, то выполнить код -
	//при уходе со страницы отписаться от store - 
	//disptach action с начальным состоянием store -

	componentDidMount() {
		//подписался на определенную часть store
		this.subs = store.subscribe(() => {
			//если новая часть Store не равна предыдущей, то выполнить код
			if(store.getState().serverReducer !== this.elem) {
				//фильтрация до 80 символа
				let el = $(".bottom .subTitle");
				for(let i = 0; i < el.length; i++) {
					let j = el[i].textContent.substring(0, 80);
					el[i].textContent = j;
				}

				//условие добавления многоточия
				el.each((idx, elem) => {
					if(elem.textContent.length >= 80) {
						elem.textContent += " ...";
					}
				});

				//запрет переворота объявление по клику на кнопку
				$(".button3").each((idx, elem) => {
					$(elem).click(function(e) {
						e.stopPropagation();
					});
				});

				//reverse объявлений
				$(".cardItem").bind("click", function() {
					//переключил класс
					$(this).toggleClass("verticalRotate");

					//отменил обработчики click для элемента
					$(this).off("click");
				});

				//нажал на кнопку reverse
				$(".btnReverse").on("click", function(e) {
					//перевернул card
					$(this).parents(".cardItem").removeClass("verticalRotate");
					//запретил всплытие событий (срабатывание событий на следующем уровне)
					e.stopPropagation();

					//назначил обработчик
					$(this).parents(".cardItem").on("click", function() {
						$(this).toggleClass("verticalRotate");
						$(this).unbind("click");
					});
				});

				//редактирование статусов category
				$(".categoty").each((idx, elem) => {
					switch($(elem).text()) {
						case "buy":
							$(elem).text("Продажа");
							break;
						case "sale":
							$(elem).text("Продать");
							break;
						case "gift":
							$(elem).text("Даром");
							break;
						case "missing":
							$(elem).text("Пропало животное");
							break;
						case "find":
							$(elem).text("Найдено животное");
							break;
						default:
							$(elem).text("");
					}
				});

				//иконки статусов
				$(".info .fa").each((idx, elem) => {
					switch($(elem).next().text()) {
						case "Продажа":
							$(elem).addClass("fa-eur");
							break;
						case "Продать":
							$(elem).addClass("fa-eur");
							break;
						case "Даром":
							$(elem).addClass("fa-globe");
							break;
						case "Пропало животное":
							$(elem).addClass("fa-exclamation-triangle");
							break;
						case "Найдено животное":
							$(elem).addClass("fa-bell-o");
							break;
						default:
							$(elem).addClass("");
					}
				});

				//сохранил текущую часть Store чтобы карточки корректно работали 
				this.elem = store.getState().serverReducer;

				this.props.onReplaceAllUrl(this.props.state.routing.locationBeforeTransitions.pathname);
			}
		});
	}

	componentWillUnmount() {
		this.subs();
		this.props.onHandleClearState();
		this.countMore = 20;
	}

	addMoreCards = () => {
		this.props.onMoreCards(process.env.URL + "/list-animals/animal_type/" +  this.props.state.allParamsUrl.split("/")[2] + "/advertisement_type/" + this.props.state.allParamsUrl.split("/")[3]  + "/city/" + this.props.state.filterCity.cityTopHeader + "/count/" + this.countMore);
		this.props.onAllCards(process.env.URL + "/list-animals/animal_type/" +  this.props.state.allParamsUrl.split("/")[2] + "/advertisement_type/" + this.props.state.allParamsUrl.split("/")[3]  + "/city/" + this.props.state.filterCity.cityTopHeader + "/count/" + this.countMore + "/allcount");
		this.countMore += 10;
	}

	render() {
		//если нет параметров в url то добавить оберке классс .indexPageClass
		////this.props.state.toggleAddMoreBtn === true ? <a href="javascript:void(0)" className="addMore button2" onClick={this.addMoreCards}>Ещё объявления</a> : ""
		return (
			<div className={`wrapCardsContent ${this.props.state.allParamsUrl === '/' ? 'indexPageClassWrap' : ""}`}>
				<article className={`cardItems ${this.props.state.allParamsUrl === '/' ? 'indexPageClass' : ""}`}>
					{
						this.props.datas.length > 0 ?
						this.props.datas.map((elem, idx) => {
							return (
								<CardItem
									cardId={elem.card_id}
									key={elem.card_id} 
									title={elem.title} 
									briefDescription={elem.briefDescription}
									city={elem.city}
									userName={elem.userName}
									userStatus={elem.userStatus}
									phoneNumber={elem.phoneNumber}
									rating={elem.rating}
									price={elem.price}
									imgPath={elem.imgPath}
									advType={elem.advType}
									views={elem.views}
								/>
							);
						}) : <p className="noCardsTitle">Объявлений нет</p>
					}
					{this.props.datas.length > 0 && this.props.state.allParamsUrl != '/' ? (this.props.state.toggleAddMoreBtn === true ? <a href="javascript:void(0)" className="addMore button2" onClick={this.addMoreCards}>Ещё объявления</a> : "") : ""}
				</article>
				<aside className="cardsBanners">
					Здесь будет реклама Яндекс.Директ
				</aside>
			</div>
		);
	}
}

let mapStateToProps;

export default connect(
	mapStateToProps = state => {
		return {
			state: state
		}
	},
	dispatch => ({
		onHandleClearState: () => {
			dispatch({type: "CLEAR_STATE", payload: {advertisementList: []}})
		},
		onReplaceAllUrl: e => {
			dispatch({type: "CHANGE_URL", payload: e ? e : {}})
		},
		onMoreCards: url => {
			dispatch(getCards(url));
		},
		onAllCards: url => {
			dispatch(allCards(url));
		}
	})
)(CardItems);