import React, { Suspense } from 'react';
import { useLoaderData, Await, Link, useNavigate } from 'react-router-dom';
import {Spin, Tag, Card, Divider, Timeline, Rate} from 'antd';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import useTheme from '../../hooks/useTheme';
import { LeftOutlined } from '@ant-design/icons';
import TechnicianAvatar from '../../components/userDashboard/TechnicianAvatar';
import StatusIndicator from '../../components/userDashboard/StatusIndicator';
import PriorityBadge from '../../components/userDashboard/PriorityBadge';

const RepairRequestDetail = () => {
    const { darkMode } = useTheme();
    const loaderData = useLoaderData();
    const navigate = useNavigate();

    loaderData.repairRequest.then((data) => {
        if (data.errors) {
            navigate('/unauthorized-user')
        }
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    function handleClick(id) {
        navigate(`../technicians/${id}`);
    }

    const CustomCardTitle = ({ children }) => (
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {children}
        </h3>
    );

    const renderContent = (repairRequest) => {
        const createdAt = format(parseISO(repairRequest.created_at), 'PPpp');
        const updatedAt = format(parseISO(repairRequest.updated_at), 'PPpp');

        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="p-4 min-h-screen"
            >
                <div className="max-w-6xl mx-auto">
                    <Link to='../repair-requests' className="mb-6 block">
                        <span className={`transition duration-300 hover:underline flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <LeftOutlined />
                            Back to Requests
                        </span>
                    </Link>

                    <motion.div variants={itemVariants}>
                        <Card bordered={false} className={`${darkMode ? '!bg-gray-800' : ''} shadow-lg`}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <StatusIndicator status={repairRequest.status} darkMode={darkMode} />
                                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                        {repairRequest.device_brand} {repairRequest.device_name}
                                    </h1>
                                </div>
                                <PriorityBadge priority={repairRequest.priority} darkMode={darkMode} />
                            </div>

                            <Divider className={`${darkMode ? '!border-gray-600' : ''}`} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Problem Details */}
                                <motion.div variants={itemVariants}>
                                    <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                                        <CustomCardTitle>Problem Details</CustomCardTitle>
                                        <div className="space-y-4">
                                            <DetailItem
                                                label="Description"
                                                value={repairRequest.problem_description}
                                                darkMode={darkMode}
                                            />
                                            <DetailItem
                                                label="Category"
                                                value={repairRequest.problem}
                                                darkMode={darkMode}
                                            />
                                            <DetailItem
                                                label="Request Mode"
                                                value={
                                                    <Tag color={repairRequest.mode === 'online' ? 'blue' : 'purple'}>
                                                        {repairRequest.mode.toUpperCase()}
                                                    </Tag>
                                                }
                                                darkMode={darkMode}
                                            />
                                        </div>
                                    </Card>
                                </motion.div>

                                {/* Device Information */}
                                <motion.div variants={itemVariants}>
                                    <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                                        <CustomCardTitle>Device Information</CustomCardTitle>
                                        <div className="space-y-4">
                                            <DetailItem
                                                label="Brand"
                                                value={repairRequest.device_brand}
                                                darkMode={darkMode}
                                            />
                                            <DetailItem
                                                label="Model"
                                                value={repairRequest.device_name}
                                                darkMode={darkMode}
                                            />
                                            <DetailItem
                                                label="Courier Service"
                                                value={repairRequest.courier === 'enable' ? 'Enabled' : 'Disabled'}
                                                darkMode={darkMode}
                                            />
                                        </div>
                                    </Card>
                                </motion.div>

                                {/* Attachments Card */}
                                <motion.div variants={itemVariants} className="md:col-span-2">
                                    <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                                        <CustomCardTitle>Attachments</CustomCardTitle>
                                        <div className="flex flex-col gap-4">
                                            {repairRequest.attachments && repairRequest.attachments.length > 0 ? (
                                                repairRequest.attachments.map((attachment, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-center gap-4 p-4 border rounded-md hover:shadow-lg transition-shadow duration-200"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={`http://localhost:8000/storage/${attachment.path}`}
                                                                alt={attachment.original_name}
                                                                className="h-35 w-35 object-cover rounded"
                                                                preview={false}
                                                            />
                                                        </div>
                                                        <div className="flex-1 space-y-3">
                                                            <div className={`font-semibold text-lg ${darkMode ? 'dark:text-gray-200' : 'text-gray-800'}`}>
                                                                {attachment.original_name}
                                                            </div>
                                                            <div className={`text-sm ${darkMode ? 'dark:text-gray-200' : 'text-gray-800'}`}>
                                                                Size: {(attachment.size / 1024).toFixed(2)} KB
                                                            </div>
                                                            <div className={`text-sm ${darkMode ? 'dark:text-gray-200' : 'text-gray-800'}`}>
                                                                Uploaded at: {format(parseISO(attachment.uploaded_at), 'PPpp')}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            ) : (
                                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                                                    No attachments available.
                                                </p>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>


                                {/* Activity Timeline */}
                                <motion.div variants={itemVariants} className="md:col-span-2">
                                    <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                                        <CustomCardTitle>Request Timeline</CustomCardTitle>
                                        <Timeline
                                            mode="alternate"
                                            items={[
                                                {
                                                    children: (
                                                        <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                            <div>Request Created</div>
                                                            <div className="text-sm">{createdAt}</div>
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

                                {/* Assigned Technicians */}
                                {repairRequest.technicians?.length > 0 && (
                                    <motion.div variants={itemVariants} className="md:col-span-2">
                                        <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                                            <CustomCardTitle>Assigned Technicians</CustomCardTitle>
                                            <div className="flex flex-wrap gap-4">
                                                {repairRequest.technicians.map((technician) => (
                                                    <motion.div
                                                        key={technician.id}
                                                        whileHover={{ scale: 1.02 }}
                                                        onClick={() => handleClick(technician.id)}
                                                        className={`cursor-pointer p-4 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <TechnicianAvatar technician={technician} size={64} />
                                                            <div>
                                                                <h3 className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                                                    {technician.name}
                                                                </h3>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <Tag
                                                                        color={technician.specialization === 'software' ? 'blue' : 'green'}
                                                                        className={`${darkMode ? '!border-0' : ''}`}
                                                                    >
                                                                        {technician.specialization}
                                                                    </Tag>
                                                                    <Rate
                                                                        disabled
                                                                        defaultValue={technician.rating}
                                                                        className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </Card>
                                    </motion.div>
                                )}

                                {/* User Information */}
                                {repairRequest.user && (
                                    <motion.div variants={itemVariants} className="md:col-span-2">
                                        <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                                            <CustomCardTitle>
                                                User Information
                                                <Link to={`../user-accounts/${repairRequest.user.id}`} className="ml-2 text-blue-500 hover:underline">
                                                    Show User
                                                </Link>
                                            </CustomCardTitle>
                                            <div className="space-y-4">
                                                <DetailItem
                                                    label="Name"
                                                    value={`${repairRequest.user.first_name} ${repairRequest.user.last_name}`}
                                                    darkMode={darkMode}
                                                />
                                                <DetailItem
                                                    label="Email"
                                                    value={repairRequest.user.email}
                                                    darkMode={darkMode}
                                                />
                                                <DetailItem
                                                    label="Phone"
                                                    value={repairRequest.user.phone_number}
                                                    darkMode={darkMode}
                                                />
                                                <DetailItem
                                                    label="City"
                                                    value={repairRequest.user.city}
                                                    darkMode={darkMode}
                                                />
                                                <DetailItem
                                                    label="State"
                                                    value={repairRequest.user.state}
                                                    darkMode={darkMode}
                                                />
                                            </div>
                                        </Card>
                                    </motion.div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                </div>
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
            <Await resolve={loaderData.repairRequest} errorElement={<div>Could not load request</div>}>
                {renderContent}
            </Await>
        </Suspense>
    );
};

const DetailItem = ({ label, value, darkMode }) => (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
        <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {`${label}:`}
        </span>
        <span className={`flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            {value}
        </span>
    </div>
);

export default RepairRequestDetail;
