const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: [true, "message is required"]
        },
        type: {
            type: String,
            required: true,
            default: "text"
        },
        creatorId: {
            type: String,
            require: [true, "creatorId is required"]
        },
        chatId: {
            type: String,
            require: [true, "chatId is required"]
        },
        isRead: {
            type: Boolean,
            require: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;