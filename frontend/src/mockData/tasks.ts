export interface Task {
    id: number;
    title: string;
    description: string;
    assignedTo: number; // User ID to whom the task is assigned
    status: 'completed' | 'pending';
    dueDate: string;
  }
  
  export const tasks: Task[] = [
    { id: 1, title: 'Review Reports', description: 'Check all user reports.', assignedTo: 1, status: 'completed', dueDate: '2024-10-01' },
    { id: 2, title: 'Fix Bug #231', description: 'Resolve the issue with the admin panel.', assignedTo: 1, status: 'pending', dueDate: '2024-10-15' },
    { id: 3, title: 'Complete Profile', description: 'Add missing personal information.', assignedTo: 2, status: 'pending', dueDate: '2024-10-20' },
    { id: 4, title: 'Submit Tax Info', description: 'Provide necessary tax documentation.', assignedTo: 2, status: 'completed', dueDate: '2024-09-30' },
    { id: 5, title: 'Complete Security Setup', description: 'Activate two-factor authentication.', assignedTo: 3, status: 'pending', dueDate: '2024-10-05' },
  ];
  