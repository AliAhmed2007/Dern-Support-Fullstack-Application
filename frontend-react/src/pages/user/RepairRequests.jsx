import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import ColumnChartComponent from '../../components/charts/ColumnChartComponent';
import PieChartComponent from '../../components/charts/PieChartComponent';
import BarChartComponent from '../../components/charts/BarChartComponent';
import RepairRequestTable from '../../components/tables/RepairRequestTable';
import StatsCard from '../../components/userDashboard/StatsCard';
import { Spin } from 'antd';

const RepairRequestsContent = ({ repairRequests, darkMode }) => {
  // Transform the resolved repairRequests data for the table
  const requests = repairRequests.map((req) => ({
    id: req.id,
    deviceName: req.device_name || 'Not Assigned',
    problem: req.problem || 'Not Assigned',
    status: req.status || 'Not Assigned',
    priority: req.priority
      ? req.priority.charAt(0).toUpperCase() + req.priority.slice(1)
      : 'Not Assigned',
    assignedTo: req.assignedTo || 'Not Assigned',
    createdAt: req.created_at
      ? new Date(req.created_at).toLocaleDateString()
      : 'Not Assigned',
    courier: req.courier || 'disable',
    attachments: req.attachments
  }));
  // Compute data for stats
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status.toLowerCase() === 'pending').length;
  const diagnosticsRequests = requests.filter((r) => r.status.toLowerCase() === 'diagnostics').length;
  const inProgressRequests = requests.filter((r) => r.status.toLowerCase() === 'in progress').length;
  const completedRequests = requests.filter((r) => r.status.toLowerCase() === 'completed').length;
  const cancelledRequests = requests.filter((r) => r.status.toLowerCase() === 'cancelled').length;
  const requestsAttachments = requests.filter((r) => r.attachments).flatMap((req) => req.attachments).length;

  // Compute courier stats
  const courierRequests = requests.filter(
    (r) => r.courier.toLowerCase() === 'enable'
  ).length;
  const courierPercentage =
    totalRequests > 0 ? Math.round((courierRequests / totalRequests) * 100) : 0;

  const stats = [
    { title: 'Total Requests', value: totalRequests, backgroundColor: '#FFF0F6', textColor: '#AD1457' },
    { title: 'Pending', value: pendingRequests, backgroundColor: '#FFFAE6', textColor: '#663C00' },
    { title: 'Diagnostics', value: diagnosticsRequests, backgroundColor: '#E6F7FF', textColor: '#005580' },
    { title: 'In Progress', value: inProgressRequests, backgroundColor: '#F6FFED', textColor: '#237804' },
    { title: 'Completed', value: completedRequests, backgroundColor: '#FFF0F6', textColor: '#AD1457' },
    { title: 'Cancelled', value: cancelledRequests, backgroundColor: '#FFFAE6', textColor: '#663C00' },
    { title: 'Attachments', value: requestsAttachments, backgroundColor: '#FFFAE6', textColor: '#663C00' },
    { title: 'Courier (%)', value: courierPercentage, backgroundColor: '#F0FFF0', textColor: '#2E8B57', percentage: true },
  ];

  // Compute statusData for the pie chart from real requests data
  const statuses = ['pending', 'diagnostics', 'in progress', 'completed', 'cancelled'];
  const statusData = statuses.map((status) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: requests.filter((r) => r.status.toLowerCase() === status).length,
  }));

  // Compute priorityData for the column chart from real requests data
  const priorityLevels = ['critical', 'high', 'normal', 'low'];
  const priorityData = priorityLevels.map((level) => ({
    priority: level.charAt(0).toUpperCase() + level.slice(1),
    count: requests.filter((r) => r.priority.toLowerCase() === level).length,
  }));


  // Compute courier pie chart data
  const courierPieData = [
    { name: 'Enabled', value: courierRequests },
    { name: 'Disabled', value: totalRequests - courierRequests },
  ];

  // Compute attachments data for the bar chart
  const attachmentsData = [
    { name: 'With Files', value: requests.filter((r) => r.attachments && r.attachments.length > 0).length },
    { name: 'Without Files', value: requests.filter((r) => !r.attachments || r.attachments.length === 0).length },
  ];


  // Define base columns for the table
  let columns = [
    {
      title: 'Device',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: 'Problem',
      dataIndex: 'problem',
      key: 'problem',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Diagnostics', value: 'diagnostics' },
        { text: 'In progress', value: 'in progress' },
        { text: 'Completed', value: 'completed' },
        { text: 'Cancelled', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status.toLowerCase() === value.toLowerCase(),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      filters: [
        { text: 'Critical', value: 'critical' },
        { text: 'High', value: 'high' },
        { text: 'Normal', value: 'normal' },
        { text: 'Low', value: 'low' },
      ],
      onFilter: (value, record) => record.priority.toLowerCase() === value.toLowerCase(),
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
  ];

  const isAdmin = localStorage.getItem('userType') === 'admin';

  // If the user is an admin, add an update status column
  if (isAdmin) {
    columns.push({
      title: 'Update Status',
      dataIndex: 'updateStatus',
      key: 'updateStatus'
    })
  }


  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
        Repair Requests
      </h1>
      <StatsCard stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Existing charts... */}
        <PieChartComponent
          data={statusData}
          dataKey="value"
          nameKey="name"
          containerProps={{
            title: 'Repair Requests by Status',
            description: 'Current distribution of repair request statuses',
          }}
          darkMode={darkMode}
        />
        <ColumnChartComponent
          data={priorityData}
          xKey="priority"
          columns={[
            { key: 'count', name: 'Requests' },
          ]}
          containerProps={{
            title: 'Requests by Priority',
            description: 'Distribution of repair requests by priority level',
          }}
          darkMode={darkMode}
        />
        {/* New Courier Chart */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        <BarChartComponent
          data={attachmentsData}
          yKey="name"
          bars={[{ key: 'value', name: 'Requests Count' }]} 
          containerProps={{
            title: 'Attachments Overview',
            description: 'Comparison of requests with and without attachments',
          }}
          darkMode={darkMode}
        />
        <PieChartComponent
          data={courierPieData}
          dataKey="value"
          nameKey="name"
          containerProps={{
            title: 'Courier Service Usage',
            description: 'Number of requests with courier enabled',
          }}
          darkMode={darkMode}
        />
      </div>
      
      <div className={`bg-${darkMode ? 'dark' : 'light'}-surface-primary rounded-lg shadow-lg p-6`}>
        <RepairRequestTable columns={columns} repairRequests={requests} requestsWithTechnicians={repairRequests} />
      </div>
    </div>
  );
};

const RepairRequests = () => {
  const { darkMode } = useTheme();
  const loaderData = useLoaderData();

  return (
    <Suspense fallback={
      <div className={`flex items-center justify-center min-h-[calc(100vh-80px)]`}>
        <Spin size="large" />
      </div>
    }>
      <Await resolve={loaderData.repairRequests}>
        {(resolvedData) => {
          return <RepairRequestsContent repairRequests={resolvedData.data} darkMode={darkMode} />
        }}
      </Await>
    </Suspense>
  );
};

export default RepairRequests;
