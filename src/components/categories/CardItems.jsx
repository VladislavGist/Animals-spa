import React, {Component} from "react";
import {Link} from "react-router";
import $ from "jquery";

//redux
import {connect} from "react-redux";

//store
import {store} from "../store.jsx";

//Блок с плитками
import CardItem from "./CardItem.jsx";

import "./CardItems.sass";

class CardItems extends Component {
	constructor() {
		super()
		this.subs;
		this.elem = store.getState().serverReducer;
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

				//reverse объявлений
				$(".cardItem").on("click", function() {
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
						$(this).off("click");
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
	}

	render() {
		//если нет параметров в url то добавить оберке классс .indexPageClass
		return (
			<div className={`wrapCardsContent ${this.props.state.allParamsUrl === '/' ? 'indexPageClassWrap' : ""}`}>
				<div className={`cardItems ${this.props.state.allParamsUrl === '/' ? 'indexPageClass' : ""}`}>
					{
						this.props.datas.length > 0 ?
						this.props.datas.map((elem, idx) => {
							return (
								<CardItem 
									key={elem.id} 
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
								/>
							);
						}) : <p>Объявлений нет</p>
					}
					{this.props.datas.length > 0 && this.props.state.allParamsUrl != '/' ? <a href="javascript:void(0)" className="addMore button2">Ещё объявления</a> : ""}
				</div>
				<div className="cardsBanners">
					Здесь будет реклама Яндекс.Директ
				</div>
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
		}
	})
)(CardItems);