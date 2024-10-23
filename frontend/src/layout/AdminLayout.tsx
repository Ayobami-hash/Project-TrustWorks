import { Sidebar, Sidenav, Nav } from 'rsuite';
import { LayoutDashboard, Users, Settings, BarChart2, LogOut, User } from 'lucide-react';
import { Outlet, useNavigate} from 'react-router-dom';
import { } from 'react-router-dom';
import NavBar from './NavBar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export const AdminLayout = () => {

  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const NavItem: React.FC<{ icon: React.ReactNode; path: string; label: string }> = ({ icon, path, label }) => (
    <Nav.Item
      className={`flex items-center w-full py-3 px-4 mb-2 rounded-lg transition-colors duration-200 ${
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
    <div className="w-[100vw] h-[100vh] relative">
      <NavBar />
      <div className="flex">
        <Sidebar className="w-[15vw] h-[91.5vh] bg-gray-900 shadow-xl flex flex-col justify-between">
          <Sidenav defaultOpenKeys={['1']} appearance="subtle">
            <Sidenav.Body className="px-4 pt-12">
              <Nav>
                <NavItem icon={<LayoutDashboard />} path="/admin/dashboard" label="Dashboard" />
                <NavItem icon={<Users />} path="/admin/user-management" label="User Management" />
                <NavItem icon={<User />} path="/admin/task-assignment" label="Task Assignment" />
                <NavItem icon={<BarChart2 />} path="/admin/reports-analytics" label="Reports & Analytics" />
                <NavItem icon={<Settings />} path="/admin/system-settings" label="System Settings" />
                <div className="px-4 pt-16">
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
        </Sidebar>

        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
          <ToastContainer position="top-right" />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
