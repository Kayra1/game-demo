# KiwiCo Small Game

### Installation & Running
`npm install` on the root directory
`npm install` in the frontend directory
`npm run dev` in the root directory

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