import multer from 'multer'
import express from 'express'
import CardsClass from '../classes/cards'
import mustBeAuth from '../auth/mustBeAuth'

const router = express.Router()

const Cards = new CardsClass

const upload = multer({ storage: Cards.storage })

router.get('/list-hot-adv/:city', Cards.indexPageCards)
router.post('/updatecardviews', Cards.cardCounter)
router.post('/add-advertisement?', mustBeAuth, Cards.addCard)
router.post('/add-advertisement/img/animalType/:animalType/advertisementType/:advertisementType', upload.array('photo'), mustBeAuth, Cards.addCard)

export default router