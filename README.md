# Small Game

### Installation & Running
* `npm install` on the root directory
* `npm install` in the frontend directory
* `npm run dev` in the root directory

# Preface

This is a simple game with JWT token authentication and authorization implemented using React and Redux for the frontend and Node.js and Express for the backend in 12 hours. Overall, it was a fun project that was a quick rundown of some of the most important features in modern web development.

# Components

The project is divided into 2 sections:

## Backend

The backend is mainly responsible for:
* Generating and verifying JWT tokens
* Generating game data
* Communicating with the database

### models

Files in models describe the schema for the objects in the database. I went with MongoDB, since there is no relational data in the program and MongoDB is quite easy and quick to set up. Since the project was small, a simple User schema was enough.

### routes

The two main routes in the program are for user authentication and the game. The user route simply creates the token for the user and saves the data accordingly. In this case, if the username does not exist, the backend will just automatically create it and return its data to the user, eliminating the register screen. The only time this login page raises an error other than input validation is when the username exists but the password is wrong. This is a good way to easily register users without saving any important information. One change that could have been done here would be to hash the password before saving it, which is a simple modification.

### middleware

The two middleware files are responsible for validating input for login and authorizing the token when accessing the game. When accessing the game routes, the user token is authenticated to make sure the game is only being accessed by a logged in user.

## Frontend

The frontend is responsible for:
* Getting the game to display properly
* Logging in the user

### components

The private route component redirects the user to login if they attempt to access a page they shouldn't. The 3 main components are responsible for the login form, the account page where a user can log out and the game page. The account page was done because I had already completed it by the time I realized that the logout button should have been in the game page, and I decided to keep it in since it's an extra feature and doesn't really effect the flow of the program. It will just show the wins losses and the username.

### redux

Using redux was a bit overkill for this tiny project but it did help carry the user data and token around the website easily, saving some dev time from the future. The main auth reducer and authaction gets the user data into the store.

## Extra Features
* You can locate the mongoDB interactions from the backend routes and server.js
* The grid CSS for the game is located in game.css

I attempted to locally host the server under my own domain name, but unfortunately I didn't have the time. 

# Route Information

## Backend Routes

### POST "/login"

This route will be responsible for logging users in. If the user is logged in,
it will show a button to take them to the game. If they're not, it will prompt
them to log in.

### GET "/start-game"

This route will verify if the user is logged in, and if they are, will enable them
to play the game by returning the required information.

### POST "/send-result"

This route will save the user's choice in the database and give the information
for the next round

## Frontend Routes

### GET "/"

This route will show the homepage of the website, which is currently empty. The
navbar will show account and game buttons if the user is logged in, or the log in
button

### GET "/login"

This route will allow the user to enter their log in details.

### GET "/account"

This route will show the user's stats and allow them to log out. 
Since the system uses JWT's, logging out is as simple as removing the token from
local storage. There is no need to send any information to the backend.

### GET "/game"

This route will allow you to start the game

## Known Bugs

* After logout, the navbar doesn't update until a refresh
