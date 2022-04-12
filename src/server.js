/**
 * The starting point of the application.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */
import express from 'express'
import logger from 'morgan'

try {
  /* await connectDB() */

  // Creates an Express application.
  const app = express()

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  app.use(express.json())

  // Register routes.
  /* app.use('/', router) */

  // Error handler.

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
}
