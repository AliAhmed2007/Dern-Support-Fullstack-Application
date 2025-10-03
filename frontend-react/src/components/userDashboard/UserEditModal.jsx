import { useEffect } from 'react';
import { useActionData, useSubmit } from 'react-router-dom';
import { Modal, Input, Button, Alert } from 'antd';
import { motion } from 'framer-motion';
import useUserProfile from '../../hooks/useUserProfile';

const UserEditModal = ({ user, darkMode, onClose }) => {
    // Get the submit function from react-router-dom
    const submit = useSubmit();
    const actionData = useActionData();
    const {userProfileDispatch} = useUserProfile()

    useEffect(() => {
        if (actionData && !actionData?.errors) {
            onClose(false)
        }
    }, [actionData, onClose])

    // Handle form submission using the useSubmit hook.
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // Convert FormData to a plain object
        const formObj = Object.fromEntries(formData.entries());
        userProfileDispatch({ type: 'UPDATE_USER_PROFILE', payload: formObj })
        submit(formData, { method: 'post', action: window.location.pathname });
    };
    // Framer Motion variants for smooth modal animation.
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
                    Edit User Profile
                </h2>

                {/* If there are errors from the action, display an error message */}
                {actionData && actionData?.errors && (
                    <Alert
                        message={actionData?.errors?.server || "An error occurred, check the data structure."}
                        type="error"
                        showIcon
                    />
                )}

                {/* Use a plain HTML form and let useSubmit handle the submission */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            First Name
                        </label>
                        <Input
                            name="first_name"
                            defaultValue={user.first_name}
                            placeholder="First Name"
                        />
                        {
                            actionData?.errors && actionData?.errors?.first_name && (
                                <span className='text-red-500 py-1 pl-1'>{actionData?.errors?.first_name}</span>
                            )
                        }
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            Last Name
                        </label>
                        <Input
                            name="last_name"
                            defaultValue={user.last_name}
                            placeholder="Last Name"
                        />
                        {
                            actionData?.errors && actionData?.errors?.last_name && (
                                <span className='text-red-500 py-1 pl-1'>{actionData?.errors?.last_name}</span>
                            )
                        }
                    </div>

                    {/* Email */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            Email
                        </label>
                        <Input
                            name="email"
                            defaultValue={user.email}
                            placeholder="Email"
                        />
                        {
                            actionData?.errors && actionData?.errors?.email && (
                                <span className='text-red-500 py-1 pl-1'>{actionData?.errors?.email}</span>
                            )
                        }
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            Phone Number
                        </label>
                        <Input
                            name="phone_number"
                            defaultValue={user.phone_number}
                            placeholder="Phone Number"
                        />
                        {
                            actionData?.errors && actionData?.errors?.phone_number && (
                                <span className='text-red-500 py-1 pl-1'>{actionData?.errors?.phone_number}</span>
                            )
                        }
                    </div>

                    {/* Address */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            Address
                        </label>
                        <Input
                            name="address_line"
                            defaultValue={user.address_line}
                            placeholder="Address"
                        />
                        {
                            actionData?.errors && actionData?.errors?.address_line && (
                                <span className='text-red-500 py-1 pl-1'>{actionData?.errors?.address_line}</span>
                            )
                        }
                    </div>

                    {/* City */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            City
                        </label>
                        <Input
                            name="city"
                            defaultValue={user.city}
                            placeholder="City"
                        />
                        {
                            actionData?.errors && actionData?.errors?.city && (
                                <span className='text-red-500 py-1 pl-1'>{actionData?.errors?.city}</span>
                            )
                        }
                    </div>

                    {/* State */}
                    <div>
                        <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block mb-1`}>
                            State
                        </label>
                        <Input
                            name="state"
                            defaultValue={user.state}
                            placeholder="State"
                        />
                        {
                            actionData?.errors && actionData?.errors?.state && (
                                <span className='text-red-500 py-1 pl-1'>{actionData?.errors?.state}</span>
                            )
                        }
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

export default UserEditModal;