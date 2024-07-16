import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ firstName, lastName, email, password });
            Swal.fire('Success', 'Account created successfully!', 'success');
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'An error occurred', 'error');
        }
    };

    return (
        <Form onSubmit={handleSubmit} style={{ marginTop: '30px', width: '450px', marginLeft: '380px' }}>
            <h1>Create Account</h1>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" className="green_btn">
                Sign Up
            </Button>
            <div>
                Already have an account?<Link to='/'>Login Here</Link>
            </div>
        </Form>
    );
}

export default Signup;
