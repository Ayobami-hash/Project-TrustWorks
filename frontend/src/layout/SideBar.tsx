import React from 'react';
import { Sidenav, Nav } from 'rsuite';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Clock, Briefcase, Users, Settings, LogOut } from 'lucide-react';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem: React.FC<{ icon: React.ReactNode; path: string; label: string }> = ({ icon, path, label }) => (
    <Nav.Item
      className={`flex items-center w-full py-3 px-4 rounded-lg transition-colors duration-200 ${
        isActive(path)
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      onClick={() => navigate(path)}
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: `mr-3 h-5 w-5 ${isActive(path) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`,
      })}
      <span className="text-sm font-medium">{label}</span>
    </Nav.Item>
  );

  return (
    <Sidenav
      appearance="subtle"
      className="w-[15vw] h-[92vh] bg-gray-900 shadow-xl flex flex-col justify-between"
    >
      <Sidenav.Body className="px-4 py-6">
        <div className="mb-8">
          {/* <h2 className="text-xl font-bold text-white mb-2">TrustWorks</h2> */}
          <p className="text-sm text-gray-400">Manage your work efficiently</p>
        </div>
        <Nav className="flex flex-col space-y-2">
          <NavItem icon={<Home />} path="/dashboard" label="Dashboard" />
          <NavItem icon={<Clock />} path="/assign-time" label="Assign Time" />
          <NavItem icon={<Briefcase />} path="/remote-work" label="Remote Work" />
          <NavItem icon={<Users />} path="/match-room" label="Match Room" />
          <NavItem icon={<Settings />} path="/settings" label="Settings" />
          <div className="px-4 py-6">
            <Nav.Item
              className="flex items-center w-full py-3 px-4 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-colors duration-200"
              onClick={() => {
                navigate('/');
                localStorage.removeItem('currentUser');
              }}
              >
              <LogOut className="mr-3 h-5 w-5" />
              <span className="text-sm font-medium">Log Out</span>
            </Nav.Item>
          </div>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
};

export default SideBar;