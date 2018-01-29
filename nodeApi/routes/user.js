import express from 'express'
import UserClass from '../classes/user'
import mustBeAuth from '../auth/mustBeAuth'

const router = express.Router()

const User = new UserClass

router.post('/updateUserData', mustBeAuth, User.updateUserData)
router.get('/userDatas', mustBeAuth, User.userDatas)
router.post('/completeCard', mustBeAuth, User.completeCard)
router.get('/userCardsAccepted', User.userCardsAccepted)
router.get('/userCardsComplAndRejected', mustBeAuth, User.userCardsComplAndRejected)

export default router