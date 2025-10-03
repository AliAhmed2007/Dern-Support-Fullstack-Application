import { useEffect, useState } from 'react';
import { useActionData, useSubmit } from 'react-router-dom';
import { Modal, Input, Button, Alert, Select } from 'antd';
import { motion } from 'framer-motion';

const { Option } = Select;

const TechnicianEditModal = ({ technician, darkMode, onClose }) => {
    const submit = useSubmit();
    const actionData = useActionData();
    const [specialization, setSpecialization] = useState(technician.specialization);
    const [status, setStatus] = useState(technician.status);

    useEffect(() => {
        if (actionData && !actionData?.errors) {
            onClose(false);
        }
    }, [actionData, onClose]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        submit(formData, { method: 'put', action: window.location.pathname });
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
    };

    return (
        <Modal
            visible={true}
            footer={null}
            onCancel={onClose}
            closable
            centered
            maskStyle={{ backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }}
            bodyStyle={{ padding: 0 }}
            destroyOnClose
        >
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}
            >
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Edit Technician Profile
                </h2>

                {actionData && actionData?.errors && (
                    <Alert
                        message={actionData?.errors?.server || 'An error occurred.'}
                        type="error"
                        showIcon
                    />
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            Name
                        </label>
                        <Input name="name" defaultValue={technician.name} placeholder="Name" />
                    </div>

                    {/* Email */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            Email
                        </label>
                        <Input name="email" defaultValue={technician.email} placeholder="Email" />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            Phone Number
                        </label>
                        <Input name="phone_number" defaultValue={technician.phone_number} placeholder="Phone Number" />
                    </div>

                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            Specialization
                        </label>
                        <Select
                            defaultValue={technician.specialization}
                            style={{ width: '100%' }}
                            onChange={(value) => setSpecialization(value)}
                        >
                            <Option value="hardware">Hardware</Option>
                            <Option value="software">Software</Option>
                        </Select>
                        {/* Hidden input to sync the select value */}
                        <input type="hidden" name="specialization" value={specialization} />
                    </div>

                    {/* Status as Select with hidden input */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            Status
                        </label>
                        <Select
                            defaultValue={technician.status}
                            style={{ width: '100%' }}
                            onChange={(value) => setStatus(value)}
                        >
                            <Option value="available">Available</Option>
                            <Option value="booked">Booked</Option>
                            <Option value="unavailable">Unavailable</Option>
                        </Select>
                        {/* Hidden input to sync the select value */}
                        <input type="hidden" name="status" value={status} />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <Button type="primary" htmlType="submit" block>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </motion.div>
        </Modal>
    );
};

export default TechnicianEditModal;
