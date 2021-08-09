# KiwiCo Small Game

## Backend Routes

### POST "/"

This route will be responsible for logging users in. If the user is logged in,
it will show a button to take them to the game. If they're not, it will prompt
them to log in.

### GET "/game"

This route will verify if the user is logged in, and if they are, will enable them
to play the game by returning the required information.

### POST "/save-game"

This route will save the user's progress to the database and redirect the user
to the main page.

### GET "/logout"

This route will redirect the user to the homepage. Since the authentication is 
done using JWT's, the server doesn't need to do anything to log the user out.
Instead, the frontend can just delete the cookie that was saved by the website.