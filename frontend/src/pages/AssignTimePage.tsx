import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';

const AssignTimePage = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');

  const handleReassign = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold mb-6">Assigned Times</h2>
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="p-4">Task</th>
            <th className="p-4">Time</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.assignedTimes.map((task, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{task.task}</td>
              <td className="p-4">{task.time}</td>
              <td className="p-4">{task.status}</td>
              <td className="p-4">
                <Button appearance="primary" onClick={() => handleReassign(task)}>
                  Reassign
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reassign Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Confirm Reassignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reassign <strong>{selectedTask.task}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} appearance="primary">
            Yes, Reassign
          </Button>
          <Button onClick={() => setShowModal(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignTimePage;
