import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';
import { Clock, RefreshCw,  Check, X } from 'lucide-react';
import { AssignedTime, User } from '../mockData/users';
import { addNotification, sendNotificationToAdmin } from '../mock';
import { toast } from 'react-toastify';
// import { AssignedTime, User } from '../mock';

const AssignTimePage: React.FC = () => {
  const user: User = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<AssignedTime | null>(null);

  const handleReassign = (task: AssignedTime) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-[92vh] w-[85vw] overflow-scroll bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
            <Clock className="mr-3 text-blue-600" />
            Assigned Times
          </h2>
          <div className="overflow-x-auto h-[60vh] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700 border-b">Task</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700 border-b">Time</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700 border-b">Status</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {user.assignedTimes.map((task, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-6 border-b">{task.task}</td>
                    <td className="py-4 px-6 border-b">{task.time}</td>
                    <td className="py-4 px-6 border-b">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b">
                      <Button
                        appearance="primary"
                        onClick={() => handleReassign(task)}
                        className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reassign
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        className="p-6 bg-white rounded-lg shadow-xl max-w-md max-h-60 flex items-center justify-center mx-auto fixed inset-32 z-50"
      >
        <Modal.Header>
          <Modal.Title className="text-2xl font-bold text-gray-900">Confirm Reassignment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-4">
          <p className="text-gray-700">
            Are you sure you want to reassign <strong>{selectedTask && selectedTask.task}</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer className="mt-6 flex justify-end space-x-4">
          <Button
            onClick={() => setShowModal(false)}
            appearance="subtle"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShowModal(false);
              addNotification(`Task "${selectedTask !== null && selectedTask.task}" has been sent to admin for approval`, 'success');
              toast.success(`Task ${selectedTask !== null && selectedTask.task} has been sent to admin for approval`)
              sendNotificationToAdmin(`${user.username} is requesting to reassign "${selectedTask !== null && selectedTask.task}"`, 'success');
              setTimeout(()=>{
                window.location.reload();
              }, 500)
            }}
            appearance="primary"
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Check className="mr-2 h-4 w-4" />
            Yes, Reassign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignTimePage;