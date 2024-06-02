const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
    app.listen(3000, () => {
        console.log('run 3000');
    });
})
.catch((e) => {
    console.log("Connected failed!\nError: "+e);
});