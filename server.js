// Initialize backend
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")

// Import routes
const users = require("./backend/routes/users")

// Backend
const port = 3001
const backend = express()
backend.use(
  bodyParser.urlencoded(
    {extended: false}
  )
)

// Database
const dbURI = require("./config/keys").mongoURI
mongoose.connect(
  dbURI,
  {useNewUrlParser: true}
)
.then(() => {console.log("Database connected")})
.catch(err => console.log(err))


// Middleware
backend.use(passport.initialize())
require("./config/passport")(passport)

// Enable Routes
backend.use("/", users)

backend.listen(port, () => {
    console.log(`Server running on port ${port}`)
})