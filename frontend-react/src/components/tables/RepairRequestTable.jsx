import { ConfigProvider, Select, Space, Table, Tag, Tooltip } from 'antd';
import useTheme from '../../hooks/useTheme';
import getTableTheme from '../../utils/getTableTheme';
import { motion } from 'framer-motion';
import AssignTechnicianBtn from '../userDashboard/AssignTechnicianBtn';
import { useState } from 'react';
import TechniciansModal from '../userDashboard/TechniciansModal';
import TechnicianAvatar from '../userDashboard/TechnicianAvatar';
import { useNavigate, useRevalidator } from 'react-router-dom';
import changeStatus from '../../api/repairRequests/changeStatus';
import StatusSelect from '../userDashboard/StatusSelect';

const getStatusColor = (status) => {
    const colors = {
        pending: 'orange',
        diagnostics: 'blue',
        'in progress': 'purple',
        completed: 'green',
        cancelled: 'red',
    };
    return colors[status];
};

const getPriorityColor = (priority) => {
    const colors = {
        critical: 'red',
        high: 'orange',
        normal: 'blue',
        low: 'green',
    };
    return colors[priority];
};

const RepairRequestTable = ({ columns, repairRequests, requestsWithTechnicians }) => {
    const { darkMode } = useTheme();
    const userType = localStorage.getItem('userType');
    const [selectedRepairId, setSelectedRepairId] = useState(null);
    const navigate = useNavigate();
    const { revalidate } = useRevalidator(); // Hook to re-fetch loader data

    // Use navigate() for row clicks.
    function handleRowClick(record) {
        navigate(`./${record.id}`);
    }

    // Local status update handler that uses revalidate() after a successful status update.
    const handleStatusChange = async (repairRequestId, newStatus, event) => {
        event?.stopPropagation();
        const bearerToken = JSON.parse(localStorage.getItem('auth')).token;
        try {
            const response = await changeStatus(bearerToken, repairRequestId, newStatus);
            console.log('Status updated:', response);
            // Once updated, revalidate the route loader to fetch new data.
            revalidate();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <ConfigProvider theme={getTableTheme(darkMode)}>
                <Table
                    columns={columns.map((col) => ({
                        ...col,
                        render: (text, record) => {
                            if (col.key === 'status') {
                                return (
                                    <Tag
                                        color={getStatusColor(record.status)}
                                        className={darkMode ? 'dark-mode-tag' : ''}
                                    >
                                        {text.toUpperCase()}
                                    </Tag>
                                );
                            }
                            if (col.key === 'priority') {
                                return (
                                    <Tag
                                        color={getPriorityColor(record.priority)}
                                        className={darkMode ? 'dark-mode-tag' : ''}
                                    >
                                        {text.toUpperCase()}
                                    </Tag>
                                );
                            }
                            if (col.key === 'assignedTo') {
                                // If technicians are assigned, show avatars.
                                const rootRecordId = requestsWithTechnicians[0].id;
                                const technicians = userType === 'admin'
                                    ? requestsWithTechnicians[record.id - 1].technicians
                                    : requestsWithTechnicians[record.id - rootRecordId].technicians;
                                if (technicians && technicians.length > 0) {
                                    return (
                                        <div className='flex'>
                                            <Space size="small" className="flex">
                                                {technicians.map((technician) => (
                                                    <TechnicianAvatar key={technician.id} technician={technician} />
                                                ))}
                                            </Space>
                                            {technicians.length <= 3 && userType === 'admin' && record.status !== 'cancelled' && record.status !== 'completed'
                                                ? (
                                                    <button onClick={(e) => {
                                                        e.stopPropagation()
                                                        setSelectedRepairId(record.id)
                                                    }} className={`ml-3 transition duration-150 cursor-pointer rounded-full p-1 ${darkMode ? 'hover:bg-dark-background/50' : 'hover:bg-dark-background/20'}`}>➕</button>
                                                ) : null
                                            }
                                        </div>
                                    );
                                }

                                // Otherwise, show the Assign button for admins.
                                return (
                                    <AssignTechnicianBtn
                                        repairStatus={record.status}
                                        repairRequestId={record.id}
                                        isAdmin={userType === 'admin'}
                                        setSelectedRepairId={setSelectedRepairId}
                                    />
                                );
                            }

                            if (col.key === 'updateStatus') {
                                return record.status.toLowerCase() === 'cancelled' ? (
                                    <Tooltip title={<span className="text-red-400">Cannot Update Cancelled requests</span>}>
                                        <span className="text-red-500">Cancelled request</span>
                                    </Tooltip>
                                ) : record.status.toLowerCase() === 'completed' ? (
                                    <Tooltip title={<span className="text-green-400">Cannot Update Completed requests</span>}>
                                        <span className="text-green-500">Completed request</span>
                                    </Tooltip>
                                ) : (
                                    <StatusSelect record={record} handleStatusChange={handleStatusChange} />
                                );
                            }
                            return text;
                        },
                    }))}
                    dataSource={repairRequests}
                    rowKey="id"
                    bordered
                    pagination={{ pageSize: 10 }}
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                        style: {
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                        },
                    })}
                />
            </ConfigProvider>
            {selectedRepairId && (
                <TechniciansModal
                    repairRequestId={selectedRepairId}
                    onClose={() => setSelectedRepairId(null)}
                    setSelectedRepairId={setSelectedRepairId}
                />
            )}
        </>
    );
};

export default RepairRequestTable;
