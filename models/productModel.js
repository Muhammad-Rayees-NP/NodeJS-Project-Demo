const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter an employee name"]
        },
        phoneNumber: {
            type: String,
            required: [true, "Please enter a phone number"]
        },
        visaID: {
            type: String,
            required: [true, "Please enter a visa ID"]
        },
        address: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
