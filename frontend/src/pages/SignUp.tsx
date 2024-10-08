import React, { useState } from 'react';
import { Form, Button, Message } from 'rsuite'; // Adjusted imports
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../mock';

const SignUp = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (formValue: Record<string, any> | null, event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        if (formValue) {
            // Use type assertions to ensure proper typing
            const username = formValue.username as string;
            const password = formValue.password as string;

            const result = saveUser({ username, password });

            if (result.success) {
                setShowSuccess(true);
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError('User registration failed.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <Form onSubmit={handleSubmit} className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                {error && <Message type="error" showIcon>{error}</Message>}
                <Form.Group controlId="username">
                    <Form.ControlLabel>Username</Form.ControlLabel>
                    <Form.Control name="username" type="text" required />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control name="password" type="password" required />
                </Form.Group>
                <Button appearance="primary" type="submit">Sign Up</Button>
                {showSuccess && <p className="text-green-500 mt-4">Account created successfully! Redirecting...</p>}
            </Form>
        </div>
    );
};

export default SignUp;
