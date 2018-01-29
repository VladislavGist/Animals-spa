import express from 'express'
import AppClass from '../classes/app'

const router = express.Router()

const App = new AppClass

// router.get('*', App.getPublic)

router.post('/sendus', App.sendUs)

router.get('/list-animals/animal_type/:animaltype/advertisement_type/:advertisementtype/city/:city/count/:count/allcount', App.disabledBtn)

router.get('/list-animals/animal_type/:animaltype/advertisement_type/:advertisementtype/city/:city/count/:count', App.filterCity)

export default router