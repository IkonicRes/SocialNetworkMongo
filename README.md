# SocialNetworkMongo

## Table of Contents
 - [Description](#description)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Contributing](#contributing)
 - [Testing](#testing)
 - [Contact](#contact)
 - [License](#license)


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
A mongoose back-end for social networks.

## Installation
Clone the repo to your machine, then run the command "npm install" at the project's base directory. If you would like to seed users for a demo, run "npm run seed". Simple.

## Usage
To start the server, run "npm start".
Check this walkthrough video out that demonstrates the routes and how they work, use a program like Insomnia or MongoCompassDB to play around with them:

[![Walkthrough video](./assets/images/Preview.png)](https://www.youtube.com/watch?v=DQs5I62Aayc)

There are several routes you can use to control the database, shown below:  
* USERS    
    - Get all users:

            ROUTE: GET /api/users
            BODY: NONE
    - Add a user:    

            ROUTE: POST /api/users
            BODY:
            {  
                "firstName": "FirstNameOfUser",  
                "lastName": "LastNameOfUser",  
                "userName": "UsernameOfUser",  
                "email": "USERSEMAIL@example.com"  
            }
    - Update a user:    

            ROUTE: PUT /api/users/:userId
            BODY:
            {  
                "firstName": "NewFirstNameOfUser",  
                "lastName": "NewLastNameOfUser",  
                "userName": "NewUsernameOfUser",  
                "email": "NEW8USERS8EMAIL@example.com"  
            }
    - Get a user:    

            ROUTE: GET /api/users/:userId
            BODY: NONE
    - Delete a user:    

            ROUTE: DELETE /api/users/:userId
            BODY: NONE 
    - Add a friend:   

            ROUTE: POST /api/:userId/friends
            BODY:
            {  
                "friendId": "IdNumberOfFriendToAdd"  
            }
    - Remove a friend:    

            ROUTE: DELETE /api/:userId/friends/:friendId
            BODY: NONE

* THOUGHTS    
    - Get all thoughts:    

            ROUTE: GET /api/thoughts
            BODY: NONE
    - Add a thought:    

            ROUTE: POST /api/thoughts
            BODY:
            {  
                "text": "This is thought text content",  
                "userId": "userId of Poster",  
                "username": "UsernameOfPoster",  
            }
    - Update a thought:    

            ROUTE: PUT /api/thoughts/:thoughtId
            BODY:
            {  
                "text": "This is new thought text content",  
                "userId": "NewUserIdOfPoster",  
                "username": "NewUsernameOfPoster",  
            }
    - Get a thought:    

            ROUTE: GET /api/thoughts/:thoughtId
            BODY: NONE
    - Delete a thought:    

            ROUTE: DELETE /api/thoughts/:thoughtId
            BODY: NONE
* REACTIONS
    - Add a Reaction:    

            ROUTE: POST /api/thoughts/:thoughtId/reactions
            BODY:
            {  
	        "text": "This is new thought text content",  
	        "userId": "NewUserIdOfPoster",  
	        "username": "NewUsernameOfPoster",  
            }
    - Delete a thought:

            ROUTE: DELETE /api/thoughts/:thoughtId
            BODY: NONE

## Contributing
Be good and do code.

## Testing
You can use insomnia to test the routes listed above


- GitHub Profile: [IkonicRes](https://github.com/IkonicRes)

- For additional questions, reach out to Ikonicresonance@gmail.com.

## Contact

Preferred method of communication: Email



## License

MIT License

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

