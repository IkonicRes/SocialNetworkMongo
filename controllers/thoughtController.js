const { ObjectId } = require('mongoose').Types;

const { Thought, User } = require('../models');

module.exports = {
  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate({
          path: 'user',
          select: 'userName', // Include only the 'userName' field from the user
        })
        .populate('reactions') // Populate the reactions field
        .exec();
  
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
  
      // Map the populated reactions to get the 'react' strings
      const reactions = thought.reactions.map((reaction) => reaction.react);
  
      // Create an object with the thought data and reactions
      const thoughtObject = thought.toObject();
  
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
        return thought.toObject()
      });

      return res.json(thoughtObjects);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async createThought(req, res) {
    try {
      // const text = req.body.text;
      const userId = req.body.userId;
      // Use req.userId to access the extracted userId
      // let userRef = await User.findOne({ _id: userId });
      // const name = userRef.userName;
      const thought =await Thought.create(req.body);
      console.log(thought)
      const user = await User.findOneAndUpdate(
        {_id:userId},
        { $push: { thoughts: thought._id } },
        { new: true }, // To return the updated user
      );
      // Return a response indicating success
      if (!user) {
        return res.status(404).json({ message: 'Thought created without a User Associated' });
      }
       res.json({ message: 'Thought Created!' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json(error.message);
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
  // Delete a thought and remove it from the user
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
