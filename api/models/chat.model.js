const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema(
    {
        users: {
            type: Array,
            required: true,
            default: {}
        },
        name: {
            type: String,
            required: false,
        },
        icon: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;