const { ObjectId } = require('mongoose').Types;

const { Reaction } = require('../models')

module.exports = { 
    async getReaction(req, res) {
        try {
            const reaction = await Reaction.findOne({ _id: req.params.reactionId })
            return res.json(reaction);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getReactions(req, res) {
        try {
            const reactions = await Reaction.find()
            const reactionObj = {
                reactions
            }
            return res.json(reactionObj);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createReaction(req, res) {
        try {
          const { text } = req.body;
          const userId = req.userId; // Use req.userId to access the extracted userId
      
          const reaction = new Reaction({
            text,
            user: userId, // Associate the reaction with the user
          });
      
          await reaction.save();
      
          // Return a response indicating success
          res.status(201).json(reaction);
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
                { $set:  req.body },
                { runValidators: true, new: true }
            )
            
            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with this ID!'})
            }
            res.json(reaction)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // Delete a student and remove them from the course
    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndRemove({ _id: req.params.reactionId });

            if (!reaction) {
                return res.status(404).json({ message: 'No such reaction exists' })
            }
            res.json({ message: 'Reaction successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
            }
        },
}