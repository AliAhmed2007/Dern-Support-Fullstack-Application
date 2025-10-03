import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function DeviceItem({ icon = null, device, darkMode, deviceId }) {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const navigate = useNavigate();

  const handleDeviceSelection = (e) => {
    const deviceId = e.currentTarget.dataset.deviceid;
    localStorage.setItem('deviceId', deviceId)
    navigate(`./topics`)
  }

  return (
    <motion.div
      onClick={handleDeviceSelection}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      data-deviceid={deviceId}
      className={`mb-5 cursor-pointer gap-3 w-full rounded-xl flex items-center justify-start p-4 transition-all duration-150 
        ${darkMode
          ? 'border border-gray-600 bg-gray-800 hover:border-gray-500'
          : 'border border-gray-400 bg-white hover:border-gray-500 shadow-sm'}`}
    >
      <span>{icon}</span>
      <span className={`text-xl font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
        {device}
      </span>
    </motion.div>
  );
}

export default DeviceItem;
