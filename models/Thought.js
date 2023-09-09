// const { Schema, model } = require('mongoose')
// const Reaction = require('./Reaction')
// const User = require('./User')

// const thoughtSchema = new Schema(
//     {
//         owner: User,
//         content: {
//             type: String,
//             required: true,
//         },
//         // reactions: [Reaction],
//         date: {
//             type: Date,
//             default: Date.now()    
//         }
//     },
//     {
//         toJSON: {
//             virtuals: true,
//         },
//         id: false,
//     }
// )

// const Thought = model('thought', thoughtSchema)

// module.exports = Thought