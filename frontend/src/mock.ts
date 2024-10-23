import { useEffect } from 'react';
import { User, users as mockUsers } from './mockData/users';


interface Notification {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  read: boolean;
  timestamp: string;
}

// Utility to get users from localStorage or fallback to mock data
export const getUsersFromLocalStorage = (): User[] => {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    return JSON.parse(storedUsers);
  } else {
    // If no users in localStorage, initialize with mock data
    localStorage.setItem('users', JSON.stringify(mockUsers));
    return mockUsers;
  }
};

export const saveUser = (userData: { username: string; password: string }) => {
  // Get current users from localStorage (or mock data)
  let currentUsers = getUsersFromLocalStorage();
  
  // Check if the username already exists
  const existingUser = currentUsers.find(user =>
    user.username.toLowerCase() === userData.username.toLowerCase()
  );
  
  if (existingUser) {
    return { success: false, message: "Username already exists." };
  }

  // Mock data for new user
  const newUser: User = {
    id: currentUsers.length + 1, // Auto-increment userId
    username: userData.username,
    password: userData.password,
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
    role: 'User', // Default role for new user
    status: 'Active', // Default status
    tasks: [ // Default tasks
      { id: 1, title: 'Task 1', description: 'First task description', status: 'pending', dueDate: '2024-10-30', assignedTo: userData.username  },
      { id: 2, title: 'Task 2', description: 'Second task description', status: 'completed', dueDate: '2024-09-30', assignedTo: userData.username  }
    ],
  };

  // Add the new user to the array
  currentUsers.push(newUser);

  // Update localStorage with the new users array
  localStorage.setItem('users', JSON.stringify(currentUsers));

  return { success: true, message: "User registered successfully." };
};

export const getUser = (username: string, password: string) => {
  // Retrieve users from localStorage
  const currentUsers = getUsersFromLocalStorage();
  
  // Find the user matching the username and password
  return currentUsers.find(user => 
    user.username === username && user.password === password
  );
};


export const formatTimeAgo = (timestamp: string) => {
  const currentTime = new Date();
  const notificationTime = new Date(timestamp);
  const timeDifference = Math.floor((currentTime.getTime() - notificationTime.getTime()) / 1000); // in seconds

  // Time calculations
  const seconds = timeDifference;
  const minutes = Math.floor(timeDifference / 60);
  const hours = Math.floor(timeDifference / 3600);
  const days = Math.floor(timeDifference / 86400);

  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes} min`;
  if (hours < 24) return `${hours}h`;
  if (days < 3) return `${days}d`;

  // If older than 3 days, return the formatted date
  return notificationTime.toLocaleDateString();
};

  // Function to add a new notification
export const addNotification = (notificationMessage: string, type: 'success' | 'warning' | 'error' | 'info') => {
    try {
      // Get current user
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find the admin user to update their notifications
      const updatedUsers = users.map((user: User) => {
        if (user.username === currentUser.username) {
          const notifications = user.notifications || [];
          const newNotification: Notification = {
            id: notifications.length + 1,
            message: notificationMessage,
            type,
            read: false,
            timestamp: new Date().toISOString()
          };
          
          return {
            ...user,
            notifications: [...notifications, newNotification]
          };
        }
        return user;
      });

      // Update localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };
  // Function to add a new notification
export const sendNotification = (notificationMessage: string, type: 'success' | 'warning' | 'error' | 'info', username: string) => {
    try {
      // Get current user
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find the admin user to update their notifications
      const updatedUsers = users.map((user: User) => {
        if (user.username === username) {
          const notifications = user.notifications || [];
          const newNotification: Notification = {
            id: notifications.length + 1,
            message: notificationMessage,
            type,
            read: false,
            timestamp: new Date().toISOString()
          };
          
          return {
            ...user,
            notifications: [...notifications, newNotification]
          };
        }
        return user;
      });

      // Update localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };
export const sendNotificationToAdmin = (notificationMessage: string, type: 'success' | 'warning' | 'error' | 'info') => {
    try {
      // Get current user
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find the admin user to update their notifications
      const updatedUsers = users.map((user: User) => {
        if (user.role === 'Admin') {
          const notifications = user.notifications || [];
          const newNotification: Notification = {
            id: notifications.length + 1,
            message: notificationMessage,
            type,
            read: false,
            timestamp: new Date().toISOString()
          };
          
          return {
            ...user,
            notifications: [...notifications, newNotification]
          };
        }
        return user;
      });

      // Update localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };


export const useExtensionErrorHandler = (addNotification: (message: string, type: 'warning' | 'error') => void) => {
    useEffect(() => {
      const handleError = (error: ErrorEvent) => {
        if (error.message.includes('Extension context invalidated')) {
          addNotification('Please refresh the page to restore full functionality', 'warning');
        }
        
        if (error.message.includes('Cannot read properties of undefined')) {
          addNotification('Error initializing keyboard shortcuts. Some features may be limited.', 'warning');
        }
      };
  
      window.addEventListener('error', handleError);
      
      return () => {
        window.removeEventListener('error', handleError);
      };
    }, [addNotification]);
  };
 
