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
}