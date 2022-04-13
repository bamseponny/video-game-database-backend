/**
 * Mongoose model Game.
 *
 * @author Fredrik Eriksson
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500 // Behöver sannolikt justeras as fuck
  },
  genre: {
    type: String,
    required: true,
    enum: [
      'Action',
      'Party',
      'Platform',
      'Role-playing game',
      'Horror',
      'Sport',
      'Strategy',
      'Adventure'
    ]
  },
  format: {
    type: String,
    required: true,
    enum: [
      'Pc',
      'Nintendo Switch',
      'Playstation 4',
      'Playstation 5',
      'Xbox One',
      'Xbox Series X|S'
    ]
  },
  releaseYear: {
    type: String,
    required: true,
    trim: true
  },
  developer: {
    type: String,
    required: true,
    trim: true
  },
  publisher: {
    type: String,
    required: true,
    trim: true
  },
  imageURL: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toObject: {
    virtuals: true,

    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    }
  }
})

// Create a model using the schema.
export const Snippet = mongoose.model('Game', schema)
