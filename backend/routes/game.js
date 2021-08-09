const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")

// Authentication middleware
const authenticateJWT = require("../middleware/authenticateToken")

router.get("/game", authenticateJWT, (req, res) => {
    // Send back the data required
})

router.post("/save-game", (req, res) => {
    // Get the game data and save it to the database
})