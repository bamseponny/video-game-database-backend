/**
 * Video game database routes.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */
import express from 'express'
/* import { VideoGameController } from '../../../controllers/api/video-game-controller.js' */

export const router = express.Router()

/* const controller = new VideoGameController() */

router.get('/games', (req, res) => res.json({ message: 'Yay! Just yay!' }))
