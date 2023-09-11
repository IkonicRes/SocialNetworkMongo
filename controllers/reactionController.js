const { ObjectId } = require('mongoose').Types;

const { Reaction, Thought } = require('../models')

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
          // Find all reactions
          const reactions = await Reaction.find();
      
          const reactionObj = {
            reactions,
          };
      
          return res.json(reactionObj);
        } catch (error) {
          console.log(error);
          res.status(500).json(error);
        }
      },
    async createReaction(req, res) {
        try {
          const react = req.body.reaction; // Ensure react is correctly sent in the request body
          const userId = req.body.userId; // Use req.userId to access the extracted userId
          const thoughtId = req.params.thoughtId; // Use req.params to get the thoughtId from the route parameters
      
          // Check if the thought and user exist
          const thought = await Thought.findById(thoughtId);
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
      
          // Update the thought to include the reaction
          thought.reactions.push(reaction._id);
          await thought.save();
          const reactionObject = reaction.toObject()
          // Return a response indicating success
          res.status(201).json(reactionObject);
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
            const reactionObject = reaction.toObject()
            res.json(reactionObject)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // Delete a student and remove them from the course
    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findById(req.params.reactionId);

            if (reaction) {
              await reaction.remove();
              res.json({ message: 'Reaction successfully deleted' });
            } else {
              res.status(404).json({ message: 'No such reaction exists' });
            }
             
        }
        catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}