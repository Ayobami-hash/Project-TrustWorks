import ApexCharts from 'react-apexcharts';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Welcome, {user.username}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Assigned Times</h2>
          <ul className="space-y-2">
            {user.assignedTimes.map((task, index) => (
              <li key={index} className="border p-4 rounded-lg">
                <strong>{task.task}</strong>: {task.time} ({task.status})
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Track Progress</h2>
          <ApexCharts
            options={{
              chart: { id: 'progress-chart' },
              labels: ['Progress'],
              colors: ['#00E396'],
              plotOptions: {
                radialBar: { hollow: { size: '70%' } }
              }
            }}
            series={[user.trackProgress]}
            type="radialBar"
          />
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Rating</h2>
          <ApexCharts
            options={{
              chart: { id: 'rating-chart' },
              labels: ['Rating'],
              colors: ['#FEB019'],
              plotOptions: {
                radialBar: { hollow: { size: '70%' } }
              }
            }}
            series={[user.rating * 20]} // Convert rating to percentage
            type="radialBar"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
