const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require("passport");
const PORT = 4000;
const DB_NAME = "dcmotorDB";
const dotenv = require('dotenv');
const cors = require("cors");

var session = require("express-session")


// app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// setup for authentication
app.use(session({
    secret: `${process.env.SECRET}`,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



// Connection to MongoDB
try{
    mongoose.connect(`${process.env.API_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', function() {
        console.log("MongoDB database connection established successfully !");
    });
}
catch (error){
    console.error(`Error: ${error.message}`)
    process.exit(1)
}


// routes
var experimentAPIRouter = require("./routes/experimentAPI");
var UserRouter = require("./routes/Users");
var BookingRouter = require("./routes/Booking");

// setup API endpoints
app.use("/experiment", experimentAPIRouter);
app.use("/user", UserRouter);
app.use("/booking",BookingRouter);

// server check
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
