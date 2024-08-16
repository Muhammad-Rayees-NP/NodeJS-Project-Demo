const express = require("express");
const mongoose = require("mongoose");
const Employee = require('./models/employeeModel'); // Assuming you have renamed the model file
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send("Hello Node");
});

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: `Employee not found with ID ${id}` });
        }
        res.status(200).json(employee);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/employee', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(200).json(employee);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

app.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: `Cannot find any employee with ID ${id}` });
        }
        res.status(200).json(employee);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: `Cannot find any employee with ID ${id}` });
        }
        res.status(200).json(employee);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.set("strictQuery", false);
const mongoDbName = "nodejs-project-demo"; 
const mongoURI = `mongodb://localhost:27017/${mongoDbName}`;

mongoose
    .connect(mongoURI)
    .then(() => {
        //console.log("Connected to MongoDB");
        //const server = app.listen(3000, () => {
          //  console.log("Node app is running on port 3000");
        //});

        module.exports = server; // Export server instance for testing
    })
    .catch((error) => {
        console.log(error);
    });

    module.exports = app;

 