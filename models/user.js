const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true
    }
});

userSchema.methods.comparePassword = function(pw, next) {
    if (pw == this.passwordHash) {
        return next(null, "good job");
    }
    return next("password mismatch, idiot");
}

const User = mongoose.model('User', userSchema);

module.exports = User
