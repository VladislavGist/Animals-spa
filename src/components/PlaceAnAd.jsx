import React, {Component} from "react";
import $ from "jquery";

import {connect} from "react-redux";

//styles
import "./PlaceAnAd.sass";

class PlaceAnAd extends Component {
	constructor() {
		super();
		this.timer0;
		this.timer1;
		this.timer2;
		this.timer3;
		this.timer4;
	}

	//оптимизировать код ниже возможности нет по причине того, что чтобы увидеть было ли загружено изображение нужен таймер
	componentDidMount() {
		this.timer0 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[0].value !== undefined && document.querySelectorAll(".loadingPhoto input")[0].value !== "") {
				this.props.handlePhoto0();
				clearInterval(this.timer0);
			}
		}, 1000);

		this.timer1 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[1].value !== undefined && document.querySelectorAll(".loadingPhoto input")[1].value !== "") {
				this.props.handlePhoto1();
				clearInterval(this.timer1);
			}
		}, 1000);

		this.timer2 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[2].value !== undefined && document.querySelectorAll(".loadingPhoto input")[2].value !== "") {
				this.props.handlePhoto2();
				clearInterval(this.timer2);
			}
		}, 1000);

		this.timer3 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[3].value !== undefined && document.querySelectorAll(".loadingPhoto input")[3].value !== "") {
				this.props.handlePhoto3();
				clearInterval(this.timer3);
			}
		}, 1000);

		this.timer4 = setInterval(() => {
			if(document.querySelectorAll(".loadingPhoto input")[4].value !== undefined && document.querySelectorAll(".loadingPhoto input")[4].value !== "") {
				this.props.handlePhoto4();
				clearInterval(this.timer4);
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer0);
		clearInterval(this.timer1);
		clearInterval(this.timer2);
		clearInterval(this.timer3);
		clearInterval(this.timer4);
	}

	render() {
		let element = () => {
			let obj = this.props.state.photosReducer[0],
				idx = [0],
				mass = [];

			for(let i in obj) {
				mass.push(
					<div className={`loadingPhoto ${this.props.state.photosReducer[idx][i] === true ? "activeLabel" : ""}`} key={i}>
						<i className={`fa ${this.props.state.photosReducer[idx][i] === true ? "fa-check modifyColor" : "fa-plus"}`} aria-hidden="true"></i>
						<input type="file"accept="image/jpeg,image/png" />
					</div>
				);
			}

			return (
				<div className="buttonsAddPhoto">
					{
						mass
					}
				</div>
			);
		};

		
		return (
			<div className="placeAnAd">
				<p className="modifyTitle">Разместить объявление</p>
				<div className="placeContent">
					<div>
						<p className="subtitle">Данные</p>
						twtwet
					</div>
					<div>
						<div className="wrapPhotos">
							<p className="subtitle">Фотографии</p>
							<p className="photoDescpipt">Вы можете добавить до 5 фотографий в формате jpeg или png. Минимальное разрешение 4323 x 4432</p>
							{
								element()
							}
						</div>
					</div>
					<div>
						<a href="javascript:void(0)" className="btnPlace">
							<i className="fa fa-cloud-upload" aria-hidden="true"></i>
							<span>Разместить</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		state: state
	}),
	dispatch => ({
		handlePhoto0: () => {
			dispatch({type: "ADD_PHOTO0", payload: true});
		},
		handlePhoto1: () => {
			dispatch({type: "ADD_PHOTO1", payload: true});
		},
		handlePhoto2: () => {
			dispatch({type: "ADD_PHOTO2", payload: true});
		},
		handlePhoto3: () => {
			dispatch({type: "ADD_PHOTO3", payload: true});
		},
		handlePhoto4: () => {
			dispatch({type: "ADD_PHOTO4", payload: true});
		}
	})
)(PlaceAnAd);