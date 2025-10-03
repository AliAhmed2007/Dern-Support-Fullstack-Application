import React from "react";
import { Layout, Menu, Card, Statistic, theme } from "antd";
import { motion } from "framer-motion";
import { UserOutlined, FileDoneOutlined, SettingOutlined, BarChartOutlined } from "@ant-design/icons";
import LineChartComponent from "../../components/charts/LineChartComponent";
import PieChartComponent from "../../components/charts/PieChartComponent";
import useUserProfile from "../../hooks/useUserProfile";
import AreaChartComponent from "../../components/charts/AreaChartComponent";
import ColumnChartComponent from "../../components/charts/ColumnChartComponent";
import BarChartComponent from "../../components/charts/BarChartComponent";

const { Header, Content, Sider } = Layout;
const { useToken } = theme;

const stats = [
  { title: "Total Users", value: 1500, icon: <UserOutlined />, color: "#1890ff" },
  { title: "Active Tickets", value: 125, icon: <FileDoneOutlined />, color: "#fa541c" },
  { title: "Technicians", value: 35, icon: <SettingOutlined />, color: "#52c41a" },
  { title: "Subscriptions", value: 320, icon: <BarChartOutlined />, color: "#722ed1" }
];

const ticketData = [
  { date: 'Jan', totalTickets: 100, failedTickets: 78 },
  { date: 'Feb', totalTickets: 120, failedTickets: 95 },
  { date: 'March', totalTickets: 125, failedTickets: 50 },
  { date: 'Apr', totalTickets: 120, failedTickets: 32 },
  { date: 'May', totalTickets: 123, failedTickets: 68 },
  { date: 'Jun', totalTickets: 128, failedTickets: 130 },
];

const subscriptionData = [
  { name: "Basic", value: 40 },
  { name: "Premium", value: 35 },
  { name: "Business", value: 25 }
];

const sampleData = [
  { month: 'Jan', revenue: 400, profit: 240 },
  { month: 'Feb', revenue: 300, profit: 139 },
  { month: 'Mar', revenue: 200, profit: 980 },
  { month: 'Apr', revenue: 278, profit: 390 },
  { month: 'May', revenue: 189, profit: 480 },
];

const areasDefinition = [
  { key: 'revenue', name: 'Revenue' },
  { key: 'profit', name: 'Profit' },
];

const sampleColumnData = [
  { quarter: 'Q1', sales: 400, profit: 240, lost: 250 },
  { quarter: 'Q2', sales: 300, profit: 139, lost: 250 },
  { quarter: 'Q3', sales: 200, profit: 980, lost: 250 },
  { quarter: 'Q4', sales: 278, profit: 390, lost: 250 },
  { quarter: 'Q5', sales: 278, profit: 390, lost: 250 },
  { quarter: 'Q6', sales: 278, profit: 390, lost: 250 },
  { quarter: 'Q7', sales: 278, profit: 390, lost: 250 },
  { quarter: 'Q8', sales: 278, profit: 390, lost: 250 },
  { quarter: 'Q9', sales: 278, profit: 390, lost: 250 },
  { quarter: 'Q10', sales: 278, profit: 390, lost: 250 },
];

const columnsDefinition = [
  { key: 'sales', name: 'Sales' },
  { key: 'profit', name: 'Profit' },
  { key: 'lost', name: 'Lost' },
];

const sampleBarData = [
  { region: 'North', sales: 400, profit: 240 },
  { region: 'South', sales: 300, profit: 139 },
  { region: 'East', sales: 200, profit: 980 },
  { region: 'West', sales: 278, profit: 390 },
];

const barsDefinition = [
  { key: 'sales', name: 'Sales' },
  { key: 'profit', name: 'Profit' },
];


const AdminDashboard = () => {
  const { token } = useToken();

  const { userProfile } = useUserProfile()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Main Content */}
      <Layout>
        <Header className="flex justify-between items-center px-6 bg-[var(--color-light-surface-primary)] dark:bg-[var(--color-dark-surface-primary)] shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-light-primary)] dark:text-[var(--color-dark-primary)]">
            Admin Dashboard
          </h2>
          <div className="text-[var(--color-light-secondary)] dark:text-[var(--color-dark-secondary)]">
            Welcome, Admin
          </div>
        </Header>

        <Content className="p-4 md:p-6">
          <h1>{userProfile.userData.phoneNumber}</h1>
          {/* Modern Stats Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  variant="filled"
                  className="shadow-sm hover:shadow-md transition-shadow duration-200 border-0 bg-[var(--color-light-surface-secondary)] dark:bg-[var(--color-dark-surface-secondary)]"
                  styles={{
                    body: { padding: '16px' }
                  }}
                >
                  <Statistic
                    title={<span className="text-[var(--color-light-secondary)] dark:text-[var(--color-dark-secondary)]">{stat.title}</span>}
                    value={stat.value}
                    prefix={stat.icon}
                    valueStyle={{ color: stat.color }}
                    className="[&_.ant-statistic-content]:text-lg"
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Responsive Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mt-6">
            <LineChartComponent
              data={ticketData}
              xKey="date"
              lines={[
                { key: 'totalTickets', name: 'Total Tickets' },
                { key: 'failedTickets', name: 'Failed Tickets' }
              ]}
              containerProps={{
                title: "Subscription Plans",
                className: "h-[300px] md:h-[400px]",
                styles: {
                  header: {
                    borderBottom: `1px solid ${token.colorBorder}`,
                    padding: '12px 16px'
                  },
                  body: { padding: '12px' }
                }
              }}
              chartProps={{ width: 800, height: 400 }}
            />

            <PieChartComponent
              data={subscriptionData}
              dataKey="value"
              nameKey="name"
              containerProps={{
                title: "Subscription Plans",
                className: "h-[300px] md:h-[400px]",
                styles: {
                  header: {
                    borderBottom: `1px solid ${token.colorBorder}`,
                    padding: '12px 16px'
                  },
                  body: { padding: '12px' }
                }
              }}
              chartProps={{
                outerRadius: "70%",
                margin: { top: 16, right: 0, left: 0, bottom: 8 }
              }}
            />
            <AreaChartComponent
              data={sampleData}
              xKey="month"
              areas={areasDefinition}
              darkMode={false} // Toggle to true for dark mode colors
              containerProps={{
                title: "Subscription Plans",
                className: "h-[300px] md:h-[400px]",
                styles: {
                  header: {
                    borderBottom: `1px solid ${token.colorBorder}`,
                    padding: '12px 16px'
                  },
                  body: { padding: '12px' }
                }
              }} chartProps={{
                outerRadius: "70%",
                margin: { top: 16, right: 0, left: 0, bottom: 0 }
              }}
            />

            <ColumnChartComponent
              data={sampleColumnData}
              xKey="quarter"
              columns={columnsDefinition}
              darkMode={false} // set to true for dark mode colors
              containerProps={{
                title: "Subscription Plans",
                className: "h-[300px] md:h-[400px]",
                styles: {
                  header: {
                    borderBottom: `1px solid ${token.colorBorder}`,
                    padding: '12px 16px'
                  },
                  body: { padding: '12px' }
                }
              }} chartProps={{
                outerRadius: "70%",
                margin: { top: 16, right: 0, left: 0, bottom: 0 }
              }}
            />

            <BarChartComponent
              data={sampleBarData}
              yKey="region"
              bars={barsDefinition}
              darkMode={true} // toggle this to see dark/light mode palettes
              containerProps={{
                title: "Subscription Plans",
                className: "h-[300px] md:h-[400px]",
                styles: {
                  header: {
                    borderBottom: `1px solid ${token.colorBorder}`,
                    padding: '12px 16px'
                  },
                  body: { padding: '12px' }
                }
              }} chartProps={{
                outerRadius: "70%",
                margin: { top: 16, right: 0, left: 0, bottom: 0 }
              }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;