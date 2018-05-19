import Slider from 'react-slick'
import React, { PropTypes } from 'react'

if (process.env.BROWSER) {
	require('./SlickSliderStyles.sass')
	require('../../styles/styles.sass')
}

const SlickSlider = ({ imagesItems }) => {
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
		cardImages: imagesItems
	}

	return <Slider { ...settings }>
		{ settings.cardImages.map((elem, idx) => (
				<div className='imgCard' key={ idx }>
					<img src={ elem } alt='img' />
				</div>
			)) }
	</Slider>
}

SlickSlider.propTypes = {
	imagesItems: PropTypes.array.isRequired
}

export default SlickSlider