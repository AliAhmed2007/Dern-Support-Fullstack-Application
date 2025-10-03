import React from 'react';
import useTheme from '../../hooks/useTheme';
import ColumnChartComponent from '../../components/charts/ColumnChartComponent';
import PieChartComponent from '../../components/charts/PieChartComponent';
import PlanSubscriptionsTable from '../../components/tables/PlanSubscriptionsTable';
import StatsCard from '../../components/userDashboard/StatsCard';

const Plans = () => {
  const { darkMode } = useTheme();

  // Mock data for subscription types
  const subscriptionData = [
    { name: 'Monthly', value: 60 },
    { name: 'Annually', value: 40 },
  ];

  // Mock data for plan distribution
  const planDistributionData = [
    { plan: 'Basic', monthly: 30, annually: 20 },
    { plan: 'Standard', monthly: 40, annually: 35 },
    { plan: 'Premium', monthly: 25, annually: 30 },
    { plan: 'Enterprise', monthly: 15, annually: 25 },
  ];

  // Mock data for plans table
  const plans = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: ['Basic Plan', 'Standard Plan', 'Premium Plan', 'Enterprise Plan'][Math.floor(Math.random() * 4)],
    type: ['monthly', 'annually'][Math.floor(Math.random() * 2)],
    status: ['active', 'expired', 'cancelled'][Math.floor(Math.random() * 3)],
    subscriber: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'][Math.floor(Math.random() * 4)],
    startDate: new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    expiryDate: new Date(Date.now() + Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));

  const totalPlans = plans.length;
  const activePlans = plans.filter(p => p.status === 'active').length;
  const expiredPlans = plans.filter(p => p.status === 'expired').length;
  const cancelledPlans = plans.filter(p => p.status === 'cancelled').length;
  
  const stats = [
    { title: 'Total Plans', value: totalPlans, backgroundColor: '#FFF0F6', textColor: '#AD1457' },
    { title: 'Active Plans', value: activePlans, backgroundColor: '#FFFAE6', textColor: '#663C00' },
    { title: 'Expired Plans', value: expiredPlans, backgroundColor: '#E6F7FF', textColor: '#005580' },
    { title: 'Cancelled Plans', value: cancelledPlans, backgroundColor: '#F6FFED', textColor: '#237804' },
  ];

  const columns = [
    {
      title: 'Plan Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Subscriber',
      dataIndex: 'subscriber',
      key: 'subscriber',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
        Plans Management
      </h1>
      <StatsCard stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PieChartComponent
          data={subscriptionData}
          dataKey="value"
          nameKey="name"
          containerProps={{
            title: "Subscription Types",
            description: "Distribution of subscription types"
          }}
          darkMode={darkMode}
        />

        <ColumnChartComponent
          data={planDistributionData}
          xKey="plan"
          columns={[
            { key: 'monthly', name: 'Monthly Subscriptions' },
            { key: 'annually', name: 'Annual Subscriptions' }
          ]}
          containerProps={{
            title: "Plan Distribution",
            description: "Distribution of subscriptions across plans"
          }}
          darkMode={darkMode}
        />
      </div>

      <div className={`bg-${darkMode ? 'dark' : 'light'}-surface-primary rounded-lg shadow-lg p-6`}>
        <PlanSubscriptionsTable columns={columns} plans={plans} />
      </div>
    </div>
  );
};

export default Plans;