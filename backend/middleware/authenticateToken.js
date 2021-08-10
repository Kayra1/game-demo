const jwt = require('jsonwebtoken');
const keys = require("../../config/keys")

// Check if the JWT is valid
authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // Redirect if not valid
    if (token == null) return res.redirect("/")

    jwt.verify(token, keys.secret, (err, user) => {

        if (err) return res.redirect("/")
        req.user = user

        next()
    })
}

module.exports = authenticateToken