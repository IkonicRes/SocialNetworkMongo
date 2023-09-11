const {Schema, model} = require('mongoose');
const Thought = require('./Thought');
// const friendSchema = require('./Friend');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            max_length: 50
        },
        lastName: {
            type: String,
            required: true,
            max_length: 65
        },
        userName: {
            type: String,
            required: true,
            max_length: 50,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
              /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              'Please enter a valid email address',
            ],
          },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },    
    {
        toJSON: {
            getters: true,
        },
    }
);

userSchema.methods.removeWithThoughts = async function () {
    try {
      // Get the user ID
      const userId = this._id;
  
      // Remove the user's thoughts (if associated)
      await Thought.deleteMany({ user: userId });
  
      // Remove the user
      await this.model('User').deleteOne({ _id: userId });
    } catch (error) {
      throw error;
    }
  };
  

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema)

module.exports = User