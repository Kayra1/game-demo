const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")
const moment = require("moment-timezone")

// Authentication middleware
const authenticateJWT = require("../middleware/authenticateToken")

router.get("/start-game", authenticateJWT, (req, res) => {
    let output = generateRound()

    // Retrieve the user win/loss from the database
    User.findOne({ name: req.user.name }).then( user => {
        output["user"] = user
        delete output.user.password

        res.json(output)
    })
})

router.post("/send-result", authenticateJWT, (req, res) => {
    // Check if the correct answer was sent
    let win = req.body.answer == colorChoice

    let wins = req.body.wins
    let losses = req.body.losses
    
    // Generate next round
    let output = generateRound()
    output["user"] = req.user

    // Update the database and local win/loss ratio
    let DBres;
    if (win) {
        let newWins = parseInt(wins) + 1
        DBres = User.updateOne({ name: req.user.name }, {wins: newWins.toString()})
        console.log(DBres)
        output.user.wins = newWins.toString()
    }
    else {
        let newLoss = parseInt(losses) + 1
        DBres = User.updateOne( { name: req.user.name }, {losses: newLoss.toString()})
        console.log(DBres)
        output.user.losses = newLoss.toString()
    }
    if (DBres.n == 0) console.log("This user isn't in the db")
    
    res.json(output)
})

//////////////////////
// Helper functions //
//////////////////////

// Generate random colors
const random255Hex = () => {
    return Math.floor(Math.random() * 256).toString(16);
};
// Generate a random index
const random5 = () => {
    return Math.floor(Math.random() * 6);
};

// Generate a round of the game
var colorChoice = -1
const generateRound = () => {
    const randomColors = [];
    for (let i = 0; i < 6; i++) {
        randomColors.push(`#${random255Hex()}${random255Hex()}${random255Hex()}`)
    }
    colorChoice = random5()

    const SFtime = moment().tz("America/Los_Angeles").format("hh:mm A. MMM Do, YYYY");
    const NYtime = moment().tz("America/New_York").format("hh:mm A. MMM Do, YYYY");

    let gameData = {
        colors: randomColors,
        choice: colorChoice,
        sftime: SFtime,
        nytime: NYtime
    }
    return gameData
}

module.exports = router