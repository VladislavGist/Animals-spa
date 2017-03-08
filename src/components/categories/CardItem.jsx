import React, {Component} from "react";
import {Link} from "react-router";
import $ from "jquery";

import "./CardItem.sass";

//componentns
import SlickSlider from "../SlickSlider.jsx";

class CardItem extends Component {
	constructor() {
		super();
	}
	render() {
		let mass = [];
		for(let i = 0; i < this.props.rating; i++) {
			mass.push(<i className="fa fa-star" aria-hidden="true" key={i}></i>);	
		}
		
		return (
			<div className="cardItem horizontalBig">	
				<div className="contentWrap">
					<div className="top">
						<div>
							<p className="price">{this.props.price} руб.</p>
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
						</div>
					</div>
					<div className="bottom">
						<div>
							<p className="title">{this.props.title}</p>
							<p className="subTitle">{this.props.briefDescription}</p>
						</div>
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
					</div>
				</div>
				<img src={this.props.imgPath} className="img" />
				<div className="reverseFace">
					<div className="sliderItem">
						<SlickSlider imagesItems={["uploads/dogMenu.jpg", "uploads/catMenu.jpg"]} key={this.keyNum} />
					</div>
					<div className="textItem">
						<p className="subTitleReverse">{this.props.briefDescription}</p>
						<div className="buttonsList">
							<a href="javascript:void(0)" className="button1">Пожаловаться</a>
							<div className="visibles">
								<i className="fa fa-eye" aria-hidden="true"></i>
								<p>5000</p>
							</div>
							<button className="btnReverse"><i className="fa fa-reply" aria-hidden="true"></i></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CardItem;