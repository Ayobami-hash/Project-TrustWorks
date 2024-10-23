import { Table, Progress } from 'rsuite';

const PerformanceMonitoring = () => {
  const performanceData = [
    { user: 'John Doe', tasksCompleted: 20, progress: 80 },
    { user: 'Jane Smith', tasksCompleted: 15, progress: 60 },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Performance Monitoring</h1>
      <Table data={performanceData}>
        <Table.Column width={200}>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.Cell dataKey="user" />
        </Table.Column>

        <Table.Column width={200}>
          <Table.HeaderCell>Tasks Completed</Table.HeaderCell>
          <Table.Cell dataKey="tasksCompleted" />
        </Table.Column>

        <Table.Column width={300}>
          <Table.HeaderCell>Progress</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <Progress.Line percent={rowData.progress} strokeColor="#4CAF50" />
            )}
          </Table.Cell>
        </Table.Column>
      </Table>
    </div>
  );
};

export default PerformanceMonitoring;
