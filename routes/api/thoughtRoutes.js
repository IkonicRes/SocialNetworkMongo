const router = require('express').Router();
const mongoose = require('mongoose');

const {
  createThought,
  getThoughts,
  getThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');
const {
  getReactions,
  createReaction,
  deleteReaction,
  updateReaction,
} = require('../../controllers/reactionController');

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

router.route('/').get(getThoughts).post(createThought);
router
  .route('/:thoughtId')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction);
router
  .route('/:thoughtId/reactions/:reactionId')
  .put(updateReaction)
  .delete(deleteReaction);

module.exports = router;
