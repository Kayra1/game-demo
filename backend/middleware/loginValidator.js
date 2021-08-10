const validator = require("validator")

module.exports = validateInput = (data) => {
    var errors = {}

    console.log(data)
    
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field missing"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password missing"
    }

    if (!validator.isLength(data.password, {min:2, max:20})){
        errors.password = "Password must be at least 2 and at most 20 characters"
    }
    
    return {
        errors,
        isValid: true
    }
}