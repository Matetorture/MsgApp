const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require("./models/user.model");

const messageRoute = require('./routes/message.route');
const userRoute = require('./routes/user.route');


const app = express();
app.use(cors());


app.use(express.json());

//routes
app.use("/api/user", userRoute);

app.use("/api/message", messageRoute);

const {connectionString} = require("./config");
mongoose.connect(connectionString)
.then(() => {
    console.log("Connected to database!");

    setInterval(async () => {
        const users = await User.find({});

        users.forEach(async (e) => {
            const user = await User.findByIdAndUpdate(e._id, {status: ""});
        });
    }, 60 * 1000);

    app.listen(3000, () => {
        console.log('run 3000');
    });
})
.catch((e) => {
    console.log("Connected failed!\nError: "+e);
});