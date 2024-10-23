// import React from 'react';

const EmployeeManagement = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Employee Management</h2>
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Employee</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Work Arrangement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">Developer</td>
              <td className="py-2 px-4">Remote</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">Designer</td>
              <td className="py-2 px-4">Part-Time</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;

