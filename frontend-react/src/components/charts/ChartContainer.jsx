import { motion } from 'framer-motion';
import { Card } from 'antd';
import useTheme  from '../../hooks/useTheme';
import { getChartTheme } from '../../utils/themeUtils';

const ChartContainer = ({ 
  children, 
  title, 
  description,
  animation = { initial: { opacity: 0 }, animate: { opacity: 1 } },
  className 
}) => {
  const { darkMode } = useTheme();
  const theme = getChartTheme(darkMode);

  return (
    <motion.div 
      initial={animation.initial}
      animate={animation.animate}
      transition={{ duration: 0.3 }}
    >
      <Card
        title={title}
        bordered={false}
        className={className}
        headStyle={{ 
          color: theme.textColor,
          borderBottomColor: theme.gridColor 
        }}
        bodyStyle={{ padding: '12px' }}
        style={{ 
          backgroundColor: theme.surfacePrimary,
          color: theme.textColor,
          boxShadow: darkMode ? 'var(--shadow-dark)' : 'var(--shadow-light)'
        }}
      >
        {description && <p className="mb-4 text-secondary">{description}</p>}
        {children}
      </Card>
    </motion.div>
  );
};

export default ChartContainer;