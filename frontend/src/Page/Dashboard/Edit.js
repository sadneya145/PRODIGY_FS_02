import React, { useState } from 'react';
import { FormLabel, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
    const [firstName, setFirstName] = useState(selectedEmployee.firstName);
    const [lastName, setLastName] = useState(selectedEmployee.lastName);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [salary, setSalary] = useState(selectedEmployee.salary);
    const [date, setDate] = useState(selectedEmployee.date);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !salary || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }

        const updatedEmployee = {
            email,
            firstName,
            lastName,
            salary,
            date,
        };

        try {
            const response = await axios.put('http://localhost:5000/editemployee', updatedEmployee);
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.email === email ? response.data.updatedEmployee : employee
                )
            );
            setIsEditing(false);
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `${firstName} ${lastName}'s data has been updated.`,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('There was an error updating the employee!', error);
        }
    };
    
    return (
        <div className="small-container">
            <Form onSubmit={handleUpdate}>
                <h1>Edit Employee Information</h1>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                /><br />
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                /><br />
                <FormLabel htmlFor="email">Email</FormLabel>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <FormLabel htmlFor="salary">Salary ($)</FormLabel>
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                /><br />
                <FormLabel htmlFor="date">Date</FormLabel>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                /><br />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </Form>
        </div>
    );
}

export default Edit;
