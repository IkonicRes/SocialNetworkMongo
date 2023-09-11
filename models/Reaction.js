const { Schema, model } = require('mongoose')

const User = require('./User')

const reactionSchema = new Schema({
    reaction: Number,
    thought: {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})

const Reaction = model('reaction', reactionSchema)

module.exports = Reaction