const router = require('express').Router()
const mongoose = require('mongoose')
const { getUser, getUsers, createUser, deleteUser, updateUser, getFriend, getFriends, addFriend, deleteFriend } = require('../../controllers/userController')

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

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser)
router.route('/:userId/friends').get(getFriends).post(extractUserId, addFriend)
router.route('/:userId/friends/:friendId').get(getFriend).delete(deleteFriend)
module.exports = router