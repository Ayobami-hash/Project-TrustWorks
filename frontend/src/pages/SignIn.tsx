import React, { useState } from 'react';
import { Form, Button, Message } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../mock';

const SignIn = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (formValue: Record<string, any> | null, event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault(); // Prevent default only if event is provided
        setLoading(true);
        setError(''); // Clear previous error

        if (formValue) {
            const { username, password } = formValue; // Destructure username and password from formValue
            const user = getUser(username, password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/user'); // Navigate to the correct route
            } else {
                setError('Invalid username or password'); // Set error message
            }
        }
        setLoading(false); // Stop loading
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <Form onSubmit={handleSubmit} className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <Message type="error" showIcon>{error}</Message>}
                <Form.Group controlId="username">
                    <Form.ControlLabel>Username</Form.ControlLabel>
                    <Form.Control 
                        name="username" // Use name attribute for formValue
                        type="text" 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control 
                        name="password" // Use name attribute for formValue
                        type="password" 
                        required 
                    />
                </Form.Group>
                <Button appearance="primary" type="submit" loading={loading}>Login</Button>
            </Form>
        </div>
    );
};

export default SignIn;
