import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            Swal.fire('Success', 'Logged in successfully!', 'success');
            navigate('/dashboard');
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'An error occurred', 'error');
        }
    };

    return (
        <Form onSubmit={handleSubmit} style={{ marginTop: '50px', width: '450px', marginLeft: '380px' }}>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" className="btn btn-primary mt-3">Submit</Button>
            <div className="mt-3">
                New User? <Link to="/signup">Sign Up</Link>
            </div>
        </Form>
    );
}

export default Login;
