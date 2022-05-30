/**
 * The starting point of the application.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */

import { connectDB } from './config/mongoose.js'
import express from 'express'
import logger from 'morgan'
import { router } from './routes/router.js'
import cors from 'cors'

try {
  await connectDB()

  // Creates an Express application.
  const app = express()

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  app.use(express.json())

  // Att ha till senare.
  app.use(cors())

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    if (err.status === 400) {
      return res
        .status(400)
        .json({
          status_code: 400,
          message: 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).'
        })
    } else if (err.status === 401) {
      return res
        .status(401)
        .json({
          status_code: 401,
          message: 'Access token invalid or not provided.'
        })
    } else if (err.status === 403) {
      return res
        .status(403)
        .json({
          status_code: 403,
          message: 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.'
        })
    } else if (err.status === 404) {
      return res
        .status(404)
        .json({
          status_code: 404,
          message: 'The requested resource was not found.'
        })
    } else {
      return res
        .status(500)
        .json({
          status_code: 500,
          message: 'An unexpected condition was encountered.'
        })
    }
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
}
