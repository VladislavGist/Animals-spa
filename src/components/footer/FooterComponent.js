import { Link } from 'react-router'
import React from 'react'

if (process.env.BROWSER) {
	require('./FooterStyles.sass')
}

const Footer = () => (
	<footer>
		<Link to='/' className='footerLogo'>
			<img src='https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Flogo2.png?alt=media&token=bb1bf9a9-419b-475d-b28a-4a60b8d6783c' width='120' alt='logotype' />
		</Link>
		<div className='linksFooter'>
			<Link to='/contacts'>Контакты</Link>
			<p>
				Разработано: <a href='https://vk.com/vladfebruary' target='_blank'>KSEVEN</a>
			</p>
		</div>
		<p className='years'>2017</p>
	</footer>
)

export default Footer