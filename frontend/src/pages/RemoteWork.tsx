import React, { useState } from 'react';
import { Modal, Button, Form } from 'rsuite';

const RemoteWork = () => {
    const [address, setAddress] = useState('');
    const [reason, setReason] = useState('');
    const [duration, setDuration] = useState('');
    const [showModal, setShowModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-4">Remote Work Request</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="address">
                    <Form.ControlLabel>Residential Address</Form.ControlLabel>
                    <Form.Control 
                        type="text" 
                        value={address} 
                        onChange={(value) => setAddress(value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="reason">
                    <Form.ControlLabel>Reason for Unavailability</Form.ControlLabel>
                    <Form.Control 
                        componentClass="textarea" 
                        value={reason} 
                        onChange={(value) => setReason(value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="duration">
                    <Form.ControlLabel>Duration of Unavailability</Form.ControlLabel>
                    <Form.Control 
                        type="text" 
                        value={duration} 
                        onChange={(value) => setDuration(value)} 
                        required 
                    />
                </Form.Group>
                <Button appearance="primary" type="submit">Submit</Button>
            </Form>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>Confirm Remote Work Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your request for remote work from {address} is being processed. 
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RemoteWork;
