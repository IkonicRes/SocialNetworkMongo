const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  text: {
    type: String,
    maxlength: 280,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    maxlength: 40,
    required: true,
  },
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Reaction',
  }],
},
{
  toJSON: true,
  virtuals: true
});

thoughtSchema.virtual('formattedCreatedAt').get(function() {
  // Format the date as a human-readable string
  return new Date(this.createdAt).toLocaleDateString();
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;