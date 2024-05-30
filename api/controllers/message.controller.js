const Message = require("../models/message.model");
const Chat = require("../models/chat.model");

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const createMessage = async (req, res) => {
    try{
        const {apiKey} = req.params;
        const { message, chatId } = req.body;

        const userFromToken = jwt.verify(apiKey, jwtSecret);

        const newMessage = new Message({ message, type: "text", creatorId: userFromToken.userId, chatId, isRead: false });

        await newMessage.save();

        res.status(200).json(newMessage);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

const getMessages = async (req, res) => {
    try{
        const {apiKey} = req.params;
        const {chatId} = req.body;
        
        const message = await Message.find({ chatId });


        res.status(200).json(message);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

//TODO
const deleteMessage = async (req, res) => {
    try{
        const message = await Message.find({});
        res.status(200).json(message);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

//TODO
const readMessages = async (req, res) => {
    try{
        const message = await Message.find({});
        res.status(200).json(message);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

//! TODO remove for test
const getAllMessages = async (req, res) => {
    try{
        const message = await Message.find({});
        res.status(200).json(message);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

//chat
const createChat = async (req, res) => {
    try{
        const {apiKey} = req.params;
        const { participants } = req.body;

        if(participants.length == 0){
            return res.status(500).json({ message: "Participants are empty"});
        }

        const userFromToken = jwt.verify(apiKey, jwtSecret);

        let users = participants;
        users.push(userFromToken.userId);

        const chat = await Chat.find({ users });

        if(chat.length != 0){
            return res.status(200).json(chat[0]._id);
        }
        const newChat = new Chat({ users });

        await newChat.save();

        res.status(200).json(newChat._id);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};
const updateChat = async (req, res) => {
    try{
        const {apiKey} = req.params;
        let { chatId, newParticipants } = req.body;

        if(chatId === undefined){
            return res.status(500).json({ message: "ChatId is undefined" });
        }

        const userFromToken = jwt.verify(apiKey, jwtSecret);

        let participants = await Chat.findById(chatId).users;

        participants = [participants, newParticipants];

        const chat = await Chat.findByIdAndUpdate(chatId, {participants});

        res.status(200).json(chat);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    createMessage,
    getMessages,
    deleteMessage,
    readMessages,
    getAllMessages,
    createChat,
    updateChat
};