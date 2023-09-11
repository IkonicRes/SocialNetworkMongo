const { ObjectId } = require('mongoose').Types;

const { Thought, User } = require('../models')

module.exports = { 
    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            return res.json(thought);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            const thoughtObj = {
                thoughts
            }
            return res.json(thoughtObj);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createThought(req, res) {
        try {
          const { text } = req.body;
          const userId = req.userId; // Use req.userId to access the extracted userId
      
          const thought = new Thought({
            text,
            user: userId, // Associate the thought with the user
          });
      
          await thought.save();

          const user = await User.findByIdAndUpdate(
            userId,
            { $push: { thoughts: thought._id } },
            { new: true } // To return the updated user
          );
          // Return a response indicating success
          res.status(201).json(thought);
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
                { $set:  req.body },
                { runValidators: true, new: true }
            )
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!'})
            }
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // Delete a student and remove them from the course
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' })
            }
            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
            }
        },
}