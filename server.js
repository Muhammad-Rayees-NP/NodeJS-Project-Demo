const express = require("express")
const mongoose = require("mongoose")
const app = express()

//routes
app.get('/', (req,res) => {
    res.send("Hello Node")
})
app.get('/blog', (req, rest) => {
    res.send("Hello blog, this is Kabir")
})

mongoose.set("strictQuery", false)
mongoose
.connect('mongodb+srv://admin:idcnodejsprojectdemo@nodejsprojectdemo.oef27.mongodb.net/NodeJS-Project-Demo?retryWrites=true&w=majority&appName=NodeJS-Project-Demo')
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, ()=> {
        console.log('Node app is running on port 3000')
    })
}).catch((error) => {
    console.log(error)
})