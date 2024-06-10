import express from 'express'
const router = express.Router()
import authenticationMiddleware from "../middleware/auth.js"
import { login , dashboard } from "../controllers/main.js"

router.route('/dashboard').get(authenticationMiddleware, dashboard)
router.route('/login').post(login)

export default router
