import express from 'express'

import mustBeAuth from '../auth/mustBeAuth'
import ModerateClass from '../classes/moderate'

const router = express.Router()

const Moderate = new ModerateClass

router.post('/replaceStatusCard', mustBeAuth, Moderate.replaceStatuCard)
router.get('/moderate', mustBeAuth, Moderate.moderate)

export default router