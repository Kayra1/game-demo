const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")
const moment = require("moment-timezone")

// Authentication middleware
const authenticateJWT = require("../middleware/authenticateToken")

router.get("/start-game", authenticateJWT, (req, res) => {
    res.json(generateRound())
})

router.post("/send-result", authenticateJWT, (req, res) => {
    // Check if the correct answer was sent
    let win = req.body.answer == colorChoice

    // Update the database
    let res;
    if (win) res = await User.updateOne({ name: user.name }, {wins: `${parseInt(user.wins)++}`})
    else res = await User.updateOne( { name: user.name }, {losses: `${parseInt(user.losses)++}`})
    if (res.n == 0) console.log("This user isn't in the db")
    
    // Generate result and return the last round's result
    nextRound = generateRound()
    nextRound["previousResult"] = win
    res.json(nextRound)
})

//////////////////////
// Helper functions //
//////////////////////

// Generate random colors
const random255Hex = () => {
    return parseInt(Math.floor(Math.random() * 256), 16);
};
// Generate a random index
const random5 = () => {
    return Math.floor(Math.random() * 6);
};

// Generate a round of the game
var colorChoice = 0
const generateRound = () => {
    const randomColors = [];
    for (let i = 0; i < 6; i++) {
        randomColors.push(`#
            ${random255Hex()}
            ${random255Hex()}
            ${random255Hex()}`)
    }
    colorChoice = `${random5}:${randomColors[random5]}`;

    const SFtime = moment().tz("America/Los_Angeles")
    const NYtime = moment().tz("America/New_York")

    let gameData = {
        colors: randomColors,
        choice: colorChoice,
        sftime: SFtime,
        nytime: NYtime
    }
    return gameData
}