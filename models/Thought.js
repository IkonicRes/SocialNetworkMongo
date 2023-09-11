const { Schema, model } = require('mongoose')

const thoughtSchema = new Schema({
  text: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reactions: [{
  type: Schema.Types.ObjectId,
  ref: 'Reaction'
}]
  // Other thought fields
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought