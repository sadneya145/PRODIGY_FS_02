import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function List({ employees, setEmployees, handleEdit, handleDelete }) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    // Fetch all employees when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/allemployees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, [setEmployees]);

    return (
        <div className='contain-table'>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Date</th>
                        <th colSpan={2} className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(employees) && employees.length > 0 ? (
                        employees.map((employee, i) => (
                            <tr key={employee._id}>
                                <td>{i + 1}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{formatter.format(employee.salary)}</td>
                                <td>{new Date(employee.date).toLocaleDateString()}</td>
                                <td className='text-right'>
                                    <Button onClick={() => handleEdit(employee)} className='button-muted-button'>
                                        Edit
                                    </Button>
                                </td>
                                <td className='text-left'>
                                    <Button onClick={() => handleDelete(employee.email)} className='button-muted-button'>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>No Employees</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default List;
