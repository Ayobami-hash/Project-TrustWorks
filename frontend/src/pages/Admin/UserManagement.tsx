import { Button, Modal, Input, IconButton, Panel, Tag, Tooltip } from 'rsuite';
import { Edit2, Trash, UserPlus, AlertCircle, User2 } from 'lucide-react';
import { useState } from 'react';
import { User } from '../../mockData/users';
import { addNotification, sendNotification, useExtensionErrorHandler } from '../../mock';
import { toast } from 'react-toastify';

interface UserType {
  id: number;
  username: string; 
  role: string;
  status: string;
}

const UserManagement = () => {
  const mockUsers: User[] = JSON.parse(localStorage.getItem('users') || '{}');
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [users, setUsers] = useState<UserType[]>(mockUsers.map(user => ({
    id: user.id,
    username: user.username,
    role: user.role,
    status: user.status
  })));
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserType | null>(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const currentUser: User = JSON.parse(localStorage.getItem('currentUser') || '{}');

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


  const handleEdit = (user: UserType) => {
    setEditUser(user);
    setUsername(user.username);
    setOpen(true);
    addNotification(`Editing user: ${user.username}`, 'info');
    window.location.reload();
  };

  const handleDelete = (id: number) => {
    try {
      const userToDelete = users.find(user => user.id === id);
      if (userToDelete) {
        setUsers(users.filter(user => user.id !== id));
        setAllUsers(allUsers.filter(user => user.id !== id));
        updateLocalStorage(allUsers.filter(user => user.id !== id));
        addNotification(`Successfully deleted user: ${userToDelete.username}`, 'success');
        toast(`${userToDelete.username} successfully deleted`)
        setTimeout(()=>{
          window.location.reload();
        }, 6000)
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      addNotification('Error deleting user', 'error');
      setTimeout(()=>{
        window.location.reload();
      }, 6000)
    }
  };

  const handleSubmit = () => {
    if (!username.trim()) {
      setMessage('Username cannot be empty!');
      addNotification('Failed to create user: Username cannot be empty', 'error');
      return;
    }

    try {
      if (editUser) {
        // Update existing user
        setUsers(users.map(user => (user.id === editUser.id ? { ...user, username } : user)));
        setAllUsers(allUsers.map(user => (user.id === editUser.id ? { ...user, username } : user)));
        
        const updatedAllUsers = allUsers.map(user => 
          user.id === editUser.id ? { ...user, username } : user
        );
        updateLocalStorage(updatedAllUsers);
        addNotification(`Successfully updated user: ${username}`, 'success');
        sendNotification(`Your account was updated by ${currentUser.username}`, 'success', `${username}`);
      } else {
        // Create new user
        const newUser: UserType = {
          id: users.length + 1,
          username,
          role: 'User',
          status: 'Active',
        };
        
        const newUser2: User = {
          id: allUsers.length + 1,
          username: username,
          password: 'password',
          keyNumber: Math.floor(1000 + Math.random() * 9000),
          assignedTimes: [
            { task: 'Code Review', time: '2 hours', status: 'Completed' },
            { task: 'Feature Development', time: '3 hours', status: 'In Progress' },
            { task: 'Testing & QA', time: '1.5 hours', status: 'Pending' },
          ],
          trackProgress: 80,
          rating: 4.3,
          residentialAddress: '',
          unavailableReason: '',
          unavailableDuration: '',
          email: '',
          remoteTasks: [],
          sharedTaskAccess: [],
          role: 'User',
          status: 'Active',
          notifications: [], // Initialize empty notifications array
          tasks: [
            { id: 1, title: 'Task 1', description: 'First task description', status: 'pending', dueDate: '2024-10-30', assignedTo: username },
            { id: 2, title: 'Task 2', description: 'Second task description', status: 'completed', dueDate: '2024-09-30', assignedTo: username }
          ],
        };

        setUsers([...users, newUser]);
        setAllUsers([...allUsers, newUser2]);
        updateLocalStorage([...allUsers, newUser2]);
        addNotification(`Successfully created new user: ${username}`, 'success');
        sendNotification(`Your account was created by ${currentUser.username}`, 'success', `${username}`);
        toast.success(`${username} successfully created`)
      }

      setOpen(false);
      setUsername('');
      setEditUser(null);
      setMessage('');
      setTimeout(()=>{
        window.location.reload();
      }, 6000)
    } catch (error) {
      console.error('Error submitting user:', error);
      addNotification(`Error ${editUser ? 'updating' : 'creating'} user`, 'error');
      toast.success(`${username} successfully edited`)
      setTimeout(()=>{
        window.location.reload();
      }, 6000)
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <div className="h-[83vh] w-[77.2vw] bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="mb-8">
        <Panel bordered className="bg-white shadow-lg rounded-xl">
          <div className="flex justify-between items-center p-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
              <p className="text-gray-600">Manage system users and their access levels</p>
            </div>
            <Button 
              appearance="primary"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all"
              onClick={() => {
                setOpen(true);
                addNotification('Opened user creation form', 'info');
              }}
            >
              <UserPlus size={20} />
              Add New User
            </Button>
          </div>

          {message && (
            <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="text-red-500" size={20} />
              <span className="text-red-600">{message}</span>
            </div>
          )}

          <div className="px-6 pb-6 h-[60vh] overflow-y-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map(user => (
                <div 
                  key={user.id}
                  className="flex flex-col bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-full">
                        <User2 size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.username}</h3>
                        <p className="text-sm text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Tooltip arrow placement="top" content="Edit User">
                        <IconButton 
                          size="sm"
                          icon={<Edit2 size={16} />}
                          appearance="subtle"
                          className="text-blue-600 hover:text-blue-700"
                          onClick={() => handleEdit(user)}
                        />
                      </Tooltip>
                      <Tooltip arrow placement="top" content="Delete User">
                        <IconButton
                          size="sm"
                          icon={<Trash size={16} />}
                          appearance="subtle"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(user.id)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex justify-between items-center">
                    <Tag color="blue" className="text-sm">
                      {user.role}
                    </Tag>
                    <Tag color={getStatusColor(user.status)} className="text-sm">
                      {user.status}
                    </Tag>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <Modal 
        open={open} 
        onClose={() => {
          setOpen(false);
          setMessage('');
          setUsername('');
          setEditUser(null);
          addNotification('Cancelled user operation', 'info');
        }}
        className="p-6 bg-white rounded-lg shadow-xl max-w-md max-h-60 flex items-center justify-center mx-auto fixed inset-32 z-50"
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold my-2">
            {editUser ? 'Edit User' : 'Add New User'}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Input
                className="w-full p-1 pl-2 rounded-md shadow-md mb-8"
                placeholder="Enter username"
                value={username}
                onChange={value => setUsername(value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-3">
            <Button 
              appearance="subtle"
              onClick={() => {
                setOpen(false);
                setMessage('');
                setUsername('');
                setEditUser(null);
                addNotification('Cancelled user operation', 'info');
              }}
            >
              Cancel
            </Button>
            <Button 
              appearance="primary"
              className="bg-blue-600 px-3 py-2 text-white shadow-md ml-3 rounded-md hover:bg-blue-700"
              onClick={handleSubmit}
            >
              {editUser ? 'Update' : 'Create'} User
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;