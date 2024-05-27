const User = require("../models/user.model");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

//User
const createUser = async (req, res) => {
    try {
        const { login, password, email, name, status } = req.body;

        const existingUser = await User.findOne({ $or: [{ login }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this login or email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        let newName;
        if(typeof name === 'undefined'){
            newName = login;
        }

        const newUser = new User({ login, password: hashedPassword, email, name: newName, status });
        
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, jwtSecret);

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//! TODO remove for test
const getUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

const getUser = async (req, res) => {
    try{
        const {apiKey} = req.params;

        const userFromToken = jwt.verify(apiKey, jwtSecret);

        const user = await User.findById(userFromToken.userId);

        const selectDataUser = {
            login: user.login,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt
        };
        res.status(200).json(selectDataUser);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};


const updateUser = async (req, res) => {
    try{
        const {apiKey} = req.params;

        const userFromToken = jwt.verify(apiKey, jwtSecret);

        if(!(req.body.password === undefined)){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findByIdAndUpdate(userFromToken.userId, req.body);
        
        if (!user){
            return res.status(404).json({message: "User not found"});
        }

        const updatedUser = await User.findById(userFromToken.userId);

        res.status(200).json(updatedUser);

    } catch(err){
        res.status(500).json({message: err.message});
    }
};

//Contacts
const getContacts = async (req, res) => {
    try{
        const {apiKey} = req.params;

        const userFromToken = jwt.verify(apiKey, jwtSecret);

        const user = await User.findById(userFromToken.userId);

        if(user.contacts){
            const foundUsers = await User.find({ _id: { $in: user.contacts.slice(1) } });

            const nameAndStatusUsers = foundUsers.map(obj => ({ name: obj.name, status: obj.status }));

            res.status(200).json(nameAndStatusUsers);
        }else{
            res.status(200).json({});
        }

    } catch(err){
        res.status(500).json({message: err.message});
    }
};

const updateContacts = async (req, res) => {
    try{
        const {apiKey} = req.params;

        const userFromToken = jwt.verify(apiKey, jwtSecret);

        const user = await User.findById(userFromToken.userId);

        if (!user){
            return res.status(404).json({message: "User not found"})
        }

        let name = req.body.name;
        const contactUser = await User.findOne({ name });

        if(user.contacts.indexOf(contactUser._id) === -1 && userFromToken.userId != contactUser._id){
            user.contacts.push(contactUser._id);
    
            const user0 = await User.findByIdAndUpdate(userFromToken.userId, user);

            if (!user0){
                return res.status(404).json({message: "User not found"})
            }
        }

        

        const updatedUser = await User.findById(userFromToken.userId);

        if(updatedUser.contacts){
            res.status(200).json(updatedUser.contacts.slice(1));
        }else{
            res.status(200).json({});
        }

    } catch(err){
        res.status(500).json({message: err.message});
    }
};


//Log in
const loginUser = async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({ login });
        if (!user) {
            return res.status(401).json({ message: "Incorrect login or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect login or password" });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret);

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = { 
    createUser, 
    getUsers, 
    getUser,
    updateUser, 
    getContacts, 
    updateContacts,
    loginUser
};