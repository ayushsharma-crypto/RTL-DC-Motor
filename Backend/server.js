const express = require('express');
const app = express();
const PORT = 4000;

// setup API endpoints
app.get("/", function(req, res) {
	res.send("API is working properly !");
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
