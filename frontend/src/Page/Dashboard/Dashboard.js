import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

// import { employeesData } from '../../data';

function Dashboard() {
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState(false)



    // Fetch employees on component mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5000/allemployees');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

   
    const handleEdit = async (updatedEmployee) => {
        try {
            await fetch('http://localhost:5000/editemployee', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee),
            });
            const updatedEmployees = employees.map(emp =>
                emp.email === updatedEmployee.email ? updatedEmployee : emp
            );
            setEmployees(updatedEmployees);
            Swal.fire('Updated!', `${updatedEmployee.firstName} ${updatedEmployee.lastName}'s data has been updated.`, 'success');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleDelete = async (email) => {
        console.log('Deleting employee with email:', email);
        
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then(async (result) => {
            if (result.value) {
                try {
                    const response = await fetch('http://localhost:5000/removeemployee', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                    });
    
                    const data = await response.json();
                    console.log('Response from server:', data); // Log server response
                    if (response.ok) {
                        setEmployees(employees.filter(emp => emp.email !== email));
                        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
                    } else {
                        console.error('Error:', data.message);
                        Swal.fire('Error!', data.message, 'error');
                    }
                } catch (error) {
                    console.error('Error deleting employee:', error);
                }
            }
        });
    };
    
    
    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header setIsAdding={setIsAdding} />
                    <List
                        employees={employees}
                        setEmployees={setEmployees} // Ensure this is passed
                        handleEdit={(employee) => {
                            setSelectedEmployee(employee);
                            setIsEditing(true);
                        }}
                        handleDelete={handleDelete}
                    />

                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                employees={employees}
                setEmployees={setEmployees}
                setIsAdding={setIsAdding}
            />
            
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
)}

        </div>
    )
}

export default Dashboard
