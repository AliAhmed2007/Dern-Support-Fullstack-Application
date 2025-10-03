import { Modal, Tag, Rate, Skeleton, Spin, Alert, Button } from 'antd';
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';
import { useState, useEffect } from 'react';
import fetchAllTechnicians from '../../api/technicians/fetchAllTechnicians';
import { useNavigate } from 'react-router-dom';
import assignTechnician from '../../api/repairRequests/assignTechnician';
import changeStatus from '../../api/repairRequests/changeStatus';

const TechniciansModal = ({ repairRequestId, onClose, setSelectedRepairId }) => {
    const { darkMode } = useTheme();
    const { token } = JSON.parse(localStorage.getItem('auth'));

    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submittingTechnicians, setSubmittingTechnicians] = useState({});

    const navigate = useNavigate();

    const handleAssign = async (technician) => {
        const bearerToken = JSON.parse(localStorage.getItem('auth')).token;

        // Set the specific technician to loading
        setSubmittingTechnicians(prev => ({ ...prev, [technician.id]: true }));

        await assignTechnician(bearerToken, repairRequestId, technician.id);
        await changeStatus(bearerToken, repairRequestId, 'diagnostics')
        setSelectedRepairId(null); // Close the modal after assignment
        setSubmittingTechnicians(prev => ({ ...prev, [technician.id]: false }));
        navigate('../repair-requests')
    };

    const handleShowTechnician = (technician) => {
        navigate(`../technicians/${technician.id}`);
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchTechnicians = async () => {
            if (!repairRequestId) return;

            try {
                setLoading(true);
                const data = await fetchAllTechnicians(token, controller.signal);

                if (isMounted) {
                    setTechnicians(data.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Failed to fetch technicians');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchTechnicians();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [repairRequestId, token]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 ${darkMode ? 'bg-black/70' : 'bg-black/50'} backdrop-blur-sm`}
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative z-50 w-full max-w-4xl mx-auto"
            >
                <Modal
                    width={1200}
                    open={!!repairRequestId}
                    onCancel={onClose}
                    footer={null}
                    closable={false}
                    styles={{
                        content: {
                            backgroundColor: darkMode ? '#1a202c' : '#fff',
                            padding: '0',
                            borderRadius: '12px',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <div className={`${darkMode ? 'dark' : ''} p-6`}>
                        <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            Available Technicians
                        </h2>

                        {loading ? (
                            <Skeleton active paragraph={{ rows: 4 }} />
                        ) : error ? (
                            <Alert message={error} type="error" showIcon />
                        ) : (
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                {technicians?.map(technician => (
                                    <motion.div
                                        key={technician.id}
                                        whileHover={{ y: -2 }}
                                        className={`p-4 rounded-lg transition-all duration-75 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}
                                    >
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={technician.avatar || 'default-avatar.png'}
                                                    alt={`${technician.name} avatar`}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                <div className="truncate">
                                                    <h3 className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                        {technician.name}
                                                    </h3>
                                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {technician.city}
                                                    </p>
                                                </div>
                                            </div>
                                            <Tag color={technician.specialization === 'software' ? 'blue' : 'green'} className='w-[75px]'>
                                                {technician.specialization}
                                            </Tag>
                                            <div className="flex items-center space-x-2">
                                                <Rate value={technician.rating} disabled />
                                                <span className={darkMode ? 'text-dark-primary' : 'text-light-primary'}>({technician.rating})</span>
                                            </div>
                                            <div className="text-right">
                                                <span className={darkMode ? 'text-dark-primary' : 'text-light-primary'}>Status: {' '}
                                                    <Tag color={getStatusColor(technician.status, darkMode)}>
                                                        {technician.status.toUpperCase()}
                                                    </Tag>
                                                </span>
                                            </div>
                                            <Button
                                                onClick={() => handleAssign(technician)}
                                                disabled={submittingTechnicians[technician.id]}
                                            >
                                                {submittingTechnicians[technician.id] ? <Spin size="small" /> : 'Assign Technician'}
                                            </Button>
                                            <Button onClick={() => handleShowTechnician(technician)}>
                                                Show Technician
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {!loading && !error && technicians.length === 0 && (
                            <p className="text-center text-gray-500">No technicians available.</p>
                        )}
                    </div>
                </Modal>
            </motion.div>
        </div>
    );
};

const getStatusColor = (status, darkMode) => {
    const colors = {
        available: darkMode ? 'green' : '#52c41a',
        booked: darkMode ? 'orange' : '#faad14',
        unavailable: darkMode ? 'red' : '#ff4d4f',
    };
    return colors[status];
};

export default TechniciansModal;
