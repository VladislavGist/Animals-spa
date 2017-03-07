import React, {Component} from "react";
import Slider from "react-slick";

import "../styles/styles.sass";
import "./SlickSlider.sass";

class SlickSlider extends Component {
	render() {
		let settings = {
			arrows: true,
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: false,
			adaptiveHeight: true,
			fade: true,
			cardImages: this.props.imagesItems
	    };
	    return (
	      <Slider {...settings}>
	        {
	        	settings.cardImages.map((elem, idx) => {
	        		return <div className="imgCard" key={idx}><img src={elem} alt="img" /></div>
	        	})
	        }
	      </Slider>
	    );
	}
}

export default SlickSlider;