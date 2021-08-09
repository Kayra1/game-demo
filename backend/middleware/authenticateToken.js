const jwt = require('jsonwebtoken');
const secret = require("../../config/keys")

// Check if the JWT is valid
authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // Redirect if not valid
    if (token == null) return res.redirect("/")

    jwt.verify(token, secret, (err, user) => {
        console.log(err)

        if (err) return res.redirect("/")

        req.user = user

        next()
    })
}

module.exports = authenticateToken