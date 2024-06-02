const express = require("express");
const Message = require("../models/message.model");
const router = express.Router();
const { createMessage, getMessages, deleteMessage, readMessages, createChat, updateChat } = require('../controllers/message.controller');


router.post('/createMessage/:apiKey', createMessage);

router.post('/getMessages/:apiKey', getMessages);

router.put('/deleteMessage/:apiKey', deleteMessage);

router.put('/readMessages/:apiKey', readMessages);


router.post('/createChat/:apiKey', createChat);

router.put('/updateChat/:apiKey', updateChat);



module.exports = router;