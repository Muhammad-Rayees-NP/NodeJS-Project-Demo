const express = require("express")
const app = express()

//routes
app.get('/', (req,res) => {
    res.send("Helo Node")
})

app.listen(3000, ()=> {
    console.log('Node app is running on port 3000')
})