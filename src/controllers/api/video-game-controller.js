/**
 * Module for the VideoGameController.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */

import { Game } from '../../models/Game.js'
import createError from 'http-errors'
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import firebase from 'firebase-admin'
import firebaseConfig from '../../config/firebase-config.js'

/**
 * Encapsulates a controller.
 */
export class VideoGameController {
  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async authenticate (req, res, next) {
    try {
      if (firebase.apps.length === 0) {
        initializeApp({
          credential: firebase.credential.cert(firebaseConfig)
        })
        console.log(req.headers.authorization)
      }
      console.log(firebase.app)
      const header = req.headers?.authorization

      if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1]
        const decodedToken = await getAuth().verifyIdToken(idToken)
        console.log(decodedToken)
        next()
      }
    } catch (err) {
      console.log(err)
      const error = createError(401)
      next(error)
    }
  }

  /**
   * List all video games.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async listAllGames (req, res, next) {
    try {
      if (req.body.format) {
        const games = await Game.find({ format: req.body.format }).sort({ title: 1 })
        res
          .status(200)
          .json(games)
      } else if (req.body.year) {
        const games = await Game.find({ releaseYear: req.body.year }).sort({ title: 1 })
        res
          .status(200)
          .json(games)
      } else if (req.body.genre) {
        const games = await Game.find({ genre: req.body.genre }).sort({ title: 1 })
        res
          .status(200)
          .json(games)
      } else if (req.body.nowPlaying) {
        const games = await Game.find({ nowPlaying: req.body.nowPlaying }).sort({ title: 1 })
        res
          .status(200)
          .json(games)
      } else if (req.body.backlog) {
        const games = await Game.find({ backlog: req.body.backlog }).sort({ title: 1 })
        res
          .status(200)
          .json(games)
      } else {
        const games = await Game.find().sort({ title: 1 })
        res
          .status(200)
          .json(games)
      }
    } catch (err) {
      const error = createError(500)
      next(error)
    }
  }

  /**
   * Create and add a game.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async addGame (req, res, next) {
    try {
      const game = new Game({
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
        format: req.body.format,
        releaseYear: req.body.releaseYear,
        developer: req.body.developer,
        publisher: req.body.publisher,
        nowPlaying: req.body.nowPlaying,
        backlog: req.body.backlog,
        grade: req.body.grade,
        imageURL: req.body.imageURL,
        videoURL: req.body.videoURL,
        quote: req.body.quote
      })

      await game.save()

      res
        .status(201)
        .json(game)

      await game.save()
    } catch (err) {
      const error = createError(400)
      next(error)
    }
  }

  /**
   * Show single video game.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findOneGame (req, res, next) {
    try {
      const doesGameExist = await Game.exists({ _id: req.params.id })
      const game = await Game.find({ _id: req.params.id })
      console.log(doesGameExist)
      if (doesGameExist !== null) {
        res
          .status(200)
          .json(game)
      } else if (doesGameExist === null) {
        const error = createError(404)
        next(error)
      }
    } catch (err) {
      const error = createError(500)
      next(error)
    }
  }

  /**
   * Edit video game.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateGame (req, res, next) {
    try {
      const patchGame = await Game.findByIdAndUpdate({ _id: req.params.id }, req.body, { runValidators: true })

      await patchGame.save()
      res
        .sendStatus(204)
    } catch (err) {
      const error = createError(400)
      next(error)
    }
  }

  /**
   * Delete video game.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteGame (req, res, next) {
    try {
      const doesGameExist = await Game.exists({ _id: req.params.id })

      if (doesGameExist !== null) {
        await Game.findByIdAndDelete(req.params.id)
        res
          .sendStatus(204)
      } else if (doesGameExist === null) {
        const error = createError(404)
        next(error)
      }
    } catch (err) {
      const error = createError(404)
      next(error)
    }
  }
}
