const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');

// Mock data
const mockEmployee = {
    name: 'John Doe',
    phone: '1234567890',
    visaID: 'X12345',
    address: '123 Main St',
};

beforeAll(async () => {
    const mongoURI = `mongodb://localhost:27017/nodejs-project-test`;
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

// Testing CREATE route
describe('POST /employee', () => {
    it('should create a new employee', async () => {
        const res = await request(app)
            .post('/employee')
            .send(mockEmployee);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe(mockEmployee.name);
    });
});

// Testing READ route
describe('GET /employees', () => {
    it('should return all employees', async () => {
        const res = await request(app).get('/employees');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

// Testing READ BY ID route
describe('GET /employees/:id', () => {
    let employeeId;

    beforeAll(async () => {
        const employee = await request(app)
            .post('/employee')
            .send(mockEmployee);
        employeeId = employee.body._id;
    });

    it('should return a single employee by ID', async () => {
        const res = await request(app).get(`/employees/${employeeId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toBe(employeeId);
    });
});

// Testing UPDATE route
describe('PUT /employees/:id', () => {
    let employeeId;

    beforeAll(async () => {
        const employee = await request(app)
            .posjt('/employee')
            .send(mockEmployee);
        employeeId = employee.body._id;
    });

    it('should update an employee by ID', async () => {
        const updatedData = { name: 'Jane Doe' };
        const res = await request(app)
            .put(`/employees/${employeeId}`)
            .send(updatedData);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe(updatedData.name);
    });
});

// Testing DELETE route
describe('DELETE /employees/:id', () => {
    let employeeId;

    beforeAll(async () => {
        const employee = await request(app)
            .post('/employee')
            .send(mockEmployee);
        employeeId = employee.body._id;
    });

    it('should delete an employee by ID', async () => {
        const res = await request(app)
            .delete(`/employees/${employeeId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toBe(employeeId);

        const checkRes = await request(app).get(`/employees/${employeeId}`);
        expect(checkRes.statusCode).toEqual(404);
    });
});