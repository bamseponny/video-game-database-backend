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
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [425, 'The description must be a maximum of 425 characters.']
  },
  genre:
    [{
      type: String,
      required: true,
      enum: [
        'Action',
        'Actionrollspel',
        'Onlinerollspel',
        'Party',
        'Plattform',
        'Pussel',
        'Racing',
        'Rollspel',
        'Simulation',
        'Skräck',
        'Sport',
        'Strategi',
        'Äventyr'
      ]
    }],
  format: [{
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
  }],
  releaseYear: {
    type: Number,
    required: true,
    trim: true
  },
  developer: [{
    type: String,
    required: true,
    trim: true
  }],
  publisher: [{
    type: String,
    required: true,
    trim: true
  }],
  nowPlaying: {
    type: Boolean,
    default: false
  },
  backlog: {
    type: Boolean,
    default: false
  },
  series: {
    type: String,
    default: null
  },
  grade: {
    type: Number,
    enum: [
      0,
      1,
      2,
      3,
      4,
      5
    ]
  },
  imageURL: {
    type: String,
    required: true,
    trim: true
  },
  videoURL: {
    type: String,
    required: true,
    trim: true
  },
  quote: {
    type: String,
    trim: true,
    maxlength: [70, 'The description must be a maximum of 70 characters.']
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
export const Game = mongoose.model('Game', schema)
