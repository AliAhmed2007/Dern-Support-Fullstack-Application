import React, { Suspense } from 'react';
import { Spin, Divider } from 'antd';
import { useLoaderData, Await } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import PieChartComponent from '../../components/charts/PieChartComponent';
import UsersTable from '../../components/tables/UsersTable';
import StatsCard from '../../components/userDashboard/StatsCard';
import LineChartComponent from '../../components/charts/LineChartComponent';
import AreaChartComponent from '../../components/charts/AreaChartComponent';

const Users = () => {
  const { darkMode } = useTheme();
  const loaderData = useLoaderData();

  // This function receives the resolved users (as returned from your loader)
  const renderContent = (users) => {
    // Get the real users from the loader data.
    const realUsers = users.data;

    // Compute distribution for user types from real data.
    const userTypesCount = realUsers.reduce((acc, user) => {
      // Assuming your user type field is "userType"
      acc[user.user_type] = (acc[user.user_type] || 0) + 1;
      return acc;
    }, {});

    const userTypeData = [
      { name: 'Individual', value: userTypesCount.individual || 0 },
      { name: 'Business', value: userTypesCount.business || 0 },
      { name: 'Technician', value: userTypesCount.technician || 0 },
      { name: 'Admin', value: userTypesCount.admin || 0 },
    ];

    // Prepare statistics using realUsers data.
    const userStats = [
      {
        title: 'Total Users',
        value: realUsers.length,
        backgroundColor: darkMode ? 'var(--dark-surface-secondary)' : 'var(--light-surface-secondary)',
        textColor: darkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
      },
      {
        title: 'New This Month',
        value: realUsers.filter(
          (user) => new Date(user.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ).length,
        backgroundColor: darkMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(74, 222, 128, 0.1)',
        textColor: '#4ADE80',
      },
      {
        title: 'Business Accounts',
        value: realUsers.filter((user) => user.user_type === 'business').length,
        backgroundColor: darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.1)',
        textColor: '#A855F7',
      },
      {
        title: 'Technicians',
        value: realUsers.filter((user) => user.user_type === 'technician').length,
        backgroundColor: darkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(96, 165, 250, 0.1)',
        textColor: '#60A5FA',
      },
    ];

    // Update columns to match real data keys.
    const columns = [
      {
        title: 'Name',
        dataIndex: 'first_name',
        key: 'name',
        render: (text, record) => `${record.first_name} ${record.last_name}`,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Type',
        dataIndex: 'userType',
        key: 'userType',
        filters: [
          { text: 'Individual', value: 'individual' },
          { text: 'Business', value: 'business' },
          { text: 'Technician', value: 'technician' },
          { text: 'Admin', value: 'admin' },
        ],
        onFilter: (value, record) => record.user_type === value,
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'Joined',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      },
    ];

    // Compute trend for new users per month.
    const monthlyNewUsers = realUsers.reduce((acc, user) => {
      const date = new Date(user.created_at);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {});

    const areaChartData = Object.keys(monthlyNewUsers).map((monthYear) => ({
      month: monthYear, 
      newUsers: monthlyNewUsers[monthYear],
    }));


    // For the line chart, we're still using mock data.
    const monthlyUserVisits = [
      { month: 'January', visits: 1200, users: 200 },
      { month: 'February', visits: 1500, users: 500 },
      { month: 'March', visits: 1700, users: 1500 },
      { month: 'April', visits: 1600, users: 600 },
      { month: 'May', visits: 1800, users: 800 },
      { month: 'June', visits: 2000, users: 1000 },
      { month: 'July', visits: 2200, users: 500 },
      { month: 'August', visits: 2100, users: 100 },
      { month: 'September', visits: 1900, users: 900 },
      { month: 'October', visits: 2300, users: 300 },
      { month: 'November', visits: 2400, users: 400 },
      { month: 'December', visits: 2500, users: 200 },
    ];
    const lines = [
      { key: 'visits', name: 'User Visits' },
      { key: 'users', name: 'Number of Users' },
    ];

    return (
      <div className="space-y-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
          Users Management
        </h1>
        <StatsCard stats={userStats} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <PieChartComponent
            data={userTypeData}
            dataKey="value"
            nameKey="name"
            containerProps={{
              title: 'User Type Distribution',
              description: 'Distribution of users by account type',
            }}
            darkMode={darkMode}
          />

          <LineChartComponent
            data={monthlyUserVisits}
            xKey="month"
            lines={lines}
            darkMode={darkMode}
            containerProps={{
              title: 'Monthly User Visits',
              description: 'Number of user visits per month',
            }}
          />
        </div>

        {/* Additional chart: New Users per Month */}
        <div className="mb-6">
          <AreaChartComponent
            data={areaChartData}
            xKey="month"
            areas={[{ key: 'newUsers', name: 'New Users' }]}
            darkMode={darkMode}
            containerProps={{
              title: 'New Users Trend',
              description: 'New users created per month',
            }}
          />
        </div>

        <UsersTable users={realUsers} columns={columns} />
      </div>
    );
  };

  return (
    <Suspense
      fallback={
        <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <Spin size="large" />
        </div>
      }
    >
      <Await resolve={loaderData.users} errorElement={<div>Could not load users</div>}>
        {(resolvedUsers) => renderContent(resolvedUsers)}
      </Await>
    </Suspense>
  );
};

export default Users;
