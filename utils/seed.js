const connection = require('../config/connection');
const usersData = require('./data')
const User = require('../models/User')
connection.on('error', (err) => err)

connection.once('open', async () => {
    console.log('Connected')
    try {
        console.log(User)

        let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
        if (usersCheck.length) {
          await connection.dropCollection('users');
        }
        
        // console.table(connection);
        await User.insertMany(usersData);
        console.log('Users seeded successfully');
        process.exit(0);
      } catch (error) {
        console.error('Error seeding users:', error);
      } finally {
        // Close the MongoDB connection
        connection.close()
    }
})