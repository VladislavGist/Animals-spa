import passport from 'passport'
import bodyParser from 'body-parser'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'

import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'

import { store } from '../../client/src/routing'
import { routes } from '../../client/src/routing'
import fetchComponentsData from '../utils/fetchComponentsData'

import logger from './logger'
import requestTime from './requestTime'

import config from '../configs/config'

export default [
	cookieParser(),
	bodyParser.urlencoded({ extended: true }),
	bodyParser.json(),
	cookieSession({ keys: [config.secret] }),
	passport.initialize(),
	passport.session(),
	requestTime,
	(req, res, next) => {

		console.log(req.url)

		match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

			if (redirectLocation) {
				res.send(301, redirectLocation.pathname + redirectLocation.search)
			}

			else if (error) {
				res.send(500, error.message)
			}

			else if (!renderProps) {
				res.send(404, 'Not found')
			}

			else {

				global.navigator = { userAgent: 'all' }

				fetchComponentsData(
					store.dispatch,
					renderProps.components,
					renderProps.params,
					renderProps.location.query
				)
				.then(() => {

					const componentHTML = ReactDOM.renderToString(<Provider store={ store }>
						<RouterContext { ...renderProps } />
					</Provider>)

					const initialState = store.getState()

					res.end(`
							<!DOCTYPE html>
								<html lang="ru">
								<head>
									<meta charset="UTF-8">
									<title>Oblako.pet</title>
									<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
									<meta http-equiv="X-UA-Compatible" content="IE=edge">

									<link rel="apple-touch-icon" sizes="180x180" href="./favicons/apple-touch-icon.png">
									<link rel="icon" type="image/png" href="./favicons/./favicon-32x32.png" sizes="32x32">
									<link rel="icon" type="image/png" href="./favicons/./favicon-16x16.png" sizes="16x16">
									<link rel="manifest" href="./favicons/manifest.json">
									<link rel="mask-icon" href="./favicons/safari-pinned-tab.svg" color="#5bbad5">
									<meta name="theme-color" content="#ffffff">

									<meta content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" name="SKYPE_TOOLBAR">
									<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
									<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>

									<script src="https://use.fontawesome.com/d12eda1a75.js"></script>
									<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
									<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
									<link rel="stylesheet" type="text/css" href="${ config.staticUrl }/main.css" />

								</head>
								<body>
									<div id="app">${ componentHTML }</div>
									<script type='application/javascript'>
										window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) }
									</script>
									<script src="${ config.staticUrl }/bundle.js"></script>
									<script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter44570849 = new Ya.Metrika({ id:44570849, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/44570849" style="position:absolute; left:-9999px;" alt="" /></div>
									</noscript>
								</body>
								</html>
						`)
				})
			}
		})
		next()
	}
]