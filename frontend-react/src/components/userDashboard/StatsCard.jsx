import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';

const StatsCard = ({ stats }) => {
  const { darkMode } = useTheme();

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => {
          const {
            title,
            value,
            icon,
            backgroundColor = darkMode ? 'var(--dark-surface-secondary)' : 'var(--light-surface-secondary)',
            textColor = darkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
            borderColor = darkMode ? 'var(--dark-border-default)' : 'var(--light-border-default)',
            percentage = false
        } = stat;

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  bordered={false}
                  style={{
                    backgroundColor,
                    color: textColor,
                    border: `1px solid ${borderColor}`,
                  }}
                  className="rounded-lg shadow-lg  hover:scale-104 transition-all duration-300"
                >
                  <Statistic
                    title={<span style={{ color: textColor }}>{title}</span>}
                    value={percentage ? `%${value}` : value}
                    prefix={icon}
                    valueStyle={{
                      color: textColor,
                      fontSize: '1.75rem',
                      fontWeight: 600,
                    }}
                  />
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default StatsCard;