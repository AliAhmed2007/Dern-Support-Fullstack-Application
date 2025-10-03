import React, { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { useLoaderData, Await, Link, useParams, useNavigate } from 'react-router-dom';
import { Spin, Tag, Card, Divider, Timeline, Avatar, Modal, Button, Alert, Form, Input } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { LeftOutlined, EditOutlined } from '@ant-design/icons';
import useTheme from '../../hooks/useTheme';
import useUserProfile from '../../hooks/useUserProfile';
import TechnicianEditModal from '../../components/userDashboard/TechnicianEditModal';


const DetailItem = ({ label, value, darkMode }) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2">
    <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      {`${label}: `}
    </span>
    <span className={`flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
      {value}
    </span>
  </div>
);

const TechnicianDetail = () => {
  const { darkMode } = useTheme();
  const loaderData = useLoaderData();
  const navigate = useNavigate()
  const { id } = useParams();
  const { userProfile } = useUserProfile();
  const loggedInUserId = userProfile?.userData?.id;
  const userType = userProfile?.userData?.userType
  const isAuthorized = loggedInUserId === Number(id) || userType === 'admin';
  const [openEditModal, setOpenEditModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const CustomCardTitle = ({ children }) => (
    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
      {children}
    </h3>
  );

  function navigateToRequest(requestId) {
    navigate(`../repair-requests/${requestId}`)
  }

  const renderContent = (techResponse) => {
    const { data: technician } = techResponse;
    const joinedAt = format(parseISO(technician.created_at), 'PPpp');
    const updatedAt = format(parseISO(technician.updated_at), 'PPpp');
    
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 min-h-screen"
      >
        <div className="max-w-6xl mx-auto">
          {userType === 'admin' && (
            <Link to="../technicians" className="mb-6 block">
              <span className={`flex items-center gap-2 transition duration-300 hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <LeftOutlined />
                Back to Technicians
              </span>
            </Link>
          )}

          <motion.div variants={itemVariants}>
            <Card bordered={false} className={`${darkMode ? '!bg-gray-800' : ''} shadow-lg`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <Avatar
                    size={100}
                    src={technician.avatar ? technician.avatar : 'http://localhost:8000/storage/avatars/pseudo-avatar.webp'}
                  />
                  <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {technician.name}
                  </h1>
                </div>
                <div>
                  {isAuthorized && (
                    <div className="flex justify-end mb-4">
                      <Button
                        type="text"
                        onClick={() => setOpenEditModal(true)}
                        icon={<EditOutlined style={{ fontSize: '24px', color: darkMode ? 'white' : 'black' }} />}
                        className={`${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'}`}
                      />
                    </div>
                  )}
                  <Tag
                    color={
                      technician.status === 'available'
                        ? 'green'
                        : technician.status === 'booked'
                          ? 'orange'
                          : 'red'
                    }
                  >
                    {technician.status.toUpperCase()}
                  </Tag>
                </div>
              </div>

              <Divider className={`${darkMode ? '!border-gray-600' : ''}`} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal / Contact Information */}
                <motion.div variants={itemVariants}>
                  <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                    <CustomCardTitle>Contact Information</CustomCardTitle>
                    <div className="space-y-4">
                      <DetailItem label="Email" value={technician.email} darkMode={darkMode} />
                      <DetailItem label="Phone Number" value={technician.phone_number} darkMode={darkMode} />
                      <DetailItem label="City" value={technician.city} darkMode={darkMode} />
                    </div>
                  </Card>
                </motion.div>

                {/* Professional Information */}
                <motion.div variants={itemVariants}>
                  <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                    <CustomCardTitle>Professional Details</CustomCardTitle>
                    <div className="space-y-4">
                      <DetailItem label="Specialization" value={technician.specialization} darkMode={darkMode} />
                      <DetailItem label="Rating" value={technician.rating} darkMode={darkMode} />
                    </div>
                  </Card>
                </motion.div>

                {/* Activity Timeline */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                    <CustomCardTitle>Activity Timeline</CustomCardTitle>
                    <Timeline
                      mode="alternate"
                      items={[
                        {
                          children: (
                            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <div>Joined</div>
                              <div className="text-sm">{joinedAt}</div>
                            </div>
                          ),
                          color: darkMode ? '#10B981' : '#059669',
                        },
                        {
                          children: (
                            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <div>Last Updated</div>
                              <div className="text-sm">{updatedAt}</div>
                            </div>
                          ),
                          color: darkMode ? '#3B82F6' : '#2563EB',
                        },
                      ]}
                    />
                  </Card>
                </motion.div>

                {/* Repair Requests Section */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                    <CustomCardTitle>Repair Requests</CustomCardTitle>

                    {isAuthorized && technician.repair_requests && technician.repair_requests.length > 0 ? (
                      technician.repair_requests.map((req, index) => (
                        <motion.div
                          key={req.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }} 
                          onClick={() => navigateToRequest(req.id)}
                          className="p-4 border rounded-md mb-3 transition-all duration-300 cursor-pointer hover:shadow-xl"
                        >
                          <div className="flex justify-between items-center">
                            <div className={`text-sm ${ darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
                              <span className='text-lg font-semibold'>{req.device_name} </span> – {req.problem}
                            </div>
                            <Tag color={req.status.toLowerCase() === 'completed' ? 'green' : 'orange'}>
                              {req.status.toUpperCase()}
                            </Tag>
                          </div>
                          <div className="text-sm text-gray-500 mt-4">
                            {req.created_at ? format(parseISO(req.created_at), 'PPpp') : ''}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>
                        {isAuthorized ? 'No repair requests found.' : 'UnAuthorized to see user repair requests.'}
                      </p>
                    )}
                  </Card>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Render Edit Modal if open */}
        <AnimatePresence>
          {openEditModal && isAuthorized && (
            <TechnicianEditModal
              technician={technician}
              darkMode={darkMode}
              onClose={() => setOpenEditModal(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
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
      <Await resolve={loaderData.user} errorElement={<div>Could not load technician data</div>}>
        {(resolvedTech) => renderContent(resolvedTech)}
      </Await>
    </Suspense>
  );
};

export default TechnicianDetail;
