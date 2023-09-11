const { Schema, model } = require('mongoose')

const thoughtSchema = new Schema({
  text: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // Other thought fields
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought