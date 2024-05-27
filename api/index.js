const express = require('express');
const mongoose = require('mongoose');

const Message = require('./models/message.model');

const messageRoute = require('./routes/message.route');
const userRoute = require('./routes/user.route');


const app = express();
app.use(express.json());

//routes
app.use("/api/user", userRoute);

app.use("/api/message", messageRoute);


mongoose.connect("mongodb://localhost:27017/LiveMessenger")
.then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log('run 3000');
    });
})
.catch((e) => {
    console.log("Connected failed!\nError: "+e);
});