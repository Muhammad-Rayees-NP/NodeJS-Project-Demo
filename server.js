const express = require("express");
const mongoose = require("mongoose");
const Employee = require('./models/employeeModel'); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
// Get all employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get employee by ID
app.get('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: `No employee found with ID ${id}` });
        }
        res.status(200).json(employee);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new employee
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

// Update an employee by ID
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

// Delete an employee by ID
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
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Node app is running on port 3000");
        });
    })
    .catch((error) => {
        console.log(error);
    });