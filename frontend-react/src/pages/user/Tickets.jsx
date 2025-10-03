import React from 'react';
import { Table, Tag } from 'antd';
import useTheme from '../../hooks/useTheme';
import LineChartComponent from '../../components/charts/LineChartComponent';
import PieChartComponent from '../../components/charts/PieChartComponent';
import TicketsTable from '../../components/tables/TicketsTable';
import StatsCard from '../../components/userDashboard/StatsCard';

const Tickets = () => {
  const { darkMode } = useTheme();

  // Mock data for ticket trend
  const ticketTrendData = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    opened: Math.floor(Math.random() * 15) + 5,
    resolved: Math.floor(Math.random() * 12) + 3,
  })).reverse();

  // Mock data for ticket types
  const ticketTypeData = [
    { name: 'Repair Request', value: 40 },
    { name: 'General Inquiry', value: 35 },
    { name: 'Problem Reporting', value: 25 },
  ];

  // Mock data for tickets table
  const tickets = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    description: [
      'Device not working properly',
      'Need information about services',
      'Software issue report',
      'Hardware malfunction'
    ][Math.floor(Math.random() * 4)],
    type: ['repair request', 'general inquiry', 'problem reporting'][Math.floor(Math.random() * 3)],
    status: ['in progress', 'cancelled', 'resolved'][Math.floor(Math.random() * 3)],
    submittedBy: ['John Doe', 'Jane Smith', 'Mike Johnson'][Math.floor(Math.random() * 3)],
    assignedTo: ['Tech Support 1', 'Tech Support 2', 'Admin'][Math.floor(Math.random() * 3)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));

  const ticketStats = [
    {
      title: 'Total Tickets',
      value: tickets.length,
      backgroundColor: darkMode ? 'var(--dark-surface-secondary)' : 'var(--light-surface-secondary)',
      textColor: darkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)'
    },
    {
      title: 'In Progress',
      value: tickets.filter(t => t.status === 'in progress').length,
      backgroundColor: darkMode ? 'rgba(250, 204, 21, 0.2)' : 'rgba(250, 204, 21, 0.1)',
      textColor: '#FACC15'
    },
    {
      title: 'Resolved Today',
      value: Math.floor(Math.random() * 10) + 2, // Mock value
      backgroundColor: darkMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(74, 222, 128, 0.1)',
      textColor: '#4ADE80'
    },
    {
      title: 'Avg. Resolution Time',
      value: `${Math.floor(Math.random() * 24) + 1}h`, // Mock value
      backgroundColor: darkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(96, 165, 250, 0.1)',
      textColor: '#60A5FA'
    }
  ];

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Submitted By',
      dataIndex: 'submittedBy',
      key: 'submittedBy',
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
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
        Support Tickets
      </h1>
      <StatsCard stats={ticketStats}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <LineChartComponent
          data={ticketTrendData}
          xKey="date"
          lines={[
            { key: 'opened', name: 'Opened Tickets' },
            { key: 'resolved', name: 'Resolved Tickets' }
          ]}
          containerProps={{
            title: "Ticket Trend",
            description: "Daily ticket activity"
          }}
          darkMode={darkMode}
        />

        <PieChartComponent
          data={ticketTypeData}
          dataKey="value"
          nameKey="name"
          containerProps={{
            title: "Ticket Types",
            description: "Distribution of ticket categories"
          }}
          darkMode={darkMode}
        />
      </div>

      <div className={`bg-${darkMode ? 'dark' : 'light'}-surface-primary rounded-lg shadow-lg p-6`}>
        <TicketsTable tickets={tickets} columns={columns} />
      </div>
    </div>
  );
};

export default Tickets;