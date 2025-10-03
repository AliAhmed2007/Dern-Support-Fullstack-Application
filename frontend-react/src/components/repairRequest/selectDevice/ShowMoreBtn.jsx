import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

function ShowMoreBtn({ showMore, setShowMore }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer text-blue-400 flex items-center gap-1"
      onClick={() => setShowMore(prev => !prev)}
    >
      <span className="text-lg">{showMore ? 'Show Less' : 'Show More'}</span>
      <motion.span animate={{ rotate: showMore ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-base">
        <DownOutlined />
      </motion.span>
    </motion.button>
  );
}

export default ShowMoreBtn;
