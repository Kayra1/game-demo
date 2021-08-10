const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")

// Middleware
const validateInput = require("../middleware/loginValidator")
const authenticateJWT = require("../middleware/authenticateToken")

// Model
const User = require("../models/User")

/////////////////
// Login Route //
/////////////////
// This route is responsible for logging users in or registering them
router.post("/login", (req, res) => {
    // Validate the input
    console.log(req.body)

    const {errors, isValid} = validateInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }

    // Either find the user or create a new one and log them in (we can use this to store scores or other info)
    User.findOne({ name: req.body.name }).then(user => {
        if (!user){
            const newUser = new User({
                name: req.body.name,
                password: req.body.password,
                wins: "0",
                losses: "0"
            })
            newUser.save()
            .catch(err => console.log(err))
            user = newUser
        }
        // If the user exists but the passwords don't match, give error
        if (user.password != req.body.password){
            return res.status(400).json({ err: "Wrong Password or User exists" })
        }

        // Sign JWT
        const payload = {
            name: user.name,
            wins: user.wins,
            losses: user.losses
        }
        console.log(user)
        console.log(payload)

        jwt.sign(
            payload,
            keys.secret,
            {expiresIn: 31556926 /*1 year*/},
            (err, token) => {
                res.json({
                    success: true,
                    token: "Bearer " + token
                })
            }
        )
    })
})


module.exports = router