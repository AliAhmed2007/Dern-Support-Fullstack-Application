import { Tag } from 'antd';
import { motion } from 'framer-motion';

const PriorityBadge = ({ priority, darkMode }) => {
  const priorityColors = {
    critical: darkMode ? 'red' : 'volcano',
    high: darkMode ? 'orange' : 'gold',
    normal: darkMode ? 'blue' : 'geekblue',
    low: darkMode ? 'green' : 'cyan',
  };

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Tag
        color={priorityColors[priority]}
        className={`rounded-full px-3 py-1 !m-0 ${darkMode ? '!border-0' : ''}`}
      >
        {priority.toUpperCase()}
      </Tag>
    </motion.div>
  );
};

export default PriorityBadge;