import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import $ from "jquery";

import "./CardItem.sass";

//componentns
import SlickSlider from "../SlickSlider.jsx";

//async actions
import {updateCardView} from "../../actions/updateCardView.jsx";
import {completedCard} from "../../actions/completedCard.jsx";
import {replaceStatusCard} from "../../actions/replaceStatusCard.jsx";

class CardItem extends Component {
	constructor(props) {
		super(props);
		this.pr = props
	}

	//остановка объявления
	handlerDelete = e => {
		//взяли id 
		let id = this.props.id;

		//отправили запрос на сервер об остановке объявления с нужным id
		this.props.handleCompletedCard(`${process.env.URL}/completeCard?cardId=${id}`);
		e.target.text = "Остановлено";
	}

	//повышение счетчика просмотров
	clickFunc = e => {
		if(location.hash !== "#/personalArea") {
			this.props.getUpdateCardView(this.props.cardId);
		}
	}

	handleAccepted = e => {
		this.props.onHandleAccepted(`${process.env.URL}/replaceStatusCard?cardid=${this.props.cardId}&status=accepted`);
		e.target.textContent = "Выполнено"
	}

	handleRejected = e => {
		this.props.onHandleRejected(`${process.env.URL}/replaceStatusCard?cardid=${this.props.cardId}&status=rejected`);
		e.target.textContent = "Выполнено"
	}

	render() {
		let mass = [];
		for(let i = 0; i < this.props.rating; i++) {
			mass.push(<i className="fa fa-star" aria-hidden="true" key={i}></i>);	
		}

		let imgPath = this.props.imgPath.split(" ");

		return (
			<div className="cardItemWrap">
				<div className="cardItem horizontalBig">	
					<div className="contentWrap" onClick={this.clickFunc}>
						<div className="top">
							<div>
								<p className="price">{this.props.price > 0 ? this.props.price + " руб." : ""}</p>
							</div>
							<div>
								<div className="info">
									<i className="fa" aria-hidden="true"></i>
									<span className="categoty">{this.props.advType}</span>
								</div>
								<p className="number">{this.props.phoneNumber}</p>
								<p className="city">г. {this.props.city}</p>
								<div className="userItem">
									{mass}
									<p className={`userName ${this.props.userStatus === "seller" ? "gold" : ""}`}>{this.props.userName}</p>
								</div>
								<div className="priceMobile">
									<p className="price">{this.props.price > 0 ? this.props.price + " руб." : ""}</p>
								</div>
							</div>
						</div>
						<div className="bottom">
							<div>
								<h3 className="title">{this.props.title}</h3>
								<p className="subTitle">{this.props.briefDescription}</p>
							</div>

							{
								location.hash === "#/personalArea" ? null :
								<div>
									<div className="button3" title="Сделать репост в социальную сеть">
										<a href="javascript:void(0)" className="buttonCircle">
											<i className="fa fa-bullhorn" aria-hidden="true"></i>
										</a>
										<span>
											<a href="javascript:void(0)"><i className="fa fa-vk" aria-hidden="true"></i></a>
											<a href="javascript:void(0)"><i className="fa fa-odnoklassniki" aria-hidden="true"></i></a>
										</span>
									</div>
								</div>
							}

						</div>
					</div>
					<div className="img">
						<img src={imgPath[0]} />
					</div>	
					<div className="reverseFace">
						<div className="sliderItem">
							<SlickSlider imagesItems={imgPath} key={this.keyNum} />
						</div>
						<div className="textItem">
							<p className="subTitleReverse">{this.props.briefDescription}</p>
							<div className="buttonsList">
								{
									location.hash === "#/personalArea" ? null :
									<div className="visibles">
										<i className="fa fa-eye" aria-hidden="true"></i>
										<p>{this.props.views}</p>
									</div>
								}
								<button className="btnReverse"><i className="fa fa-reply" aria-hidden="true"></i></button>
							</div>
						</div>
					</div>
				</div>
				{
					this.props.deleted === true || this.props.deleteInfo === true ?
						<div className="cardInfoInAccount">
							{this.props.deleted === true ? <a href="javascript:void(0)" className="button1" onClick={this.handlerDelete}>Завершить</a> : ""}
							{this.props.deleteInfo === true ? <p>Будет удалено {this.props.dataDelete}</p> : ""}
						</div> : ""
				}
				{
					this.props.moderate === true ?
						<div className="moderation">
							<button className="btnAccepted" onClick={this.handleAccepted}>Пропустить</button>
							<button className="btnRejected" onClick={this.handleRejected}>Отклонить</button>
						</div> : ""
				}
			</div>
		);
	}
}

export default connect(
	state => ({
		state: state
	}),
	dispatch => ({
		getUpdateCardView: cardId => {
			dispatch(updateCardView(cardId));
		},
		handleCompletedCard: (url, param) => {
			dispatch(completedCard(url, param));
		},
		onHandleAccepted: (url, status, cardId) => {
			dispatch(replaceStatusCard(url, status, cardId));
		},
		onHandleRejected: (url, status, cardId) => {
			dispatch(replaceStatusCard(url, status, cardId));
		}
	})
)(CardItem);