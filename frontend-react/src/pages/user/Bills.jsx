import PieChartComponent from '../../components/charts/PieChartComponent';
import AreaChartComponent from '../../components/charts/AreaChartComponent';
import BillsTable from '../../components/tables/BillsTable';
import StatsCard from '../../components/userDashboard/StatsCard';
import useTheme from '../../hooks/useTheme';

const Bills = () => {
  const { darkMode } = useTheme();

  // Mock data for revenue trend
  const revenueData = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }),
    revenue: Math.floor(Math.random() * 5000) + 3000,
    hardware: Math.floor(Math.random() * 2000) + 1000,
    service: Math.floor(Math.random() * 3000) + 2000,
  })).reverse();

  // Mock data for payment methods
  const paymentData = [
    { name: 'Credit Card', value: 45 },
    { name: 'Cash', value: 25 },
    { name: 'Bank Transfer', value: 20 },
    { name: 'PayPal', value: 10 },
  ];

  // Mock data for bills table
  const bills = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    billNumber: `BILL-${2024}${String(i + 1).padStart(4, '0')}`,
    customerName: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'][Math.floor(Math.random() * 4)],
    amount: Math.floor(Math.random() * 1000) + 500,
    status: ['pending', 'paid', 'cancelled', 'refunded'][Math.floor(Math.random() * 4)],
    paymentMethod: ['credit_card', 'cash', 'bank_transfer', 'paypal'][Math.floor(Math.random() * 4)],
    issuedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));

  // Compute stats from bills data
  const totalBills = bills.length;
  const pendingBills = bills.filter(b => b.status === 'pending').length;
  const paidBills = bills.filter(b => b.status === 'paid').length;
  const refundedBills = bills.filter(b => b.status === 'refunded').length;

  // Define stats array with individual colors. Fallback colors change based on darkMode.
  const stats = [
    {
      title: 'Total Bills',
      value: totalBills,
      backgroundColor: '#FFF0F6', // Soft pinkish background
      textColor: '#AD1457',       // Rich burgundy text
    },
    {
      title: 'Pending Bills',
      value: pendingBills,
      backgroundColor: '#FFFAE6', // Warm off-white background
      textColor: '#663C00',       // Deep brown text
    },
    {
      title: 'Paid Bills',
      value: paidBills,
      backgroundColor: '#E6F7FF', // Gentle blue background
      textColor: '#005580',       // Navy blue text
    },
    {
      title: 'Refunded Bills',
      value: refundedBills,
      backgroundColor: '#F6FFED', // Soft green tint background
      textColor: '#237804',       // Dark green text
    },
  ];

  const columns = [
    {
      title: 'Bill Number',
      dataIndex: 'billNumber',
      key: 'billNumber',
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Issued Date',
      dataIndex: 'issuedAt',
      key: 'issuedAt',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
        Bills Management
      </h1>

      {/* Stats Cards */}
      <StatsCard stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AreaChartComponent
          data={revenueData}
          xKey="date"
          areas={[
            { key: 'revenue', name: 'Total Revenue' },
            { key: 'hardware', name: 'Hardware Revenue' },
            { key: 'service', name: 'Service Revenue' }
          ]}
          containerProps={{
            title: "Revenue Trend",
            description: "Daily revenue breakdown"
          }}
          darkMode={darkMode}
        />

        <PieChartComponent
          data={paymentData}
          dataKey="value"
          nameKey="name"
          containerProps={{
            title: "Payment Methods",
            description: "Distribution of payment methods used"
          }}
          darkMode={darkMode}
        />
      </div>

      <div className={`bg-${darkMode ? 'dark' : 'light'}-surface-primary rounded-lg shadow-lg p-6`}>
        <BillsTable columns={columns} bills={bills} />
      </div>
    </div>
  );
};

export default Bills;
