const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connection
mongoose.connect('mongodb+srv://sadneyasam:root@cluster0.gua1pdw.mongodb.net/');
console.log("Connected successfully!");

// User and Employee Schemas
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
});
const User = mongoose.model('User', userSchema);

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    salary: Number,
    date: Date,
});
const Employee = mongoose.model('Employee', employeeSchema);

// Signup
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, 'secret_employee'); // Use environment variable in production
    res.json({ token });
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'secret_employee', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Employee Routes

// app.post('/employees', authenticateToken, async (req, res) => {
//     const newEmployee = new Employee(req.body);
//     try {
//         await newEmployee.save();
//         res.status(201).json(newEmployee);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// app.get('/employees', authenticateToken, async (req, res) => {
//     try {
//         const employees = await Employee.find();
//         res.json(employees);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// app.put('/employees/:id', authenticateToken, async (req, res) => {
//     const { id } = req.params;
//     const { firstName, lastName, email, salary, date } = req.body;
//     try {
//         const updatedEmployee = await Employee.findByIdAndUpdate(
//             id,
//             { firstName, lastName, email, salary, date },
//             { new: true }
//         );
//         res.json(updatedEmployee);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// app.delete('/employees/:id', authenticateToken, async (req, res) => {
//     try {
//         await Employee.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Employee deleted' });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// Adding a new employee
app.post('/addemployee', async (req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        salary: req.body.salary,
        date: req.body.date,
    });

    try {
        await employee.save();
        console.log("Employee Saved");
        res.json({
            success: true,
            name: req.body.firstName,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Editing an existing employee using email
app.put('/editemployee', async (req, res) => {
    const { email } = req.body;

    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { email: email },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                salary: req.body.salary,
                date: req.body.date,
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        res.json({
            success: true,
            updatedEmployee,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});


// Removing an employee
app.delete('/removeemployee', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await Employee.findOneAndDelete({ email });
        if (!result) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        res.json({ success: true, name: result.firstName });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});




// Getting all employees
app.get('/allemployees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        console.log("All Employees Fetched");
        res.json(employees);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});


// Start server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
