import Slider from 'react-slick'
import React, { Component } from 'react'

import './SlickSlider.sass'
import '../styles/styles.sass'

export default class SlickSlider extends Component {

	render() {
		const settings = {
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
		}

		return (
			<Slider
				{ ...settings }
			>
				{
					settings.cardImages.map((elem, idx) => (
						<div className='imgCard' key={ idx }>
							<img src={ elem } alt='img' />
						</div>
					))
				}
			</Slider>
		)
	}
}