const router = require('express').Router()
const mongoose = require('mongoose')
const { getUser, getUsers, createUser, deleteUser, updateUser, getFriend, getFriends, addFriend, deleteFriend } = require('../../controllers/userController')
const { createThought, getThoughts, getThought, updateThought, deleteThought } = require('../../controllers/thoughtController')
const { getReactions, createReaction, deleteReaction, updateReaction } = require('../../controllers/reactionController')

const extractUserId = (req, res, next) => {
    const userId = req.params.userId;
  
    // Validate and convert userId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
  
    // Attach userId to the request object for later use
    req.userId = userId;
    console.log('Extracted userId:', req.userId); // Check the extracted userId
    next(); // Call the next middleware or route handler
  };
const extractThoughtId = (req, res, next) => {
    const thoughtId = req.params.thoughtId;
  
    // Validate and convert userId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ error: 'Invalid thought ID' });
    }
  
    // Attach userId to the request object for later use
    req.thoughtId = thoughtId;
    console.log('Extracted thoughtId:', req.thoughtId); // Check the extracted userId
    next(); // Call the next middleware or route handler
  };

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser)
router.route('/:userId/thoughts').get(getThoughts).post(extractUserId, createThought)
router.route('/:userId/thoughts/:thoughtId').get(getThought).put(updateThought).delete(deleteThought)
router.route('/:userId/thoughts/:thoughtId/reactions').get(getReactions).post(extractUserId, extractThoughtId, createReaction).put(updateReaction).delete(deleteReaction)
router.route('/:userId/friends').get(getFriends).post(extractUserId, addFriend)
router.route('/:userId/friends/:friendId').get(getFriend).delete(deleteFriend)
module.exports = router