import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl } from 'rsuite';

const MatchRoom = () => {
    const [task, setTask] = useState('');
    const [userToShare, setUserToShare] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-4">Share a Task</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId="task">
                    <ControlLabel>Task to Share</ControlLabel>
                    <FormControl 
                        type="text" 
                        value={task} 
                        onChange={(value) => setTask(value)} 
                        required 
                    />
                </FormGroup>
                <FormGroup controlId="userToShare">
                    <ControlLabel>User to Share With</ControlLabel>
                    <FormControl 
                        type="text" 
                        value={userToShare} 
                        onChange={(value) => setUserToShare(value)} 
                        required 
                    />
                </FormGroup>
                <Button appearance="primary" type="submit">Share Task</Button>
            </Form>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>Confirm Task Sharing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your task "{task}" has been successfully shared with {userToShare}.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MatchRoom;
