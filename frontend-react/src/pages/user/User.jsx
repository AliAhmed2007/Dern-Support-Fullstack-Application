import React, { useState } from 'react';
import { Suspense } from 'react';
import { useLoaderData, Await, Link, useParams } from 'react-router-dom';
import { Spin, Tag, Card, Divider, Timeline, Avatar, Modal, Form, Input, Select, Button } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import useTheme from '../../hooks/useTheme';
import { LeftOutlined, EditOutlined } from '@ant-design/icons';
import UserEditModal from '../../components/userDashboard/UserEditModal';
import useUserProfile from '../../hooks/useUserProfile';

// ----- UserDetail Component -----
const UserDetail = () => {
    const { darkMode } = useTheme();
    const loaderData = useLoaderData();
    const { id } = useParams()
    const { userData } = useUserProfile().userProfile
    const userId = userData.id
    const isAuthorized = userId === Number(id)
    // State to control visibility of the edit modal
    const [openEditModal, setOpenEditModal] = useState(false);

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    // Custom Card Title component for consistency
    const CustomCardTitle = ({ children }) => (
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {children}
        </h3>
    );
    // Renders the main content of the user details page
    const renderContent = (userResponse) => {
        const { data: user } = userResponse;
        const createdAt = format(parseISO(user.created_at), 'PPpp');
        const updatedAt = format(parseISO(user.updated_at), 'PPpp');

        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className={`p-4 min-h-screen`}
            >
                <div className="max-w-6xl mx-auto">
                    {userData.userType === 'admin' && (
                        <Link to="../user-accounts" className="mb-6 block">
                            <span
                                className={`flex items-center gap-2 transition duration-300 hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                            >
                                <LeftOutlined />
                                Back to Users
                            </span>
                        </Link>
                    )}


                    <motion.div variants={itemVariants}>
                        <Card bordered={false} className={`${darkMode ? '!bg-gray-800' : ''} shadow-lg`}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    {console.log(user.avatar)}
                                    <Avatar
                                        size={100}
                                        src={user.avatar ? `http://localhost:8000/storage/${user.avatar}` : 'http://localhost:8000/storage/avatars/pseudo-avatar.webp'}
                                    />
                                    <h1
                                        className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
                                    >
                                        {user.first_name} {user.last_name}
                                    </h1>
                                </div>
                                <div>
                                    { // Edit Profile Button
                                        isAuthorized &&
                                        <div className="flex justify-end mb-4">
                                            <Button
                                                type="text"
                                                onClick={() => setOpenEditModal(true)}
                                                icon={<EditOutlined style={{ fontSize: '24px', color: darkMode ? 'white' : 'black' }} />}
                                                className={`${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'}`}
                                            />
                                        </div>
                                    }
                                    <Tag
                                        color={
                                            user.user_type === 'admin'
                                                ? 'volcano'
                                                : user.user_type === 'technician'
                                                    ? 'blue'
                                                    : 'green'
                                        }
                                    >
                                        {user.user_type.toUpperCase()}
                                    </Tag>
                                </div>
                            </div>

                            <Divider className={`${darkMode ? '!border-gray-600' : ''}`} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <motion.div variants={itemVariants}>
                                    <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                                        <CustomCardTitle>Personal Information</CustomCardTitle>
                                        <div className="space-y-4">
                                            <DetailItem label="Email" value={user.email} darkMode={darkMode} />
                                            <DetailItem label="Phone Number" value={user.phone_number} darkMode={darkMode} />
                                            <DetailItem label="Address" value={user.address_line} darkMode={darkMode} />
                                        </div>
                                    </Card>
                                </motion.div>

                                {/* Location Information */}
                                <motion.div variants={itemVariants}>
                                    <Card className={`${darkMode ? '!bg-gray-700 !border-gray-600' : ''}`}>
                                        <CustomCardTitle>Location Information</CustomCardTitle>
                                        <div className="space-y-4">
                                            <DetailItem label="City" value={user.city} darkMode={darkMode} />
                                            <DetailItem label="State" value={user.state} darkMode={darkMode} />
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
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Render the Edit Modal */}
                <AnimatePresence>
                    {openEditModal && isAuthorized && (
                        <UserEditModal
                            user={user}
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
                <div
                    className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
                >
                    <Spin size="large" />
                </div>
            }
        >
            <Await resolve={loaderData.user} errorElement={<div>Could not load user data</div>}>
                {(resolvedUser) => renderContent(resolvedUser)}
            </Await>
        </Suspense>
    );
};

// ----- DetailItem Component -----
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
;

export default UserDetail;
