const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "dcmotorDB"

// routes
var experimentAPIRouter = require("./routes/experimentAPI");
var UserRouter = require("./routes/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
try{
    mongoose.connect('mongodb+srv://rajat:'+PASSWD+'@cluster0.xqcnb.mongodb.net/' + DB_NAME+'?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
});
}
catch (error){
    console.error(`Error: ${error.message}`)
    process.exit(1)
}


// setup API endpoints
app.use("/experimentAPI", experimentAPIRouter);
app.use("/user", UserRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
