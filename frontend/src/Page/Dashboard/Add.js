import React, { useState, useRef, useEffect } from 'react';
import { Form, FormLabel } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddProduct({ employees, setEmployees, setIsAdding }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [date, setDate] = useState('');
    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !salary || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }
    
        const newEmployee = { firstName, lastName, email, salary, date };
    
        try {
            const response = await axios.post('http://localhost:5000/addemployee', newEmployee);
            console.log(response.data); // Log the response
            setEmployees([...employees, response.data]); // Update the state
            setIsAdding(false);
    
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: `${firstName} ${lastName} has been added.`,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.response ? error.response.data.message : 'Server Error',
                showConfirmButton: true,
            });
        }
    };
    

    return (
        <div className="small-container">
            <Form onSubmit={handleAdd}>
                <h1>Add Employee</h1>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <input
                    id="firstName"
                    type="text"
                    ref={textInput}
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
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />
                </div>
            </Form>
        </div>
    );
}

export default AddProduct;
