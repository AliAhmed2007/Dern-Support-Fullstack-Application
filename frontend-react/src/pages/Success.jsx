import React from 'react';
import { Button, Card } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const Success = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-green-100 to-blue-100'
      }`}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card
          variant="borderless"
          className={`rounded-xl shadow-2xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
          styles={{
            body: {
              padding: '2rem',
              backgroundColor: darkMode ? '#2d3748' : undefined,
            },
          }}
        >
          <div className="flex flex-col items-center">
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '4rem' }} />
            <h1 className={`mt-4 text-3xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Repair Request Submitted!
            </h1>
            <p className={`mt-2 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your repair request has been successfully submitted. We are processing your request and will get back to you soon.
            </p>
            <div className="flex gap-5 mt-6">
              <Button type="primary" size="large" onClick={() => navigate('/')}>
                Return Home
              </Button>
              <Button type="default" size="large" onClick={() => navigate('/dashboard/repair-requests')}>
                Track Repair Request
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Success;
