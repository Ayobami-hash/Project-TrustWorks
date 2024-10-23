import { useState } from 'react';
import { Form, Button, SelectPicker, Input, Modal } from 'rsuite';
import { Task, User } from '../../mockData/users';
import { addNotification, sendNotification, useExtensionErrorHandler } from '../../mock';
import { toast } from 'react-toastify';

// Utility functions
let taskIdCounter = 100;

const assignTaskToUser = (
  users: User[],
  userId: number,
  taskDescription: string,
  dueDate: Date
): User[] => {
  const date = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  
  const newTask: Task = {
    id: taskIdCounter++,
    title: taskDescription.split('\n')[0],
    description: taskDescription,
    status: 'pending',
    dueDate: date.toISOString().split('T')[0],
    assignedTo: users.find(u => u.id === userId)?.username || ''
  };

  return users.map(user => {
    if (user.id === userId) {
      return {
        ...user,
        tasks: [...user.tasks, newTask]
      };
    }
    return user;
  });
};

const getTaskStatistics = (users: User[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allTasks = users.flatMap(user => user.tasks);
  
  return {
    tasksAssignedToday: allTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    }).length,
    pendingTasks: allTasks.filter(task => task.status === 'pending').length,
    completedTasks: allTasks.filter(task => task.status === 'completed').length
  };
};

interface Data {
  assignedTo: number | null;
  taskDescription: string;
  dueDate: Date | null;
}

const TaskAssignment = () => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]'); // Fixed: Use '[]' as default
  const currentUser: User = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const [usersData, setUsersData] = useState<User[]>(users);
  const [formValue, setFormValue] = useState<Data>({
    assignedTo: null,
    taskDescription: '',
    dueDate: null,
  });

  useExtensionErrorHandler(addNotification);

  // Wrap critical operations in try-catch
  const safeLocalStorageOperation = (operation: () => void) => {
    try {
      operation();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Extension context invalidated')) {
          addNotification('Please refresh the page to restore full functionality', 'warning');
        } else {
          addNotification('An error occurred. Please try again.', 'error');
        }
      }
      console.error('Operation failed:', error);
    }
  };

    // Function to update localStorage whenever usersData changes
    const updateLocalStorage = (updatedUsers: User[]) => {
      try {
        safeLocalStorageOperation(() => {
          localStorage.setItem('users', JSON.stringify(updatedUsers));
        });
      } catch (error) {
        console.error('Error updating localStorage:', error);
        addNotification('Error saving changes to storage', 'error');
      }
    };

  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState('');

  const userOptions = usersData.map(user => ({
    label: user.username,
    value: user.id,
  }));

  const stats = getTaskStatistics(usersData);

  // Fixed: Handle form changes properly
  const handleFormChange = (formValue: Partial<Data>) => {
    setFormValue(prevValue => ({
      ...prevValue,
      ...formValue
    }));
  };

  const handleSubmit = () => {
    const { assignedTo, taskDescription, dueDate } = formValue;
    
    if (!assignedTo || !taskDescription || !dueDate) {
      setError('All fields are required.');
      return;
    }

    const updatedUsers = assignTaskToUser(
      usersData,
      assignedTo,
      taskDescription,
      dueDate
    );

    const u = usersData.find(user => user.id === assignedTo);
    
    setUsersData(updatedUsers);
    updateLocalStorage(updatedUsers); // Fixed: Use updatedUsers instead of usersData
    setFormValue({ assignedTo: null, taskDescription: '', dueDate: null });
    setShowMessage(true);
    setError('');
    addNotification(`Task "${taskDescription}" assigned to ${u?.username}`, 'success');
    sendNotification(`Task "${taskDescription}" assigned to you by ${currentUser.username}`, 'success', `${u?.username}`);
    toast.success(`Task assigned to ${u?.username}`)

  };

  const handleClearForm = () => {
    setFormValue({ assignedTo: null, taskDescription: '', dueDate: null });
    setError('');
  };

  return (
    <div className="h-[83vh] w-[77.2vw] bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Task Assignment
            </h1>
            <p className="text-gray-600 mt-2">
              Assign tasks to team members and track their progress
            </p>
          </div>
          <div className="flex gap-2">
            <Button appearance="ghost">View All Tasks</Button>
            <Button appearance="primary" color="blue">+ Quick Assign</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-50">
          <Form 
            fluid 
            formValue={formValue}
            onChange={handleFormChange}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Form.Group controlId="assignedTo">
                  <div className="flex items-center justify-between mb-2">
                    <Form.ControlLabel className="text-gray-700 font-medium">
                      Team Member
                    </Form.ControlLabel>
                    <span className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                      View Team
                    </span>
                  </div>
                  <div className="members">

                    <SelectPicker
                      data={userOptions}
                      placeholder="Select team member"
                      value={formValue.assignedTo}
                      onChange={value => handleFormChange({ assignedTo: value })}
                      searchable
                      block
                      className="w-full"
                      cleanable={false}
                      container={() => {
                        const containerElement = document.querySelector('.members');
                        return containerElement as HTMLElement || document.body;
                      }}
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="dueDate">
                  <div className="flex items-center justify-between mb-2">
                    <Form.ControlLabel className="text-gray-700 font-medium">
                      Due Date
                    </Form.ControlLabel>
                    <span className="text-sm text-gray-500">Set deadline</span>
                  </div>
                  <Input
                    type="date"
                    value={formValue.dueDate instanceof Date ? formValue.dueDate.toISOString().split('T')[0] : ''}
                    onChange={value => handleFormChange({ dueDate: value ? new Date(value) : null })}
                    className="w-full"
                  />
                </Form.Group>
              </div>

              <Form.Group controlId="taskDescription" className="md:row-span-2">
                <div className="flex items-center justify-between mb-2">
                  <Form.ControlLabel className="text-gray-700 font-medium">
                    Task Details
                  </Form.ControlLabel>
                  <span className="text-sm text-gray-500">
                    {formValue.taskDescription.length}/500
                  </span>
                </div>
                <Input
                  as="textarea"
                  rows={5}
                  placeholder="Describe the task in detail..."
                  value={formValue.taskDescription}
                  onChange={value => handleFormChange({ taskDescription: value })}
                  className="w-full resize-none p-2"
                />
              </Form.Group>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                appearance="subtle"
                onClick={handleClearForm}
              >
                Clear Form
              </Button>
              <Button 
                appearance="primary"
                color="blue"
                onClick={handleSubmit}
                className="px-6"
              >
                Assign Task
              </Button>
            </div>
          </Form>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Tasks Assigned Today</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">{stats.tasksAssignedToday}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Pending Tasks</h3>
            <p className="text-2xl font-bold text-indigo-600 mt-2">{stats.pendingTasks}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Completed Tasks</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">{stats.completedTasks}</p>
          </div>
        </div>
      </div>

      <Modal 
        open={showMessage} 
        onClose={() => setShowMessage(false)}
        className="p-6 bg-white rounded-lg shadow-xl max-w-md max-h-60 flex items-center justify-center mx-auto fixed inset-32 z-50"
      >
        <Modal.Header>
          <Modal.Title className="text-lg font-semibold text-gray-800">
            Success!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center gap-3 text-green-600 mt-2 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium">Task Assigned Successfully</h4>
              <p className="text-sm text-gray-600 mt-1">
                The task has been assigned and notifications have been sent.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={() => {
                setShowMessage(false);
                setTimeout(()=>{
                  window.location.reload();
                }, 500)
              }} 
            appearance="primary" 
            color="blue" 
            className="px-3 py-2 shadow-md mr-2 rounded-md bg-slate-200"
          >
            Got it
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskAssignment;