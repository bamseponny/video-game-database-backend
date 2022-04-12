/**
 * API version 1 routes.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Yay! Welcome to version 1 of this Video Game Database API!' }))