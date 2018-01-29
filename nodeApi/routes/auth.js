import express from 'express'
const router = express.Router()

import authenticate from '../auth/authenticate'

import AuthClass from '../classes/auth'
const Auth = new AuthClass

router.post('/registr', Auth.creareUser)

router.post('/login', authenticate)

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

export default router