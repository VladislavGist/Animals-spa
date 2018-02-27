import express from 'express'
import AppClass from '../classes/app'

const router = express.Router()

const App = new AppClass

// router.get('*', App.getPublic)

router.post('/sendus', App.sendUs)

router.get('/list-animals/allcount', App.disabledBtn)

router.get('/list-animals', App.filterCity)

export default router