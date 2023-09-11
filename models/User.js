const {Schema, model} = require('mongoose');
// const thoughtSchema = require('./Thought');
// const friendSchema = require('./Friend');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            max_length: 50
        },
        lastName: {
            type: String,
            required: true,
            max_length: 65
        },
        userName: {
            type: String,
            required: true,
            max_length: 50
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('User', userSchema)

module.exports = User