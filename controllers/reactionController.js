const { ObjectId } = require('mongoose').Types;

const { Reaction, Thought } = require('../models');

module.exports = {
  // async getReaction(req, res) {
  //   try {
  //     const reaction = await Reaction.findOne({ _id: req.params.reactionId });
  //     return res.json(reaction);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },
  // async getReactions(req, res) {
  //   try {
  //     // Find all reactions
  //     const reactions = await Reaction.find()
  //     // const reactions = await Thought.findById({ _id: req.params.thoughtId })
  
  //     // Create an object to hold the reactions
  //     const reactionObj = {
  //       reactions, // Include the reactions in the response
  //     };
  //     console.log(reactionObj)
  //   res.status(200).json(reactionObj);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json(error);
  //   }
  // },
  
  async createReaction(req, res) {
    try {
      const react = req.body.reaction; // Ensure react is correctly sent in the request body
      const userId = req.body.userId; // Use req.userId to access the extracted userId
      const thoughtId = req.params.thoughtId; // Use req.params to get the thoughtId from the route parameters

      // Check if the thought and user exist
      const thought = await Thought.findOne({ _id: thoughtId });
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      // Create the reaction
      const reaction = new Reaction({
        react,
        user: userId,
        thought: thoughtId,
      });

      await reaction.save();

      // Update the thought to include the reaction ObjectId
      thought.reactions.push(reaction._id);
      await thought.save();

      const thoughtObject = {
        _id: thought._id,
        text: thought.text,
        username: thought.username,
        reactions: reaction.react,
        createdAt: thought.createdAt,
        __v: thought.__v
      };
      // Return a response indicating success
      res.status(201).json(thoughtObject);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  
  async updateReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndUpdate(
        { _id: req.params.reactionId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!reaction) {
        return res.status(404).json({ message: 'No reaction with this ID!' });
      }
      const reactionObject = reaction.toObject();
      res.json(reactionObject);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Delete a student and remove them from the course
  async deleteReaction(req, res) {
    try {
      const reactionId = req.params.reactionId; // Get the reactionId from the route parameters
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findOne({ _id: thoughtId });
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      // Check if the reaction exists in the thought's reactions array
      const reactionIndex = thought.reactions.indexOf(reactionId);

      if (reactionIndex === -1) {
        return res.status(404).json({ error: 'Reaction not found in thought' });
      }

      // Remove the reaction ObjectId from the reactions array
      thought.reactions.splice(reactionIndex, 1);
      await thought.save();

      // Delete the reaction document from the database
      await Reaction.deleteOne({ _id: reactionId });
      res.json({ message: 'Reaction successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
