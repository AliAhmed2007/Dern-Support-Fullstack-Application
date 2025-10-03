import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';
import useUserProfile from '../../hooks/useUserProfile';

const { Sider, Content } = Layout;

const LeftSideCanvas = ({ outlet }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { darkMode } = useTheme();
  const userType = localStorage.getItem('userType')
  const isAdmin = userType === 'admin'

  const { userProfile } = useUserProfile()
  const userId = userProfile.userData.id

  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: '📦' },
    { name: isAdmin ? 'User Accounts' : 'User Account', to: isAdmin ? 'user-accounts' : `user-accounts/${userId}`, icon: '👤' },
    { name: 'Technicians', to: 'technicians', icon: '👩‍🔬' },
    { name: 'Repair Requests', to: 'repair-requests', icon: '🔧' },
    { name: 'Plan Subscriptions', to: 'plan-subscriptions', icon: '📦' },
    { name: 'Tickets', to: 'tickets', icon: '🎫' },
    { name: 'Bills', to: 'bills', icon: '💳' },
  ];

  return (
    <Layout hasSider className="flex flex-1">
      {/* Fixed Sidebar Container */}
      <motion.div
        initial={{ width: 256 }}
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-16 h-[calc(100vh-64px)] z-10"
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme={darkMode ? "dark" : "light"}
          width={256}
          collapsedWidth={80}
          breakpoint="lg"
          className="h-full pt-10"
          style={{
            backgroundColor: darkMode
              ? 'var(--dark-surface-primary)'
              : 'var(--light-surface-primary)',
            borderRight: `1px solid ${darkMode
              ? 'var(--dark-border-default)'
              : 'var(--light-border-default)'}`
          }}
          trigger={
            <div className={`pb-5 text-2xl ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
              {collapsed ? '➤' : '✕'}
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full flex flex-col"
          >
            <Menu
              mode="inline"
              className="flex-1 overflow-y-auto text-lg pt-5"
              defaultSelectedKeys={['1']}
              style={{
                borderRight: 0,
                backgroundColor: 'transparent',
                color: darkMode
                  ? 'var(--dark-text-primary)'
                  : 'var(--light-text-primary)'
              }}
              theme={darkMode ? "dark" : "light"}
            >
              {navigation.map((item, index) => (
                <Menu.Item
                  key={index + 1}
                  icon={
                    <span style={{
                      fontSize: '1.5rem',
                      color: darkMode
                        ? 'var(--dark-text-primary)'
                        : 'var(--light-text-primary)'
                    }}>
                      {item.icon}
                    </span>
                  }
                  // Add this title prop
                  title={!collapsed ? null : item.name}
                  style={{
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '4px 0',
                    borderRadius: '8px',
                    backgroundColor: darkMode
                      ? 'var(--dark-surface-primary)'
                      : 'var(--light-surface-primary)'
                  }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `transition-colors duration-200 ${darkMode
                        ? `hover:text-dark-primary ${isActive ? '!text-dark-primary' : ''}`
                        : `hover:text-light-primary ${isActive ? '!text-light-primary' : ''}`
                      } ${isActive ? 'font-semibold' : ''}`
                    }
                    end
                    style={{
                      fontSize: '1rem',
                      color: 'inherit'
                    }}
                  >
                    {!collapsed && item.name}
                  </NavLink>
                </Menu.Item>
              ))}
            </Menu>
          </motion.div>
        </Sider>
      </motion.div>

      {/* Main Content Area */}
      <Content
        style={{
          marginLeft: collapsed ? 80 : 256,
        }}
        className="transition-all duration-300"
      >
        <div className={`p-6 h-full overflow-auto scroll-style ${darkMode
          ? 'bg-dark-background text-dark-primary'
          : 'bg-light-background text-light-primary'
          }`}>
          {outlet}
        </div>
      </Content>
    </Layout>
  );
};

export default LeftSideCanvas;