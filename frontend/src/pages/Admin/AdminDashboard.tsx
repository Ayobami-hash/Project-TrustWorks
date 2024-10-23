import React, { useState, useEffect } from 'react';
import { BarChart2, Users, Settings, FileText } from 'lucide-react';
import StatsCard from '../../components/Admin/StatsCard';
import { Task, User } from '../../mockData/users';

const AdminDashboard: React.FC = () => {

  const users: User[] = JSON.parse(localStorage.getItem('users') || '{}');


  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProjects: 0,
    tasksCompleted: 0,
    reportsGenerated: 0,
  });

  const [tasks, setTasks] = useState<Task[] | []>([]);

  useEffect(() => {
    const totalUsers = users.length;
    const activeProjects = users.reduce((total, user) => total + user.tasks.filter(task => task.status === 'pending').length, 0);
    const tasksCompleted = users.reduce((total, user) => total + user.tasks.filter(task => task.status === 'completed').length, 0);
    const reportsGenerated =users.reduce((total, user) => total + user.tasks.filter(task => task.status).length, 0);

    setStats({
      totalUsers,
      activeProjects,
      tasksCompleted,
      reportsGenerated,
    });

    // Flattening all tasks from all users
    const allTasks = users.flatMap(user => user.tasks);
    setTasks(allTasks);
  }, []);

  return (
    <div className="h-[83vh] w-[77.2vw] bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<Users className="h-6 w-6" />} 
          color="bg-blue-100" 
        />
        <StatsCard 
          title="Active Projects" 
          value={stats.activeProjects} 
          icon={<BarChart2 className="h-6 w-6" />} 
          color="bg-green-100" 
        />
        <StatsCard 
          title="Tasks Completed" 
          value={stats.tasksCompleted} 
          icon={<FileText className="h-6 w-6" />} 
          color="bg-yellow-100" 
        />
        <StatsCard 
          title="Reports Generated" 
          value={stats.reportsGenerated} 
          icon={<Settings className="h-6 w-6" />} 
          color="bg-purple-100" 
        />
      </div>

      {/* Tasks Table */}
      <div className="mt-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Tasks Overview</h2>
        <div className="h-[50vh] overflow-y-scroll">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Due Date</th>
                <th className="py-2 px-4 text-left">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="py-2 px-4 border-b">{task.title}</td>
                  <td className="py-2 px-4 border-b">{task.description}</td>
                  <td className="py-2 px-4 border-b">{task.status}</td>
                  <td className="py-2 px-4 border-b">{task.dueDate}</td>
                  <td className="py-2 px-4 border-b">{task.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
