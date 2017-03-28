import React, {Component} from "react";
import {Link} from "react-router";

//styles
import "./Footer.sass";

class Footer extends Component {

	render() {
		return (
			<footer>
				<Link to="/">
					<img src="uploads/logo2.png" width="120" alt="logotype" />
				</Link>
				<div className="linksFooter">
					<Link to="/">Главная</Link>
					<Link to="/">Дать объявление</Link>
					<Link to="/">Помощь</Link>
					<Link to="/">Контакты</Link>
				</div>
			</footer>
		);
	}
}

export default Footer;