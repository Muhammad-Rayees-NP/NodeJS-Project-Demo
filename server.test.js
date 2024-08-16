const request = require('supertest');
const mongoose = require('mongoose');
// const server = require('./server'); 
const Employee = require('./models/employeeModel'); // Corrected path
const http = require('http');
const app = require('./server'); 

jest.mock('./models/employeeModel', () => ({
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
}));

const server = http.createServer(app);

const mockEmployee = {
    _id: '609b0ff5f1f5b16e4c4d12a4', 
    name: 'John Doe',
    phone: '1234567890',
    visaID: 'X12345',
    address: '123 Main St',
};

describe('Employee API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // CREATE route tests
    describe('POST /employee', () => {
        test('should create a new employee', async () => {
            Employee.create.mockResolvedValue(mockEmployee);
            const res = await request(server).post('/employee').send(mockEmployee);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.name).toBe(mockEmployee.name);
            expect(Employee.create).toHaveBeenCalledTimes(1);
        });

        test('should return 500 if an error occurs', async () => {
            const errorMessage = 'Internal Server Error';
            Employee.create.mockRejectedValue(new Error(errorMessage));
            const res = await request(server)
                .post('/employee')
                .send(mockEmployee);
            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe(errorMessage);
            expect(Employee.create).toHaveBeenCalledTimes(1);
        });
    });

    // READ all employees route tests
    describe('GET /employees', () => {
        test('should return all employees', async () => {
            Employee.find.mockResolvedValue([mockEmployee]);
            const res = await request(server).get('/employees');
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(Employee.find).toHaveBeenCalledTimes(1);
        });

        test('should return an empty array if no employees are found', async () => {
            Employee.find.mockResolvedValue([]);
            const res = await request(server).get('/employees');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]);
        });

        test('should return 500 if an error occurs', async () => {
            const errorMessage = 'Internal Server Error';
            Employee.find.mockRejectedValue(new Error(errorMessage));
            const res = await request(server).get('/employees');
            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe(errorMessage);
        });
    });

    // READ by ID route tests
    describe('GET /employees/:id', () => {

        test('should return a single employee by ID', async () => {
            Employee.findById.mockResolvedValue(mockEmployee);
            const employeeId = '609b0ff5f1f5b16e4c4d12a4';
            const res = await request(server).get(`/employees/${employeeId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body._id).toBe(mockEmployee._id);
            expect(Employee.findById).toHaveBeenCalledTimes(1);
        });

        test('should return 404 if the employee does not exist', async () => {
            Employee.findById.mockResolvedValue(null);
            const employeeId = '609b0ff5f1f5b16e4c4d12a4';
            const res = await request(server).get(`/employees/${employeeId}`);
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe(`Employee not found with ID ${employeeId}`);
        }); 

        test('should return 500 if an error occurs', async () => {
            const errorMessage = 'Internal Server Error';
            const employeeId = '609b0ff5f1f5b16e4c4d12a4';
            Employee.findById.mockRejectedValue(new Error(errorMessage));
            const res = await request(server).get(`/employees/${employeeId}`);
            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe(errorMessage);
        });
    });

    // UPDATE by ID route tests
    describe('PUT /employees/:id', () => {
        test('should update an employee by ID', async () => {
            const updatedData = { name: 'Jane Doe' };
            const employeeId = '609b0ff5f1f5b16e4c4d12a4';
            Employee.findByIdAndUpdate.mockResolvedValue({ ...mockEmployee, ...updatedData });
            const res = await request(server)
                .put(`/employees/${employeeId}`)
                .send(updatedData);
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(updatedData.name);
            expect(Employee.findByIdAndUpdate).toHaveBeenCalledTimes(1);
        });

        test('should return 404 if the employee does not exist', async () => {
            Employee.findByIdAndUpdate.mockResolvedValue(null);
            const employeeId = '609b0ff5f1f5b16e4c4d12a4';
            const updatedData = { name: 'Jane Doe' };
            const res = await request(server)
                .put(`/employees/${employeeId}`)
                .send(updatedData);
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe(`Cannot find any employee with ID ${employeeId}`);
        });        

        test('should return 500 if an error occurs', async () => {
            const errorMessage = 'Internal Server Error';
            const employeeId = '609b0ff5f1f5b16e4c4d12a4';
            Employee.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));
            const updatedData = { name: 'Jane Doe' };
            const res = await request(server)
                .put(`/employees/${employeeId}`)
                .send(updatedData);
            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe(errorMessage);
        });
    });

    // DELETE by ID route tests
    describe('DELETE /employees/:id', () => {
        test('should delete an employee by ID', async () => {
            Employee.findByIdAndDelete.mockResolvedValue(mockEmployee);
            const employeeId = '609b0ff5f1f5b16e4c4d12a4';
            const res = await request(server)
                .delete(`/employees/${employeeId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body._id).toBe(mockEmployee._id);
            expect(Employee.findByIdAndDelete).toHaveBeenCalledTimes(1);
        });

        test('should return 404 if the employee does not exist', async () => {
            Employee.findByIdAndDelete.mockResolvedValue(null);
            const employeeId = '609b0ff5f1f5b16e4c4d12a4';
            const res = await request(server)
                .delete(`/employees/${employeeId}`);
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe(`Cannot find any employee with ID ${employeeId}`);
        });        
        
        test('should return 500 if an error occurs', async () => {
            const errorMessage = 'Internal Server Error';
            const employeeId = '609b0ff5f1f5b16e4c4d12a4';
            Employee.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));
            const res = await request(server)
                .delete(`/employees/${employeeId}`);
            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe(errorMessage);
        });
    });
});