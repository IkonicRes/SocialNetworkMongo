const { Schema, model } = require('mongoose')

const User = require('./User')

const reactionSchema = new Schema({
    react: String, // Update the field name to "react"
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    thought: {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  });

const Reaction = model('Reaction', reactionSchema)

module.exports = Reaction