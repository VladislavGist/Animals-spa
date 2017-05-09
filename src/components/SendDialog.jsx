import React from 'react';

//redux
import {connect} from "react-redux";

//components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SendAndRegistrationsTabs from "./SendAndRegistrationsTabs.jsx";

//actions
import {getCards} from "../actions/getCards.jsx";

//styles
import "./SendDialog.sass"

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class LoginModal extends React.Component {
	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	render() {
		const styles = {
			contentStyle: {
				maxWidth: "585px",
				width: "100%"
			},
			flatIcon: {
				minWidth: "30px",
				right: "10px",
				top: "-11px"
			},
			overlayStyle: {
				padding: "30px 16px 26px"
			},
			actionsContainerStyle: {
				position: "absolute",
				top: "0",
				right: "0",
				width: "30px"
			}
		}

		const actions = [
			<FlatButton
				icon={<i className="fa fa-times" aria-hidden="true"></i>}
				primary={true}
				onTouchTap={this.handleClose}
				style={styles.flatIcon}
			/>
		];

		let dialogModal01 = () => {
			return (
				<Dialog actions={actions} modal={true} autoScrollBodyContent={true} repositionOnUpdate={true} autoDetectWindowHeight={true} open={this.state.open} contentStyle={styles.contentStyle} actionsContainerStyle={styles.actionsContainerStyle} bodyStyle={styles.overlayStyle} >
					<SendAndRegistrationsTabs className="sendAndRegDialog" />
				</Dialog>
			)
		};

		let dialogModal02 = () => {

			let handleCityTopHeader = e => {
				this.props.dispatchCityTopHeader(e.target.innerText);
				this.handleClose();
		
				//фльтр объявлений по клику на город. на главной
				if(this.props.state.allParamsUrl.split("/")[1] === "") {
					this.props.handleGetCards(process.env.URL + "/list-hot-adv/" + e.target.innerText);
				} else {
					//на остальных
					this.props.handleGetCards(process.env.URL + "/list-animals/animal_type/" + this.props.state.allParamsUrl.split("/")[2] + "/advertisement_type/" + this.props.state.allParamsUrl.split("/")[3] + "/city/" + e.target.innerText + "/count/10");
				}
			}

			return (
				<Dialog actions={actions} modal={true} autoScrollBodyContent={true} repositionOnUpdate={true} autoDetectWindowHeight={true} open={this.state.open} contentStyle={styles.contentStyle} actionsContainerStyle={styles.actionsContainerStyle} bodyStyle={styles.overlayStyle} >
					<div className="modalCityWrap">
						<a href="javascript:void(0)" onClick={handleCityTopHeader} className="allCitys">Все регионы</a>
						<div className="modalAllCity">
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Москва</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Санкт-Петербург</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Волгоград</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Екатеринбург</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Казань</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Краснодар</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Нижний Новгород</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Пермь</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Ростов-на-Дону</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Самара</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Уфа</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Челябинск</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Адыгея</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Архангельская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Астраханская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Башкортостан</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Белгородская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Брянская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Владимирская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Волгоградская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Вологодская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Воронежская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Дагестан</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Ивановская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Ингушетия</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Кабардино-Балкария</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Калининградская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Калмыкия</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Калужская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Карачаево-Черкесия</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Карелия</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Кировская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Коми</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Костромская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Краснодарский край</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Крым</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Курганская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Курская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Ленинградская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Липецкая обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Марий Эл</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Мордовия</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Московская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Мурманская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Ненецкий АО</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Нижегородская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Новгородская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Оренбургская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Орловская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Пензенская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Пермский край</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Псковская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Ростовская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Рязанская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Самарская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Саратовская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Свердловская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Северная Осетия</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Смоленская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Ставропольский край</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Тамбовская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Татарстан</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Тверская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Тульская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Удмуртия</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Ульяновская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Челябинская обл.</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Чеченская республика</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Чувашия</a>
							<a href="javascript:void(0)" onClick={handleCityTopHeader}>Ярославская обл.</a>
						</div>
					</div>
				</Dialog>
			)
		};

		return (
			<div className={`regionsBtn ${this.props.classNameMobile}`}>
				<a href="javascript:void(0)" onTouchTap={this.handleOpen} className={`button1 ${this.props.classesBtn}`}>{this.props.titleBtn}</a>
				{this.props.dialogModal === "01" ? dialogModal01() : ""}
				{this.props.dialogModal === "02" ? dialogModal02() : ""}
			</div>
		);
	}
}

let mapStateToProps;
export default connect(mapStateToProps = state => {
		return {
			state: state
		}
	},
	dispatch => ({
		dispatchCityTopHeader: e => {
			dispatch({type: "REPLACE_CITY", payload: e})
		},
		handleGetCards: url => {
			dispatch(getCards(url));
		}
	})
)(LoginModal);