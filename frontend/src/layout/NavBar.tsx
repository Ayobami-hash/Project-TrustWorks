import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown, Badge } from 'rsuite';
import { FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.jpg';
import { formatTimeAgo } from '../mock';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  read: boolean;
  timestamp: string;
}

interface User {
  username: string;
  keyNumber: string;
  notifications?: Notification[];
}

const NavBar: React.FC = () => {
  const [user, setUser] = useState<User>({ username: '', keyNumber: '' });
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Load current user and their notifications
    const loadUserData = () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const currentUser = users.find((person: User) => 
          person.username === loggedInUser.username && 
          person.keyNumber === loggedInUser.keyNumber
        );

        if (currentUser) {
          setUser(currentUser);
          setNotifications(currentUser.notifications || []);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Handle error appropriately - maybe show a toast notification
      }
    };

    loadUserData();
  }, []);

  const updateNotificationsInStorage = (updatedNotifications: Notification[]) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) => {
        if (u.username === user.username && u.keyNumber === user.keyNumber) {
          return { ...u, notifications: updatedNotifications };
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error updating notifications in storage:', error);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('currentUser');
      // Redirect to login page or handle logout as needed
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    updateNotificationsInStorage(updatedNotifications);
  };

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
    updateNotificationsInStorage(updatedNotifications);
  };

  const getNotificationStyle = (type: string) => {
    const baseStyle = 'font-medium';
    switch (type) {
      case 'success':
        return `${baseStyle} text-green-600`;
      case 'warning':
        return `${baseStyle} text-yellow-600`;
      case 'error':
        return `${baseStyle} text-red-600`;
      default:
        return `${baseStyle} text-gray-700`;
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => (
    <div 
      key={notification.id} 
      className={`p-2 rounded-md mb-1 cursor-pointer transition-colors duration-200 
        ${notification.read ? 'bg-gray-100 opacity-70' : 'bg-blue-100 hover:bg-blue-100'}`}
      onClick={() => markAsRead(notification.id)}
    >
      <p className={getNotificationStyle(notification.type)}>
        {notification.message}
      </p>
      <p className="text-xs text-gray-500">
          {formatTimeAgo(notification.timestamp)}
      </p>
    </div>
  );

  return (
    <Navbar className="bg-gradient-to-r from-gray-900 h-[8.5vh] to-gray-700 text-white shadow-lg">
      <Navbar.Header className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <img src={logo} alt="TrustWorks logo" className="h-10 w-10 mr-3 rounded-full shadow-md" />
          <span className="text-xl font-bold tracking-tight">TrustWorks</span>
        </div>
        <Nav pullRight className="flex items-center gap-6">
          <Dropdown 
            title={(
              <div className="relative group">
                <FaBell className={`text-xl transition-colors duration-200 
                  ${unreadCount > 0 ? 'text-blue-400' : 'group-hover:text-blue-400'}`} 
                />
                {unreadCount > 0 ? (
                  <Badge 
                    content={unreadCount} 
                    className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs 
                      absolute -right-3 border-2 border-gray-800 shadow-lg"
                  /> ) : (
                  <Badge 
                  content={0} 
                  className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs 
                    absolute -right-3 border-2 border-gray-800 shadow-lg"
                />
                )}
              </div>
            )}
            className="mr-4"
            placement="bottomEnd"
            trigger={['click', 'hover']}
          >
            <Dropdown.Menu className="w-[24rem] p-3 z-10 bg-white rounded-lg shadow-xl absolute right-2">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-800">Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    className="text-blue-500 text-sm hover:text-blue-600 transition-colors" 
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="h-[16rem] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.sort((a, b) => {
                    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                  }).map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <p className="text-sm text-gray-600 text-center py-4">
                    No notifications
                  </p>
                )}
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown 
            title={`Hi, ${user.username}`} 
            icon={<FaUser className="text-lg mr-2" />} 
            trigger={['click', 'hover']}
            placement="bottomEnd"
          >
            <div className='bg-white flex flex-col gap-1 w-56 rounded-lg shadow-xl overflow-hidden absolute right-2'>
              <Dropdown.Item className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-3">
                <FaCog className="text-lg mr-3 text-gray-500" />
                <span className="font-medium">Key Number: {user.keyNumber}</span>
              </Dropdown.Item>
              <Dropdown.Item 
                className="flex items-center text-red-600 hover:bg-red-50 px-4 py-3" 
                onSelect={handleLogout}
              >
                <FaSignOutAlt className="text-lg mr-3" />
                <span className="font-medium">Log Out</span>
              </Dropdown.Item>
            </div>
          </Dropdown>
        </Nav>
      </Navbar.Header>
    </Navbar>
  );
};

export default NavBar;