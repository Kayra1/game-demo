const validator = require("validator")

module.exports = validateInput = (data) => {
    var errors = {}
    
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field missing"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password missing"
    }

    if (!validator.isLength(data.password, {min:6, max:20})){
        errors.password = "Password must be at least six and at most 20 characters"
    }
    
    return {
        errors,
        isValid: validator.isEmpty(errors)
    }
}