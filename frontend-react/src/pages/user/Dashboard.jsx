import React from 'react';
import { format } from 'date-fns';
import PieChartComponent from '../../components/charts/PieChartComponent';
import LineChartComponent from '../../components/charts/LineChartComponent';
import ColumnChartComponent from '../../components/charts/ColumnChartComponent';
import useTheme from '../../hooks/useTheme';
import StatsCard from '../../components/userDashboard/StatsCard';

const Dashboard = () => {
  const { darkMode } = useTheme();

  const stats = [
    {
      title: 'Total Users',
      value: 1500,
      backgroundColor: '#FFFAE6', // A soft, warm hue
      textColor: '#663C00',       // Deep brown for readability
    },
    {
      title: 'Repair Requests',
      value: 320,
      backgroundColor: '#E6F7FF', // Light blue for clarity
      textColor: '#005580',       // Navy blue for a professional look
    },
    {
      title: 'Technicians',
      value: 25,
      backgroundColor: '#F0F5FF', // Gentle purple tint
      textColor: '#1D39C4',       // Dark blue for contrast
    },
    {
      title: 'Bills Issued',
      value: 275,
      backgroundColor: '#FFF0F6', // Soft pink to denote care
      textColor: '#AD1457',       // A rich burgundy for strength
    },
  ];


  // Mock data for repair requests over time
  const repairRequestsData = Array.from({ length: 7 }, (_, i) => ({
    date: format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'MMM dd'),
    pending: Math.floor(Math.random() * 20),
    inProgress: Math.floor(Math.random() * 15),
    completed: Math.floor(Math.random() * 25),
  })).reverse();

  // Mock data for repair request types
  const repairTypeData = [
    { name: 'Hardware', value: 45 },
    { name: 'Software', value: 35 },
    { name: 'Both', value: 20 },
  ];

  // Mock data for technician workload
  const technicianData = [
    { name: 'John Doe', pending: 5, inProgress: 3, completed: 8 },
    { name: 'Jane Smith', pending: 4, inProgress: 2, completed: 6 },
    { name: 'Mike Johnson', pending: 6, inProgress: 4, completed: 7 },
    { name: 'Sarah Wilson', pending: 3, inProgress: 5, completed: 9 },
  ];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
        Dashboard Overview
      </h1>
      <StatsCard stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChartComponent
          data={repairRequestsData}
          xKey="date"
          lines={[
            { key: 'pending', name: 'Pending' },
            { key: 'inProgress', name: 'In Progress' },
            { key: 'completed', name: 'Completed' }
          ]}
          containerProps={{
            title: "Repair Requests Trend",
            description: "Daily repair requests status"
          }}
          darkMode={darkMode}
        />

        <PieChartComponent
          data={repairTypeData}
          dataKey="value"
          nameKey="name"
          containerProps={{
            title: "Repair Request Types",
            description: "Distribution of repair request categories"
          }}
          darkMode={darkMode}
        />

      </div>
      <ColumnChartComponent
        data={technicianData}
        xKey="name"
        columns={[
          { key: 'pending', name: 'Pending' },
          { key: 'inProgress', name: 'In Progress' },
          { key: 'completed', name: 'Completed' }
        ]}
        containerProps={{
          title: "Technician Workload",
          description: "Current workload distribution per technician"
        }}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Dashboard;