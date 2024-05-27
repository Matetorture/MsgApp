const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const { createUser, getUsers, getUser, updateUser, getContacts, updateContacts, loginUser, } = require('../controllers/user.controller');

router.post('/createUser', createUser);

router.get('/getUsers', getUsers);

router.get('/getUser/:apiKey', getUser);

router.put('/updateUser/:apiKey', updateUser);


router.get('/getContacts/:apiKey', getContacts);

router.put('/updateContacts/:apiKey', updateContacts);


router.post('/loginUser', loginUser);


module.exports = router;