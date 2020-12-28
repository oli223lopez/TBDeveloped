const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatingRegisterInput(data) {
    let errors = {}


    data.handle = validText(data.handle) ? data.handle : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';
    data.email = validText(data.email) ? data.email : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
        errors.handle = 'Handle must be between 2 and 30 characters'
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Handle field is required'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    if (!Validator.isLength(data.password, { min: 6, mac: 30 })) {
        errors.password = 'Password must be aleast 6 characters'
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confrim Password field is required'
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match'

    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}