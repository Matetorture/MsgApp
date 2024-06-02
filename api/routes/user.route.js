const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const { createUser, getUser, getUserById, updateUser, getContacts, updateContacts, loginUser, changeToOnline } = require('../controllers/user.controller');

router.post('/createUser', createUser);

router.get('/getUser/:apiKey', getUser);

router.get('/getUserById/:id', getUserById);

router.put('/updateUser/:apiKey', updateUser);


router.get('/getContacts/:apiKey', getContacts);

router.put('/updateContacts/:apiKey', updateContacts);


router.post('/loginUser', loginUser);


router.put('/changeToOnline/:apiKey', changeToOnline);


module.exports = router;