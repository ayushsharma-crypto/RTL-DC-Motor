const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require("passport");
const PORT = 4000;
const DB_NAME = "dcmotorDB";
const dotenv = require('dotenv');
const cors = require("cors");
var session = require("express-session")

// Cross-Origin approval and app-use
// var corsOptions = {
    // origin: " http://localhost:3000",
//     optionsSuccessStatus: 200 ,// some legacy browsers (IE11, various SmartTVs) choke on 204
//     credentials: true,
// }

/* 
    Define Session time for User
*/

app.use(session({
    secret: `${process.env.SECRET}`,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

/**
 * Add other Domains in Origin Array for CORS ACCESS
 */
// origins = ['http://localhost:3000'];
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    default : 'http://localhost:3000',
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
dotenv.config();





// setup for authentication





app.use(function (req, res, next) {
    // console.log(cors);
    // var origin = origins.indexOf(req.headers.origin) > -1 ? req.headers.Origin : cors.default;
    // console.log(origin);
    // res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type");
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
