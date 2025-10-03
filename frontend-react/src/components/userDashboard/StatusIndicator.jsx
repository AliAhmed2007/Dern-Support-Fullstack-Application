import { Tag } from 'antd';
import { motion } from 'framer-motion';

const StatusIndicator = ({ status, darkMode }) => {
  const statusColors = {
    pending: darkMode ? 'orange' : 'gold',
    diagnostics: darkMode ? 'blue' : 'geekblue',
    'in progress': darkMode ? 'purple' : 'purple',
    completed: darkMode ? 'green' : 'green',
    cancelled: darkMode ? 'red' : 'volcano',
  };

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Tag
        color={statusColors[status]}
        className={`rounded-full px-3 py-1 !m-0 ${darkMode ? '!border-0' : ''}`}
      >
        {status.toUpperCase()}
      </Tag>
    </motion.div>
  );
};

export default StatusIndicator;