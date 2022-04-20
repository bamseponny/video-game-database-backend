/**
 * Module for the VideoGameController.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */

import { Game } from '../../models/Game.js'

/**
 * List all images.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */

/**
 * Encapsulates a controller.
 */
export class VideoGameController {
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
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create and add a game to the database.
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
        imageURL: req.body.imageURL
      })

      res
        .status(201)
        .json(game)

      await game.save()
    } catch (error) {
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
      const game = await Game.find({ _id: req.params.id })
      res
        .status(200)
        .json(game)
    } catch (error) {
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
      console.log(req.params.id)
      const patchGame = await Game.findByIdAndUpdate({ _id: req.params.id }, req.body, { runValidators: true })

      await patchGame.save()
      res
        .sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
