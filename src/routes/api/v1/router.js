/**
 * API version 1 routes.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */

import express from 'express'
import { router as videoGameRouter } from './video-game-router.js'

export const router = express.Router()

// Ska tas bort senare!
router.get('/', (req, res) => res.json({ message: 'Welcome to version 1 of this Video Game Database API!' }))
router.use('/', videoGameRouter)
