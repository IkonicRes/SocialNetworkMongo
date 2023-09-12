const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    react: String, // Update the field name to "react"
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    thought: {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  },
  {
    toJSON: true,
    virtuals: true,
  },
);
reactionSchema.pre('remove', async function (next) {
  try {
    const thoughtId = this.thought;

    // Find the thought associated with this reaction
    const thought = await Thought.findById(thoughtId);

    if (thought) {
      // Remove the reaction ID from the thought's reactions array
      thought.reactions.pull(this._id);
      await thought.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
