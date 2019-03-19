import { Link } from 'react-router'
import React from 'react'

if (process.env.BROWSER) {
	require('./FooterStyles.sass')
}

const Footer = () => (
	<footer>
		<Link to='/' className='footerLogo'>
			<img src='/images/app/PPLogo.svg' width='120' alt='logotype' />
		</Link>
		<div className='linksFooter'>
			<Link to='/contacts'>Контакты</Link>
		</div>
		<p className='years'>2019</p>
	</footer>
)

export default Footer