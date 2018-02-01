import { Link } from 'react-router'
import React, { Component } from 'react'

if (process.env.BROWSER) {
	require('./FooterStyles.sass')
}

export default class Footer extends Component {

	render() {
		return (
			<footer>
				<Link to='/' className='footerLogo'>
					<img src='uploads/logo2.png' width='120' alt='logotype' />
				</Link>
				<div className='linksFooter'>
					<Link to='/contacts'>Контакты</Link>
					<p>
						Разработано:
						<a href='https://vk.com/vladfebruary' target='_blank'>KSEVEN</a>
					</p>
				</div>
				<p className='years'>2017</p>
			</footer>
		)
	}
}