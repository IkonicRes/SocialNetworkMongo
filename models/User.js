const {Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought');
const friendSchema = require('./Friend');

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
        friends: [friendSchema],
        thoughts: [thoughtSchema]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema)