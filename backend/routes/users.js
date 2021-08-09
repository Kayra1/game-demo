const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")

// Validator
const validateInput = require("../validation/login")
// Model
const User = require("../models/User")

router.post("/login", (req, res) => {
    // Validate the input
    const {errors, isValid} = validateInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }

    // Either find the user or create a new one and log them in (we can use this to store scores or other info)
    User.findOne({ name: req.body.name }).then(user => {
        if (!user){
            const newUser = new User({
                name: req.body.name,
                password: req.body.password
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
            name: user.name
        }
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