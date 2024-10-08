import { Navbar, Nav, Dropdown, Badge } from 'rsuite';
import { useEffect, useState } from 'react';
import { FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing icons from react-icons

const NavBar = () => {
  const [user, setUser] = useState({ username: '', keyNumber: '' });

  useEffect(() => {
    // Load current user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUser(loggedInUser);
  }, []);

  return (
    <Navbar className="shadow-md">
      <Navbar.Header>
        <img src="/logo.png" alt="logo" className="h-8 inline mr-2" />
        <span className="text-xl font-bold text-blue-800">TrustWorks</span>
      </Navbar.Header>
      <Navbar.Body>
        <Nav pullRight>
          <Nav.Item icon={<FaBell />} className="flex items-center">
            Notify Me <Badge content={5} className="ml-2" />
          </Nav.Item>
          <Dropdown title={`Hi, ${user.username}`} icon={<FaUser />}>
            <Dropdown.Item>Key Number: {user.keyNumber}</Dropdown.Item>
            <Dropdown.Item icon={<FaCog />}>Settings</Dropdown.Item>
            <Dropdown.Item icon={<FaSignOutAlt />}>Log Out</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default NavBar;
