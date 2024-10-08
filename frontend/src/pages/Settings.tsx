import  { useState } from 'react';
import { Form, Button, Message } from 'rsuite';

const Settings = () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const [username, setUsername] = useState<string>(user.username || '');
    const [password, setPassword] = useState<string>(user.password || '');
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const handleSubmit = (formValue: { username: string; password: string } | null) => {
        if (formValue) {
            const updatedUser = { ...user, username: formValue.username, password: formValue.password };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setShowSuccess(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.ControlLabel>Username</Form.ControlLabel>
                    <Form.Control 
                        name="username" // Added name attribute for better identification
                        type="text" 
                        value={username} 
                        onChange={(value: string) => setUsername(value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control 
                        name="password" // Added name attribute for better identification
                        type="password" 
                        value={password} 
                        onChange={(value: string) => setPassword(value)} 
                        required 
                    />
                </Form.Group>
                <Button appearance="primary" type="submit">Update</Button>
                {showSuccess && <p className="text-green-500 mt-4">Settings updated successfully!</p>}
            </Form>
        </div>
    );
};

export default Settings;
