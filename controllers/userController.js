const { ObjectId } = require('mongoose').Types;

const { User } = require('../models')

module.exports = { 
    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            return res.json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getUsers(req, res) {
        try {
            const users = await User.find()
            const userObj = {
                users
            }
            return res.json(userObj);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set:  req.body },
                { runValidators: true, new: true }
                )
                
                if (!user) {
                    return res.status(404).json({ message: 'No User with this ID!'})
                }
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // Delete a student and remove them from the course
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' })
            }
            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
          console.log(req.params)
          const userId = req.params.userId;
          const friendId = req.body.friendId;
      
          // Fetch the user and friend documents
          const user = await User.findOne({ _id: userId });
          const friend = await User.findOne({ _id: friendId });
          console.log(friend)
          // Check if the user and friend exist
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          if (!friend) {
            return res.status(404).json({ error: 'Friend not found' });
          }
      
          // Add the friend's ID to the user's friend list
          user.friends.push(friendId);
          await user.save();
      
          // Optionally, you can also add the user's ID to the friend's friend list
        //   friend.friends.push(userId);
        //   await friend.save();
      
          return res.json(user); // Return the updated user
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async getFriend(req, res) {
        try {
          const friendId = req.params.friendId;
          const friend = await User.findOne({ _id: friendId });
      
          if (!friend) {
            return res.status(404).json({ error: 'Friend not found' });
          }
      
          return res.json(friend);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      
      async getFriends(req, res) {
        try {
          const userId = req.params.userId;
          const user = await User.findOne({ _id: userId });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          const friends = await User.find({ _id: { $in: user.friends } });
      
          if (!friends) {
            return res.status(404).json({ error: 'No friends found for the user' });
          }
      
          return res.json(friends);
        } catch (error) {
          console.error(error); // Log the error for debugging
          res.status(500).json(error);
        }
      },
      async deleteFriend(req, res) {
        try {
          const userId = req.params.userId;
          const friendId = req.params.friendId;
      
          // Fetch the user document
          const user = await User.findOne({ _id: userId });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Remove the friend's ID from the user's friend list
          const index = user.friends.indexOf(friendId);
          if (index !== -1) {
            user.friends.splice(index, 1);
            await user.save();
          }
      
          return res.json(user);
        } catch (error) {
          res.status(500).json(error);
        }
      }
      
}