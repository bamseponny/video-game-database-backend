/**
 * Module for the VideoGameController.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */

import { Game } from '../../models/game.js'

/**
 * Encapsulates a controller.
 */
export class VideoGameController {
  /**
   * Create and add a game to the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async addGame (req, res, next) {
    console.log('Hoho!')

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
  }
}
