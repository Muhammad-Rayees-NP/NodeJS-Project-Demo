const express = require("express");
const mongoose = require("mongoose");
const app = express();
//require('dotenv').config(); // Load environment variables


// new changes

// Routes
app.get('/', (req, res) => {
    res.send("Hello Node");
});

app.get('/blog', (req, res) => {
    res.send("Hello blog, this is Kabir");
});

mongoose.set("strictQuery", false);

const mongoDbName = "nodejs=project-demo"; // Your database name
const mongoURI = `mongodb://localhost:27017/${mongoDbName}`; // Local MongoDB URI

mongoose
    .connect(mongoURI) // Use the local MongoDB URI
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Node app is running on port 3000");
        });
    })
    .catch((error) => {
        console.log(error);
    });