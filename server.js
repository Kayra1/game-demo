// Initialize backend
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

// Backend
const port = 3000
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

backend.listen(port, () => {
    console.log(`Server running on port ${port}`)
})