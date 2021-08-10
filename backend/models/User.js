const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wins: {
        type: String,
        required: true
    },
    losses: {
        type: String,
        required: true
    }
})

module.exports = User = mongoose.model("users", UserSchema)