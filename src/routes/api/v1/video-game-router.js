/**
 * Video game database routes.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */

import express from 'express'
import { VideoGameController } from '../../../controllers/api/video-game-controller.js'

export const router = express.Router()

const controller = new VideoGameController()

// Map HTTP verbs and route paths to controller actions.

// List all video games of a certain format.
router.get('/games', (req, res, next) => controller.listAllGames(req, res, next))

// Add a video game to the database.
router.post('/games', (req, res, next) => controller.addGame(req, res, next))

// Show single game.
router.get('/games/:id', (req, res, next) => controller.findOneGame(req, res, next))

// Edit game.
router.put('/games/:id', (req, res, next) => controller.updateGame(req, res, next))

// Delete game.
router.get('/games/:id', (req, res, next) => controller.deleteGame(req, res, next))
