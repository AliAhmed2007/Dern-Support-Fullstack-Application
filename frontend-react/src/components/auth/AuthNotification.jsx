import { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

function AuthNotification({message, setSearchParams, type}) {
  const [messageExists, setMessageExists] = useState(false);

  useEffect(() => {
    if (message) {
      setMessageExists(true);
      const timer = setTimeout(() => {
        setSearchParams(searchParams => {
            searchParams.delete('message')
            searchParams.delete('type')
            return searchParams
        });
        setMessageExists(false);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [message, setSearchParams]);

  return (
<AnimatePresence>
  {messageExists && (
    <motion.div
      key="auth-message"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-8 right-8 z-50"
    >
      <Alert
        message={message}
        type={type}
        showIcon
        banner={true}
        closable
        onClose={() => setMessageExists(false)}
        className={`
          shadow-lg rounded-lg border-2 border-red-200
          p-6  
          [&_.ant-alert-message]:text-[16px]
          [&_.ant-alert-icon]:text-2xl
          bg-white dark:bg-gray-800
        `}
      />
    </motion.div>
  )}
</AnimatePresence>
  );
}

export default AuthNotification;