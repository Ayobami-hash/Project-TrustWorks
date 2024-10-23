import { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { 
  Panel, 
  Progress, 
  ButtonGroup, 
  Button,
  List
} from 'rsuite';
import { 
  BarChart2, 
  Clock, 
  Star, 
  TrendingUp,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Award,
  Activity
} from 'lucide-react';
import { Task, User } from '../mockData/users';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  const [user] = useState<User>(() => {
    // Get the current user from local storage
    return JSON.parse(localStorage.getItem('currentUser') || '{}') as User;
  });

  const getStatusIcon = (status: 'completed' | 'pending') => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const totalTasks = user.tasks.length;
  const completedTasks = user.tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = user.tasks.filter(task => task.status === 'pending').length;
  const completedProgress = Math.round((completedTasks / totalTasks ) * 100);
  const pendingProgress = Math.round((pendingTasks / totalTasks ) * 100);
  const rating = Math.floor(((completedTasks + pendingTasks / 2) / totalTasks ) * 5 );
  const overallProgress = Math.round(((completedTasks + pendingTasks / 2) / totalTasks ) * 100);

  return (
    <div className="h-[92vh] w-[85vw] overflow-auto bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.username}!
              </h1>
              <p className="text-gray-600">Here's your performance overview</p>
            </div>
          </div>
          <ButtonGroup className='flex gap-2 text-xs'>
            <Button 
              appearance={timeframe === 'daily' ? 'primary' : 'subtle'}
              onClick={() => setTimeframe('daily')}
            >
              Daily
            </Button>
            <Button 
              appearance={timeframe === 'weekly' ? 'primary' : 'subtle'}
              onClick={() => setTimeframe('weekly')}
            >
              Weekly
            </Button>
            <Button 
              appearance={timeframe === 'monthly' ? 'primary' : 'subtle'}
              onClick={() => setTimeframe('monthly')}
            >
              Monthly
            </Button>
          </ButtonGroup>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Panel bordered className="bg-white p-3 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Tasks Completed</p>
                <h3 className="text-2xl font-bold">
                  {completedTasks}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress 
              percent={completedProgress} 
              strokeColor="#10B981"
              className="mt-2" 
            />
          </Panel>

          <Panel bordered className="bg-white p-3 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">In Progress</p>
                <h3 className="text-2xl font-bold">
                  {pendingTasks}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress 
              percent={pendingProgress} 
              strokeColor="#3B82F6"
              className="mt-2" 
            />
          </Panel>

          <Panel bordered className="bg-white p-3 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Performance Score</p>
                <h3 className="text-2xl font-bold">{rating}/5</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <Progress 
              percent={rating * 20} 
              strokeColor="#F59E0B"
              className="mt-2" 
            />
          </Panel>

          <Panel bordered className="bg-white p-3 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Overall Progress</p>
                <h3 className="text-2xl font-bold">{overallProgress}%</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Progress 
              percent={overallProgress} 
              strokeColor="#8B5CF6"
              className="mt-2" 
            />
          </Panel>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task List */}
          <Panel 
            bordered 
            className="lg:col-span-2 bg-white p-3 rounded-md overflow-y-auto h-[90vh]"
            header={
              <div className="flex items-center space-x-2 py-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Assigned Tasks</h3>
              </div>
            }
          >
            <List hover>
              {user.tasks.map((task: Task, index: number) => (
                <List.Item key={index} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <h4 className="font-medium">{task.description}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </List.Item>
              ))}
            </List>
          </Panel>

          {/* Charts */}
          <div className="space-y-6">
            <Panel 
              bordered 
              className="bg-white p-3 rounded-md"
              header={
                <div className="flex items-center space-x-2 py-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Performance Rating</h3>
                </div>
              }
            >
              <ApexCharts
                options={{
                  chart: { 
                    id: 'rating-chart',
                    toolbar: { show: false }
                  },
                  labels: ['Performance Score'],
                  colors: ['#F59E0B'],
                  plotOptions: {
                    radialBar: {
                      hollow: { size: '70%' },
                      track: { background: '#FEF3C7' },
                      dataLabels: {
                        name: { show: false },
                        value: { 
                          fontSize: '24px',
                          fontWeight: '600',
                          formatter: (val) => `${(val/20).toFixed(1)}/5`
                        }
                      }
                    }
                  }
                }}
                series={[user.rating * 20]}
                type="radialBar"
                height={300}
              />
            </Panel>

            <Panel 
              bordered 
              className="bg-white p-3 rounded-md"
              header={
                <div className="flex items-center space-x-2 py-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Progress Trend</h3>
                </div>
              }
            >
              <ApexCharts
                options={{
                  chart: {
                    id: 'progress-trend',
                    toolbar: { show: false }
                  },
                  stroke: {
                    curve: 'smooth'
                  },
                  xaxis: {
                    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  colors: ['#8B5CF6']
                }}
                series={[{
                  name: 'Progress',
                  data: [65, 70, 68, 74, 80, 78, 85]
                }]}
                type="line"
                height={200}
              />
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
