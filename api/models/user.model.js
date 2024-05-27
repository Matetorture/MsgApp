const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        login: {
            type: String,
            required: [true, "login is required"]
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        email: {
            type: String,
            required: [true, "email is required"]
        },
        name: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: false
        },
        contacts: {
            type: Array,
            require: true,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;