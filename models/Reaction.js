const { Schema, model } = require('mongoose')

const User = require('./User')

const reactionSchema = new Schema(
    {
        reactionType: {

        },
        reactor: User
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
)

const Reaction = model('reaction', reactionSchema)

module.exports = Reaction