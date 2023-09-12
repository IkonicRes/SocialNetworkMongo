const { ObjectId } = require('mongoose').Types;

const { Thought, User } = require('../models');

module.exports = {
  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate('reactions') // Populate the reactions field
        .exec();

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      // Map the populated reactions to get the 'react' strings
      const reactions = thought.reactions.map((reaction) => reaction.react);

      // Create an object with the thought data and reactions
      const thoughtObject = {
        _id: thought._id,
        // Add other thought properties here as needed
        reactions: reactions,
      };

      return res.json(thoughtObject);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async getThoughts(req, res) {
    try {
      // Find all thoughts associated with the user and populate the reactions field
      const thoughts = await Thought.find().populate('reactions').exec();

      // Convert the thoughts array to an array of plain objects
      const thoughtObjects = thoughts.map((thought) => {
        // Map the populated reactions to get the 'react' strings
        const reactions = thought.reactions.map((reaction) => reaction.react);

        // Create an object with the thought data and reactions
        return {
          _id: thought._id,
          // Add other thought properties here as needed
          reactions: reactions,
        };
      });

      return res.json(thoughtObjects);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async createThought(req, res) {
    try {
      const text = req.body.text;
      const userId = req.body.userId;
      console.log(userId);
      // Use req.userId to access the extracted userId
      let userRef = await User.findOne({ _id: userId });
      console.log(userRef);
      const name = userRef.userName;
      console.log(name);
      const thought = new Thought({
        text,
        username: name, // Associate the thought with the user
      });

      await thought.save();
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: thought._id } },
        { new: true }, // To return the updated user
      );
      const thoughtObject = thought.toObject();
      const userObject = user.toObject();
      // Return a response indicating success
      res.status(201).json(thoughtObject);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }
      const thoughtObject = thought.toObject();
      res.status(201).json(thoughtObject);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // Delete a student and remove them from the course
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }
      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
