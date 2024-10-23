import { useEffect, useState } from 'react';
import { Panel, DateRangePicker, Button, Loader, Progress } from 'rsuite';
import ApexCharts from 'react-apexcharts';
import { tasks } from '../../mockData/tasks';
// import { users } from '../../mockData/users';
import type { DateRange } from 'rsuite/DateRangePicker';
import type { ApexOptions } from 'apexcharts'; // Import ApexOptions
import { User } from '../../mockData/users';

const ReportsAnalytics = () => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '{}');
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [completedTasksData, setCompletedTasksData] = useState<number[]>([]);
  const [activeUsersData, setActiveUsersData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = () => {
    setIsLoading(true);
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const startDate = dateRange ? dateRange[0] : lastWeek;
    const endDate = dateRange ? dateRange[1] : today;

    setTimeout(() => {
      // Calculate task statistics
      const allTasks = tasks.filter(task => 
        task.dueDate && 
        new Date(task.dueDate) >= startDate && 
        new Date(task.dueDate) <= endDate
      );

      const completed = allTasks.filter(task => task.status === 'completed').length;
      const pending = allTasks.filter(task => task.status === 'pending').length;
      const overdue = allTasks.filter(task => 
        task.status === 'pending' && 
        new Date(task.dueDate) < new Date()
      ).length;

      setTaskStats({
        total: allTasks.length,
        completed,
        pending,
        overdue
      });

      // Calculate daily stats
      const tasksCompleted = Array(7).fill(0);
      const usersActive = Array(7).fill(0);

      allTasks.forEach(task => {
        if (task.status === 'completed' && task.dueDate) {
          const taskDate = new Date(task.dueDate).getDay();
          tasksCompleted[taskDate] += 1;
        }
      });

      users.forEach(user => {
        if (user.status === 'Active' && user.lastActiveDate) {
          const activityDate = new Date(user.lastActiveDate).getDay();
          usersActive[activityDate] += 1;
        }
      });

      setCompletedTasksData(tasksCompleted);
      setActiveUsersData(usersActive);
      setIsLoading(false);
    }, 800);
  };

  const handleDateChange = (value: DateRange | null) => {
    if (value && Array.isArray(value)) {
      setDateRange([value[0], value[1]]);
    } else {
      setDateRange(null);
    }
  };

  const getChartOptions = (title: string): ApexOptions => ({
    chart: {
      id: title.toLowerCase(),
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
    },
    colors: ['#4169E1'],
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: { style: { colors: '#64748b' } }
    },
    yaxis: {
      labels: { style: { colors: '#64748b' } }
    },
    stroke: { 
      curve: 'smooth' as const, // Specify the type explicitly
      width: 3
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4
    },
    title: {
      text: title,
      style: { fontSize: '18px', fontWeight: 600 }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        opacityFrom: 0.8,
        opacityTo: 0.2
      }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value: number) => `${value} ${title.includes('Tasks') ? 'tasks' : 'users'}`
      }
    }
  });

  return (
    <div className="h-[83vh] w-[77vw] bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Track your team's performance and task completion rates
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <DateRangePicker 
              placeholder="Select Date Range"
              className="w-[260px]"
              onChange={handleDateChange}
              defaultValue={[new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()]}
              format="yyyy-MM-dd"
            />
            <Button 
              appearance="primary"
              onClick={fetchReportData}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : 'Generate Report'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Total Tasks</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{taskStats.total}</p>
            <Progress.Line 
              percent={100} 
              strokeColor="#4169E1"
              showInfo={false}
              className="mt-2"
            />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Completed</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">{taskStats.completed}</p>
            <Progress.Line 
              percent={(taskStats.completed / taskStats.total) * 100} 
              strokeColor="#10B981"
              showInfo={false}
              className="mt-2"
            />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600 mt-2">{taskStats.pending}</p>
            <Progress.Line 
              percent={(taskStats.pending / taskStats.total) * 100} 
              strokeColor="#F59E0B"
              showInfo={false}
              className="mt-2"
            />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Overdue</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">{taskStats.overdue}</p>
            <Progress.Line 
              percent={(taskStats.overdue / taskStats.total) * 100} 
              strokeColor="#EF4444"
              showInfo={false}
              className="mt-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Panel bordered className="bg-white shadow-sm rounded-xl">
            {isLoading ? (
              <div className="h-[350px] flex items-center justify-center">
                <Loader size="lg" content="Loading chart data..." />
              </div>
            ) : (
              <ApexCharts
                options={getChartOptions('Tasks Completed')}
                series={[{ 
                  name: 'Tasks Completed',
                  data: completedTasksData 
                }]}
                type="area"
                height={350}
              />
            )}
          </Panel>

          <Panel bordered className="bg-white shadow-sm rounded-xl">
            {isLoading ? (
              <div className="h-[350px] flex items-center justify-center">
                <Loader size="lg" content="Loading chart data..." />
              </div>
            ) : (
              <ApexCharts
                options={getChartOptions('User Activity')}
                series={[{ 
                  name: 'Active Users',
                  data: activeUsersData 
                }]}
                type="area"
                height={350}
              />
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
