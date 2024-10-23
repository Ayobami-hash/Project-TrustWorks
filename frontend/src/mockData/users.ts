export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'pending';
  dueDate: string;
  assignedTo: string;
}

export interface AssignedTime {
  task: string;
  time: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: Date;
  read: boolean;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Inactive';
  tasks: Task[]; // Each user has a list of tasks
  keyNumber: number;
  assignedTimes: AssignedTime[];
  trackProgress: number; // Percentage (0-100)
  rating: number; // Rating out of 5
  residentialAddress: string;
  unavailableReason: string;
  unavailableDuration: string;
  remoteTasks: string[];
  sharedTaskAccess: string[];
  lastActiveDate?: string;
  notifications?: Notification[] | [];
}


export const users: User[] = [
  {
    id: 1,
    username: 'john.doe',
    password: 'password123',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    keyNumber: 1234,
    assignedTimes: [
      { task: 'Code Review', time: '2 hours', status: 'Completed' },
      { task: 'Documentation Update', time: '1.5 hours', status: 'In Progress' },
    ],
    tasks: [
      { id: 1, title: 'Review Reports', description: 'Check all user reports.', status: 'completed', dueDate: '2024-10-01', assignedTo: 'John Doe'  },
      { id: 2, title: 'Fix Bug #231', description: 'Resolve the admin panel issue.', status: 'pending', dueDate: '2024-10-15', assignedTo: 'John Doe'  },
      { id: 3, title: 'Deploy Feature X', description: 'Deploy the latest release.', status: 'completed', dueDate: '2024-10-10', assignedTo: 'John Doe' },
      { id: 4, title: 'Optimize Database', description: 'Review and optimize database queries.', status: 'pending', dueDate: '2024-10-12', assignedTo: 'John Doe' },
      { id: 5, title: 'Team Meeting', description: 'Lead weekly stand-up meeting.', status: 'completed', dueDate: '2024-10-14', assignedTo: 'John Doe' },
      { id: 6, title: 'Update User Permissions', description: 'Update user roles for new employees.', status: 'pending', dueDate: '2024-10-18', assignedTo: 'John Doe' },
      { id: 7, title: 'Conduct Code Audit', description: 'Review and audit codebase.', status: 'completed', dueDate: '2024-10-10', assignedTo: 'John Doe' },
      { id: 8, title: 'Write Release Notes', description: 'Document changes in the latest release.', status: 'pending', dueDate: '2024-10-20', assignedTo: 'John Doe' },
      { id: 9, title: 'Configure Server', description: 'Set up new server for backups.', status: 'completed', dueDate: '2024-10-05', assignedTo: 'John Doe' },
      { id: 10, title: 'Handle Client Feedback', description: 'Review feedback from recent clients.', status: 'pending', dueDate: '2024-10-22', assignedTo: 'John Doe' },
    ],
    trackProgress: 90,
    rating: 4.7,
    residentialAddress: '123 Main St, Springfield',
    unavailableReason: '',
    unavailableDuration: '',
    remoteTasks: ['Review PRs', 'Test Deployments'],
    sharedTaskAccess: ['Documentation', 'Bug Reports']
  },
  {
    id: 2,
    username: 'jane.smith',
    password: 'securePass!',
    email: 'jane@example.com',
    role: 'User',
    status: 'Inactive',
    keyNumber: 4321,
    assignedTimes: [
      { task: 'Test Feature X', time: '3 hours', status: 'Pending' },
      { task: 'Submit Design Feedback', time: '1 hour', status: 'Completed' },
    ],
    tasks: [
      { id: 6, title: 'Complete Profile', description: 'Add missing personal info.', status: 'pending', dueDate: '2024-10-20', assignedTo: 'Jane Smith'  },
      { id: 7, title: 'Submit Tax Info', description: 'Provide tax documentation.', status: 'completed', dueDate: '2024-09-30', assignedTo: 'Jane Smith'  },
      { id: 8, title: 'Test Login Flow', description: 'Ensure smooth login experience.', status: 'completed', dueDate: '2024-10-01', assignedTo: 'Jane Smith' },
      { id: 9, title: 'Update Profile Pic', description: 'Upload a new profile picture.', status: 'pending', dueDate: '2024-10-21', assignedTo: 'Jane Smith' },
      { id: 10, title: 'Update Portfolio', description: 'Refresh portfolio page.', status: 'completed', dueDate: '2024-10-10', assignedTo: 'Jane Smith' },
      { id: 11, title: 'Fix Broken Links', description: 'Review and fix broken links on website.', status: 'pending', dueDate: '2024-10-12', assignedTo: 'Jane Smith' },
      { id: 12, title: 'Update Contact Info', description: 'Review and update contact information.', status: 'completed', dueDate: '2024-10-14', assignedTo: 'Jane Smith' },
    ],
    trackProgress: 60,
    rating: 4.1,
    residentialAddress: '456 Oak St, Metropolis',
    unavailableReason: 'Vacation',
    unavailableDuration: '2024-10-10 to 2024-10-15',
    remoteTasks: ['Research Market Trends'],
    sharedTaskAccess: ['Expense Reports']
  },
  {
    id: 3,
    username: 'bob.johnson',
    password: 'hunter2',
    email: 'bob@example.com',
    role: 'User',
    status: 'Active',
    keyNumber: 5678,
    assignedTimes: [
      { task: 'Setup Two-Factor Auth', time: '30 mins', status: 'Pending' },
    ],
    tasks: [
      { id: 11, title: 'Complete Security Setup', description: 'Activate two-factor authentication.', status: 'pending', dueDate: '2024-10-05', assignedTo: 'Bob Johnson'  },
      { id: 12, title: 'Submit Time Report', description: 'Provide weekly time report.', status: 'completed', dueDate: '2024-10-02', assignedTo: 'Bob Johnson'  },
      { id: 13, title: 'Upgrade Server', description: 'Install new server updates.', status: 'pending', dueDate: '2024-10-08', assignedTo: 'Bob Johnson' },
      { id: 14, title: 'Database Backup', description: 'Schedule regular backups.', status: 'completed', dueDate: '2024-10-07', assignedTo: 'Bob Johnson' },
      { id: 15, title: 'Update System Logs', description: 'Review and update system logs.', status: 'pending', dueDate: '2024-10-14', assignedTo: 'Bob Johnson' },
      { id: 16, title: 'Review Firewall Rules', description: 'Audit and update firewall settings.', status: 'completed', dueDate: '2024-10-09', assignedTo: 'Bob Johnson' },
      { id: 17, title: 'Organize Team Call', description: 'Arrange team meeting.', status: 'pending', dueDate: '2024-10-20', assignedTo: 'Bob Johnson' },
    ],
    trackProgress: 75,
    rating: 4.0,
    residentialAddress: '789 Pine St, Gotham',
    unavailableReason: '',
    unavailableDuration: '',
    remoteTasks: [],
    sharedTaskAccess: []
  },
  {
    id: 4,
    username: 'alice.wong',
    password: 'passw0rd',
    email: 'alice@example.com',
    role: 'User',
    status: 'Active',
    keyNumber: 6789,
    assignedTimes: [
      { task: 'Update CMS', time: '45 mins', status: 'Pending' },
      { task: 'Write Blog Post', time: '2 hours', status: 'Completed' },
    ],
    tasks: [
      { id: 15, title: 'Schedule Meeting', description: 'Arrange client meeting.', status: 'pending', dueDate: '2024-10-12', assignedTo: 'Alice Wong' },
      { id: 16, title: 'Publish Article', description: 'Post article on the blog.', status: 'completed', dueDate: '2024-10-05', assignedTo: 'Alice Wong' },
      { id: 17, title: 'Design Mockups', description: 'Create initial mockups.', status: 'pending', dueDate: '2024-10-18', assignedTo: 'Alice Wong' },
      { id: 18, title: 'Send Invoice', description: 'Send October invoices.', status: 'completed', dueDate: '2024-10-02', assignedTo: 'Alice Wong' },
      { id: 19, title: 'Prepare Presentation', description: 'Draft slides for client presentation.', status: 'pending', dueDate: '2024-10-22', assignedTo: 'Alice Wong' },
      { id: 20, title: 'Update LinkedIn', description: 'Post recent work updates.', status: 'completed', dueDate: '2024-10-07', assignedTo: 'Alice Wong' },
    ],
    trackProgress: 85,
    rating: 4.5,
    residentialAddress: '987 Elm St, Smallville',
    unavailableReason: '',
    unavailableDuration: '',
    remoteTasks: ['Client Meeting', 'Report Writing'],
    sharedTaskAccess: ['Marketing Docs']
  },
  {
    id: 5,
    username: 'michael.lee',
    password: 'leeM123!',
    email: 'michael@example.com',
    role: 'User',
    status: 'Active',
    keyNumber: 7890,
    assignedTimes: [
      { task: 'Update Client List', time: '1 hour', status: 'In Progress' },
    ],
    tasks: [
      { id: 19, title: 'Analyze Data', description: 'Run analytics on the new dataset.', status: 'pending', dueDate: '2024-10-09', assignedTo: 'Michael Lee' },
      { id: 20, title: 'Client Call', description: 'Follow up with clients.', status: 'completed', dueDate: '2024-10-06', assignedTo: 'Michael Lee' },
      { id: 21, title: 'Review SLA', description: 'Check service level agreements.', status: 'pending', dueDate: '2024-10-12', assignedTo: 'Michael Lee' },
      { id: 22, title: 'Prepare Monthly Report', description: 'Create and submit monthly reports.', status: 'completed', dueDate: '2024-10-04', assignedTo: 'Michael Lee' },
      { id: 23, title: 'Send Meeting Notes', description: 'Distribute notes from recent meeting.', status: 'completed', dueDate: '2024-10-11', assignedTo: 'Michael Lee' },
    ],
    trackProgress: 70,
    rating: 4.2,
    residentialAddress: '321 Oak St, Star City',
    unavailableReason: '',
    unavailableDuration: '',
    remoteTasks: [],
    sharedTaskAccess: []
  },
  {
    id: 6,
    username: 'emma.brown',
    password: 'brownie123!',
    email: 'emma@example.com',
    role: 'User',
    status: 'Inactive',
    keyNumber: 6543,
    assignedTimes: [
      { task: 'Content Audit', time: '3 hours', status: 'Completed' },
    ],
    tasks: [
      { id: 24, title: 'Fix SEO Issues', description: 'Improve site SEO rankings.', status: 'pending', dueDate: '2024-10-13', assignedTo: 'Emma Brown' },
      { id: 25, title: 'Write Newsletter', description: 'Draft and send October newsletter.', status: 'completed', dueDate: '2024-10-03', assignedTo: 'Emma Brown' },
    ],
    trackProgress: 50,
    rating: 4.0,
    residentialAddress: '123 Maple St, Riverdale',
    unavailableReason: 'Personal leave',
    unavailableDuration: '2024-10-05 to 2024-10-18',
    remoteTasks: ['Blog Writing'],
    sharedTaskAccess: ['Editorial Calendar']
  },
  {
    id: 7,
    username: 'oliver.king',
    password: 'kingOliver!',
    email: 'oliver@example.com',
    role: 'User',
    status: 'Active',
    keyNumber: 3456,
    assignedTimes: [
      { task: 'Finalize Designs', time: '2 hours', status: 'Pending' },
    ],
    tasks: [
      { id: 26, title: 'Develop Wireframes', description: 'Create wireframes for new app.', status: 'pending', dueDate: '2024-10-14', assignedTo: 'Oliver King' },
      { id: 27, title: 'Finalize Contract', description: 'Review and finalize client contract.', status: 'completed', dueDate: '2024-10-01', assignedTo: 'Oliver King' },
      { id: 28, title: 'Launch Campaign', description: 'Initiate email marketing campaign.', status: 'pending', dueDate: '2024-10-16', assignedTo: 'Oliver King' },
      { id: 29, title: 'Organize Photoshoot', description: 'Set up product photoshoot.', status: 'completed', dueDate: '2024-10-08', assignedTo: 'Oliver King' },
    ],
    trackProgress: 80,
    rating: 4.3,
    residentialAddress: '456 Birch St, Central City',
    unavailableReason: '',
    unavailableDuration: '',
    remoteTasks: [],
    sharedTaskAccess: []
  },
  {
    id: 8,
    username: 'sophia.martin',
    password: 'martinSophia!',
    email: 'sophia@example.com',
    role: 'User',
    status: 'Active',
    keyNumber: 6782,
    assignedTimes: [
      { task: 'Update Sales Data', time: '1.5 hours', status: 'Completed' },
    ],
    tasks: [
      { id: 30, title: 'Prepare Budget', description: 'Create budget proposal for 2025.', status: 'pending', dueDate: '2024-10-15', assignedTo: 'Sophia Martin' },
      { id: 31, title: 'Conduct Market Research', description: 'Analyze competitor data.', status: 'completed', dueDate: '2024-10-10', assignedTo: 'Sophia Martin' },
      { id: 32, title: 'Setup New Hire Training', description: 'Prepare onboarding materials.', status: 'pending', dueDate: '2024-10-20', assignedTo: 'Sophia Martin' },
    ],
    trackProgress: 85,
    rating: 4.6,
    residentialAddress: '987 Willow St, Hill Valley',
    unavailableReason: '',
    unavailableDuration: '',
    remoteTasks: [],
    sharedTaskAccess: []
  },
  {
    id: 9,
    username: 'jack.davis',
    password: 'jackD@v!s2024',
    email: 'jack@example.com',
    role: 'User',
    status: 'Inactive',
    keyNumber: 7845,
    assignedTimes: [
      { task: 'Design Logo', time: '3 hours', status: 'Completed' },
    ],
    tasks: [
      { id: 33, title: 'Design Website', description: 'Develop initial website layout.', status: 'pending', dueDate: '2024-10-18', assignedTo: 'Jack Davis' },
      { id: 34, title: 'Review Competitor Sites', description: 'Evaluate competitor designs.', status: 'completed', dueDate: '2024-10-09', assignedTo: 'Jack Davis' },
      { id: 35, title: 'Mockup Landing Page', description: 'Create landing page mockups.', status: 'pending', dueDate: '2024-10-22', assignedTo: 'Jack Davis' },
    ],
    trackProgress: 65,
    rating: 4.2,
    residentialAddress: '456 Poplar St, Southside',
    unavailableReason: 'Sick leave',
    unavailableDuration: '2024-10-11 to 2024-10-19',
    remoteTasks: ['Design Review'],
    sharedTaskAccess: ['Design Files']
  },
  {
    id: 10,
    username: 'amelia.moore',
    password: 'ameliaM2024!',
    email: 'amelia@example.com',
    role: 'User',
    status: 'Active',
    keyNumber: 2345,
    assignedTimes: [
      { task: 'Prepare Presentation', time: '2 hours', status: 'In Progress' },
    ],
    tasks: [
      { id: 36, title: 'Write Case Study', description: 'Draft a new case study.', status: 'pending', dueDate: '2024-10-21', assignedTo: 'Amelia Moore' },
      { id: 37, title: 'Client Meeting Prep', description: 'Prepare materials for client meeting.', status: 'completed', dueDate: '2024-10-06', assignedTo: 'Amelia Moore' },
    ],
    trackProgress: 75,
    rating: 4.4,
    residentialAddress: '123 Cedar St, Westport',
    unavailableReason: '',
    unavailableDuration: '',
    remoteTasks: [],
    sharedTaskAccess: []
  },
];

